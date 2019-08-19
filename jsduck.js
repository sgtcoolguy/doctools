const path = require('path');
const util = require('util');
const yuicompressor = require('yuicompressor');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
// const spawn = util.promisify(child_process.spawn);
const fs = require('fs-extra');
const crypto = require('crypto');
const os = require('os');

const ROOT_DIR = __dirname;
const NEWLINE_PATTERN = /\r?\n/;

const CSS_SECTION_PATTERN = /<!-- BEGIN CSS -->.*<!-- END CSS -->/s;
const STYLESHEET_LINK_PATTERN = /<link rel="stylesheet" href="(.*?)"/;

const JS_SECTION_PATTERN = /<!-- BEGIN JS -->.*<!-- END JS -->/s;
const SCRIPT_LINK_PATTERN = /<script .* src="(.*)"(\s*\/)?>/;
const SCRIPT_BLOCK_PATTERN = /<script .*>(.*)<\/script>/;

async function compileSass() {
	// TODO Use an npm package to compile the scss files!
	console.log('Compiling SASS...');
	await exec('bundle exec compass compile ./template/resources/sass', { cwd: ROOT_DIR });
	console.log('Compiled SASS');
}

// Just get away with a customized subset of EXTJS 4.1.1a GPL -
// extjs/ext-all.js, extjs/resources/themes/images/default, extjs/resources/css
// We have extjs-assets.zip now we could check in and use!
async function setupEXTJS() {
	await fs.remove(path.join(ROOT_DIR, 'template/extjs'));
	await exec('unzip -qq template/extjs-assets.zip -d template/', { cwd: ROOT_DIR }); // unzip it
	console.log('Set up EXTJS!');
}

async function setupSencha() {
	console.log('Unzipping sencha...');
	await fs.remove(path.join(ROOT_DIR, 'sencha'));
	const platform = os.platform();
	const exists = fs.exists(path.join(ROOT_DIR, `sencha-${platform}.zip`));
	if (!exists) {
		throw new Error(`We do not have a copy of the sencha command binaries/scripts for ${platform} yet!`);
	}
	await exec(`unzip ./sencha-${platform}.zip -d .`, { cwd: ROOT_DIR });
	console.log('Set up Sencha!');
}

async function senchaBuild() {
	console.log('Running Sencha build on EXTJS app...');
	await exec('node ./sencha/sencha.js build -p template-min/app.jsb3 -d template-min', { cwd: ROOT_DIR });
	console.log('Cleaning up template-min dir...');
	await fs.remove(path.join(ROOT_DIR, 'template-min/app.js'));
	await Promise.all([
		fs.remove(path.join(ROOT_DIR, 'template-min/app.jsb3')),
		fs.remove(path.join(ROOT_DIR, 'template-min/all-classes.js')),
		// Remove the entire app/ dir
		fs.remove(path.join(ROOT_DIR, 'template-min/app')),
		fs.move(path.join(ROOT_DIR, 'template-min/app-all.js'), path.join(ROOT_DIR, 'template-min/app.js')),
	]);

	// // FIXME: Something is not right here. Sencha's build does more than just concatenate!
	// console.log('Running equivalent of sencha build command on JSB3 file...');
	// const json = await fs.readJson(path.join(ROOT_DIR, 'template/app.jsb3'));
	// const js = [];
	// await Promise.all(json.builds[0].files.map(async fileObj => {
	// 	const filename = path.join(ROOT_DIR, 'template', fileObj.path + fileObj.name);
	// 	const content = await fs.readFile(filename, 'utf8');
	// 	js.push(content);
	// }));
	// const appJSContent = await fs.readFile(path.join(ROOT_DIR, 'template/app.js'));
	// // TODO: Minify the file? We do it later, so probably a waste to do it now?
	// await fs.writeFile(path.join(ROOT_DIR, 'template-min/app.js'), js.join('\n') + '\n' + appJSContent);
	// return Promise.all([
	// 	fs.remove(path.join(ROOT_DIR, 'template-min/app.jsb3')),
	// 	// Remove the entire app/ dir
	// 	fs.remove(path.join(ROOT_DIR, 'template-min/app')),
	// ]);
}

