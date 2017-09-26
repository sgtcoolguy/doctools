/*
	Purpose: Add redirects to the guide pages of docs.appcelerator.com as the redirect macro does not translate from Confluence to HTML pages.
	See https://wiki.appcelerator.org/x/bAHZAg for more details
*/
var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');
var fileNames = shell.ls('htmlguides/*.html'); // get an array of all files that end with .html in the htmlguides directory

// guide pages redirecting to other guide pages
var redirect = [ // array of guide pages that need a redirect
	'Performance',
	'Appcelerator_Studio',
	'Appcelerator_Studio_Release_Notes',
	'Appcelerator_Studio_Getting_Started',
	'JIRA_Ticket_Template',
	'How_to_Submit_a_Bug_Report',
];
var redirectTarget = [ // array of target pages
	'Appcelerator_Performance_Management',
	'Axway_Appcelerator_Studio',
	'Axway_Appcelerator_Studio_Release_Notes',
	'Axway_Appcelerator_Studio_Getting_Started',
	'How_to_Report_a_Bug_or_Make_a_Feature_Request',
	'How_to_Report_a_Bug_or_Make_a_Feature_Request',
];

// guide pages that need redirection externally
var redirectWiki = [ // array of guide pages that needs to be redirected externally
	'Titanium SDK Open Source Attribution Notice',
	'Titanium Studio Open Source Attribution Notice'
];
var redirectExternalTarget = [ // array of external target pages
	"http://www.appcelerator.com/opensource/",
	"http://www.appcelerator.com/opensource/"
];

for (i in fileNames) { // loop through each HTML file
	// internal redirects
	for (j in redirect) { // loop through each redirected page
		if (fileNames[i] == "htmlguides/" + redirect[j] + ".html") { // if the page is found in the htmlguides directory, append a redirect to it's target
			$ = cheerio.load(fs.readFileSync(fileNames[i]).toString()); // read in HTML file with jQuery-like features
			console.log("Adding a redirect to " + fileNames[i] + ".html to point to " + redirect[j]);
			$("head").append('\t\t<meta http-equiv="refresh" content="0;URL=http://docs.appcelerator.com/platform/latest/#!/guide/' + redirectTarget[j] + '">\n'); // add redirect to source page
			var appended = $.html(); // update html
			fs.writeFileSync(fileNames[i],appended); // save out HTML file
		}
	}

	// external redirects
	for (j in redirectWiki) { // loop through each redirected page
		if (fileNames[i] == "htmlguides/" + redirectExternalTarget[j] + ".html") { // if the page is found in the htmlguides directory, append a redirect to it's target
			$ = cheerio.load(fs.readFileSync(fileNames[i]).toString()); // read in HTML file with jQuery-like features
			console.log("Adding a redirect to " + fileNames[i] + ".html to point to " + redirect[j]);
			$("head").append('\t<meta http-equiv="refresh" content="0;' + redirectExternalTarget[j] + '">'); // add redirect to source page
			var appended = $.html(); // update html
			fs.writeFileSync(fileNames[i],appended); // save out HTML file
		}
	}
}
