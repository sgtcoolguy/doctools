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

const guides = require('./htmlguides');

// Regexp/Patterns used to match link styles to rewrite them to work in docsy!
const DUMB_PATTERN = /^(.+?)-section-(src-\d+(_(.+))?)$/; // group 1 is the page name, group 2 is the full anchor name

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
 * @param {string} html html source
 * @param {string} filepath path to html input file
 * @returns {string} modified html source
 */
function fixHTML(html, filepath) {
	let dom = guides.generateDOM(html);
	dom = guides.stripFooter(dom);
	dom = guides.addRedirects(dom, filepath);
	dom = guides.fixLinks(dom, filepath);
	dom = fixCodeBlocks(dom);
	return dom.html();
}

/**
 * Replaces div code sample blocks with <pre><code class="language-whatever"></code></pre>
 * that retain proper spacing and can be converted by turndown into correctly exported fenced markdown blocks
 * @param {CheerioStatic} node 
 * @returns {CheerioStatic} modified html dom
 */
function fixCodeBlocks(node) {
	node('div[class="defaultnew syntaxhighlighter scroll-html-formatted-code"]').not('.programlisting')
 		.each(function (i, elem) {
			try {
				const domNode = node(elem);
				const origCode = domNode.text();
				const code = `<pre><code${sniffLanguage(domNode, origCode)}>${origCode.trim()}</code></pre>`.replace(/\t/g, '  ');
				// console.log(`Replacing div with pre-formatted tags: ${code}`);
				domNode.replaceWith(code);
			} catch (error) {
				console.error(`failed to replace in ${filepath}:`);
				console.error(error);
			}
		 });
	return node;
}

/**
 * Give the code sample divs from exported HTMl, attempts to sniff the language used based on the code title and contents
 * @param {Cheerio} codeDiv 
 */
function sniffLanguage(codeDiv, code) {
	let title = codeDiv.data('data-title');
	if (!title) {
		const titleDiv = codeDiv.prev('div.title');
		if (titleDiv) {
			title = titleDiv.text().trim();
		}
	}

	// Use title first (many times it may be a filename, so we can cheat and look for extensions)
	if (title) {
		if (title.endsWith('.cs')) {
			return ' class="language-csharp"';
		}
		if (title.endsWith('.css')) {
			return ' class="language-css"';
		}
		if (title.endsWith('.cpp')) {
			return ' class="language-cpp"';
		}
		if (title.endsWith('.h')) {
			return ' class="language-objc"';
		}
		if (title.endsWith('.hpp')) {
			return ' class="language-hpp"';
		}
		if (title.endsWith('.html')) {
			return ' class="language-html"';
		}
		if (title.endsWith('.java')) {
			return ' class="language-java"';
		}
		if (title.endsWith('.js'))
		{
			return ' class="language-javascript"';
		}
		if (title.endsWith('.json'))
		{
			return ' class="language-json"';
		}
		if (title.endsWith('.m')) {
			return ' class="language-objc"';
		}
		if (title.endsWith('.py')) {
			return ' class="language-python"';
		}
		if (title.endsWith('.rb') || title.includes('Podfile'))
		{
			return ' class="language-ruby"';
		}
		if (title.endsWith('.sh')) {
			return ' class="language-bash"';
		}
		if (title.endsWith('.swift')) {
			return ' class="language-swift"';
		}
		if (title.endsWith('.ts')) {
			return ' class="language-typescript"';
		}
		if (title.endsWith('.tss'))
		{
			return ''; // TSS isn't gonna be a supported language // TODO: Treat as json?
		}
		if (title.endsWith('.xml'))
		{
			return ' class="language-xml"';
		}
		if (title.endsWith('.yml')) {
			return ' class="language-yml"';
		}
		// console.log(`Unhandled title language? ${title}`);
	}

	// Look for comon JS keywords
	if (code.includes('var ') || code.includes('function ') || code.includes('const ') || code.includes('module.exports'))
	{
		return ' class="language-javascript"';
	}
	
	// sniff shell commands
	if (code.includes('sudo ') || code.includes('npm ') || code.includes('appc '))
	{
		return ' class="language-bash"';
	}

	// Sniff XML
	if (code.trim().startsWith('&lt;')) {
		return ' class="language-xml"';
	}

	// TODO: Assume json if starts with { and ends with } ?

	// If we have both a title and code to look at we should maybe make some assumptions about what's falling through here!
	// if (title) {
	// 	console.log(`Failed to sniff language for code with title: ${title}`);
	// 	console.log(code);
	// }
	return '';
}

/**
 * Entry from Table of Contents for the exported wiki contents
 * @typedef {Object} TOCEntry
 * @property {string} name - Unique name for the wiki page
 * @property {string} title - Display title for the wiki page
 * @property {TOCEntry[]} [items] - Array of children wiki page entries
 */

