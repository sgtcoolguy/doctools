/*
 * Copyright (c) 2020-Present Appcelerator, Inc. All Rights Reserved.
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
const xml2js = promisify(require('xml2js').parseString);
const TurndownService = require('turndown');
const removeTrailingSpaces = require('remove-trailing-spaces');

const manipulateHTMLContent = require('./htmlguides').manipulateHTMLContent;

// Regexp/Patterns used to match link styles to rewrite them to work in docsy!
const DUMB_PATTERN = /^(.+?)-section-src-\d+(_(.+))?$/; // group 1 is the page name, group 2 is the full anchor name

const WHITELIST = [
	'https://wiki.appcelerator.org/display/community',
	'https://wiki.appcelerator.org/display/titans',
	'https://wiki.appcelerator.org/display/td'
];

// FIXME: Move to processCommandLineArgs, return in an object!
let inputFile = null;
let outputDir = null;

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
 * @param {Map<string, string>} lookupTable
 */
async function handleEntry(entry, index, outDir, lookupTable) {
	// console.log(`Converting ${entry.title} to markdown`);
	let outputName;
	// if the entry has 'items' property, it's a parent! Need to recurse, and change filename to _index
	if (entry.items) {
		outDir = path.join(outDir, entry.name);
		outputName = '_index.md';
		await fs.ensureDir(outDir);
		// recurse
		await Promise.all(entry.items.map((child, childIndex) => handleEntry(child, childIndex, outDir, lookupTable)));
	} else if (entry.name === 'Home') { // Treat top-level 'Home' page as index for all appc content
		outputName = '_index.md';
	} else {
		outputName = `${entry.name}.md`;
	}
	const filepath = path.join(__dirname, 'htmlguides', `${entry.name}.html`);
	const content = await fs.readFile(filepath, 'utf8');
	// We need to alter the HTML like we do in htmlguides here: strip footer, etc.
	const modified = await manipulateHTMLContent(content, filepath);
	// Convert the html -> markdown prepend the frontmatter
	const frontmatter = {
		title: entry.title,
		weight: ((index + 1) * 10).toString() // Make the weight the (index + 1) * 10 as string
	};
	const thisDocWikiPath = lookupTable.get(entry.name);
	const turndownService = new TurndownService({ headingStyle: 'atx' });
	// Skip the title since we put that in frontmatter
	// FIXME: What if they don't match? Use the actual title tag value in preference? What does entry.title become? 'linkTitle'?
	turndownService.remove(['head', 'title']);

	// Most wiki pages have a header with the page title at the top of the content
	// We should strip that (it ends up being duplicated)
	turndownService.addRule('duplicate header', {
		filter: function (node, options) {
			if (node.nodeName !== 'H1') {
				return false;
			}
			return node.textContent === entry.title;
		},
		replacement: () => ''
	});

	// TODO: Additionally the initial content/paragraph may make sense as the description in the frontmatter?
	
	// Convert the export HTML links to intra-docsy links if we can
	turndownService.addRule('links', {
		filter: function (node, options) {
			return (
				options.linkStyle === 'inlined' &&
				node.nodeName === 'A' &&
				node.getAttribute('href')
			)
		},
		replacement: function (content, node) {
			let href = node.getAttribute('href');
			if (href.startsWith('#!/guide/')) {
				href = wikiLinkToMarkdown(href, lookupTable, thisDocWikiPath);
			}

			const title = node.title ? ' "' + node.title + '"' : ''
			return '[' + content + '](' + href + title + ')';
		}
	});
	// Convert images to point at correct place!
	// images/download/attachments/30083145/TabbedApplicationMain.png
	// -> /Images/appc/download/attachments/30083145/TabbedApplicationMain.png
	turndownService.addRule('images', {
		filter: 'img',
		replacement: function (content, node) {
			let alt = node.alt || ''
			let src = node.getAttribute('src') || ''
			if (alt && src === alt) {
				// the alt text is literally just the path to the image.
				// Best we can do here is strip it to the base filename without the extension, I suppose.
				alt = path.basename(alt, path.extname(alt));
			}
			if (src.startsWith('images/')) {
				src = '/Images/appc' + src.substring(6); // 'images/...' -> '/Images/appc/...'
			}
			const title = node.title || ''
			const titlePart = title ? ' "' + title + '"' : ''
			return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
		}
	});

	// Alter turndown's conversion of list items to use single space instead of 3 spaces
	// Was copied/altered from: https://github.com/domchristie/turndown/blob/master/src/commonmark-rules.js#L69
	turndownService.addRule('listItem', {
		filter: 'li',
		replacement: function (content, node, options) {
			content = content
				.replace(/^\n+/, '') // remove leading newlines
				.replace(/\n+$/, '\n') // replace trailing newlines with just a single one
				.replace(/\n/gm, '\n  '); // indent (changed from 4 spaces to 2)
			let prefix = options.bulletListMarker + ' '; // changed from original to do only 1 space!
			const parent = node.parentNode;
			if (parent.nodeName === 'OL') {
				const start = parent.getAttribute('start');
				const index = Array.prototype.indexOf.call(parent.children, node);
				prefix = (start ? Number(start) + index : index + 1) + '. '; // changed from 2 spaces to 1
			}
			return (
				prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
			);
		}
	});

	const markdown = turndownService.turndown(modified);
	// TODO: Avoid multiple empty newlines (probably empty after removing trailing spaces)
	const converted = `${JSON.stringify(frontmatter)}${markdown}\n`;
	return fs.writeFile(path.join(outDir, outputName), removeTrailingSpaces(converted));
}

