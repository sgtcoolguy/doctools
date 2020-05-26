/**
 * This script manipulates the exported wiki HTML files
 * This main does:
 * - stripping of the wiki export footer
 * - redirect tags for certain pages
 * - modifies links to be relative links on docs.appcelerator.com website
 * - optionally adds an edit button
 * - minifies the HTML
 * - Writes thsese modified contents out in a directory/filename structure supported by JSDuck
 * (<output_dir>/<page_name>/README.html)
 */
'use strict';

const path = require('path');
const url = require('url');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const promisify = require('util').promisify;
const xml2js = promisify(require('xml2js').parseString);

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
 * @param {CheerioStatic} node [description]
 * @param {String} filepath [description]
 * @returns {CheerioStatic}
 */
function addInternalRedirect(node, filepath) {
	const shortName = filepath.substring('htmlguides/'.length);
	if (!INTERNAL_REDIRECTS.has(shortName)) {
		return node;
	}

	if (node('meta[http-equiv*=refresh]').length <= 0) { // check if file already has a redirect meta element
		console.log(`Adding a redirect to ${filepath} to point to ${INTERNAL_REDIRECTS.get(shortName)}`);
		node('head').append(`\t\t<meta http-equiv="refresh" content="0;URL=http://docs.appcelerator.com/platform/latest/#!/guide/${INTERNAL_REDIRECTS.get(shortName)}">\n`); // add redirect to source page
	}

	return node;
}

/**
 * [addExternalRedirect description]
 * 
 * @param {CheerioStatic} node [description]
 * @param {String} filepath [description]
 * @returns {CheerioStatic}
 */
function addExternalRedirect(node, filepath) {
	const shortName = filepath.substring('htmlguides/'.length);
	if (!INTERNAL_REDIRECTS.has(shortName)) {
		return node;
	}

	if (node('meta[http-equiv*=refresh]').length <= 0) { // check if file already has a redirect meta element
		console.log(`Adding a redirect to ${filepath} to point to ${EXTERNAL_REDIRECT_TARGET}`);
		node('head').append(`\t<meta http-equiv="refresh" content="0;${EXTERNAL_REDIRECT_TARGET}">`); // add redirect to source page
	}

	return node;
}

/**
 * [minify description]
 * @param  {CheerioStatic} node [description]
 * @param {string} [filepath] path to html file (for context when there's an error)
 * @return {String}      [description]
 */
function htmlMinify(node, filepath) {
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
	try {
		return minify(html, MINIFY_CONFIG);
	} catch (err) {
		if (filepath) {
			console.error(`Error minifying file ${filepath}: ${err}`);
		}
		throw err;
	}
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
			const urlObj = url.parse(href);
			if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
				if (urlObj.hostname === 'docs.appcelerator.com') {
					if (urlObj.pathname.includes('apidoc/mobile/latest')) {
						// Convert old HTML site links to JSDuck
						const token = href.substring(href.lastIndexOf('/') + 1);
						const api = token.substring(0, token.indexOf('-'));
						const type = token.substring(token.indexOf('-') + 1).replace('.html', '');
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
					} else if (urlObj.hash) {
						// turn to relative hashes for absolute URLs to docs site (or URLs pointing to old doc site layout)
						if (urlObj.pathname.startsWith('/titanium') ||
							urlObj.pathname.startsWith('/platform')) {
								href = urlObj.hash;
						} else if (urlObj.pathname.startsWith('/cloud') ||
							urlObj.pathname.startsWith('/arrowd')) {
							href = '/arrowdb/latest/' + urlObj.hash;
						}
					}
				} else if (urlObj.hostname === 'wiki.appcelerator.org') {
					// FIXME: Treat same as relative links? Basically can we "strip" the host name and treat equivalent to a relative link?
					// Check for unconverted wiki URLs
					const inList = WHITELIST.some(whitelisted => href.startsWith(whitelisted))
					if (!inList) {
						// TODO: if link is of form https://wiki.appcelerator.org/display/guides2/Appcelerator+CLI+7.1.2.GA+Release+Note
						// then convert to #!/guide/Appcelerator+CLI+7.1.2.GA+Release+Note

						// If link is of form https://wiki.appcelerator.org/display/DB/AMPLIFY+CLI+Package+Manager
						// then it's pointing to the beta docs site! fix to point to guides2 equivalent? Warn?
						if (urlObj.pathname.startsWith('/display/DB/')) {
							console.error(`Wiki page at ${filepath} pointing at a Doc beta space: ${href} - Fix the original link in the wiki!`);
						}
						// if link is of form: https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide
						// it's pointing to API Builder docs. Where are those now?
						// https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_getting_started_guide.html
						else if (urlObj.pathname.startsWith('/display/AB4/')) {
							const modifiedName = urlObj.pathname.substring(13).toLowerCase().replace(/\+/g, '_');
							href = `https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/${modifiedName}.html`;
						} else {
							console.warn(`Unconverted wiki link: ${href}, from page: ${filepath}`);
						}
					}
				} else {
					// Open external links in new windows/tabs
					elem.attribs.target = '_blank';
				}
			} else if (url.protocol === 'mailto:') {
				// If it's a mailto: link, then don't change it!
			} else if (urlObj.pathname && urlObj.pathname.includes('attachment')) {
				// relative path to an attachment file
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
 * @param {object} [options]
 * @param {boolean} [options.showEditButton=false]
 * @param {boolean} [options.minify=true]
 * @returns {string}
 */
function manipulateHTMLContent(contents, filepath, options = { showEditButton: false, minify: true }) {
	let $ = generateDOM(contents); // add jquery-like features
	$ = stripFooter($);
	// $ = addBanner($); // Don't add migration banner yet!
	if (filepath) {
		$ = addRedirects($, filepath);
	}
	$ = fixLinks($, filepath);
	if (options.showEditButton) {
		$ = addEditButton($);
	}
	if (options.minify === false) {
		return $.html();
	}

	return htmlMinify($, filepath);
}

/**
 * @param {string} contents html source of a file to parse
 * @returns {CheerioStatic}
 */
function generateDOM(contents) {
	return cheerio.load(contents, { decodeEntities: false });
}

/**
 * 
 * @param {CheerioStatic} dom 
 * @param {string} filepath 
 */
function addRedirects(dom, filepath) {
	const result = addInternalRedirect(dom, filepath);
	return addExternalRedirect(result, filepath);
}

/**
 * Parses the toc.xml file
 * @param {string} tocFilepath input toc.xml filepath
 * @returns {Promise<object[]>}
 */
async function parseTOC(tocFilepath) {
	const contents = await fs.readFile(tocFilepath, 'utf8');
	const result = await xml2js(contents);
	return parse(result.toc.topic);
}

/**
 * Parses the toc.xml file and generates a JS object reproducing the hierarchy
 * @param {object[]} node parsed toc.xml xmldom elements? 
 * @param {Set<string>} topicsDone memo to keep track of pages/nodes already done
 * @return {object[]}
 */
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

module.exports = {
	generateDOM,
	stripFooter,
	addRedirects,
	fixLinks,
	htmlMinify,
	parseTOC,
	manipulateHTMLContent
};
