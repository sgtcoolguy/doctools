var fs = require('fs'),
	inputFile,
	outputFile,
	input,
	exportData = { types: [], version: '1.0' },
	obj = {},
	newObj = {},
	docs = {},
	since,
	solrCategory = 'platform',
	members,
	since_pattern = /@since [0-9\.]+/,
	platform_pattern = /.*(@platform .+ [0-9\.]+).*/g,
	pretty_platforms = {
		'android':'Android',
		'blackberry':'BlackBerry',
		'iphone':'iPhone',
		'ipad':'iPad',
		'mobileweb':'Mobile Web',
		'tizen':'Tizen',
		'windowsphone':'Windows Phone'
	},
	example_pattern = /.*(<h3>Examples<\/h3>[\s\S]*)/m,
	typestr_pattern = /@typestr .*/,
	pseudo_pattern = /@pseudo/;

/*
 * Remove non-ASCII characters
 */
function u2a (str) {
	return str.replace(/[^\x00-\x7F]/g, '');
}

/*
 * Remove HTML tags
 */
function stripTags (str) {
    return str.replace(/<(?:.|\n)*?>/gm, '');
}

function parseSince(api) {
	if ('meta' in api && 'since' in api.meta && api.meta.since) {
		return { 
			'since': api.meta.since,
			'version': 'Titanium Mobile SDK'
		}
	}
	return null;
}

function stripDesc(str) {
	var match;
	str = str.replace(/\.\.\.$/, '');
	match = str.match('<p>');
	if (match && match.length > 0) {
		str = str.split(/<\/p>/)[0] + '</p>';
	}
	return u2a(str);
}

function parseDoc (doc) {
	var rv = {},
		match,
		tokens;

	// Parse @since
	match = doc.match(since_pattern);
	if (match && match.length > 0) {
		tokens = match[0].split(' ');
		rv.since = { 'since': u2a(tokens[1]), 'version': 'Titanium Mobile SDK' };
	}

	// Parse @platform
	match = doc.match(platform_pattern);
	if (match && match.length > 0) {
		rv.since = [];
		rv.userAgents = [];
		match.forEach(function(platform) {
			tokens = stripTags(platform).split(' ');
			rv.since.push({
				'since':u2a(tokens[2]),
				'version': 'Titanium Mobile SDK - ' + pretty_platforms[tokens[1]]
			});
			rv.userAgents.push({
				platform: tokens[1]
			});
		});
	}

	// Parse examples
	match = doc.match(example_pattern);
	if (match && match.length > 0) {
		var i;
		rv.examples = [];
		tokens = match[0].split(/<\/?h4>/);
		for (i = 1; i < tokens.length; i = i + 2) {
			rv.examples.push({
				code: tokens[i + 1],
				description: tokens[i]
			});
		}
	}

	match = doc.match(pseudo_pattern);
	if (match && match.length > 0) {
		rv.pseudo = true;
	}

	rv.description = stripDesc(doc.replace(since_pattern, '').replace(platform_pattern, '').replace(example_pattern, '').replace('@description', '').replace('@pseudo', '').replace(typestr_pattern, '') || '');
	if (rv.description === 'undefined' || rv.description.length === 0) {
		delete rv.description;
	}

	return rv;
}


function toJscaType (t) {
	if (t.indexOf('Array') === 0) {
		t = 'Array';
	} else if (t.indexOf('Dictionary') === 0) {
		t = 'Object';
	} else if (t.indexOf('Titanium') === 0) {
		t = 'Object';
	} else if (t.indexOf('Alloy') === 0) {
		t = 'Object';
	}
	return t;
}

function parseParams(params, tagname) {
	var rv = [],
		suffix = '',
		newElem = {},
		doc = {};

	switch (tagname) {
		case 'method':
			suffix = '-param';
			break;
		case 'event':
			suffix = '-callback-property';
	}

	params.forEach(function(elem) {

		newElem = {};
		doc = {};

		doc = parseDoc(elem.doc);
		Object.keys(doc).forEach(function (i) {
			newElem[i] = doc[i];
		});
		if (elem.shortDoc) {
			newElem.description = stripDesc(elem.shortDoc);
		}
		if (tagname === 'method') {
			newElem.usage = elem.optional ? 'optional' : 'required';
			delete newElem.description;
		}
		newElem.type = toJscaType(elem.type) || 'String';
		newElem.name = elem.name;
		rv.push(newElem)
	});
	return rv;
}

function parseMembers(apis) {
	var rv = [],
		newApi = {},
		doc = {};
	
	apis.forEach(function (api) {
		newApi = {};
		doc = {};

		newApi.name = u2a(api.name);

		doc = parseDoc(api.doc);
		Object.keys(doc).forEach(function (i) {
			newApi[i] = doc[i];
		});
		if (since = parseSince(api)) {
			newApi.since = since;
		}
		if (api.shortDoc) {
			newApi.description = stripDesc(api.shortDoc);
		}
		if (api.tagname === 'property') {
			newApi.type = toJscaType(api.type) || 'String';
			newApi.isInternal = false;
			newApi.isClassProperty = true;
			newApi.isInstanceProperty = false;
		}

		if (api.tagname === 'method') {
			newApi.isMethod = true;
			newApi.isConstruction = false;
			newApi.isInternal = false;
			newApi.isInstanceProperty = true;
			newApi.isClassProperty = false;
			newApi.parameters = parseParams(api.params, api.tagname);
			if ('return' in api && api.return) {
				newApi.returns = {
					type: toJscaType(api.return.type) || 'void',
					description: parseDoc(api.return.doc || '').description || ''
				};
				if (newApi.returns.type === 'undefined') {
					newApi.returns.type = 'void'
				}
				if (newApi.returns.summary === '\n') {
					delete newApi.returns.summary;
				}
			}
		}

		if (api.tagname === 'event') {
			newApi.properties = parseParams(api.params, api.tagname);
		}

		rv.push(newApi);
	});
	return rv;
}

// Start of main execution

if (process.argv.length !== 4) {
	console.error('usage: node alloy2solr <input_file.json> <output_file.json>');
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
	obj = input[key];
	newObj = {},
	docs = {};

	newObj.name = (obj.name === 'Alloy.Widget') ? 'Widget' : obj.name;

	if (obj.tagname !== 'class' || obj.name.indexOf('Alloy.builtins') === 0 || obj.name.indexOf('Alloy.widgets') === 0) {
		continue;
	}

	docs = parseDoc(obj.doc);
	Object.keys(docs).forEach(function (i) {
		newObj[i] = docs[i];
	});
	if (newObj.pseudo) {
		continue;
	}
	if (obj.shortDoc) {
		newObj.description = stripDesc(obj.shortDoc);
	}
	if (since = parseSince(obj)) {
		newObj.since = since;
	}
	newObj.isInternal = false;
	newObj.properties = parseMembers(obj.members.property);
	newObj.functions = parseMembers(obj.members.method);
	newObj.events = parseMembers(obj.members.event);

	exportData.types.push(newObj);
}

if(fs.writeFileSync(outputFile, JSON.stringify(exportData, null, 4))) {
	console.error('Could not write output file: %s', outputFile);
} else {
	console.log('Done! File generated at: %s', outputFile);
}
