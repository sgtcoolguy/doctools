var fs = require('fs');
var location = process.argv[2]; // location of file to be processed
var filename = process.argv[3]; // file to be processed (toc.xml)
//var location = "."; // location of file to be processed
//var filename = "toc.xml"; // file to be processed (toc.xml)
//console.log("location: " + location);
//console.log("filename: " + filename);
//console.log(location + "/" + filename);

// do some clean up of the toc.xml prior to removing duplicates
var anchors = /#.*"/g; // regex match for finding anchor links
//var selfClosed = /<topic.*\/>/g; // regex match for finding self closing topic elements // ** self-closing elements are required.....
//var nested = /<topic.*>\n.<\/topic>/g; // regex match for finding nested topic elements
var whitespace = /^\s+|\s+$|\s+(?=\s)/g; // regex match to find whitespace
//var children = /<topic.*><\/topic>/g; // regex match for children topic elements

var content = fs.readFileSync(location + "/" + filename).toString();
content = content.replace(anchors, '"'); // find anything that has an anchor link (#) and onward and replace it with the closing quotes and bracket
content = content.replace(whitespace, "\n"); // remove whitespace
console.log(content);
//fs.writeFileSync(location + "/" + filename, content);

var splitter = /<topic.*">/g; // will need to add "</topic>" back into the final output
var contentArray = content.split("<"); // ...'topic label="Quick Start" href="Quick_Start.html">'...
//console.log(contentArray);

for (i in contentArray) { // add split character back to each element in array
    contentArray[i] = "<" + contentArray[i];
};
contentArray.unshift('<?xml version="1.0" encoding="UTF-8"?>\n');

/*
for (i in contentArray) {
    // remove '\\"?>\n\n' from array
    var index = contentArray[i].indexOf('\\"?>\n\n');
    if (index > -1) {
        contentArray.splice(index, 1);
    }

    // find all values for the href property of the element
    if (contentArray[i].indexOf('<topic') > -1) {
        var start = contentArray[i].indexOf('href="') + 6; // find the start of the href section of the element
        if (contentArray[i].indexOf('.html">') > -1) { // find element that ends with '.html">'
            var endNow = contentArray[i].indexOf('.html">') + 5;
        } else if (contentArray[i].indexOf('\.html" />') > -1) { // find element that end with '.html" />'
            var endNow = contentArray[i].indexOf('\.html" />') + 5;
        }

        var href = contentArray[i].substring(start, endNow); // 'Appcelerator_Platform_Troubleshooting.html'
        //console.log("element: " + contentArray[i]); // 'element: <topic label="Appcelerator updates in Studio hang or freeze, or cannot build for Android or iOS after updating from Studio" href="Appcelerator_Platform_Troubleshooting.html" />'
        //console.log("href: " + href); // 'href: Appcelerator_Platform_Troubleshooting.html'
    }
}
*/

// function to build objects for each element in the contentArray array
//function Objects(id, type, href, parent, content) {
/*
function Objects(id, type, href, content) {
  this.id = id;
  this.type = type;
  this.href = href;
  //this.parent = parent;
  this.content = content;
}
*/
//var myObj = []; // array to collect all objects that will be generated while looping through the contentArray


/*
<topic label="Appcelerator Documentation and Guides" href="Home.html">
<topic label="Quick Start" href="Home.html" />
<topic label="Appcelerator Platform" href="Home.html" />
<topic label="Installation and Configuration" href="Home.html" />
<topic label="Appcelerator Arrow" href="Home.html" />
<topic label="Appcelerator Platform Services" href="Home.html" />
<topic label="Alloy Framework" href="Home.html" />
<topic label="Titanium SDK" href="Home.html" />
<topic label="Appcelerator Dashboard" href="Home.html" />
<topic label="Appcelerator CLI" href="Home.html" />
<topic label="Appcelerator Studio" href="Home.html" />
<topic label="Appcelerator Insights" href="Home.html" />
<topic label="Appcelerator Platform Troubleshooting" href="Home.html" />
</topic>
*/
// idea for cleaning dups:
// in the object array, look for the opening topic element with any nested elements.
// find the closing topic element
// in this mini set, get the href of the parent topic element
// if any of the following elements have the same href, don't copy it to the clean object

//var contentArray = [];
/*
contentArray = [
  '<topic label="top parent" href="Top.html">',
    '<topic label="child of top" href="Top.html" />',
    '<topic label="child of top - diff" href="Nested1.html">',
      '<topic label="child of second" href="Three.html" />',
      '<topic label="child of second" href="Nested1.html" />',
      '<topic label="grandchild of top - different" href="Nested2.html">',
        '<topic label="child of second" href="Nested2.html" />',
        '<topic label="great grandchild of top - different" href="Nested3.html">',
          '<topic label="child of great grandchild" href="Nested3.html" />',
          '<topic label="great great grandchild of top - different" href="Nested4.html">',
            '<topic label="great great great grandchild of top - different" href="Nested5.html">',
              '<topic label="child of Nested5" href="Nested5.html" />',
            '</topic>',
          '</topic>',
        '</topic>',
        '<topic label="child of second - diff" href="Nested2.html" />',
        '<topic label="child of second - diff2" href="Nested2.html" />',
      '</topic>',
    '</topic>',
    '<topic label="child of top - diff" href="Top.html" />',
  '</topic>'
];
*/

