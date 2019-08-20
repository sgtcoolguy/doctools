var fs = require('fs'),
	inputFile,
	outputFile,
	input,
	exportData = {},
	obj = {},
	newObj = {},
	docs = {},
	since,
	solrCategory = 'platform',
	members,
	since_pattern = /@since [0-9\.]+/,
	platform_pattern = /.*(@platform .+ [0-9\.]+).*/g,
	pretty_platforms = {
		"android":"Android",
		"blackberry":"BlackBerry",
		"iphone":"iPhone",
		"ipad":"iPad",
		"mobileweb":"Mobile Web",
		"tizen":"Tizen",
		"windowsphone":"Windows Phone"
	},
	example_pattern = /.*(<h3>Examples<\/h3>[\s\S]*)/m,
	typestr_pattern = /@typestr .*/;

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
		return api.meta.since;
	}
	return null;
}

function parseDoc (doc) {
	var rv = {},
		match,
		tokens;

	// Parse @since
	match = doc.match(since_pattern);
	if (match && match.length > 0) {
		tokens = match[0].split(' ');
		rv.since = tokens[1];
	}

	// Parse @platform
	match = doc.match(platform_pattern);
	if (match && match.length > 0) {
		rv.platforms = [];
		match.forEach(function(platform) {
			tokens = stripTags(platform).split(' ');
			rv.platforms.push({
				pretty_name: pretty_platforms[tokens[1]],
				since: tokens[2],
				name: tokens[1]
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

	rv.description = u2a(doc.replace(since_pattern, '').replace(platform_pattern, '').replace(example_pattern, '').replace('@description', '').replace('@pseudo', '').replace(typestr_pattern, '') || '');
	if (rv.description === 'undefined' || rv.description.length === 0) {
		delete rv.description;
	}

	return rv;
}

function parseParams(params, apiName, tagname) {
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

		newElem.deprecated = elem.deprecated;
		newElem.filename = apiName + '.' + elem.name + suffix;

		doc = parseDoc(elem.doc);
		Object.keys(doc).forEach(function (i) {
			newElem[i] = doc[i];
		});

		if (tagname === 'method') {
			newElem.optional = elem.optional || false;
		}

		newElem.type = elem.type || 'String';
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
		newApi.filename = u2a(api.owner + "." + api.name + "-" + api.tagname);

		doc = parseDoc(api.doc);
		Object.keys(doc).forEach(function (i) {
			newApi[i] = doc[i];
		});

		if (since = parseSince(api)) {
			newApi.since = since;
		}

		if (api.tagname === 'property') {
			newApi.type = api.type || 'String';
			newApi.default = api.default || null;
		}

		if (api.tagname === 'method') {
			newApi.parameters = parseParams(api.params, newApi.filename, api.tagname);
			if ('return' in api && api.return) {
				newApi.returns = {
					type: api.return.type || 'void',
					summary: parseDoc(api.return.doc || '').description || ''
				};
				if (newApi.returns.type === 'undefined') {
					newApi.returns.type = 'void';
				}
				if (newApi.returns.summary === '\n') {
					delete newApi.returns.summary;
				}
			}
		}

		if (api.tagname === 'event') {
			newApi.properties = parseParams(api.params, api.owner + "." + api.name, api.tagname);
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

	if (obj.tagname !== 'class') {
		continue;
	}

	newObj.name = obj.name;
	newObj.filename = obj.name + '-object';
	newObj.extends = obj.extends || 'Object';
	docs = parseDoc(obj.doc);
	Object.keys(docs).forEach(function (i) {
		newObj[i] = docs[i];
	});
	if (since = parseSince(obj)) {
		newObj.since = since;
	}
	newObj.properties = parseMembers(obj.members.property);
	newObj.methods = parseMembers(obj.members.method);
	newObj.events = parseMembers(obj.members.event);

	exportData[newObj.name] = newObj;
}

if(fs.writeFileSync(outputFile, JSON.stringify(exportData, null, 4))) {
	console.error('Could not write output file: %s', outputFile);
} else {
	console.log('Done! File generated at: %s', outputFile);
}
