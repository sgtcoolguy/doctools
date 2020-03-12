/**
 * This script manipulates the exported wiki HTML files
 * This main does:
 * - stripping of the wiki export footer
 * - redirect tags for certain pages
 * - modifies links to be relative links on docs.appcelerator.com website
 * - optionally adds an edit button
 * - minifies the HTML
 * - Writes thiese modified contents out in a directory/filename structure supported by JSDuck
 * (<output_dir>/<page_name>/README.html)
 */
'use strict';

const path = require('path');
const fs = require('fs-extra');
const cheerio = require('cheerio');

const minify = require('html-minifier').minify;
const MINIFY_CONFIG = require('./html-minifier.json');

// guide pages redirecting to other guide pages
// original guide -> redirect target
const INTERNAL_REDIRECTS = new Map([
	['Performance', 'Appcelerator_Performance_Management'],
	['Appcelerator_Studio', 'Axway_Appcelerator_Studio'],
	['Appcelerator_Studio_Release_Notes', 'Axway_Appcelerator_Studio_Release_Notes'],
	['Appcelerator_Studio_Getting_Started', 'Axway_Appcelerator_Studio_Getting_Started'],
	['JIRA_Ticket_Template', 'How_to_Report_a_Bug_or_Make_a_Feature_Request'],
	['How_to_Submit_a_Bug_Report', 'How_to_Report_a_Bug_or_Make_a_Feature_Request']
]);
// guide pages that need redirection externally
const EXTERNAL_REDIRECTS = new Set([
	'Titanium SDK Open Source Attribution Notice',
	'Titanium Studio Open Source Attribution Notice'
]);
const EXTERNAL_REDIRECT_TARGET = 'http://www.appcelerator.com/opensource/';
const WHITELIST = [
	'https://wiki.appcelerator.org/display/community',
	'https://wiki.appcelerator.org/display/titans',
	'https://wiki.appcelerator.org/display/td'
];

/**
 * remove the footer element of all HTML generated files in the htmlguides directory
 * See https://wiki.appcelerator.org/x/lrHBAg for more details
 * @param {CheerioStatic} node [description]
 * @return {CheerioStatic}
 */
function stripFooter(node) {
	if (node('div.footer').length > 0) {
		node('div.footer').remove();
	}
	return node;
}

/**
 * This script adds a banner element with a hardcoded message to each document in the ../doctools/htmlguides﻿ directory prior to the Appcelerator documentation being published.
 * Documentation: https://wiki.appcelerator.org/x/dQwOAw
 * @param {CheerioStatic} node [description]
 * @returns {CheerioStatic}
 */
function addBanner(node) {
	if (node('div#banner').length <= 0) {
		node('div.container').prepend('\n\t\t<div id="banner" class="confbox admonition admonition-note aui-message warning shadowed information-macro">\n\t\t\t<p>You can now find Appcelerator documentation at <a href="https://docs.axway.com/">https://docs.axway.com/</a>. This site will be taken down in the near future.</p>\n\t\t</div>'); // add banner and message
	}
	return node;
}

/**
 * [addInternalRedirect description]
 * @param {String} file [description]
 * @param {CheerioStatic} node [description]
 * @returns {CheerioStatic}
 */
function addInternalRedirect(file, node) {
	const shortName = file.substring('htmlguides/'.length);
	if (!INTERNAL_REDIRECTS.has(shortName)) {
		return node;
	}

	if (node('meta[http-equiv*=refresh]').length <= 0) { // check if file already has a redirect meta element
		console.log(`Adding a redirect to ${file} to point to ${INTERNAL_REDIRECTS.get(shortName)}`);
		node('head').append(`\t\t<meta http-equiv="refresh" content="0;URL=http://docs.appcelerator.com/platform/latest/#!/guide/${INTERNAL_REDIRECTS.get(shortName)}">\n`); // add redirect to source page
	}

	return node;
}

/**
 * [addExternalRedirect description]
 * @param {String} file [description]
 * @param {CheerioStatic} node [description]
 * @returns {CheerioStatic}
 */
function addExternalRedirect(file, node) {
	const shortName = file.substring('htmlguides/'.length);
	if (!INTERNAL_REDIRECTS.has(shortName)) {
		return node;
	}

	if (node('meta[http-equiv*=refresh]').length <= 0) { // check if file already has a redirect meta element
		console.log(`Adding a redirect to ${file} to point to ${EXTERNAL_REDIRECT_TARGET}`);
		node('head').append(`\t<meta http-equiv="refresh" content="0;${EXTERNAL_REDIRECT_TARGET}">`); // add redirect to source page
	}

	return node;
}

/**
 * [minify description]
 * @param  {CheerioStatic} node [description]
 * @return {String}      [description]
 */
function htmlMinify(node) {
	// TODO Also do some custom massaging here, to remove stuff that's useless that minifier wont:
	// - <meta content="Scroll EclipseHelp Exporter" name="generator">
	// - class attribute with single blank space, i.e.: '<li class=" ">'
	// - stylesheet <link> tags?
	// - xmlns attributes on <html> tag
	// - <?xml tag
	// - trailing empty space in class attributes
	//
	// Modify html-minifier config to collapse whitespaces down to single space?

	// Remove meta tag for exporter plugin
	if (node('meta[name=generator]').length > 0) {
		node('meta[name=generator]').remove();
	}
	// Remove <link> tags
	node('link').remove();
	let html = node.html();
	// Remove trailing whitespace from inside class attribute values
	html = html.replace(/ class="(.*) "/g, ' class="$1"');
	// Now remove empty class attributes
	html = html.replace(/ class=""/g, '');
	// drop xmlns attribute on html tag
	html = html.replace(' xmlns="http://www.w3.org/1999/xhtml"', '');
	// drop xml tag
	html = html.replace('<?xml version="1.0" encoding="UTF-8" ?>', '');
	return minify(html, MINIFY_CONFIG);
}

