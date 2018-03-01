/*
	Purpose: Update the API changes HTML document to have the correct heading level and update the text in the summary paragraph.

  This script should be executed from the /Users/bimmel/temp_repos directory.

	See https://wiki.appcelerator.org/x/U7bBAg for more details
*/

var fs = require('fs');
var shell = require('shelljs');
var cheerio = require('cheerio');
var version = process.argv[2];
var targetRelease = process.argv[3];

shell.ls('/Users/bimmel/temp_repos/titanium_mobile/dist/*.html').map(function(file) {
   $ = cheerio.load(fs.readFileSync(file).toString());

   if ($('h2').length > 0) { // replace all h2 elements with h3 elements
     $('h2').each(function(index) {
       $(this).replaceWith('<h3>' + $(this).text() + '</h3>'); // preserve the text in each replaced element
     });
   }

   fs.writeFileSync(file, $.html());

   var contents = []; // array to hold the contents of the file
   fs.readFileSync(file) // read the file in and convert it to an array
       .toString()
       .split(/\r?\n/)
       .forEach(function(line) {
         contents.push(line);
       });

    var output = ''; // contents of the file
    contents.map(function(item,index,array) {
      if (item.search(/Release \d./g) > -1) { // replace the 'Release <version>' with the current release value
        output += '<p>' + item.slice(0, item.indexOf('Release')) + 'release ' + targetRelease + '.</p>';
      } else {
        output += item;
      }
    });
    fs.writeFileSync(file, output);
});
