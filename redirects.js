/*
	Purpose: Add redirects to the guide pages of docs.appcelerator.com as the redirect macro does not translate from Confluence to HTML pages.
	See ???? for more details
*/
var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');
var fileNames = shell.ls('htmlguides/*.html'); // get an array of all files that end with .html in the htmlguides directory

// guide pages redirecting to other guide pages
var redirect = ["Performance"]; // array of guide pages that need a redirect
var redirectTarget = ["Appcelerator_Performance_Management"]; // array of target pages

// guide pages that need redirection externally
var redirectWiki = ["Titanium SDK Open Source Attribution Notice"]; // array of guide pages that needs to be redirected externally
var redirectExternalTarget = ["http://www.appcelerator.com/opensource/"]; // array of external target pages

for (i in fileNames) { // loop through each HTML file
	// internal redirects
	for (j in redirect) { // loop through each redirected page
		if (fileNames[i] == "htmlguides/" + redirect[j] + ".html") { // if the page is found in the htmlguides directory, append a redirect to it's target
			$ = cheerio.load(fs.readFileSync(fileNames[i]).toString()); // read in HTML file with jQuery-like features
			console.log("Adding a redirect to " + fileNames[i] + ".html to point to " + redirect[j]);
			$("head").append('<meta http-equiv="refresh" content="0;URL=http://docs.appcelerator.com/platform/latest/#!/guide/' + redirectTarget[j] + '">'); // add redirect to source page
			let appended = $.html(); // update html
			fs.writeFileSync(fileNames[i],appended); // save out HTML file
		}
	}
	
	// external redirects
	for (j in redirectWiki) { // loop through each redirected page
		if (fileNames[i] == "htmlguides/" + redirect[j] + ".html") { // if the page is found in the htmlguides directory, append a redirect to it's target
			$ = cheerio.load(fs.readFileSync(fileNames[i]).toString()); // read in HTML file with jQuery-like features
			console.log("Adding a redirect to " + fileNames[i] + ".html to point to " + redirect[j]);
			$("head").append('<meta http-equiv="refresh" content="0;' + redirectExternalTarget[j] + '">'); // add redirect to source page
			let appended = $.html(); // update html
			fs.writeFileSync(fileNames[i],appended); // save out HTML file
		}
	}
}