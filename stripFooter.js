/*
	Purpose: remove the footer element of all HTML generated files in the htmlguides directory
	See https://wiki.appcelerator.org/x/lrHBAg for more details
*/
var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');

shell.ls('htmlguides/*.html').map(function(file) {
  $ = cheerio.load(fs.readFileSync(file).toString());
  if ($('div.footer').length > 0) {
		console.log("Removing footer element from ../" + fileNames[i]);
		$('div.footer').remove();
    fs.writeFileSync(file,$.html());
  }
});
