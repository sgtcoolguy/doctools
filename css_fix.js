// find and replace {list-style:lower-alpha inside} with {list-style:lower-alpha} in app*.css
// For more information visit https://wiki.appcelerator.org/x/jQ-uAg
console.log("Running css_fix.js script.");

var fs = require('fs');
var shell = require('shelljs');
var fileName = process.argv[2];
var doc = fs.readFileSync(fileName).toString();
//var reg = /lower-alpha inside}/g;
//var count = doc.match(reg).length;
var count = 2;

for (var i = 0; i < count + 1; i++) {
  if (doc.indexOf('{list-style:lower-alpha inside}') > -1) {
    console.log("found it");
    doc = doc.replace('{list-style:lower-alpha inside}','{list-style:lower-alpha}');
  } else {
    console.log('Rule for "{list-style:lower-alpha inside}" was not found. :)');
  }
  fs.writeFileSync(fileName, doc);
}

// Added fix for the banner to push it down below the edit page and print icon
doc += 'div#banner {margin: 55px 17px 0 0;}';
fs.writeFileSync(fileName, doc);
