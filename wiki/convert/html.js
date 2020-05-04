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
const promisify = require('util').promisify;

const xml2js = promisify(require('xml2js').parseString);
const utils = require('./util');

// TODO: Rewrite to be async!
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
	const html = utils.manipulateHTMLContent(contents, file, showEditButton);
	const dir = path.join(outputDir, 'guides', shortname);
	await fs.ensureDir(dir);
	return fs.writeFile(path.join(dir, 'README.html'), html);
}

function cliUsage() {
	console.log('Usage: node html --input ../htmlguides/toc.xml --output ../../build/guides/');
}

// FIXME: Move to processCommandLineArgs, return in an object!
let inputDir = null;
let outputDir = null;
function processCommandLineArgs() {
	const cwd = process.cwd();
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
					// Try to take the filename as-is, if doesn't exist try to resolve relative to cwd, then try relative to this file
					inputFile = process.argv[x];
					if (!fs.existsSync(inputFile)) {
						inputFile = path.resolve(cwd, inputFile);
						if (!fs.existsSync(inputFile)) {
							inputFile = path.resolve(__dirname, inputFile);
							if (!fs.existsSync(inputFile)) {
								console.error(`Input file does not exist: ${process.argv[x]}`);
								process.exit(1);
							}
						}
					}
					break;
				case "--output":
					if (++x >= argc) {
						console.error('Specify an output directory!');
						cliUsage();
						process.exit(1);
					}
					outputDir = path.resolve(cwd, process.argv[x]);
					break;
				default:
					console.warn(`unknown option: ${process.argv[x]}`);
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
}

async function convertTOC(inputDir, outputDir) {
	const contents = await fs.readFile(path.join(inputDir, 'toc.xml'), 'utf8');
	const result = await xml2js(contents);
	const toc = parse(result.toc.topic);
	return fs.writeFile(path.join(outputDir, 'guides.json'), JSON.stringify(toc, null, 4));
}

async function main() {
	processCommandLineArgs();
	// TOOD: Also write out all the guides!
	return convertTOC(inputDir, outputDir);

	// loop through all HTML documents found in the htmlguides directory
	const htmlGuidesDir = inputDir;
	const files = await fs.readdir(htmlGuidesDir);
	const htmlFiles = files.filter(f => f.endsWith('.html'));
	// Do them in parallel
	return Promise.all(htmlFiles.map(async filename => {
		const filepath = path.join(htmlGuidesDir, filename);
		return manipulateHTMLFile(filepath, outputDir, showEditButton);
	}));
}

main().then(() => process.exit(0)).catch(err => {
	console.error(err);
	process.exit(1);
});
