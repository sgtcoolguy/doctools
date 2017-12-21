var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');
var util = require('util');

var links = {}; // object to hold the page name and
shell.ls('htmlguides/*.html').map(function(file) {
  $ = cheerio.load(fs.readFileSync(file).toString());
  console.log('\nChecking links in ' + file);

  links[file] = file;

  if ($('a[href]')) { // if there is an link in the file...
    links[file] = {};
    var array = [];
    $('a[href]').each( (index, value) => {
      if ($(value).attr('href').indexOf('http') == -1) { // add http path cuz it's most likely an Appc doc
        var url = 'docs.appcelerator.com/platform/latest/#!/guide/' + $(value).attr('href');
      } else {
        var url = $(value).attr('href')
      }
      array.push(url);
    });
    links[file].urls = array;
  }
});

// ** consider adding a routine to remove duplicate URLs

fs.writeFileSync('links.json', util.inspect(links), 'utf-8'); // export data object to a json file
