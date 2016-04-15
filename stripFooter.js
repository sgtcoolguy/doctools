var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');

var fileNames = shell.ls('htmlguides/*.html'); // get an array of all files that end with .html in the htmlguides directory

for (i in fileNames) {
	console.log("Removing footer from ../" + fileNames[i]);
	$ = cheerio.load(fs.readFileSync(fileNames[i]).toString());
	$('div.footer').remove(); // remove footer
	var removed = $.html(); // updated html
	fs.writeFileSync(fileNames[i],removed); // save file
}