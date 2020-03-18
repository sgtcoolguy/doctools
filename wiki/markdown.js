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
const util = require('util');
const promisify = util.promisify;
const xml2js = promisify(require('xml2js').parseString);
const TurndownService = require('turndown');
const tables = require('turndown-plugin-gfm').tables
const removeTrailingSpaces = require('remove-trailing-spaces');

const manipulateHTMLContent = require('./htmlguides').manipulateHTMLContent;

// Regexp/Patterns used to match link styles to rewrite them to work in docsy!
const DUMB_PATTERN = /^(.+?)-section-(src-\d+(_(.+))?)$/; // group 1 is the page name, group 2 is the full anchor name

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

class Page {
	/**
	 * 
	 * @param {string} docsyPath path to document in docsy wiki
	 * @param {Map<string, string>} anchors mapping from confluence anchors/ids to docsy anchors/ids
	 */
	constructor(docsyPath, anchors = new Map()) {
		this.docsyPath = docsyPath;
		this.anchors = anchors;
	}
}

/**
 * 
 * @param {object} entry 
 * @param {number} index
 * @param {string} outDir 
 * @param {Map<string, Page>} lookupTable
 */
async function handleEntry(entry, index, outDir, lookupTable) {
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
	// if (content.includes('process(')) {
	// 	console.log(content);
	// }
	// We need to alter the HTML like we do in htmlguides here: strip footer, etc.
	const modified = await manipulateHTMLContent(content, filepath, { minify: false }); // FIXME: The minifier is fucking up the spaces inside code tags!
	if (content.includes('process(')) {
		console.log(modified);
	}
	// Convert the html -> markdown prepend the frontmatter
	const frontmatter = {
		title: entry.title,
		weight: ((index + 1) * 10).toString() // Make the weight the (index + 1) * 10 as string
	};
	const thisDocPage = lookupTable.get(entry.name);
	if (!thisDocPage) {
		console.warn(`WAS UNABLE TO FIND PAGE METADATA ENTRY FOR ${entry.name}`);
	}
	// FIXME: We need a way to alter the collapseWhitespace internal to turndown! How can we pass in options.isPre function ourselevs to exclude CODE tags?!
	const turndownService = new TurndownService({
		headingStyle: 'atx',
		codeBlockStyle: 'fenced',
		// blankReplacement: (content, node, options) => {
		// 	if (node.nodeName === 'CODE') {
		// 		// console.log(`Retaining blank code content!!! :::${node.textContent}:::`);
		// 		// console.log(node);
		// 		// FIXME: This is somehow stripping out the actual whitespaces here!
		// 		// How can we tell what was removed?! How can we avoid removing it?
		// 		return `${node.flankingWhitespace.leading}${node.textContent}${node.flankingWhitespace.trailing}`;
		// 	}
		// 	return '';
		// }
	});
	// Skip the title since we put that in frontmatter
	// FIXME: What if they don't match? Use the actual title tag value in preference? What does entry.title become? 'linkTitle'?
	turndownService.remove(['head', 'title']);

	// Most wiki pages have a header with the page title at the top of the content
	// We should strip that (it ends up being duplicated)
	turndownService.addRule('duplicate header', {
		filter: node => node.nodeName === 'H1'&& node.textContent === entry.title,
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
				href = wikiLinkToMarkdown(href, lookupTable, thisDocPage);
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
				.replace(/\n/gm, '\n    '); // indent
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

	// Hack together something workable for tables
	// Start with the plugin that does tables
	turndownService.use(tables);

	// But we have lost of newline/whitespace embedded inside, so we collapse that...
	turndownService.addRule('collapse td', {
		filter: node => node.nodeName === 'TD',
		replacement: (content, node) => cell(content.trim(), node)
	});

	// Then we basically re-implement writing td cells
	// Here we need to turn newlines back into <br /> tags so that the table doesn't break
	function cell (content, node) {
		const index = Array.prototype.indexOf.call(node.parentNode.childNodes, node);
		let prefix = ' ';
		if (index === 0) prefix = '| ';
		return prefix + content.replace(/\n/g, '<br />') + ' |'
	}

	// TODO: Add special conversion of the DIV.warning and DIV.problem contents
	// i.e. from https://wiki.appcelerator.org/display/guides2/Prerequisites
	// warnings should ideally show the warning emoji, be shown in a yellow-ish box or something
	// problems should show the red exclamation, have red background, (or maybe just this: https://www.docsy.dev/docs/adding-content/shortcodes/#alert)

	turndownService.addRule('keep code', {
		filter: 'code',
		replacement: (content, node) => {
			// if (content.trim().startsWith('process(')) {
			// 	console.log(node);
			// 	console.log(content);
			// 	console.log(node.textContent);
			// }
			// console.log(node.flankingWhitespace);
			return node.textContent;
		}
	});

	// TODO: Fix up export of code blocks/examples. They're very messed up right now!
	turndownService.addRule('code', {
		filter: node => node.nodeName === 'DIV' && node.classList.contains('scroll-html-formatted-code') && !node.classList.contains('programlisting'),
		replacement: (content, node, options) => {
			const codeTitle = node.getAttribute('data-title');
			const language = '';
			// content = content.replace(/\n\n/g, '\n').trim();
			// console.log(content); // FIXME: the content has extra newlines with leading and trailing ` chars on the ones with code...
			// Many don't have a title. Not sure how to sniff the language....
			// TODO: determine language from title? Typically it's JS or XML!
			return (
				'\n\n' + options.fence + language + '\n' +
				content +
				'\n' + options.fence + '\n\n'
			  )
		}
	});

	turndownService.addRule('div line', {
		filter: node => node.nodeName === 'DIV' && node.classList.contains('line'),
		replacement: (content, node) => {
			// FIXME: If the line contents are basically empty (just a space), treat as newline!
			// return content;
			return `${content}\n`;
		}
	});

	const markdown = turndownService.turndown(modified);
	const converted = `${JSON.stringify(frontmatter)}${markdown}\n`;
	// Next we remove trailing spaces on liens and then merge multiple blank newlines into a single one
	return fs.writeFile(path.join(outDir, outputName), removeTrailingSpaces(converted).replace(/(\n){3,}/gm, '\n\n'));
}

/**
 * @param {string} href The original URL we're converting
 * @param {Map<string, Page>} lookupTable The lookup table from entry names to wiki absolkute link/paths
 * @param {Page} thisDocPage
 * @returns {string}
 */
function wikiLinkToMarkdown(href, lookupTable, thisDocPage) {
	let anchor;
	const endPath = href.replace('#!/guide/', '');
	let pageName = endPath;
	let legacyId;
	const dumbMatch = endPath.match(DUMB_PATTERN);
	if (dumbMatch) {
		pageName = dumbMatch[1];
		legacyId = dumbMatch[2];
		anchor = dumbMatch[4];
		// Here we try to extract the anchor to use as a last-resort fallback
		// ideally we'd already have the mapping for the old anchor/id from Confluence to the expected auto-generated one from docsy
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
		}
	}

	if (!pageName) {
		// couldn't extract the page name, so return the link as it was
		return href;
	}

	const docPage = lookupTable.get(pageName);
	if (!docPage) {
		console.warn(`Unable to find page: ${pageName}, from: ${href} (linked in ${thisDocPage.docsyPath})`);
		return href;
	}

	// Use our mapping from old confluence anchors to what should be an auto-generated docsy header id
	if (legacyId) {
		const possible = docPage.anchors.get(legacyId);
		if (possible) {
			anchor = possible;
		}
	}

	// We're linking to another section of the page!
	if (docPage.docsyPath === thisDocPage.docsyPath) {
		// Drop the doc path and just return the anchor!
		return `#${anchor}`;
	}

	// TODO: try to use relative links? Or not because the _index.md thing breaks then?
	let result = `${docPage.docsyPath}`; // FIXME: What the fuck is going on here, this isn pointing to the input html file in my repo, not the docsy filepath!
	if (anchor) {
		result += `#${anchor}`;
	}
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
	console.log('Building hierarchy and lookup tables...');
	await generateLookupTable('/docs/appc/', toc, lookupTable);

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
 * @param {Map<string, Page>} lookupTable 
 */
async function generateLookupTable(prefix, entries, lookupTable) {
	// FIXME: do the recursion in parallel!
	for (const entry of entries) {
		const generatedPath = `${prefix}${entry.name}/`
		const page = await generatePageMetadata(entry.name, generatedPath);
		lookupTable.set(entry.name, page);
		if (entry.items) {
			// recurse inside items!
			await generateLookupTable(generatedPath, entry.items, lookupTable);
		}
	}
}

/**
 * Given an input page, this generates the metadat we need abotu the page:
 * - the filepath it will live at in the docsy site
 * - the mapping of confluence anchors to the docsy anchors
 * @param {string} pageName 
 * @param {string} generatedPath 
 * @returns {Page}
 */
async function generatePageMetadata(pageName, generatedPath) {
	const filepath = path.join(__dirname, 'htmlguides', `${pageName}.html`);
	const content = await fs.readFile(filepath, 'utf8');
	// FIXME: If we haven't manipulated the html already, we may not have the style of links we expect!
	// Can we avoid this extra work?
	const modified = await manipulateHTMLContent(content, filepath);
	const anchors = new Map();
	// Can we grab the first div with class "content" and then find all h1/2/3/4/5 tags with class "heading" - and grab parent div's id value to match?
	const turndownService = new TurndownService();
	// TODO: Don't use turndown, go straight to JSDOM? Becuase we don't actually want to convert anything
	turndownService.addRule('log anchors', {
		filter: node => {
			if (['H1', 'H2', 'H3', 'H4', 'H5'].includes(node.nodeName) && node.classList.contains('heading')) {
				const parent = node.parentElement;
				// Record mapping of ids generated by Confluence versus ids auto-generated by Docsy
				if (parent.nodeName === 'DIV' && parent.getAttribute('id')) {
					const legacyId = parent.getAttribute('id');
					const generatedId = node.textContent.toLowerCase().replace(/\s/g, '-').replace(/[\(\)]/g, '');
					anchors.set(legacyId, generatedId);
				}
			}
			return false;
		},
		replacement: text => text
	});
	turndownService.turndown(modified);
	return new Page(generatedPath, anchors);
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
