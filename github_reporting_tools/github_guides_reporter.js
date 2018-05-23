/*
  Search through all of the ../doctools/htmlguides/*.html documents looking for Github links and report back any Github links in the guides2 wiki space
*/

var fs = require('fs');
var shell = require('shelljs');
var cheerio = require('cheerio');
var output = ''; // variable to hold generated HTML report

shell.ls('./htmlguides/*.html').map(function(file) {
  console.log('Reviewing ' + file);
   $ = cheerio.load(fs.readFileSync(file).toString());

   var wikiLink = file.slice(file.lastIndexOf('/') + 1,file.indexOf('.html')).replace(/_/g,'+'); // generate page name of the related wiki page. Note: this is not 100% perfect as some wiki pages use special characters and whatnot.
   output += '<a href="https://wiki.appcelerator.org/display/guides2/' + wikiLink + '" target="_blank">' + wikiLink + '</a><ul>'; // link of wiki page
   $('a').each(function(i, elem) {
     var href = $(this).attr('href');
     if (href) {
       if (href.indexOf('github.com') > 0) { // if a Github link is found, report it
        output += '<li><a href="' + href + '" target="_blank">' + href + '</a></li>'
       }
     }
   });
   output += '</ul>';
});

fs.writeFileSync('./github_report.html', output);
