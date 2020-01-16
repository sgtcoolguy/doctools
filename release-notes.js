'use strict';

const path = require('path');

const fs = require('fs-extra');
const cheerio = require('cheerio');

/**
 * Class attributes we drop from the final HTML
 */
const CLASSES_TO_REMOVE = [
	// code snippets
	'plain', 'line', 'value', 'comments', 'keyword', 'string',
	// links
	'external-link', 'document-link',
	// misc
	'toc-indentation', 'confluenceTable', 'section', 'section-2', 'section-3', 'heading',
];

/**
 * Find/Replace content in the page
 * Easier done via regexp search/replace than trying to perform via cheeriojs
 */
const REPLACEMENTS = new Map([
	[ '</code><code>', '' ],
]);

/**
 * 
 * @param {string} wikiFile filepath to wiki input file with release notes content
 * @param {string} outputDir path to directroy generated release note html file shoudl be written
 * @param {object} [options] options object
 * @param {boolean} [options.force=false] whether to force overwriting existing release notes
 */
async function generateReleaseNote(wikiFile, outputDir, options) {
	const basename = path.basename(wikiFile);
	const end = basename.indexOf('_Release_Note.html');
	let version = basename.slice('Titanium_SDK_'.length, end);
	// if no suffix, assume it's a GA (older release notes)
	if (!version.endsWith('.GA') && !version.endsWith('.RC') && !version.endsWith('Beta')) {
		version = version + '.GA';
	}

	const outputFilePath = path.join(outputDir, `${version}.html`);
	if (!options.force && await fs.exists(outputFilePath)) {
		console.log(`Expected release note file ${outputFilePath} already exists, skipping! Provide --force option to overwrite`);
		return;
	}

	const contents = await fs.readFile(wikiFile, 'utf8');
	const wikiPage = massageNoteHTML(contents);
	return fs.writeFile(outputFilePath, wikiPage);
}

/**
 * @param {string} contents original html contents for a release note wiki page (exported)
 * @return {string} the modified html contents after transforming
 */
function massageNoteHTML(contents) {
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
	node('ul.toc-indentation').first().remove();

	// Drop the wrapping div.container (unwrap it)
	const htmlContents = node('div.content').first().html();
	node('body').html(htmlContents);

	// Drop wrapping spans in h2/h3 heading class tags (we drop the "heading" class later)
	node('.heading>span').each(function (i, elem) {
		const innerHTML = node(this).text();
		node(this).replaceWith(innerHTML);
	});

	// Convert td.confluenceTh to th tags
	node('td.confluenceTh').each(function (i, elem) {
		const innerHTML = node(this).html();
		node(this).replaceWith(`<th>${innerHTML}</th>`);
	});

	// Replace td tags like this:
	// <td class="confluenceTh" rowspan="1" colspan="1"></td>
	// with empty <td> tag
	node('td.confluenceTd[rowspan="1"][colspan="1"]').removeAttr('class').removeAttr('rowspan').removeAttr('colspan');

	// Drop a whole bunch of class attributes we don't use!
	for (const klass of CLASSES_TO_REMOVE) {
		node(`.${klass}`).removeClass(klass);
	}

	// Drop empty class attributes
	node('*[class=""]').removeAttr('class');


	// Fix absolute links in the ToC with relative links
	// TODO: Remove if we're dropping ToC now?
	// node(`a[href^="${basename}"]`).each(function () {
	// 	const element = node(this);
	// 	const originalHref = element.attr('href');
	// 	const modified = originalHref.slice(basename.length);
	// 	element.attr('href', modified);
	// });

	// Combine </code><code> to become nothing!
	let wikiPage = node.html();
	for (const [key, value] of REPLACEMENTS) {
		const re = new RegExp(key, 'g');
		wikiPage = wikiPage.replace(re, value);
	}
	return wikiPage;
}

module.exports = {
	massageNoteHTML
};

/**
 * @param {string[]} args 
 */
async function main(args) {
	const htmlGuidesDir = path.join(__dirname, 'wiki/htmlguides');
	if (!await fs.exists(htmlGuidesDir)) {
		throw new Error('This script expects an exported wiki under wiki/htmlguides. Please run `npm run wiki:export && npm run wiki:unzip` first.');
	}
	// TODO: Allow specifying an exact wiki page to grab?
	const force = args.includes('--force');
	const options = {
		force
	};

	const releaseNotesDir = path.join(__dirname, 'release-notes');
	const files = await fs.readdir(htmlGuidesDir);
	const titaniumSDKReleaseNotes = files.filter(f => f.startsWith('Titanium_SDK_') && f.endsWith('_Release_Note.html'));
	return Promise.all(titaniumSDKReleaseNotes.map(filename => {
		const filepath = path.join(htmlGuidesDir, filename);
		return generateReleaseNote(filepath, releaseNotesDir, options);
	}));
}

if (require.main === module) {
	main(process.argv.slice(2)).then(() => process.exit(0)).then(err => {
		console.error(err);
		process.exit(1);
	});
}