async function minifyTemplate() {
	// Minify the template!
	await fs.remove(path.join(ROOT_DIR, 'template-min'));
	await fs.copy(path.join(ROOT_DIR, 'template'), path.join(ROOT_DIR, 'template-min'));

	await senchaBuild();

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
		fs.remove(path.join(ROOT_DIR, 'template-min/app.js')),
		fs.remove(path.join(ROOT_DIR, 'template-min/extjs-assets.zip')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/css/docs-ext.css')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/css/viewport.css')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/sass')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/codemirror')),
		fs.remove(path.join(ROOT_DIR, 'template-min/resources/.sass-cache')),
		fs.remove(path.join(ROOT_DIR, 'template-min/extjs/resources/css')),
	]);
	// Restore ext-all.css
	await fs.copy(path.join(ROOT_DIR, 'template/extjs/resources/css/ext-all.css'), path.join(ROOT_DIR, 'template-min/extjs/resources/css/ext-all.css'));
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
	const match = html.match(CSS_SECTION_PATTERN)[0];
	// enforce we retain order
	// FIXME: Instead of retaining order, sort by original asset filename?
	// That way if we have the same set of assets we'll always return same result!
	const css = (await Promise.all(match.split(NEWLINE_PATTERN).map(async line => {
		const fileMatch = line.match(STYLESHEET_LINK_PATTERN);
		if (fileMatch) {
			const file = fileMatch[1];
			return fs.readFile(path.join(dir, file));
		}
		return undefined;
	}))).filter(val => val);

	const minified = await yuiCompress(css.join('\n'), 'css');
	const hash = await md5Hash(minified);
	const filename = path.join(dir, `resources/css/app-${hash}.css`);
	await fs.writeFile(filename, minified);

	return html.replace(CSS_SECTION_PATTERN, `<link rel="stylesheet" href="resources/css/${path.basename(filename)}" type="text/css" />`);
}

async function yuiCompress(string, type) {
	// TODO: Instead of using npm package, use the version inside the sencha zip?
	return new Promise((resolve, reject) => {
		yuicompressor.compressString(string, { type }, (err, data, extra) => {
			if (err) {
				return reject(err);
			}
			resolve(data);
		});
	});
}

async function md5Hash(contents) {
	const shasum = crypto.createHash('md5');
	shasum.update(contents);
	return shasum.digest('hex');
}

// Same thing for JavaScript, result is written to: app.js
async function combineJS(html, dir) {
	const match = html.match(JS_SECTION_PATTERN)[0];
	// enforce we retain order
	// FIXME: Instead of retaining order, sort by original asset filename?
	// That way if we have the same set of assets we'll always return same result!
	const js = (await Promise.all(
		match.split(NEWLINE_PATTERN).map(async line => {
			const fileMatch = line.match(SCRIPT_LINK_PATTERN);
			if (fileMatch) {
				const file = fileMatch[1];
				return await fs.readFile(path.join(dir, file));
			}
			const scriptMatch = line.match(SCRIPT_BLOCK_PATTERN);
			if (scriptMatch) {
				return scriptMatch[1];
			}
			return undefined;
		})
	)).filter(val => val);

	const minified = await yuiCompress(js.join('\n'), 'js');
	const hash = await md5Hash(minified);
	const filename = path.join(dir, `app-${hash}.js`);
	await fs.writeFile(filename, minified);
	return html.replace(JS_SECTION_PATTERN, `<script type="text/javascript" src="${path.basename(filename)}"></script>`);
}

async function runJSDuck(outputDir, additionalDirs) {
	// Create output dir tree
	fs.ensureDir(path.join(ROOT_DIR, outputDir));
	// Build docs
	return exec(`bundle exec jsduck --template ./template-min --seo --output ${outputDir} --title 'Appcelerator Platform - Appcelerator Docs' --config ./jsduck.config ${additionalDirs.join(' ')}`, { cwd: ROOT_DIR });
}

async function removeUnusedGeneratedAssets(outputDir) {
	const guidesDir = path.join(ROOT_DIR, outputDir, 'guides');
	const dirs = await fs.readdir(guidesDir);
	// Delete all the unused icon.png/README.html files in the guides
	return Promise.all(dirs.map(async d => {
		return Promise.all([
			fs.remove(path.join(guidesDir, d, 'icon.png')),
			fs.remove(path.join(guidesDir, d, 'README.html')),
		]);
	}));
}

async function main(outputDir, ...additionalDirs) {
	// Do some sanity checks on necessary input files
	if (!(await fs.exists(path.join(ROOT_DIR, 'build/guides/guides.json')))) {
		throw new Error(`JSDuck requires that build/guides/guides.json has already been generated from a Wiki export`);
	}
	if (!(await fs.exists(path.join(ROOT_DIR, 'build/titanium.js')))) {
		throw new Error(`JSDuck requires that build/titanium.js has already been generated from Titanium Mobile SDK and/or Windows SDK and modules.`);
	}
	await Promise.all([
		setupEXTJS(),
		setupSencha(),
	]);
	await compileSass(); // Do we need EXTJS first to compile the scss files?
	await minifyTemplate();
	await runJSDuck(outputDir, additionalDirs);
	return removeUnusedGeneratedAssets(outputDir);
}

if (process.argv.length < 4) {
	console.error('This script must be run with at least one output directory argument, and optionally extra paths to use for inputs');
	process.exit(1);
}

main(process.argv[2], process.argv.slice(3)).then(() => {
	process.exit(0);
}).catch(err => {
	console.error(err);
	process.exit(1);
});
