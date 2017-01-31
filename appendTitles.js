/*
	Purpose: remove the footer element of all HTML generated files in the htmlguides directory
	See ???? for more details
*/
var fs = require('fs');
var shell = require('shelljs');
var fileNames = shell.ls('../appc_web_docs/platform/release-notes/*.html'); // get an array of all files that end with .html in the ../appc_web_docs/platform/release-notes/ directory. This assumes the script is being executed from the doctools directory.

for (i in fileNames) {
	if (fileNames[i] != "../appc_web_docs/platform/release-notes/latest.html") { // skip this file, otherwise, process the files
		var page = fs.readFileSync(fileNames[i]).toString(); // put file into a string
		if (page.indexOf('<title>' > -1) { // title already exists, skip it
			console.log("title element already exists on " + fileNames[i] + ". Skipping.");
		} else { // check for the document for a h1 or h2
			var head1Start = page.indexOf('<h1>') + 4; // Find the first h1 element
			var head2Start = page.indexOf('<h2 class="heading ">') + 21; // find first h2 element
			if (head2Start > 24) { // if the document has a h2 element early in the file, use it
				console.log("Pulling the title from the head2 element for " + fileNames[i]);
				var titleElement = "<title>" + page.slice(head2Start,page.indexOf('</h2>')) + "</title>\n";
			} else if (head1Start > 0) {
				console.log("Pulling the title from the head1 element for " + fileNames[i]);
				var titleElement = "<title>" + page.slice(head1Start,page.indexOf('</h1>')) + "</title>\n";
			}
			page = titleElement + page;
			fs.writeFileSync(fileNames[i], page);
		}
	}
}
