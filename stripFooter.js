/*
	Purpose: remove the footer element of all HTML generated files in the htmlguides directory
	See https://wiki.appcelerator.org/x/lrHBAg for more details
*/
var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');
var fileNames = shell.ls('htmlguides/*.html'); // get an array of all files that end with .html in the htmlguides directory

for (i in fileNames) {
	$ = cheerio.load(fs.readFileSync(fileNames[i]).toString()); // read in HTML file with jQuery-like features
	if ($('div.footer').length > 0) { // if div.footer is found, remove it
			console.log("Removing footer from ../" + fileNames[i]);
			$('div.footer').remove(); // remove footer
	} else {
		console.log(fileNames[i] + " has no div.footer element.");
	}

	var removed = $.html(); // updated html
	fs.writeFileSync(fileNames[i],removed); // save out HTML file
}

// ** There is a bug in this program: regardless of the last file in the fileNames array, the program will throw an error (see below). The program still executes as it should and the div.footer element is removed regardless.
/*
		at Error (native)
    at Object.fs.openSync (fs.js:584:18)
    at Object.fs.readFileSync (fs.js:431:33)
    at Object.<anonymous> (/Users/bimmel/Documents/Repositories/doctools/stripFooter.js:12:22)
    at Module._compile (module.js:413:34)
    at Object.Module._extensions..js (module.js:422:10)
    at Module.load (module.js:357:32)
    at Function.Module._load (module.js:314:12)
    at Function.Module.runMain (module.js:447:10)
    at startup (node.js:142:18)
*/
