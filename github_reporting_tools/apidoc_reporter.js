/*
  1. read in json file
  2. get the contents of description property from the loaded object
  3. look for github.com urls
  4. report back the document name (published URL) and found links in a generated HTML file.
*/

var yaml = require('yamljs');
var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');
var report = '';

shell.ls('/Users/bimmel/Documents/Repositories/doctools/github_reporting_tools/json_files/*.js').map(function(file) {
  console.log('Processing ' + file);
  var fileName = file.slice(85,file.length - 3);
  report += '\n<h2>' + fileName + '</h2>\n';
  report += '<span><a href="https://docs.appcelerator.com/platform/latest/#!/api/' + fileName + '" target="_blank"></a></span>\n'

  var contents = fs.readFileSync(file);
  var doc = JSON.parse(contents);
  var myString = JSON.stringify(doc);
  var array = myString.split('>');

  // report += '<ol>\n';

  for (i in array) {
    if (array[i].indexOf('github.com') > -1) {
      var temp = array[i].replace(/{"tagname*.*"editurl":"/g,'');
      temp = temp.replace(/","description*.*/g,'');
      temp = temp.replace(/"},"private*.*/g,'');
      temp = temp.replace(/","removed"*.*/g,'');
      temp = temp.replace(/","deprecated"*.*/g,'');
      temp = temp.replace(/\w*.*<a href=\\"/g,'');
      temp = temp.replace(/\\"/g,'');
      temp = temp.replace(/\(/g,'');
      temp = temp.replace(/\)/g,'');
      temp = temp.replace(' transition','');
      temp = temp.replace('. ...</div','');
      temp = temp.replace(/\.\\n\]*.*<p/g,'');
      report += '<li><a href="' + temp + '" target="_blank">' + temp + '</a></li>\n';
    }
  }
  // report += '<\ol>\n';
});

fs.writeFileSync('./github_api_report.html', report);
