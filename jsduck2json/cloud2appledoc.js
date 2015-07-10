var fs = require('fs'),
	inputFile,
	outputFile,
	input,
	exportData = {},
	solrCategory = 'arrowdb',
	tidict = {
		"ACLs": {
			"add":"addUser",
			"remove":"removeUser",
			"check":"checkUser"
		},
		"Emails" : {
			"email_from_template":"send"
		},
		"KeyValues": {
			"incrby":"increment"
		},
		"Messages": {
			"delete_thread":"removeThread"
		},
		"PushNotifications" : {
			"channels_query":"queryChannels",
			"channels_show":"showChannels",
			"reset_badge_put":"resetBadge"
		},
		"SocialIntegrations": {
			"facebook_search_friends":"searchFacebookFriends"
		}
	};

/*
 * Decode HTML entities and remove non-ASCII characters
 */
function u2a (str) {
	return str.replace(/[^\x00-\x7F]/g, '');
}

/*
 * Remove HTML tags and reduce whitespace
 */
function stripTags (str) {
	return str.replace(/<(?:.|\n)*?>/gm, '').replace(/[ \t\n]+/gm, ' ');
}

function shortenDesc(str) {
	return stripTags(str.split('.')[0].replace('ArrowDB', 'APS') + '.');
}

function toTiName(str, parent) {
	var rv = '',
		tokens,
		i;
	if (str == 'delete') {
		return 'remove';
	}
	if (parent in tidict) {
		if (str in tidict[parent]) {
			return tidict[parent][str];
		}
	}
	tokens = str.split('_');
	rv = tokens[0];
	for (i = 1; i < tokens.length; i++) {
		rv += tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1);
	}
	return rv;
}

function toIosType(str) {
	var tokens = str.split('/');
	if (tokens.length > 1) {
		var rv = [];
		tokens.forEach(function (token) {
			rv.push(toIosType(token));
		});
		return rv.join('/');
	}

	if (~str.indexOf('[]')) {
		return toIosType(str.replace('[]', '')) + '[]';
	}

	switch (str) {
		case 'String':
		case 'Date':
			return 'NSString';
		case 'Number':
			return 'NSNumber';
		case 'Hash':
			return 'NSDictionary';
		case 'Boolean':
			return 'NSBoolean';
		case 'FileUpload':
		case 'BinaryData':
			return 'NSURL/NSData';
		case 'Any':
			return 'Any';
		case 'CustomObjects':
			return 'APSObjects'
		default:
			return 'APS' + str;
	}
}

function parseParams(params) {
	var rv = '';
	params.forEach(function(elem) {
		rv += " * <li>";
		rv += elem.name;
		if ('type' in elem) {
			rv += ' (' + toIosType(elem.type) + '): ';
		} else {
			rv += ': ';
		}
		rv += stripTags(shortenDesc(elem.doc));
		if ('optional' in elem && !elem.optional) {
			rv += " (required)</li>\n"
		} else {
			rv += '</li>\n';
		}
	});
	return u2a(rv);
}

function parseMethods(members) {
	var rv = {};
	members.forEach(function(api) {
		var name = api.name;
		var owner = api.owner;
		var tiname = toTiName(name, owner);
		var desc = ' * ';

		if ('shortDoc' in api) {
			desc += shortenDesc(api.shortDoc) + '\n';
		} else {
			desc += shortenDesc(api.doc) + '\n';
		}

		if ('meta' in api && 'loginRequired' in api.meta) {
			if (api.meta.loginRequired) {
				desc += ' * To use this method, **a user must be logged in before calling this method.**\n';
				desc += ' *\n';
			}
		}

		desc += ' * For more details about the underlying REST method, see the\n'
		desc += ' * [ArrowDB API Docs](http://docs.appcelerator.com/arrowdb/latest/#!/api/' + owner + '-method-' + name + ').\n'
		if ('params' in api && api.params.length > 0) {
			desc += ' * @param data Method parameters specified as an NSDictionary with the following key-value pairs:<ul> \n';
			desc += parseParams(api['params']) + ' * </ul>\n';
		} else {
			desc += ' * @param data Unused.\n';
		}
		
		desc += ' * @param handler Callback to handle the server response. See the Callback section in APSClient.';

		if ('response' in api) {
			desc += '\n * The response data returns the following method-specific properties:<ul>\n';
			desc += parseParams(api.response) + ' * </ul>';
		}

		rv[tiname] = desc;
		
		extra_desc = '\n * @param progressHandler Callback to handle the progress of the request. See the Callback section in APSClient.';

		rv[tiname+'WithProgress'] = desc + extra_desc
	});
	return rv;
}


function parseFields(apis) {
	var desc = '';
	apis.forEach(function (api) {
		desc += ' * <li>' + api.name;
		if ('type' in api) {
			desc += ' (' + toIosType(api.type) + ')';
		}
		desc += ': ';
		if ('shortDoc' in api) {
			desc += u2a(api.shortDoc.replace(/\.\.\.$/, ''));
		} else {
			desc += u2a(shortenDesc(api.doc));
		}
		desc += '</li>\n';
	});
	return desc;
}

// Start of main execution

if (process.argv.length !== 4) {
	console.error('usage: node alloy2javadoc <input_file.json> <output_file.json>');
	process.exit(1);
} 

inputFile = process.argv[2];
outputFile = process.argv[3];

if (!fs.existsSync(inputFile)) {
	console.error('Input file does not exist: %s', inputFile);
	process.exit(1);
}

input = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
for (key in input) {
	var obj = input[key],
		newObj = {},
		name,
		methods = [],
		fields = [];

	if (obj.tagname !== 'class') {
		continue;
	}
	name = u2a(obj.name);
	if (name === 'CustomObjects') {
		name = 'Objects';
	}
	newObj.doc = ' * ' + stripTags(u2a(shortenDesc(obj.doc))) + '\n';

	fields = parseFields(obj.members.property);
	if (fields) {
		newObj.doc += ' * The REST object of this class contains the following fields:<ul>\n';
		newObj.doc += fields + ' * </ul>\n';
	}

	newObj.doc += ' * For more details about the underlying REST object, see the <a href="http://docs.appcelerator.com/arrowdb/latest/#!/api/' + name + '">ArrowDB API Docs</a>.';

	methods = parseMethods(obj.members.method);
	if (methods) {
		newObj.methods = methods;
	}
	exportData[name] = newObj;
}
if(fs.writeFileSync(outputFile, JSON.stringify(exportData, null, 4))) {
	console.error('Could not write output file: %s', outputFile);
} else {
	console.log('Done! File generated at: %s', outputFile);
}
