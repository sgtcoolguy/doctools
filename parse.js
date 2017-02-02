var fs = require('fs');
var jsdom = require("jsdom").jsdom;
var location = process.argv[2]; // location of file to be processed
var filename = process.argv[3]; // file to be processed (toc.xml)

console.log("location: " + location + "\nfilename: " + filename);

fs.readFile(location + "/" + filename, function (err, data) {
  if (err) {
    throw err;
  }

  var doc = jsdom(data);
  console.log(doc);
  //var window = doc.defaultView;
  //var $ = require('jquery')(window);

  //console.log("before:\n" + $("body").html());


});
