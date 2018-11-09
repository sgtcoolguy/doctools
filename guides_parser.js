/*
 * Copyright (c) 2015-2018 Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License.
 *
 * Script to convert Wiki-exported content for JSDuck site.
 */
'use strict';

const cheerio = require('cheerio');
const xml2js = require('xml2js').parseString;
const fs = require('fs-extra');
const path = require('path');
const whiteList = [
	'https://wiki.appcelerator.org/display/community',
	'https://wiki.appcelerator.org/display/titans',
	'https://wiki.appcelerator.org/display/td'
];

let inputFile = null;
let outputDir = null;
let showEditButton = false;

function parse(node, topicsDone = new Set()) {
	const rv = [];
	for (let x = 0; x < node.length; x++) {
		const child = node[x];
		const hashIndex = child.$.href.indexOf('#');
		const htmlFilename = hashIndex === -1 ? child.$.href : child.$.href.substring(0, hashIndex);
		const shortname = htmlFilename.replace('.html', '');

		// If we're already done this file, no need to re-process the HTML!
		if (!topicsDone.has(shortname)) {
			topicsDone.add(shortname);

			const dir = path.join(outputDir, 'guides', shortname);
			fs.ensureDirSync(dir);

			const dom = cheerio.load(fs.readFileSync(path.join(path.dirname(inputFile), `${shortname}.html`)), {xmlMode: true, decodeEntities: false});

			dom('a').each(function (i, elem) {
				var href = elem.attribs.href;
				if (href) {
					href = decodeURIComponent(href);
					if (href.indexOf('http://') === 0 || href.indexOf('https://') === 0) {
						if (~href.indexOf('apidoc/mobile/latest')) {
							// Convert old HTML site links to JSDuck
							var token = href.substring(href.lastIndexOf('/') + 1),
								api = token.substring(0, token.indexOf('-')),
								type = token.substring(token.indexOf('-') + 1).replace('.html', '');
							if (api === 'latest') {
								href = '#!/api/';
							} else if (type.indexOf('object') === 0 || type.indexOf('module') === 0) {
								href = '#!/api/' + api;
							} else if (~['event', 'method', 'property'].indexOf(type)){
								href = '#!/api/' + api.substring(0, api.lastIndexOf('.')) + '-' + type + '-' + api.substring(api.lastIndexOf('.') + 1);
							} else if (!api && type) {
								href = '#!/api/' + type;
							} else {
								console.log('Uncoverted wiki link: ' + href);
							}
						} else if (~href.search(/http:\/\/docs\.appcelerator\.com\/titanium\/.*\#/)) {
							// Make absolute links referencing JSDuck site relative
							href = href.replace(/http:\/\/docs\.appcelerator\.com\/titanium\/.*#/, '');
							if (href.indexOf('!') === 0) {
								href = '#' + href;
							}
						} else if (~href.search(/http:\/\/docs\.appcelerator\.com\/platform\/.*\#/)) {
							href = href.replace(/http:\/\/docs\.appcelerator\.com\/platform\/.*\#/, '');
							if (href.indexOf('!') === 0) {
								href = '#' + href;
							}
						} else if (~href.search(/http:\/\/docs\.appcelerator\.com\/cloud\/.*\#/)) {
							href = href.replace(/http:\/\/docs\.appcelerator\.com\/cloud\/.*\#/, '');
							if (href.indexOf('!') === 0) {
								href = '/arrowdb/latest/#' + href;
							}
						} else if (~href.search(/http:\/\/docs\.appcelerator\.com\/arrowdb\/.*\#/)) {
							href = href.replace(/http:\/\/docs\.appcelerator\.com\/arrowdb\/.*\#/, '');
							if (href.indexOf('!') === 0) {
								href = '/arrowdb/latest/#' + href;
							}
						} else if (href.indexOf('https://wiki.appcelerator.org') === 0) {
							// Check for unconverted wiki URLs
							var inList = false;
							whiteList.forEach(function (whiteUrl) {
								if (href.indexOf(whiteUrl) === 0) {
									inList = true;
								}
							});
							if (!inList) {
								console.warn('Unconverted wiki link: ' + href);
							}
						} else {
							// Open external links in new windows/tabs
							elem.attribs.target = '_blank';
						}
					} else if (href.indexOf('attachment') === 0) {
						href = './' + href;
					} else {
						// Replace internal guide links to JSDuck style links
						href = href.replace(' ', '_');
						href = '#!/guide/' + href.replace('.html', '').replace('#', '-section-');
					}
					elem.attribs.href = href;
				}
			});

			dom('link').each(function (i, elem) {
				if (elem.attribs.href) {
					delete elem.attribs.href;
				}
			});

			if (showEditButton) {
				if (dom('.content')) {
					const id = dom('.content').attr('id');
					let wiki_url = `https://wiki.appcelerator.org/pages/editpage.action?pageId=${id}`;
					// Fix for TIDOC-2718
					if (wiki_url.indexOf('src-') !== -1) { // if wiki_url contains 'src-'
						wiki_url = wiki_url.replace('src-',''); // remove 'src-' from the wiki_url
					}
					dom('.content').after(`<a id="editButton" href = "${wiki_url}"><span>Edit</span></a>`);
				}
			}

			fs.writeFileSync(path.join(dir, 'README.html'), dom.html());

			const res = {
				name: shortname,
				title: child.$.label
			};
			if ('topic' in child) {
				res.items = parse(child.topic, topicsDone);
				if (res.items.length <= 0) {
					delete res.items;
				}
			}
			rv.push(res);
		}
	}
	return rv;
}

function cliUsage() {
	console.log('Usage: node guides_parser --input htmlguides/toc.xml --output ./build/guides/ [--show_edit_button]');
}

// Start of Main Flow
const argc = process.argv.length;
if (argc > 2) {
	for (var x = 2; x < argc; x++) {
		switch (process.argv[x]) {
			case "--input":
				if (++x >= argc) {
					console.error('Specify an XML input file!');
					cliUsage();
					process.exit(1);
				}
				inputFile = process.argv[x];
				if (!fs.existsSync(inputFile)) {
					console.error('File does not exist: ' + inputFile);
				}
				inputFile = path.resolve(path.dirname(process.argv[1]), inputFile);
				break;
			case "--output":
				if (++x >= argc) {
					console.error('Specify an output directory!');
					cliUsage();
					process.exit(1);
				}
				outputDir = path.resolve(path.dirname(process.argv[1]), process.argv[x]);
				break;
			case "--show_edit_button":
				showEditButton = true;
				break;
			default:
				console.warn('unknown option: ' + process.argv[x]);
		}
	}
}

if (!inputFile) {
	console.error('Input file required.');
	cliUsage();
	process.exit(1);
}
if (!outputDir) {
	console.error('Output directory required.');
	cliUsage();
	process.exit(1);
}

xml2js(fs.readFileSync(inputFile, 'utf8'), function (err, result) {
		if (err) {
			console.error('Error converting XML to JSON: ' + err);
			process.exit(1);
		}

		const toc = parse(result.toc.topic);
		fs.writeFileSync(path.join(outputDir, 'guides.json'), JSON.stringify(toc, null, 4));
});
