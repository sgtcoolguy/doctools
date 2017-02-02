var fs = require('fs');
var cheerio = require('cheerio');
var shell = require('shelljs');
//var fileNames = shell.ls('htmlguides/*.html'); // get an array of all files that end with .html in the htmlguides directory
// use the output directory of the html files
var fileNames = shell.ls('../appc_web_docs/platform/latest/guides')

//console.log(fileNames);

for (i in fileNames) {
  console.log(fileNames[i]);
  $ = cheerio.load(fs.readFileSync(fileNames[i]).toString()); // read in HTML file with jQuery-like features
  console.log("Fixing edit button in " + fileNames[i] + ".html.");

}
// Fix for TIDOC-????
//console.log(wiki_url);
//if (wiki_url.indexOf('src-') >= 0) { // if wiki_url contains 'src-'
  //console.log("Removing 'src-' from wiki_url");
  //wiki_url = wiki_url.replace('src-',''); // remove 'src-' from the wiki_url
  //console.log(wiki_url);
//}
