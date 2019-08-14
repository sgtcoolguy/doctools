const path = require('path');
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
// const spawn = util.promisify(child_process.spawn);
const fs = require('fs-extra');
const crypto = require('crypto');

const ROOT_DIR = __dirname;
const NEWLINE_PATTERN = /\r?\n/;

const CSS_SECTION_PATTERN = /<!-- BEGIN CSS -->.*<!-- END CSS -->/s;
const STYLESHEET_LINK_PATTERN = /<link rel="stylesheet" href="(.*?)"/;

const JS_SECTION_PATTERN = /<!-- BEGIN JS -->.*<!-- END JS -->/s;
const SCRIPT_LINK_PATTERN = /<script .* src="(.*)">/;
const SCRIPT_BLOCK_PATTERN = /<script .*>(.*)<\/script>/;

async function compileSass() {
	console.log('Compiling SASS...');
	await exec('bundle exec compass compile ./template/resources/sass', { cwd: ROOT_DIR });
	console.log('Compiled SASS');
}

// Just get away with a customized subset of EXTJS 4.1.1a GPL -
// extjs/ext-all.js, extjs/resources/themes/images/default, extjs/resources/css
// We have extjs-assets.zip now we could check in and use!
async function grabExtJs() {
	await fs.remove(path.join(ROOT_DIR, 'template/extjs'));
	await exec('unzip -qq template/extjs-assets.zip -d template/', { cwd: ROOT_DIR }); // unzip it
	console.log('Set up EXTJS!');
}

async function minifyTemplate() {
	// Minify the template!
	await fs.remove(path.join(ROOT_DIR, 'template-min'));
	await fs.copy(path.join(ROOT_DIR, 'template'), path.join(ROOT_DIR, 'template-min'));

	// Concatenate files listed in JSB3 file
	// FIXME: Rewrite this logic in Node.JS!
	// Basically need to read in app.jsb3 as JSON, builds[0].files -> take path + name
	console.log('Running sencha command on JSB3 file...');
	await exec('./sencha/sencha build -p ./template/app.jsb3 -d ./template-min', { cwd: ROOT_DIR });

	console.log('Cleaning up template-min dir...');
	await fs.remove(path.join(ROOT_DIR, 'template-min/app.js')),
	await Promise.all([
		// Remove intermediate build files
		fs.remove(path.join(ROOT_DIR, 'template-min/app.jsb3')),
		fs.remove(path.join(ROOT_DIR, 'template-min/all-classes.js')),
		// Replace app.js with app-all.js
		fs.move(path.join(ROOT_DIR, 'template-min/app-all.js'), path.join(ROOT_DIR, 'template-min/app.js')),
		// Remove the entire app/ dir
		fs.remove(path.join(ROOT_DIR, 'template-min/app')),
	]);

	console.log('Rewriting CSS links in template files...');
	// FIXME: These both clobber one another because they're dealing with same concatenated filename app.css
	// await Promise.all([
	// 	rewriteCSSLinks(path.join(ROOT_DIR, 'template-min/print-template.html')),
	// 	rewriteCSSLinks(path.join(ROOT_DIR, 'template-min/index-template.html')),
	// ]);
	await rewriteCSSLinks(path.join(ROOT_DIR, 'template-min/print-template.html'));
	await rewriteCSSLinks(path.join(ROOT_DIR, 'template-min/index-template.html'));

	console.log('Concatenating CSS/JS in template.html...');
	// Concatenate CSS and JS files referenced in template.html file
	await concatenateCSSAndJS(path.join(ROOT_DIR, 'template-min/template.html'));

	// Clean up SASS files
	// (But keep prettify lib, which is needed for source files)
	console.log('Removing unused resources in minified templated...');
	await Promise.all([
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/css/docs-ext.css')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/css/viewport.css')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/sass')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/codemirror')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/.sass-cache')),
		fs.remove(path.join(ROOT_DIR, 'template-min/extjs/resources/css')),
	]);

	// Empty the extjs dir, leave only the main JS file and images
	// await fs.emptyDir(path.join(ROOT_DIR, 'template-min/extjs'));
	// await fs.copy(path.join(ROOT_DIR, 'template/extjs/ext-all.js'), path.join(ROOT_DIR, 'template-min/extjs/ext-all.js'));
	// await fs.ensureDir(path.join(ROOT_DIR, 'template-min/extjs/resources/themes/images'));
	// return fs.copy(path.join(ROOT_DIR, 'template/extjs/resources/themes/images/default'), path.join(ROOT_DIR, 'template-min/extjs/resources/themes/images'));
}