/*
contentArray = [
  '<topic label="Appcelerator Documentation and Guides" href="Home.html">',
    '<topic label="Quick Start" href="Home.html" />',
    '<topic label="Appcelerator Platform" href="Home.html" />',
    '<topic label="Installation and Configuration" href="Home.html" />',
    '<topic label="Appcelerator Arrow" href="Home.html" />',
    '<topic label="Appcelerator Platform Services" href="Home.html" />',
  '</topic>',
  '<topic label="Quick Start" href="Quick_Start.html">',
    '<topic label="Contents" href="Quick_Start.html" />',
    '<topic label="Overview" href="Quick_Start.html" />',
    '<topic label="Appcelerator Studio" href="Quick_Start.html">',
      '<topic label="System Requirements" href="Quick_Start.html" />',
      '<topic label="Download and Install Studio" href="Quick_Start.html" />',
    '</topic>',
    '<topic label="Creating Your First Mobile App" href="Quick_Start.html">',
      '<topic label="Import the Sample Project" href="Quick_Start.html" />',
      '<topic label="Run and Test the Client Application" href="Quick_Start.html" />',
    '</topic>',
    '<topic label="Next Steps" href="Quick_Start.html" />',
  '</topic>',
];
*/

// **** pick up here!
// okay, I have a duplicate removal system in place now. I need to figure out how to pair the closing topic elements
// with their opening topic elements.
// Or do I? I think the output of the current system is pretty close to being finished.
// Try a small sample of the actual toc.xml file, run it through this system, and render it to the localhost
// for toc resultion.


for (var i = 0; i < contentArray.length; i++) { // convert the contentArray into an object with keys and values for id (number), type, href, and contentArray
  // get all the pieces of each element in the array
  var id = i; // generic id in case the script will need it
  var type = "invalid"; // type of element; default to invalid in case something weird gets in
  var href = "n/a"; // default the href value to 'n/a'
  var parent = "none"; // set the parent value to none by default
  var content = contentArray[i]; // pull in the original line into this key
}
/*
  if (contentArray[i].indexOf('<topic') > -1 && contentArray[i].indexOf('.html">') > -1) { // open topic element
    type = "topic-open";
    var start = contentArray[i].indexOf('href="') + 6;
    var endNow = contentArray[i].indexOf('.html') + 5;
    href = contentArray[i].substring(start,endNow);
    // figure out how to get the parent of this element
    // if the previous object's id - 1
    // look at the previous generated object for parent info
    //console.log("myObj[0].id - 1" + myObj[0].id - 1);
    //console.log("Current id: " + i)
    //console.log("Previous (id: " + myObj[i - 1].id + ") href: " + myObj[i - 1].href);
    //console.log("Previous type: " + myObj[i - 1].type);
    /*
    for (var j = 1; j < 10; j++ ) {
      console.log("Round: " + i + " subround: " + j);
      if (j < i) {
        console.log(j);
      }
      if (j < i && myObj[i - j].type == "topic-open") { // look back one level
        //console.log("The parent of object " + i + " has type of 'topic-open'");
      } else {
        //console.log("The parent of object " + i + " doesn't have type of 'topic-open'");
      }
    }
    */