/**
 * Given an entry for a page in the table of contenst hierarchy, this will recursively iterate on all children (if any)
 * and then will conver this entry's exported HTML contents to an equivalent docsy-compatible markdown file.
 * The ultimate destination of the generated filepath is taken from  the hierarchical structure of the contents in the TOC.
 * @param {TOCEntry} entry the entry from the TOC (holding the name, title and possibly it's childen)
 * @param {number} index the index of the entry in it's parent's listing (used to specify weighting to retain same order in huge/docsy)
 * @param {string} outDirthe destination directory under which to place the generated markdown file
 * @param {Map<string, Page>} lookupTable lookup table from the unique entry name in the TOC to the Page metadat for that entry
 * @returns {Promise<void>}
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

	const modified = fixHTML(content, filepath);

	// Convert the html -> markdown prepend the frontmatter
	const frontmatter = {
		title: entry.title,
		weight: ((index + 1) * 10).toString() // Make the weight the (index + 1) * 10 as string
	};
	const thisDocPage = lookupTable.get(entry.name);
	if (!thisDocPage) {
		console.warn(`WAS UNABLE TO FIND PAGE METADATA ENTRY FOR ${entry.name}`);
	}

	const turndownService = new TurndownService({
		headingStyle: 'atx',
		codeBlockStyle: 'fenced'
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
				.replace(/\n+$/, '\n'); // replace trailing newlines with just a single one

			// TODO: also handle {{< case!
			if (content.includes('{{%')) {
				// do the slower approach to indenting. We need to NOT indent between the open/close of the shortcode!
				const start = content.indexOf('{{');
				const end = content.indexOf('{{% /');
				const middle = content.substring(start, end);

				// Apply dumb indenting to portion before "start" and after "end"
				const first = content.substring(0, start).replace(/\n/gm, '\n    '); // indent
				const last = content.substring(end).replace(/\n/gm, '\n    '); // indent
				content = first + middle + last;
			} else {
				content = content.replace(/\n/gm, '\n    '); // indent 
			}
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

	// Add special conversion of the warning/problem/info/hint
	// i.e. from https://wiki.appcelerator.org/display/guides2/Prerequisites
	// warnings should ideally show the warning emoji, be shown in a yellow-ish box or something
	// problems should show the red exclamation, have red background, (or maybe just this: https://www.docsy.dev/docs/adding-content/shortcodes/#alert)
	turndownService.addRule('warnings', {
		filter: node => node.nodeName === 'DIV' && node.classList.contains('information-macro'),
		replacement: (content, node) => {
			content = content.trim(); // trim the content!
			const hasNoicon = node.classList.contains('has-no-icon');
			
			// Extract teh title if there is one (we'll use a default below if not)
			let title;
			const firstChild = node.childNodes && node.childNodes[0];
			if (firstChild && firstChild.nodeName === 'DIV' && firstChild.className === 'title') {
				title = firstChild.textContent;
				// remove the leading **${title}** from content!
				content = content.substring(title.length + 4).trim();
			}
			
			let prefix = '';
			let color = 'info';
			// color can be 'primary', 'info', 'warning' or 'danger'. I think warning/danger are equivalent by default in our theme
			if (node.classList.contains('problem')) {
				prefix = '❗️ ';
				title = title || 'Warning';
				color = 'danger';
			} else if (node.classList.contains('warning')) {
				prefix = '⚠️ ';
				title = title || 'Warning';
				color = 'primary';
			} else if (node.classList.contains('hint')) {
				prefix = '💡 ';
				title = title || 'Hint';
			} else if (node.classList.contains('success')) {
				prefix = '✅ ';
				title = title || '';
				color = 'success';
			}
			if (hasNoicon) {
				prefix = '';
			}
			// FIXME: Can we have a nonexistent title (if no icon or title should be used)?
			return `{{% alert title="${prefix}${title}" color="${color}" %}}${content}{{% /alert %}}`;
		}
	});

	// TODO: Also handle div.panel. May have a child div.panelHeader; has div.panelContent child with contents
	// Currently displays a grey box (very slightly lighter header) with a rounded corner black border
	turndownService.addRule('panels', {
		filter: node => node.nodeName === 'DIV' && node.classList.contains('panel'),
		replacement: (content, node) => {
			content = content.trim();
			// Extract the title if there is one (we'll use a default below if not)
			let title;
			const firstChild = node.childNodes && node.childNodes[0];
			if (firstChild && firstChild.nodeName === 'DIV' && firstChild.className === 'title') {
				title = firstChild.textContent;
				// remove the leading **${title}** from content!
				content = content.substring(title.length + 4).trim();
			}
			if (title) {
				return `{{% alert title="${title}" color="info" %}}${content}{{% /alert %}}`;
			}
			return `{{% alert color="info" %}}${content}{{% /alert %}}`;
		}
	});

	turndownService.addRule('code sample titles', {
		filter: node => node.nodeName === 'DIV' && node.className === 'title',
		replacement: (content, node) => `**${content}**`
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
	console.log('Converting HTML pages to markdown...');
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
	const dom = guides.generateDOM(content);
	guides.fixLinks(dom, filepath);
	const modified = dom.html();

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