async function rewriteCSSLinks(filePath) {
	const dir = path.dirname(filePath);
	let html = await fs.readFile(filePath, 'utf8');
	html = await combineCSS(html, dir);
	return fs.writeFile(filePath, html);
}

async function concatenateCSSAndJS(templateHTMLPath) {
	let html = await fs.readFile(templateHTMLPath, 'utf8');
	const dir = path.dirname(templateHTMLPath);
	html = await combineCSS(html, dir);
	html = await combineJS(html, dir);
	return fs.writeFile(templateHTMLPath, html);
}

// Reads in all CSS files referenced between BEGIN CSS and END CSS markers.
// Deletes those input CSS files and writes out concatenated CSS to
// resources/css/app.css
// Finally replaces the CSS section with <link> to that one CSS file.
async function combineCSS(html, dir) {
	const css = [];
	const match = html.match(CSS_SECTION_PATTERN)[0];
	await Promise.all(match.split(NEWLINE_PATTERN).map(async line => {
		const fileMatch = line.match(STYLESHEET_LINK_PATTERN);
		if (fileMatch) {
			const file = fileMatch[1];
			const content = await fs.readFile(path.join(dir, file));
			css.push(content);
		}
	}));
	let filename = path.join(dir, 'resources/css/app.css');
	await fs.writeFile(filename, css.join('\n'));
	await yuiCompress(filename);
	filename = await md5Rename(filename);

	return html.replace(CSS_SECTION_PATTERN, `<link rel="stylesheet" href="resources/css/${path.basename(filename)}" type="text/css" />`);
}

async function yuiCompress(filepath) {
	// no-op for now
}

// read in contents, generate md5 hash, change basename to basename-hash.extension
async function md5Rename(filename) {
	return new Promise(resolve => {
		const shasum = crypto.createHash('md5');
		const stream = fs.ReadStream(filename);
		stream.on('data', d => shasum.update(d));
		stream.on('end', () => {
			const hash = shasum.digest('hex');
			const extension = path.extname(filename);
			const hashedName = path.join(path.dirname(filename), `${path.basename(filename, extension)}-${hash}${extension}`);
			fs.renameSync(filename, hashedName);
			resolve(hashedName);
		});
	});
}

// Same thing for JavaScript, result is written to: app.js
async function combineJS(html, dir) {
	const js = [];
	console.log(`trying to find JS tags in ${html}`);
	const match = html.match(JS_SECTION_PATTERN)[0];
	await Promise.all(
		match.split(NEWLINE_PATTERN).map(async line => {
		const fileMatch = line.match(SCRIPT_LINK_PATTERN);
		if (fileMatch) {
			const file = fileMatch[1];
			const content = await fs.readFile(path.join(dir, file));
			js.push(content);
			return;
		}
		const scriptMatch = line.match(SCRIPT_BLOCK_PATTERN);
		if (scriptMatch) {
			js.push(scriptMatch[1]);
		}
		})
	);

	let filename = path.join(dir, 'app.js');
	await fs.writeFile(filename, js.join('\n'));
	await yuiCompress(filename);
	filename = await md5Rename(filename);
	return html.replace(JS_SECTION_PATTERN, `<script type="text/javascript" src="${path.basename(filename)}"></script>`);
}

async function main() {
	await grabExtJs();
	await compileSass();
	return minifyTemplate();
}

main().then(() => {
	process.exit(0);
}).catch(err => {
	console.error(err);
	process.exit(1);
});
