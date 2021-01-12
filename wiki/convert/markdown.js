/*
 * Copyright (c) 2020-Present Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License.
 *
 * This takes a wiki export (zipfile unzipped and possible pre-processed)
 * and generates markdown files for use in Hugo/docsy "Docs as Code" site.
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');

const jsYaml = require('js-yaml');

const TurndownService = require('turndown');
const tables = require('turndown-plugin-gfm').tables;
const removeTrailingSpaces = require('remove-trailing-spaces');

const utils = require('./util');

// Regexp/Patterns used to match link styles to rewrite them to work in docsy!
const DUMB_PATTERN = /^(.+?)-section-(src-\d+(_(.+))?)$/; // group 1 is the page name, group 2 is the full anchor name

const HUGO_TARGET = 'hugo';
const VUEPRESS_TARGET = 'vuepress';

// Filtering for Vuepress
const relevantTopics = new Map([
	[ 'Titanium SDK', 'Titanium SDK' ],
	[ 'Alloy Framework', 'Alloy' ],
	[ 'Appcelerator CLI', 'Appcelerator CLI' ],
	[ 'Axway Appcelerator Studio', 'Axway Appcelerator Studio' ],
	// TODO: What about Dashboard? Appc Services? MBAAS?
]);

class Page {
	/**
	 * @param {string} docsyPath path to document in docsy wiki
	 * @param {Map<string, string>} [anchors=new Map()] mapping from confluence anchors/ids to docsy anchors/ids
	 * @param {boolean} [isParent=false] if this page is a parent (folder)
	 */
	constructor(docsyPath, anchors = new Map(), isParent = false) {
		this.docsyPath = docsyPath;
		this.anchors = anchors;
		this.isParent = isParent;
	}
}

/**
 * @param {string} html html source
 * @param {string} filepath path to html input file
 * @returns {string} modified html source
 */
function fixHTML(html, filepath) {
	let dom = utils.generateDOM(html);
	dom = utils.stripFooter(dom);
	dom = utils.addRedirects(dom, filepath);
	dom = utils.fixLinks(dom, filepath);
	dom = fixCodeBlocks(dom, filepath);
	dom = convertTT2Code(dom, filepath);
	return dom.html();
}

