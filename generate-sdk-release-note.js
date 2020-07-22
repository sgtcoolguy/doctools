/**
 * This script grabs a single wiki page, manipulates it, and generates the release note file.
 * It expects a singe argument with the SDK version number
 */
const path = require('path');
const fs = require('fs-extra');
const manipulateHTMLContent = require('./wiki/convert/util').manipulateHTMLContent;
const massageNoteHTML = require('./release-notes').massageNoteHTML;
const exportPage = require('wiki-export').exportPage;

/**
 * @param {string} version version number, i.e. '8.3.1.GA'
 * @return {Promise<string>} final output filepath
 */
async function generateSDKReleaseNote(version) {
	const pageTitle = `Titanium SDK ${version} Release Note`;
	// write it to place where the wiki exports go...
	const htmlFile = path.join(__dirname, `wiki/htmlguides/${pageTitle}.html`);
	// TODO: modify wiki-export to not need to have it write to file and then have us read it back in!
	await exportPage(pageTitle, htmlFile);
	const html = await fs.readFile(htmlFile, 'utf8');
	const transformed = await manipulateHTMLContent(html);
	// now we should have it minified and cleaned up some...
	const finalContents = massageNoteHTML(transformed); // this should then do the exported wiki content -> release note html conversion
	// write to release-notes
	const outFile = path.resolve(__dirname, `release-notes/${version}.html`);
	await fs.writeFile(outFile, finalContents);
	// TODO: Can we format the html pretty first?
	return outFile;
}

if (require.main === module) {
	if (process.argv.length !== 3) {
		console.error('This script expects a single argument specifying the Titanium SDK version whose wiki page we\'ll generate release notes for. i.e. \'8.3.1.GA\', or \'9.0.0.RC\'');
		process.exit(1);
	}
	// TODO: do some validation of the version passed in!
	generateSDKReleaseNote(process.argv.slice(2)).then(outputFile => {
		console.log(`Release note generated at: ${outputFile}`);
		return process.exit(0);
	}
	).catch(err => {
		console.error(err);
		process.exit(1);
	});
}
