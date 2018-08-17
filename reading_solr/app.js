/*
  Read in solr files and print out a list of ti.* and titanium.* items
*/

var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');

shell.ls('./*.json').map(function(file) {
  var content = fs.readFileSync(file).toString().split('\n');
  console.log(file);
  // console.log(content);
  for (i in content) {
    if (content[i].indexOf('ti.') > -1) {

      var match = content[i].match(/\bti\.([^\s]+)/gi);
      // if (match.indexOf('({') > -1) {
        // console.log(content[i])
        console.log(match)
      // }

    }
  }
});