/**
 * Given a path to an HTML file we will:
 * - parse the html
 * - strip the footer
 * - add some redirects if necessary
 * - run through a minifier
 * - write the modified contents back to the file
 * @param {string} file 
 * @param {string} outputDir
 * @param {boolean} showEditButton
 * @returns {Promise<void>}
 */
async function manipulateHTMLFile(file, outputDir, showEditButton) {
	const shortname = path.basename(file, '.html');
	console.log(shortname);
	const contents = await fs.readFile(file, 'utf8');
	const html = await manipulateHTMLContent(contents, file, showEditButton);
	const dir = path.join(outputDir, 'guides', shortname);
	await fs.ensureDir(dir);
	return fs.writeFile(path.join(dir, 'README.html'), html);
}

/**
 * Converts old HTML site links to new site relative links
 * Changes absolute links to relative
 * Replaces internal guide linsk to links supported by eventual end product
 * @param {CheerioStatic} dom 
 * @param {string} filepath path of input file (used to track bad links)
 * @returns {CheerioStatic}
 */
function fixLinks(dom, filepath) {
	dom('a').each(function (i, elem) {
		let href = elem.attribs.href;
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
					let inList = false;
					WHITELIST.forEach(function (whiteUrl) {
						if (href.indexOf(whiteUrl) === 0) {
							inList = true;
						}
					});
					if (!inList) {
						// TODO: if link is of form https://wiki.appcelerator.org/display/guides2/Appcelerator+CLI+7.1.2.GA+Release+Note
						// then convert to #!/guide/Appcelerator+CLI+7.1.2.GA+Release+Note

						// TODO: If link is of form https://wiki.appcelerator.org/display/DB/AMPLIFY+CLI+Package+Manager
						// then it's pointing to the beta docs site! fix to point to guides2 equivalent? Warn?

						// TOFO: if link is of form: https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide
						// it's pointing to API Builder docs. Where are those now?
						console.warn(`Unconverted wiki link: ${href}, from page: ${filepath}`);
					}
				} else {
					// Open external links in new windows/tabs
					elem.attribs.target = '_blank';
				}
			} else if (href.indexOf('attachment') === 0) {
				href = './' + href;
			} else {
				// If it's a mailto: link, then don't change it!
				if (!href.startsWith('mailto:')) {
					// Replace internal guide links to JSDuck style links
					href = href.replace(' ', '_');
					href = '#!/guide/' + href.replace('.html', '').replace('#', '-section-');
				}
			}
			elem.attribs.href = href;
		}
	});

	dom('link').each(function (i, elem) {
		if (elem.attribs.href) {
			delete elem.attribs.href;
		}
	});
	return dom;
}

/**
 * @param {CheerioStatic} dom 
 * @returns {CheerioStatic}
 */
function addEditButton(dom) {
	if (dom('.content')) {
		const id = dom('.content').attr('id');
		let wiki_url = `https://wiki.appcelerator.org/pages/editpage.action?pageId=${id}`;
		// Fix for TIDOC-2718
		if (wiki_url.indexOf('src-') !== -1) { // if wiki_url contains 'src-'
			wiki_url = wiki_url.replace('src-',''); // remove 'src-' from the wiki_url
		}
		dom('.content').after(`<a id="editButton" href = "${wiki_url}"><span>Edit</span></a>`);
	}
	return dom;
}

/**
 * @param {string} contents HTML contents
 * @param {string} [filepath]
 * @param {boolean} [showEditButton=false]
 * @returns {string}
 */
async function manipulateHTMLContent(contents, filepath, showEditButton = false) {
	let $ = cheerio.load(contents); // add jquery-like features
	$ = stripFooter($);
	// $ = addBanner($); // Don't add migration banner yet!
	if (filepath) {
		$ = addInternalRedirect(filepath, $);
		$ = addExternalRedirect(filepath, $);
	}
	$ = fixLinks($, filepath);
	if (showEditButton) {
		$ = addEditButton($);
	}

	return htmlMinify($);
}

function cliUsage() {
	console.log('Usage: node htmlguides --output ./build/guides/ [--show_edit_button]');
}

let outputDir = null;
let showEditButton = false;
function processCommandLineArgs() {
	const cwd = process.cwd();
	const argc = process.argv.length;
	if (argc > 2) {
		for (var x = 2; x < argc; x++) {
			switch (process.argv[x]) {
				case "--output":
					if (++x >= argc) {
						console.error('Specify an output directory!');
						cliUsage();
						process.exit(1);
					}
					outputDir = path.resolve(cwd, process.argv[x]);
					break;
				case "--show_edit_button":
					showEditButton = true;
					break;
				default:
					console.warn(`unknown option: ${process.argv[x]}`);
			}
		}
	}

	if (!outputDir) {
		console.error('Output directory required.');
		cliUsage();
		process.exit(1);
	}
}

async function main() {
	processCommandLineArgs();

	// loop through all HTML documents found in the htmlguides directory
	const htmlGuidesDir = path.join(__dirname, 'htmlguides');
	const files = await fs.readdir(htmlGuidesDir);
	const htmlFiles = files.filter(f => f.endsWith('.html'));
	// Do them in parallel
	return Promise.all(htmlFiles.map(async filename => {
		const filepath = path.join(htmlGuidesDir, filename);
		return manipulateHTMLFile(filepath, outputDir, showEditButton);
	}));
}

module.exports = {
	manipulateHTMLContent
};

if (require.main === module) {
	main().then(() => {
		process.exit(0);
	}).catch (err => {
		console.error(err);
		process.exit(1);
	});
}
