const fs = require('fs');
const decode = require('html-entities').decode;
const solrCategory = 'platform';

/**
 * Decode HTML entities and remove non-ASCII characters
 * @param {string} str raw string
 * @returns {string}
 */
function u2a (str) {
	// eslint-disable-next-line no-control-regex
	return decode(str).replace(/[^\x00-\x7F]/g, '');
}

/**
 * Remove HTML tags and reduce whitespace
 * @param {string} str raw string
 * @returns {string}
 */
function stripTags (str) {
	return str.replace(/<(?:.|\n)*?>/gm, '').replace(/[ \t\n]+/gm, ' ');
}

/**
 * @param {object[]} params
 * @returns {string}
 */
function parseParams(params) {
	let rv = '';
	params.forEach(function (elem) {
		rv += u2a([ elem.name, elem.type, elem.doc ].join(' '));
	});
	return rv;
}

/**
 * @param {object[]} apis
 * @returns {object[]}
 */
function parseMembers(apis) {
	const rv = [];
	apis.forEach(function (api) {
		let extraDesc = '';
		const newApi = {
			id: u2a([ api.owner, api.tagname, api.name, solrCategory ].join('-')),
			url: u2a([ api.owner, api.tagname, api.name ].join('-')),
			type: solrCategory,
			name: u2a(api.owner + '.' + api.name)
		};
		if (api.tagname === 'property') {
			if (api.type) {
				extraDesc += ' ' + u2a(api.type);
			}
			if (api.default) {
				extraDesc += ' ' +  u2a(api.default);
			}
		}

		if (api.tagname === 'method') {
			extraDesc += ' ' + parseParams(api.params);
			if ('return' in api && api.return) {
				const returnType = u2a(api.return.type);
				if (returnType === 'undefined') {
					extraDesc += ' return void';
				} else {
					extraDesc += ' return ' + returnType;
					extraDesc += ' ' + u2a(api.return.doc);
				}
			}
		}

		if (api.tagname === 'event') {
			extraDesc += ' ' + parseParams(api.params);
		}

		newApi.content = stripTags(u2a([ newApi.name, api.name, api.doc, extraDesc ].join(' ')));

		rv.push(newApi);
	});
	return rv;
}

// Start of main execution
if (require.main === module) {
	if (process.argv.length !== 4) {
		console.error('usage: node alloy2solr <input_file> <output_file>');
		process.exit(1);
	}

	const inputFile = process.argv[2];
	const outputFile = process.argv[3];

	if (!fs.existsSync(inputFile)) {
		console.error('Input file does not exist: %s', inputFile);
		process.exit(1);
	}

	let exportData = [];
	const input = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
	for (const key in input) {
		const obj = input[key];
		if (obj.tagname !== 'class') {
			continue;
		}
		const newObj = {
			name: u2a(obj.name),
			id: u2a(obj.name + '-' + solrCategory),
			url: u2a(obj.name),
			type: solrCategory
		};
		newObj.content = newObj.name + ' ' + stripTags(u2a(obj.doc));

		exportData.push(newObj);

		// eslint-disable-next-line no-loop-func
		[ 'property', 'method', 'event' ].forEach(function (x) {
			if (x in obj.members && obj.members[x].length > 0) {
				exportData = exportData.concat(parseMembers(obj.members[x]));
			}
		});
	}

	if (fs.writeFileSync(outputFile, JSON.stringify(exportData, null, 4))) {
		console.error('Could not write output file: %s', outputFile);
	} else {
		console.log('Done! File generated at: %s', outputFile);
	}
}
