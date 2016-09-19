/*
	Purpose: remove the footer element of all HTML generated files in the htmlguides directory
	See https://wiki.appcelerator.org/x/lrHBAg for more details
*/
var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');
var fileNames = shell.ls('htmlguides/*.html'); // get an array of all files that end with .html in the htmlguides directory

for (i in fileNames) {
	console.log("Removing footer from ../" + fileNames[i]);
	$ = cheerio.load(fs.readFileSync(fileNames[i]).toString()); // read in HTML file with jQuery-like features
	$('div.footer').remove(); // remove footer
	var removed = $.html(); // updated html
	fs.writeFileSync(fileNames[i],removed); // save out HTML file
}