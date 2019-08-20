'use strict';

const fs = require('fs-extra');
const path = require('path');

const cheerio = require('cheerio');

// Find/Replace content in the page
// FIXME: This is very inefficent and likely does not work very well.
// Can we come up with some more generalized substitutions?
const REPLACEMENTS = new Map([
	[ '<h2 class="heading "><span>', '<h1>' ],
	[ '</span></h2>','</h1>' ],
	[ '<h3 class="heading ">', '<h2>' ],
	[ '</h3>', '</h2>' ],
	[ '<h2><span>', '<h2>' ],
	[ '</span></h2>', '</h2>' ],
	[ '<li class=" ">    <p  >', '<li>' ],
	[ '</p>\n</li>', '</li>' ],
	[ '<p  >', '<p>' ],
	[ '<h4', '<h3' ],
	[ '</h4>', '</h3>' ],
	[ '<h5', '<h4' ],
	[ '</h5>', '</h4>' ],
	[ '<div xmlns="http://www.w3.org/1999/xhtml" class="confbox programlisting scroll-unprocessed">', '<div>' ],
	[ '<div class="defaultnew syntaxhighlighter">', '<div>' ],
	[ ' class="plain"', '' ],
	[ ' class="line"', '' ],
	[ ' class="value"', '' ],
	[ ' class="external-link external-link"', '' ],
	[ ' class="section section-3 "', '' ],
	[ ' class=" "', '' ],
	[ '    </p>', '</p>' ],
	[ '    </li>', '</li>' ],
	[ ' class="toc-indentation "' ,'' ],
	[ '  class="document-link "', '' ],
	[ '</p>\n<ul', '<ul'  ],
	[ ' class="section section-4 "', '' ],
	[ ' class="section section-5 "', '' ],
	[ ' class="heading "', '' ],
	[ ' class="comments"', '' ],
	[ ' class="keyword"', '' ],
	[ '<td  class="confluenceTh"', '<th  class="confluenceTh"' ],
	[ '<li class="li1 ">    <p>', '<li>' ],
	[ '</p>\n<ul>', '<ul>' ],
	[ '    <p  class="p1">', '' ],
	[ ' class="section section-2 "', '' ],
	[ '<h3><span>', '<h3>' ],
	[ '</span></h3>', '</h3>' ],
	[ '  class="confluenceTh" rowspan="1" colspan="1"', '' ],
	[ '  class="confluenceTd" rowspan="1" colspan="1"', '' ],
	[ ' class="confluenceTable"', '' ],
	[ '</code><code>', '' ],
	[ '<code>            &lt;', '<code class="indent3">' ],
	[ '<code>        &lt;', '<code class="indent2">' ],
	[ '<code>    &lt;', '<code class="indent1">' ],
	[ '</code><code class="string">', '' ],
	[ '<code>    ', '<code class="indent1">' ],
	[ '<code>Â </code>', '<code></code>' ],
	[ '<code class="indent1">    ', '<code class="indent2">' ],
	[ '<code class="indent2">    ', '<code class="indent3">' ],
	[ '<h1></h1>', '' ],
	[ '<h3 class="heading li3"><span>', '<h3>' ],
	[ '<li class="li3 ">', '<li>' ],
	[ '<p class="li1">', '<p>' ],
	[ '<p class="gh-header-title">', '<p>' ],
	[ '<li class="p2 ">', '<li>' ],
	[ '<code>  ', '<code class="indent1">' ],
]);


async function generateReleaseNote(wikiFile, outputDir) {
	const basename = path.basename(wikiFile);
	const end = basename.indexOf('_Release_Note.html');
	const version = basename.slice('Titanium_SDK_'.length, end);

	const outputFilePath = path.join(outputDir, `${version}.html`);
	if (await fs.exists(outputFilePath)) {
		console.log(`Expected release note file ${outputFilePath} already exists, skipping!`);
		return;
	}

	const contents = await fs.readFile(wikiFile, 'utf8');

	let node = cheerio.load(contents); // add jquery-like features
	// strip the footer
	if (node('div.footer').length > 0) {
		node('div.footer').remove();
	}
	// Remove meta tag for exporter plugin
	if (node('meta[name=generator]').length > 0) {
		node('meta[name=generator]').remove();
	}
	// Remove <link> tags
	node('link').remove();
	// Insert the release notes css stylesheet
	node('head').append('<link type="text/css" rel="stylesheet" href="css/release_note.css" media="all">');

	// Drop the ToC
	node('ul.toc-indentation').remove();

	// Fix absolute links in the ToC with relative links
	// TODO: Remove if we're dropping ToC now?
	// node(`a[href^="${basename}"]`).each(function () {
	// 	const element = node(this);
	// 	const originalHref = element.attr('href');
	// 	const modified = originalHref.slice(basename.length);
	// 	element.attr('href', modified);
	// });

	// Do our nasty find/replacements brute-force
	let wikiPage = node.html();
	for (const [key, value] of REPLACEMENTS) {
		const re = new RegExp(key, 'g');
		wikiPage = wikiPage.replace(re, value);
	}

	return fs.writeFile(outputFilePath, wikiPage);
}

async function main() {
	const htmlGuidesDir = path.join(__dirname, 'wiki/htmlguides');
	if (!await fs.exists(htmlGuidesDir)) {
		throw new Error('This script expects an exported wiki under wiki/htmlguides. Please run `npm run wiki:export && npm run wiki:unzip` first.');
	}

	const releaseNotesDir = path.join(__dirname, 'release-notes');
	const files = await fs.readdir(htmlGuidesDir);
	const titaniumSDKReleaseNotes = files.filter(f => f.startsWith('Titanium_SDK_') && f.endsWith('_Release_Note.html'));
	return Promise.all(titaniumSDKReleaseNotes.map(filename => {
		const filepath = path.join(htmlGuidesDir, filename);
		return generateReleaseNote(filepath, releaseNotesDir);
	}));
}

main().then(() => process.exit(0)).then(err => {
	console.error(err);
	process.exit(1);
});
