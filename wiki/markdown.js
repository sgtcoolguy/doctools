// TODO: Make a sensible HTML export -> markdown converter
// that we could use to funnel our docs into https://github.com/Axway/axway-open-docs/blob/master/content/en/docs

// There's this not so great npm package for converting that basically just shells out to pandoc:
// https://github.com/EWhite613/Confluence-to-Github-Markdown/blob/master/Confluence-html-to-github-markdown.js

// We could do better just rewriting that, and we need to pre-pend some metadata about each page to the markdown anyways
// i.e.:
// {
//     "title":"Data storage for high availability",
//     "linkTitle":"Data storage for HA",
//     "weight":"3",
//     "date":"2019-08-09",
//     "description":"Understand where API Portal stores API Management data."
// }

// We could also try to use Turndown to do the conversion rather than relying on pandoc:
// https://github.com/domchristie/turndown

 // Do we need to pre-prep the HTML?
 // - I think we need to strip the exporter footer...
 // - Do what we do in guides_parser to change absolute to relative links?
 // - Rewrite image reference paths/URLs
 // - Do we need to copy the redirect html files over top?


 /*
 * Copyright (c) 2015-2018 Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License.
 *
 * Script to convert Wiki-exported content for JSDuck site.
 * This will generated a guides.json with the tree of the guides;
 * as well as modifies the html contents of each guide in-place mainly to manipulate links
 * and possibly add an "edit" button/link.
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const promisify = require('util').promisify;
const TurndownService = require('turndown');

const manipulateHTMLContent = require('./htmlguides').manipulateHTMLContent;

const cheerio = require('cheerio');
const xml2js = promisify(require('xml2js').parseString);

const WHITELIST = [
	'https://wiki.appcelerator.org/display/community',
	'https://wiki.appcelerator.org/display/titans',
	'https://wiki.appcelerator.org/display/td'
];

// FIXME: Move to processCommandLineArgs, return in an object!
let inputFile = null;
let outputDir = null;
let showEditButton = false;

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

function cliUsage() {
	console.log('Usage: node markdown --input htmlguides/toc.xml --output ./build/guides/');
}

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
				case "--show_edit_button":
					showEditButton = true;
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

/**
 * 
 * @param {object} entry 
 * @param {number} index
 * @param {string} outDir 
 */
async function handleEntry(entry, index, outDir) {
	console.log(`Converting ${entry} to markdown`);
	let outputName;
	// TODO: if the entry has 'items' property, it's a parent! Need to recurse, and change filename to _index
	if (entry.items) {
		outDir = path.join(outDir, entry.name);
		outputName = '_index.md';
		await fs.ensureDir(outDir);
		// recurse
		await Promise.all(entry.items.map((child, childIndex) => handleEntry(child, childIndex, outDir)));
	} else {
		outputName = `${entry.name}.md`;
	}
	const filepath = path.join(__dirname, 'htmlguides', `${entry.name}.html`);
	const content = await fs.readFile(filepath, 'utf8');
	// We need to alter the HTML like we do in htmlguides here: strip footer, etc.
	const modified = await manipulateHTMLContent(content, filepath);
	// FIXME: The code baked in to this method will alter links but may do so in a way we don't want!

	// TODO: Can we extract the page title/strip it (so it isn't duplicated)?

	// Convert the html -> markdown prepend the frontmatter
	const frontmatter = {
		title: entry.title,
		weight: ((index + 1) * 10).toString() // Make the weight the (index + 1) * 10 as string
	};
	const turndownService = new TurndownService();
	const markdown = turndownService.turndown(modified);
	const converted = `${JSON.stringify(frontmatter)}\n\n${markdown}`;
	return fs.writeFile(path.join(outDir, outputName), converted);
}

async function convertTOC(inputFile, outputDir) {
	const contents = await fs.readFile(inputFile, 'utf8');
	const result = await xml2js(contents);
	const toc = parse(result.toc.topic);
	// TODO: instead of writing a guides.json file, loop through the entries and convert each to markdown with the JSON header!
	// What we want to do is use the structure here to build the structure of the dir tree
	// if an entry is a parent, it should become a folder and it's content goes to _index.md
	// If it's a leaf, the file shoudl be named after the "name" value here, the frontmatter of the content shoudl have title match "title" here
	// "weight" in frontmatter should be = (the order/index of the entries in the array + 1) * 10
	// toc should be an arry here
	// handle each entry separately
	return Promise.all(toc.map((entry, index) => handleEntry(entry, index, outputDir)));
}

async function main() {
	processCommandLineArgs();
	return convertTOC(inputFile, outputDir);
}

main().then(() => process.exit(0)).catch(err => {
	console.error(`Error converting XML to JSON: ${err}`);
	process.exit(1);
});
