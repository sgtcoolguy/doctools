/**
 * This script does a first pass of manipulating the exported wiki HTML files
 * This main does some stripping of the wiki export footer, some redirect tags for certian pages,
 * and minifies the HTML.
 * 
 * More manipulations are done in a second pass by the guides_parser.js file which converts the 
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

/**
 * remove the footer element of all HTML generated files in the htmlguides directory
 * See https://wiki.appcelerator.org/x/lrHBAg for more details
 * @param {Function} node [description]
 * @return {Function}
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
 * @param {Function} node [description]
 * @return {Function}
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
 * @param {Function} node [description]
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
 * @param {Function} node [description]
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
 * @param  {Function} node [description]
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
 */
async function manipulateHTMLFile(file) {
	console.log(path.basename(file));
	const contents = await fs.readFile(file, 'utf8');
	let $ = cheerio.load(contents); // add jquery-like features
	$ = stripFooter($);
	// $ = addBanner($); // Don't add migration banner yet!
	$ = addInternalRedirect(file, $);
	$ = addExternalRedirect(file, $);
	const html = htmlMinify($);
	return fs.writeFile(file, html);
}

async function main() {
	// loop through all HTML documents found in the htmlguides directory
	const htmlGuidesDir = path.join(__dirname, 'htmlguides');
	const files = await fs.readdir(htmlGuidesDir);
	const htmlFiles = files.filter(f => f.endsWith('.html'));
	// Do them in parallel
	return Promise.all(htmlFiles.map(async filename => {
		const filepath = path.join(htmlGuidesDir, filename);
		return manipulateHTMLFile(filepath);
	}));
}

main().then(() => {
	process.exit(0);
}).catch (err => {
	console.error(err);
	process.exit(1);
});
