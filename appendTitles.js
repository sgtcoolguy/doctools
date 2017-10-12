/*
	Purpose: Add a title element with title content derived from the first h1 element for the SDK release notes (HTML version)
	See ???? for more details
*/
var fs = require('fs');
var shell = require('shelljs');
var cheerio = require('cheerio');
var fileNames = shell.ls('../appc_web_docs/platform/release-notes/*.html'); // get an array of all files that end with .html in the ../appc_web_docs/platform/release-notes/ directory. This assumes the script is being executed from the ../doctools directory.

console.log('Adding title elements to SDK HTML version of the release note');

fileNames.map(function(doc,index) {
	if (doc != '../appc_web_docs/platform/release-notes/latest.html') { // Skip the latest.html file
		$ = cheerio.load(fs.readFileSync(doc).toString()); // add jquery-like features
		if ($('title').length < 1) { // check to see if document has a title element
			var shortTitle = ($('h1').text().slice(0,$('h1').text().indexOf(' - '))); // derive the title text from the first h1 element in document. It should look something like this: 'Titanium SDK 6.2.2.GA'
			console.log('No title found in ' + doc + '. Adding "' + shortTitle + '" to it now.');
			$('link').before('<title>' + shortTitle + '</title>\n'); // insert the title element before the link element
			fs.writeFileSync(doc, $.html()); // write out the revise document
		}
	}
})