function convertTT2Code(node, filepath) {
	node('tt').each(function (i, elem) {
		try {
			const domNode = node(elem);
			const origCode = domNode.text();
			const code = `<code>${origCode.trim()}</code>`;
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
 * Replaces div code sample blocks with <pre><code class="language-whatever"></code></pre>
 * that retain proper spacing and can be converted by turndown into correctly exported fenced markdown blocks
 * @param {CheerioStatic} node parsed dom
 * @param {string} filepath path to source file
 * @returns {CheerioStatic} modified html dom
 */
function fixCodeBlocks(node, filepath) {
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
 * Give the code sample divs from exported HTML, attempts to sniff the language used based on the code title and contents
 * @param {Cheerio} codeDiv div element
 * @param {string} code the source code
 * @returns {string}
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
			return ' class="language-objectivec"';
		}
		if (title.endsWith('.hpp')) {
			return ' class="language-cpp"';
			// return ' class="language-hpp"'; // FIXME: Use for Hugo, but not vuepress
		}
		if (title.endsWith('.html')) {
			return ' class="language-html"';
		}
		if (title.endsWith('.java')) {
			return ' class="language-java"';
		}
		if (title.endsWith('.js')) {
			return ' class="language-javascript"';
		}
		if (title.endsWith('.json')) {
			return ' class="language-json"';
		}
		if (title.endsWith('.m')) {
			return ' class="language-objectivec"';
		}
		if (title.endsWith('.py')) {
			return ' class="language-python"';
		}
		if (title.endsWith('.rb') || title.includes('Podfile')) {
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
		if (title.endsWith('.tss')) {
			return ' class="language-javascript"'; // TSS isn't gonna be a supported language, but JS shoudl be close enough
		}
		if (title.endsWith('.xml')) {
			return ' class="language-xml"';
		}
		if (title.endsWith('.yml')) {
			return ' class="language-yml"';
		}
		if (title.endsWith('.jmk')) {
			return ' class="language-javascript"';
		}
		// console.log(`Unhandled title language? ${title}`);
	}

	// objective-c methods: line starting with '- (' or '+ (', i.e. '- (void)whatever {}' '+ (id)methodName:(id)arg {}'
	if (code.match(/^[-+]\s+\(/m) || code.includes('NSString') || code.includes('alloc]') || code.includes('autorelease]')) {
		return ' class="language-objectivec"';
	}

	// Look for comon JS keywords
	if (code.includes('var ') || code.includes('function ') || code.includes('const ') || code.includes('module.exports')) {
		return ' class="language-javascript"';
	}

	// Assume c++ if #import
	if (code.includes('#import ')) {
		return ' class="language-cpp"';
	}

	// sniff shell commands
	if (code.includes('sudo ') || code.includes('npm ') || code.includes('appc ')) {
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
 * @param {string} href The original URL we're converting
 * @param {Map<string, Page>} lookupTable The lookup table from entry names to wiki absolkute link/paths
 * @param {Page} thisDocPage the current page
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

	if (!pageName || pageName.startsWith('mailto:')) {
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
	let result = `${docPage.docsyPath}`; // FIXME: What the fuck is going on here, this is pointing to the input html file in my repo, not the docsy filepath!
	if (anchor) {
		result += `#${anchor}`;
	}
	return result;
}

class Converter {

	/**
	 * @param {object} program command line options
	 * @param {string} program.input inout directory
	 * @param {string} program.output output directory
	 * @param {string} [program.target='hugo'] target output project/style 'hugo' || 'vuepress'
	 */
	constructor(program) {
		this.inputDir = program.input;
		this.outputDir = program.output;
		this.target = program.target || HUGO_TARGET;
		this.imgMap = new Map();
	}

	async convert() {
		if (this.target === VUEPRESS_TARGET) {
			await this.generateSidebar();
		}

		await this.lookupTable(); // force it to generate our image mappings!

		await fs.ensureDir(this.outputDir);
		return Promise.all([
			this.convertHTMLFiles(),
			this.copyImages()
		]);
	}

	/**
	 * @param {TOCEntry} entry table of contents entry
	 * @param {Number} [indent=0] depth of recursion/entry
	 */
	printEntry(entry, indent = 0) {
		console.log(`${'  '.repeat(indent)}${entry.title}`);
		if (entry.items) {
			for (const item of entry.items) {
				this.printEntry(item, indent + 1);
			}
		}
	}

	async generateSidebar() {
		const sidebar = {};
		const toc = await this.tableOfContents();
		const lookupTable = await this.lookupTable(); // FiXME: Avoid using lookup table!
		for (const entry of toc) {
			if (relevantTopics.has(entry.title)) {
				// this.printEntry(entry);
				if (entry.items) { // top-level directory, so generate url path
					const value = this.gatherSidebarChildren(relevantTopics.get(entry.title), entry, lookupTable);
					// TODO: Merge each "Guide" subgrouping up into the top-level?
					sidebar[`/guide/${entry.name}/`] = value;
				}
			}
		}

		// FIXME: Arrange sidebar paths by length of key! Otherwise it won't properly match up
		sidebar['/guide/'] = [ '', 'Quick_Start' ];

		// TODO: Also generate Navbar?
		await fs.ensureDir(path.join(this.outputDir, 'docs/.vuepress'));
		const outFile = path.join(this.outputDir, 'docs/.vuepress/guide.json');
		return fs.writeJson(outFile, sidebar);
	}

	/**
	 * @param {string} prefix common root title prefix to strip from children (i.e. remoave Alloy from all the sub groupings)
	 * @param {TOCEntry} entry current entry (a parent)
	 * @param {Map<string, Page>} lookupTable blah
	 * @returns {Array}
	 */
	gatherSidebarChildren(prefix, entry, lookupTable) {
		return entry.items.map(value => this.sidebarEntry(prefix, value, lookupTable));
	}

	/**
	 * @param {string} prefix the common product prefix (to remove from titles)
	 * @param {TOCEntry} entry current entry
	 * @param {Map<string, Page>} lookupTable table from toc entry name to metadata (like generated path)
	 * @returns {string|object}
	 */
	sidebarEntry(prefix, entry, lookupTable) {
		let title = entry.title;
		// lop off the common prefix from the parent name/title (i.e. "Alloy ", "Appcelerator CLI ")
		if (title.startsWith(prefix)) {
			title = title.slice(prefix.length + 1);
		}
		let path = lookupTable.get(entry.name).docsyPath;
		if (entry.items) { // it's a grouping
			const obj = {
				title,
				path,
				children: this.gatherSidebarChildren(prefix, entry, lookupTable)
			};
			return obj;
		}
		// child is a single page
		// need path relative to top-level path, so we lop off the first two segments (because starts with '/', we split and drop 3)
		path = path.split('/').slice(3).join('/').slice(0, -1); // drop trailing slash
		if (title !== entry.title) {
			// Drop common prefix in page name. This would require returning [ path, entry.title ] instead of simple string
			return [ path, title ];
		}
		return path;
	}

	/**
	 * Lazily parse and return the toc.xml from the wiki export (cached)
	 * @returns {Promise<TOCEntry[]>} table of contents root entries
	 */
	async tableOfContents() {
		if (!this.toc) {
			this.toc = await utils.parseTOC(path.join(this.inputDir, 'toc.xml'));
		}
		return this.toc;
	}

	/**
	 * Lazily generate a Mapping from TOC entry names to metadata about the page (such as the output path)
	 * This will also record all references to images from the wiki. We then narrow the set of images to
	 * copy based on this, and if an image is referenced by only one page, we move it as a sibling of the page.
	 * @return  {Promise<Map<string, Page>>} lookup table from the unique entry name in the TOC to the Page metadata for that entry
	 */
	async lookupTable() {
		if (!this.pageMap) {
			this.pageMap = new Map();
			const toc = await this.tableOfContents();
			console.log('Building hierarchy and lookup tables...');
			await this.generateLookupTable(this.target === VUEPRESS_TARGET ? '/guide/' : '/docs/', toc);  // if pushing to axway-open-docs, should be '/docs/appc/'
		}
		return this.pageMap;
	}

	/**
	 * After building up teh TOC hierarchy and metadata about all the pages (we must pre-parse to generate an anchor link map)
	 * we then loop through all the entries and convert each HTML file to a markdown file
	 * @returns {Promise<void>}
	 */
	async convertHTMLFiles() {
		let toc = await this.tableOfContents();
		const lookupTable = await this.lookupTable();

		// filter Vuepress to only sections we care about
		if (this.target === VUEPRESS_TARGET) {
			toc = toc.filter(entry => !entry.items || relevantTopics.has(entry.title));
		}

		await fs.ensureDir(this.docsDir);
		console.log('Converting HTML pages to markdown...');
		return Promise.all(toc.map((entry, index) => this.handleEntry(entry, index, this.docsDir, lookupTable)));
	}

	/**
	 * @param {string} prefix prefix of generated file (based on TOC tree)
	 * @param {TOCEntry[]} entries table of contents entries
	 */
	async generateLookupTable(prefix, entries) {
		return Promise.all(entries.map(async entry => {
			const generatedPath = `${prefix}${entry.name}/`;
			const page = await this.generatePageMetadata(entry.name, generatedPath, entry.items && entry.items.length !== 0);
			this.pageMap.set(entry.name, page);
			if (entry.items) {
				// recurse inside items!
				return this.generateLookupTable(generatedPath, entry.items);
			}
		}));
	}

	/**
	 * Given an input page, this generates the metadat we need abotu the page:
	 * - the filepath it will live at in the docsy site
	 * - the mapping of confluence anchors to the docsy anchors
	 * @param {string} pageName page base filename
	 * @param {string} generatedPath the output path
	 * @param {boolean} isParent is this page a parent (does it have children pages?)
	 * @returns {Page}
	 */
	async generatePageMetadata(pageName, generatedPath, isParent) {
		const filepath = path.join(this.inputDir, `${pageName}.html`);
		const content = await fs.readFile(filepath, 'utf8');

		// FIXME: If we haven't manipulated the html already, we may not have the style of links we expect!
		// Can we avoid this extra work?
		const dom = utils.generateDOM(content);
		utils.fixLinks(dom, filepath);
		const modified = dom.html();

		const anchors = new Map();
		const page = new Page(generatedPath, anchors, isParent);
		// Can we grab the first div with class "content" and then find all h1/2/3/4/5 tags with class "heading" - and grab parent div's id value to match?
		const turndownService = new TurndownService();
		// TODO: Don't use turndown, go straight to JSDOM? Because we don't actually want to convert anything
		turndownService.addRule('log anchors', {
			filter: node => {
				if ([ 'H1', 'H2', 'H3', 'H4', 'H5' ].includes(node.nodeName) && node.classList.contains('heading')) {
					const parent = node.parentElement;
					// Record mapping of ids generated by Confluence versus ids auto-generated by Docsy
					if (parent.nodeName === 'DIV' && parent.getAttribute('id')) {
						const legacyId = parent.getAttribute('id');
						const generatedId = node.textContent.toLowerCase().replace(/\s/g, '-').replace(/[()]/g, '');
						anchors.set(legacyId, generatedId);
					}
				}
				return false;
			},
			replacement: text => text
		});
		// Record all the image references so we can cull down the images to only those referenced
		// and soe we can copy/move images to live alongside their referring page (if they're the only reference!)
		turndownService.addRule('images', {
			filter: node => {
				if (node.nodeName === 'IMG') {
					const src = node.getAttribute('src') || '';
					if (src.startsWith('images/')) {
						// Record the image reference!
						const value = this.imgMap.get(src) || new Set();
						value.add(page);
						this.imgMap.set(src, value);
					}
				}
				return false;
			},
			replacement: text => text
		});
		turndownService.turndown(modified);
		return page;
	}

	/**
	 * Given an entry for a page in the table of contenst hierarchy, this will recursively iterate on all children (if any)
	 * and then will conver this entry's exported HTML contents to an equivalent docsy-compatible markdown file.
	 * The ultimate destination of the generated filepath is taken from  the hierarchical structure of the contents in the TOC.
	 * @param {TOCEntry} entry the entry from the TOC (holding the name, title and possibly it's childen)
	 * @param {number} index the index of the entry in it's parent's listing (used to specify weighting to retain same order in huge/docsy)
	 * @param {string} outDir the destination directory under which to place the generated markdown file
	 * @param {Map<string, Page>} lookupTable lookup table from the unique entry name in the TOC to the Page metadata for that entry
	 * @returns {Promise<void>}
	 */
	async handleEntry(entry, index, outDir, lookupTable) {
		// TODO: do filtering for vuepress to not go into the sections we don't want!
		let outputName;
		// if the entry has 'items' property, it's a parent! Need to recurse, and change filename to _index
		if (entry.items) {
			outDir = path.join(outDir, entry.name);
			outputName = this.target === HUGO_TARGET ? '_index.md' : 'README.md';
			await fs.ensureDir(outDir);
			// recurse
			await Promise.all(entry.items.map((child, childIndex) => this.handleEntry(child, childIndex, outDir, lookupTable)));
		} else if (entry.name === 'Home') { // Treat top-level 'Home' page as index for all appc content
			outputName = this.target === HUGO_TARGET ? '_index.md' : 'README.md';
		} else {
			outputName = `${entry.name}.md`;
		}
		const filepath = path.join(this.inputDir, `${entry.name}.html`);
		const content = await fs.readFile(filepath, 'utf8');

		const modified = fixHTML(content, filepath);

		// Convert the html -> markdown prepend the frontmatter
		const frontmatter = {
			title: entry.title,
			weight: ((index + 1) * 10).toString() // Make the weight the (index + 1) * 10 as string
		};
		if (this.target === HUGO_TARGET && outputName === '_index.md') {
			// add no_list: true to frontmatter to avoid re-listing children pages!
			frontmatter.no_list = true;
		}
		const thisDocPage = lookupTable.get(entry.name);
		if (!thisDocPage) {
			console.warn(`WAS UNABLE TO FIND PAGE METADATA ENTRY FOR ${entry.name}`);
		}

		const turndownService = new TurndownService({
			headingStyle: 'atx',
			codeBlockStyle: 'fenced'
		});
		const escapes = [
			[ /\\/g, '\\\\' ],
			[ /\*/g, '\\*' ],
			[ /^-/g, '\\-' ],
			[ /^\+ /g, '\\+ ' ],
			[ /^(=+)/g, '\\$1' ],
			[ /^(#{1,6}) /g, '\\$1 ' ],
			[ /`/g, '\\`' ],
			[ /^~~~/g, '\\~~~' ],
			[ /\[/g, '\\[' ],
			[ /\]/g, '\\]' ],
			[ /^>/g, '\\>' ],
			[ /_/g, '\\_' ],
			[ /^(\d+)\. /g, '$1\\. ' ],
			[ /&lt;/g, '&amp;lt;' ] // Added by cwilliams - to escape < in non-code
		];
		// Double escape &lt; and &gt; so it doesn't get converted to < and > by turndown
		// See https://appc-open-docs.netlify.app/docs/appcelerator_cli/appcelerator_cli_how-tos/appcelerator_command-line_interface_reference/
		turndownService.escape = function (string) {
			return escapes.reduce((accumulator, escape) => accumulator.replace(escape[0], escape[1]), string);
		};
		// Skip the title since we put that in frontmatter
		// FIXME: What if they don't match? Use the actual title tag value in preference? What does entry.title become? 'linkTitle'?
		turndownService.remove([ 'head', 'title' ]);

		// Most wiki pages have a header with the page title at the top of the content
		// We should strip that (it ends up being duplicated)
		if (this.target === HUGO_TARGET) {
			turndownService.addRule('duplicate header', {
				filter: node => node.nodeName === 'H1' && node.textContent === entry.title,
				replacement: () => ''
			});
		}

		// TODO: Additionally the initial content/paragraph may make sense as the description in the frontmatter?

		// Convert the export HTML links to intra-docsy links if we can
		turndownService.addRule('links', {
			filter: function (node, options) {
				return (
					options.linkStyle === 'inlined'
					&& node.nodeName === 'A'
					&& node.getAttribute('href')
				);
			},
			replacement: function (content, node) {
				let href = node.getAttribute('href');
				if (href.startsWith('#!/guide/')) {
					href = wikiLinkToMarkdown(href, lookupTable, thisDocPage);
				}
				const title = node.title ? ' "' + node.title + '"' : '';
				return '[' + content + '](' + href + title + ')';
			}
		});

		// Convert images to point at correct place!
		// images/download/attachments/30083145/TabbedApplicationMain.png
		// -> /images/download/attachments/30083145/TabbedApplicationMain.png
		turndownService.addRule('images', {
			filter: 'img',
			replacement: (content, node) => {
				let alt = node.alt || '';
				let src = node.getAttribute('src') || '';
				if (alt && src === alt) {
					// the alt text is literally just the path to the image.
					// Best we can do here is strip it to the base filename without the extension, I suppose.
					alt = path.basename(alt, path.extname(alt));
				}
				if (src.startsWith('images/')) {
					// if this is the only reference to this image, make relative!
					if (this.imgMap.get(src).size === 1 && !src.endsWith('.bmp')) { // not bitmaps!
						src = `./${path.basename(src)}`;
					} else {
						src = (this.target === VUEPRESS_TARGET ? '/images/guide' : '/images') + src.substring(6); // 'images/...' -> '/images/...'  // if pushing to axway-open-docs, should be '/Images/appc'
					}
					src = decodeURIComponent(src); // unescape things like %2C for ','; %20 for ' '
					// If ends in JPG/PNG (uppercase) make lowercase
					if (src.endsWith('.PNG')) {
						src = src.slice(0, -3) + 'png';
					} else if (src.endsWith('.JPG')) {
						src = src.slice(0, -3) + 'jpg';
					} else if (src.endsWith('.dat')) {
						// .dat file is actually a png found in 8.3.0.GA release notes page
						src = src.slice(0, -3) + 'png';
					}
				}
				const title = node.title || '';
				const titlePart = title ? ' "' + title + '"' : '';
				return src ? `![${alt}](${src}${titlePart})` : '';
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

		// But we have lots of newline/whitespace embedded inside, so we collapse that...
		turndownService.addRule('collapse td', {
			filter: node => node.nodeName === 'TD',
			replacement: (content, node) => cell(content.trim(), node)
		});

		// Then we basically re-implement writing td cells
		// Here we need to turn newlines back into <br /> tags so that the table doesn't break
		function cell (content, node) {
			const index = Array.prototype.indexOf.call(node.parentNode.childNodes, node);
			let prefix = ' ';
			if (index === 0) {
				prefix = '| ';
			}
			return prefix + content.replace(/\n/g, '<br />') + ' |';
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

				// Extract the title if there is one (we'll use a default below if not)
				let title;
				const firstChild = node.childNodes && node.childNodes[0];
				if (firstChild && firstChild.nodeName === 'DIV' && firstChild.className === 'title') {
					title = firstChild.textContent;
					// remove the leading **${title}** from content!
					content = content.substring(title.length + 4).trim();
				}

				let prefix = '';
				let color = 'info';
				let macro = 'tip'; // for Vuepress
				// color can be 'primary', 'info', 'warning' or 'danger'. I think warning/danger are equivalent by default in our theme
				if (node.classList.contains('problem')) {
					prefix = '❗️ ';
					title = title || 'Warning';
					color = 'danger';
					macro = 'danger';
				} else if (node.classList.contains('warning')) {
					prefix = '⚠️ ';
					title = title || 'Warning';
					color = 'primary';
					macro = 'warning';
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
				if (this.target === VUEPRESS_TARGET) {
					return `::: ${macro} ${prefix}${title}\n${content}\n:::\n`;
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
					if (this.target === VUEPRESS_TARGET) {
						return `::: tip ${title}\n${content}\n:::\n`;
					}
					return `{{% alert title="${title}" color="info" %}}${content}{{% /alert %}}`;
				}
				if (this.target === VUEPRESS_TARGET) {
					return `::: tip\n${content}\n:::\n`;
				}
				return `{{% alert color="info" %}}${content}{{% /alert %}}`;
			}
		});

		turndownService.addRule('code sample titles', {
			filter: node => node.nodeName === 'DIV' && node.className === 'title',
			replacement: (content, _node) => `**${content}**`
		});

		turndownService.addRule('tt as inline code', {
			filter: node => node.nodeName === 'TT',
			replacement: (content, _node) => '`' + content + '`'
		});

		turndownService.addRule('strip in-page TOC', {
			// NOTE: The class is 'toc-indentation ' with the trailing space, feels better to just match this way instead...
			filter: node => node.nodeName === 'UL' && node.classList.contains('toc-indentation'),
			replacement: () => ''
		});

		const markdown = turndownService.turndown(modified);
		// Use YAML frontmatter! It's supported by Hugo/Docsy *and* Vuepress
		const converted = `---\n${jsYaml.dump(frontmatter)}---\n${markdown}\n`;
		// Next we remove trailing spaces on lines and then merge multiple blank newlines into a single one
		return fs.writeFile(path.join(outDir, outputName), removeTrailingSpaces(converted).replace(/(\n){3,}/gm, '\n\n'));
	}

	get imagesDir() {
		return path.join(this.outputDir, this.target === HUGO_TARGET
			? 'static/images' : 'docs/.vuepress/public/images/guide');
	}

	get docsDir() {
		return path.join(this.outputDir, this.target === HUGO_TARGET
			? 'content/en/docs' : 'docs/guide'); // if pushing to axway-open-docs, should be 'content/en/docs/appc'
	}

	/**
	 * Copy the images over to where we'd expect: htmlguides/images -> outputDir/static/images (hugo) or 'docs/.vuepress/public/images' (vuepress)
	 *
	 * NOTE: this now uses the imgMap mapping to narrow the set of images copied to only those referenced. We also will copy an image
	 * to be a sibling of the only page referencing it if there's only one reference.
	 * @returns {Promise<void>}
	 */
	async copyImages() {
		const copies = [];
		const docsDirPrefix = this.docsDir.split('/').slice(0, -1).join('/'); // drop duplicate leading 'guide' segment already in page paths
		for (const [ imgPath, referencesSet ] of this.imgMap) {
			copies.push(this.copyImage(imgPath, referencesSet, docsDirPrefix));
		}
		return Promise.all(copies);
	}

	/**
	 * async copy a single image
	 * @param {string} imgPath the img src path
	 * @param {Set<string>} referencesSet the Set of page paths that reference it
	 * @param {string} docsDirPrefix the folder containing the generated markdown files
	 */
	async copyImage(imgPath, referencesSet, docsDirPrefix) {
		// TODO: Filter references to not include sections we don't care about for Vuepress!
		const decoded = decodeURIComponent(imgPath);
		// if decoded ends in PNG or JPG, fix to lowercase (Vuepress doesn't like caps extensions)
		let destImage = decoded;
		if (destImage.endsWith('.PNG')) {
			destImage = destImage.slice(0, -3) + 'png';
		} else if (destImage.endsWith('.JPG')) {
			destImage = destImage.slice(0, -3) + 'jpg';
		} else if (destImage.endsWith('.dat')) { // handle special case .dat file which is really a png
			destImage = destImage.slice(0, -3) + 'png';
		}
		// copy images with single reference to live side-by-side with page
		if (referencesSet.size === 1 && !destImage.endsWith('.bmp')) { // But not bitmap! Vuepress can't handle that!
			const page = referencesSet.values().next().value;
			// Strip last page path segment, we want it to live next to the page, not in a folder whose name matches the page
			let outDir = page.docsyPath;
			if (!page.isParent) {
				outDir = path.dirname(outDir);
			}
			const dir = path.join(docsDirPrefix, outDir);
			await fs.ensureDir(dir);
			return fs.copy(path.join(this.inputDir, decoded), path.join(dir, path.basename(destImage)), { overwrite: false });
		}
		// Referenced by 2+ pages, so stick in as "static" image asset
		return fs.copy(path.join(this.inputDir, decoded), path.join(this.imagesDir, ...destImage.split('/').slice(1))); // Drop first segment
	}
}

if (require.main === module) {
	/**
	 * @returns {Promise<void>}
	 */
	async function main() {
		const program = require('commander');
		program
			.option('-i, --input <dir>', 'Path to unzipped wiki html export directory', path.join(__dirname, '../htmlguides'))
			.option('-o, --output <dir>', 'Path to directory to place final files', path.join(__dirname, '../../build/guides'))
			.option('-t, --target <vuepressOrHugo>', 'Whether to target Vuepress or Hugo markdown', /hugo|vuepress/, HUGO_TARGET)
			.parse(process.argv);

		return new Converter(program).convert();
	}

	main().then(() => process.exit(0)).catch(err => {
		console.error(err);
		process.exit(1);
	});
}
