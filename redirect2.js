/*
Write a function that takes in index-template.html
and removes any element that has the text of !!REDIRECT!!
*/

var fs = require('fs');
var cheerio = require('cheerio');
var rootPath = process.argv[2]; // '/Users/bimmel/Documents/Repositories'

if (typeof(rootPath) == 'undefined') {
  console.log('You need to specify the root path');
  process.exit();
} else {
  rootPath += '/doctools/dist/platform/latest'
  var statement = false;

  $ = cheerio.load(fs.readFileSync(rootPath + '/index-template.html').toString()); // read in HTML file with jQuery-like features
  $('a').each(function(i, elem) { // loop through the a elements
    if ($(this).text().indexOf('!!REDIRECT!!') == 0) { // if the text '!!REDIRECT!!' is found, that means this element needs to be removed
      $(this).parent().parent().remove(); // remove links' grandparent element
      statement = true;
    }
  });

  if (statement) {
    console.log('\nRemoved all redirect marked elements from ../index-template.html\n');
  } else {
    console.log('\nNo elements were marked with "!!REDIRECT!!". Shouldn\'t there some redirects in ../index-template.html?\n');
  }

  fs.writeFileSync(rootPath + '/index-template.html',$.html()); // save out HTML file
}
