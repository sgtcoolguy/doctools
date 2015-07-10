var fs = require('fs'),
	Entities = require('html-entities').AllHtmlEntities,
	entities = new Entities(),
	inputFile,
	outputFile,
	input,
	exportData = [],
	obj = {},
	newObj = {},
	solrCategory = 'arrowdb',
	members;

/*
 * Decode HTML entities and remove non-ASCII characters
 */
function u2a (str) {
	return entities.decode(str).replace(/[^\x00-\x7F]/g, '');
}

/*
 * Remove HTML tags and reduce whitespace
 */
function stripTags (str) {
	return str.replace(/<(?:.|\n)*?>/gm, '').replace(/[ \t\n]+/gm, ' ');
}

function parseParams(params) {
	var rv = '';
	params.forEach(function(elem) {
		rv += u2a([elem.name, elem.doc].join(' '));
	});
	return rv;
}

function parseExamples(examples) {
	var rv = '';
	examples.forEach(function(elem) {
		rv += u2a([elem.platform, elem.doc].join(' '));
	});
	return rv;
}

function parseMembers(apis) {
	var rv = [],
		newApi,
		extraDesc,
		returnz;
	
	apis.forEach(function (api) {
		extraDesc = '';
		newApi = {};
		newApi.id = u2a([api.owner, api.tagname, api.name, solrCategory].join('-'));
		newApi.url = u2a([api.owner, api.tagname, api.name].join('-'));
		newApi.type = solrCategory;
		newApi.name = u2a(api.owner + '.' + api.name);

		if (api.tagname === 'property') {
			if (api.type) {
				extraDesc += u2a(api.type);				
			}
		}

		if (api.tagname === 'method') {
			extraDesc += ' ' + api.httpMethod + ' ' + api.url;
			if ('params' in api && api.params.length > 0) {
				extraDesc += ' ' + parseParams(api.params);
			}
			returnz = {};
			if ('return' in api && api.return) {
				returnz.type = u2a(api.return.type);
				if (returnz.type === 'undefined') {
					extraDesc += ' return void';
				} else {
					extraDesc += ' return ' + returnz.type;
					extraDesc += ' ' + u2a(api.return.doc);
				}
			}
			if ('examples' in api && api.examples.length > 0) {
				extraDesc += ' ' + parseExamples(api.examples);
			}
		}

		newApi.content = stripTags(u2a(api.doc + ' ' + extraDesc));

		rv.push(newApi);
	});
	return rv;
}

// Start of main execution

if (process.argv.length !== 4) {
	console.error('usage: node alloy2solr <input_file> <output_file>');
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
	newObj = {};

	if (obj.tagname !== 'class') {
		continue;
	}

	newObj.name = u2a(obj.name);
	newObj.id = u2a(obj.name + '-' + solrCategory);
	newObj.url = u2a(obj.name);
	newObj.type = solrCategory;
	newObj.content = newObj.name + ' ' + stripTags(u2a(obj.doc));

	exportData.push(newObj);

	['property', 'method'].forEach(function (x) {
		if (x in obj.members && obj.members[x].length > 0) {
			exportData = exportData.concat(parseMembers(obj.members[x]));
		}
	});
}

if(fs.writeFileSync(outputFile, JSON.stringify(exportData, null, 4))) {
	console.error('Could not write output file: %s', outputFile);
} else {
	console.log('Done! File generated at: %s', outputFile);
}