/*
  } else if (contentArray[i].indexOf('<topic') > -1 && contentArray[i].indexOf('" />') > -1) { // self-closing topic element
    type = "topic-closed";
    var start = contentArray[i].indexOf('href="') + 6;
    var endNow = contentArray[i].indexOf('.html') + 5;
    href = contentArray[i].substring(start,endNow);
    /*
    console.log("Current id: " + i)
    console.log("Previous (id: " + myObj[i - 1].id + ") href: " + myObj[i - 1].href);
    console.log("Previous type: " + myObj[i - 1].type);
    if (myObj[i - 1].type == "topic-open") {
      parent = myObj[i - 1].href;
      console.log("Current object(" + i + ") is a child of object id " + parent);
    }
    */
    /*
  } else if (contentArray[i].indexOf('<?xml') > -1) { // xml element
    type = "xml";
  } else if (contentArray[i].indexOf('<toc') > -1) { // toc element
    //<toc label="Home" topic="Home.html">\n
    type = "toc";
  } else if (contentArray[i].indexOf('</toc>') > -1) { // /toc element
    type = "/toc";
  } else if (contentArray[i].indexOf('</topic>') > -1) { // /topic element
    type = "/topic";
    //href = id + "-</topic>";
  }
  //var newObj = new Objects(id, type, href, parent, content);
  var newObj = new Objects(id, type, href, content);
  myObj.push(newObj);
}
// fix for myObj[1].content == '<\\"?>\n\n' issue
myObj[1].content = '<toc label="Home" topic="Home.html">\n';
console.log(myObj); // everything seems to be in order
//fs.writeFileSync(location + "/toc-cleaned.xml", myObj);

// count the number of open topic elements
for (var a = 0; a < myObj.length; a++) {
  for (i in myObj) {
    if (myObj[i].type == "topic-open" || myObj[i].type == "topic-closed") {
      // does this open topic element have any children elements with the same href?
      for (var j = 0; j < myObj.length; j++) {
        var next = parseInt(i) + parseInt(j);
        try {
          if (myObj[next].href == myObj[i].href) {
            //console.log("found a dup of the parent " + myObj[i].href + "(id: " + myObj[i].id + "), dup id: " + myObj[next].id);
            myObj.splice(myObj[next].id, 1); // remove myObj[next].id from array
          }
        } catch (e) { // statements to handle TypeError exceptions
            //console.log("problem with myObj[next].href: " + myObj[next]);
        }
      }
    }
    if (myObj[i].type == "topic-closed") {
      // does this open topic element have any children elements with the same href?
      for (var j = 0; j < myObj.length; j++) {
        var next = parseInt(i) + parseInt(j);
        try {
          if (myObj[next].href == myObj[i].href) {
            //console.log("found a dup of the parent " + myObj[i].href + "(id: " + myObj[i].id + "), dup id: " + myObj[next].id);
            myObj.splice(myObj[next].id, 1); // remove myObj[next].id from array
          }
        } catch (e) { // statements to handle TypeError exceptions
            //console.log("problem with myObj[next].href: " + myObj[next]);
        }
      }
    }
  }
}



//myObj.splice(0,1);
console.log("::revised::");
console.log(myObj);

// find the opening topic element
var startId = "";
var endId = "";
var parentHref = "";
var cleanedObj = [];
for (key in myObj) {
  if (myObj[key].type == "topic-open") { // find opening topic element
    //console.log("found opening topic");
    startId = myObj[key].id;
    parentHref = myObj[key].href;
    cleanedObj.push(myObj[key]);
    //console.log(startId); // 0
  }
  if (myObj[key].href != parentHref && myObj[key].type != "/topic") {
    cleanedObj.push(myObj[key]);
  }
  if (myObj[key].type == "/topic") { // find closing topic element
    //console.log("found closing topic");
    endId = myObj[key].id;
    cleanedObj.push(myObj[key]);
    //console.log(endId); // 4
  }
  //console.log(myObj[key].type);
}
//console.log("\n\ncleanedObj:");
//console.log(cleanedObj);


// *************
// ok, I think the smarter way to remove any unnecessary nested elements is to first count
// the number of elements between the opening and closing topic elements.
// if the topic element is 'open' (not self-closing) and there are no nested elements
// between the opening and closing topic elements, then there is nothing to do.
// If there are nested elements between the opening and closing topic elements,
// look to see if the nested elements have the same href as the parent. If so, look to see
// if the nested element has any nested elements (repeat this for a depth of six).
// If the nested elements is self-closing and the href has the same href as the parent, remove
// it.
// *************

var cleanObj = filter(myObj);
//console.log(cleanObj); // everything seems to be in order
//fs.writeFileSync(location + "/toc-cleaned.xml", cleanObj);

function filter(arr) {
  var f = [];
  return arr.filter(function(n) {
    return f.indexOf(n.href) == -1 && f.push(n.href);
  });
}
// convert cleaned object back to an string
var outputString = "";
for (key in cleanObj) {
  if (cleanObj.hasOwnProperty(key)) {
    outputString += cleanObj[key].content;
  }
}

// **** pick up here ****
// ** soooo close!
/* The following nested topic elements are being removed from the cleaned array or outputString
** figure out where this is failing
<topic label="Prerequisites" href="Prerequisites.html">
    <topic label="Installing Oracle JDK" href="Installing_Oracle_JDK.html"></topic>
    <topic label="Installing Node" href="Installing_Node.html"></topic>
</topic>
*/

/*
var doubleClosed = />\n\s<\/topic>\n\s<\/topic>/g;
var tripleClosed = />\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>/g;
var fourClosed = />\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>/g;
var fiveClosed = />\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>/g;
var sixClosed = />\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>/g;
var sevenClosed = />\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>\n\s<\/topic>/g;

outputString = outputString.replace(sevenClosed, '></topic>');
outputString = outputString.replace(sixClosed, '></topic>');
outputString = outputString.replace(fiveClosed, '></topic>');
outputString = outputString.replace(fourClosed, '></topic>');
outputString = outputString.replace(tripleClosed, '></topic>');
outputString = outputString.replace(doubleClosed, '></topic>');
*/
//console.log(outputString);

//fs.writeFileSync(location + "/toc-cleaned.xml", outputString);

//fs.writeFileSync(location + "/toc-test.xml", output);
//fs.writeFileSync(location + "/toc-test.xml", myObject);
//fs.writeFileSync(location + "/" + filename, content);
