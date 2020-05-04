// "wiki:guides": "mkdir -p build/guides && node wiki/guides_parser --input wiki/htmlguides/toc.xml --output ./build/guides",
/*
 * Copyright (c) 2015-Present Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License.
 *
 * Script to convert Wiki-exported content for JSDuck site.
 * This will generate a guides.json with the tree of the guides
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');

const utils = require('./util');

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
	const contents = await fs.readFile(file, 'utf8');
	const html = utils.manipulateHTMLContent(contents, file, showEditButton);
	const dir = path.join(outputDir, 'guides', shortname);
	await fs.ensureDir(dir);
	return fs.writeFile(path.join(dir, 'README.html'), html);
}

/**
 * Generates a guides.json from the table of contents XML in the wiki export
 * @param {string} htmlGuidesDir path to input dir (exported wiki zipfiule contents unzipped)
 * @param {string} outputDir path to where to generate the guides.json file
 */
async function convertTOC(inputDir, outputDir) {
	const toc = await utils.parseTOC(path.join(inputDir, 'toc.xml'));
	return fs.writeFile(path.join(outputDir, 'guides.json'), JSON.stringify(toc, null, 4));
}

/**
 * Generates modified HTML files from the original raw exported wiki contents
 * @param {string} htmlGuidesDir path to input dir (exported wiki zipfiule contents unzipped)
 * @param {string} outputDir path to where to generate the converted files
 * @param {boolean} [showEditButton=false] whether to show an edit button in the exported files
 */
async function convertHTMLFiles(htmlGuidesDir, outputDir, showEditButton) {
	// loop through all HTML documents found in the htmlguides directory
	const files = await fs.readdir(htmlGuidesDir);
	const htmlFiles = files.filter(f => f.endsWith('.html'));
	// Do them in parallel
	return Promise.all(htmlFiles.map(async filename => {
		const filepath = path.join(htmlGuidesDir, filename);
		return manipulateHTMLFile(filepath, outputDir, showEditButton);
	}));
}

async function main() {
	const program = require('commander');
	program
		.option('-i, --input <dir>', 'Path to unzipped wiki html export directory', path.join(__dirname, '../htmlguides'))
		.option('-o, --output <dir>', 'Path to directory to place final files', path.join(__dirname, '../../build/guides'))
		.option('-s, --show-edit-button', 'show an edit button in the output file', false)
		.parse(process.argv);

	await fs.ensureDir(program.output);
	return Promise.all([
		convertTOC(program.input, program.output),
		convertHTMLFiles(program.input, program.output, program.showEditButton)
	]);
}

main().then(() => process.exit(0)).catch(err => {
	console.error(err);
	process.exit(1);
});