/**
 * @param {string} href The original URL we're converting
 * @param {Map<string, String>} lookupTable The lookup table from entry names to wiki absolkute link/paths
 * @param {string} thisDocWikiPath the wiki url/path for the current document
 * @returns {string}
 */
function wikiLinkToMarkdown(href, lookupTable, thisDocWikiPath) {
	let anchor;
	const endPath = href.replace('#!/guide/', '');
	let pageName = endPath;
	const dumbMatch = endPath.match(DUMB_PATTERN);
	if (dumbMatch) {
		pageName = dumbMatch[1];
		anchor = dumbMatch[3];
		if (anchor) {
			if (anchor.startsWith('safe-id-')) {
				const buff = Buffer.from(anchor.substring(8), 'base64');
				anchor = buff.toString('ascii');
				// TODO: Url encode?
			}
			// ok now we need to drop the pagename from prefix of anchor!
			const anchorPageName = pageName.replace(/_/g, '');
			if (anchor.startsWith(anchorPageName)) {
				anchor = anchor.substring(anchorPageName.length + 1); // drop the page name prefix plus the trailing '-'
			}
			// FIXME: I think the anchor links are busted anyways because they combined all spaces
			// i.e. #Fixedissues should point to the heading "Fixed Issues" and should instead be #fixed-issues
			// so how the hell do we fix this? Serach the page for all headings and remove spaces and find match and then convert?
			// What about cross-page anchor links?!
		}
	}

	// console.log(`path: ${endPath}\npage: ${pageName}\nanchor: ${anchor}`);

	if (!pageName) {
		// couldn't extract the page name, so return the link as it was
		return href;
	}

	const docPath = lookupTable.get(pageName);
	if (!docPath) {
		console.warn(`Unable to find path of page: ${pageName}, from: ${href} (linked in ${thisDocWikiPath})`);
		return href;
	}

	// We're linking to another section of the page!
	if (docPath === thisDocWikiPath) {
		// Drop the doc path and just return the anchor!
		return `#${anchor}`;
	}

	// TODO: try to use relative links? Or not because the _index.md thing breaks then?
	let result = `${docPath}`;
	if (anchor) {
		result += `#${anchor}`;
	}
	// console.log(`${href} -> ${result}`);
	return result;
}

/**
 * @param {string} inputFile toc.xml file exported from wiki
 * @param {string} outputDir root directory we're assembling our docsy content
 * @returns {Promise<void>}
 */
async function convertHTMLFiles(inputFile, outputDir) {
	const contents = await fs.readFile(inputFile, 'utf8');
	const result = await xml2js(contents);
	const toc = parse(result.toc.topic);

	const lookupTable = new Map();
	generateLookupTable('/docs/appc/', toc, lookupTable);

	const docsDir = path.join(outputDir, 'content/en/docs/appc');
	await fs.ensureDir(docsDir);
	return Promise.all(toc.map((entry, index) => handleEntry(entry, index, docsDir, lookupTable)));
}

/**
 * Copy the images over to where we'd expect: htmlguides/images -> outputDir/static/Images/appc
 * @param {string} outputDir root directory we're assembling our docsy content
 * @returns {Promise<void>}
 */
async function copyImages(outputDir) {
	const imagesDir = path.join(outputDir, 'static/Images/appc');
	return fs.copy(path.join(__dirname, 'htmlguides/images'), imagesDir);
}

/**
 * @param {string} prefix
 * @param {object[]} entries 
 * @param {Map<string, string>} lookupTable 
 */
function generateLookupTable(prefix, entries, lookupTable) {
	for (const entry of entries) {
		const generatedPath = `${prefix}${entry.name}/`
		lookupTable.set(entry.name, generatedPath);
		if (entry.items) {
			// recurse inside items!
			generateLookupTable(generatedPath, entry.items, lookupTable);
		}
	}
}

/**
 * @returns {Promise<void>}
 */
async function main() {
	processCommandLineArgs();
	return Promise.all([
		convertHTMLFiles(inputFile, outputDir),
		copyImages(outputDir)
	]);
}

main().then(() => process.exit(0)).catch(err => {
	console.error(`Error converting XML to JSON: ${err}`);
	process.exit(1);
});
