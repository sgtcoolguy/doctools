var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');
var fileNames = shell.ls('htmlguides/*.html'); // get an array of all files that end with .html in the htmlguides directory

fileNames.map(function(doc,i) { // loop through all HTML documents found in the htmlguides directory
  $ = cheerio.load(fs.readFileSync(doc).toString()); // add jquery-like features
  if ($('div#banner').length > 0) { // if banner exists, skip adding it to the document`
    console.log('Banner already exists on ' + doc + '. Skipping.');
  } else {
    console.log('Adding banner to ' + doc);
    $('div.container').prepend('\n\t\t<div id="banner" class="confbox admonition admonition-note aui-message warning shadowed information-macro">\n\t\t\t<p>You can now find Appcelerator documentation at <a href="https://docs.axway.com/">https://docs.axway.com/</a>. This site will be taken down in the near future.</p>\n\t\t</div>'); // add banner and message
    fs.writeFileSync(fileNames[i],$.html()); // save out HTML document
  }
 });
