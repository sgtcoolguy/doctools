var fs = require('fs');
var location = process.argv[2]; // location of file to be processed
var filename = process.argv[3]; // file to be processed (toc.xml)
var outputFile = process.argv[4]; // file to receive outputFile
console.log(location + filename);

// do some clean up of the toc.xml prior to removing duplicates
var anchors = /#.*"/g; // regex match for finding anchor links
var whitespace = /^\s+|\s+$|\s+(?=\s)/g; // regex match to find whitespace

var content = fs.readFileSync(location + "/" + filename).toString();
content = content.replace(anchors, '"'); // find anything that has an anchor link (#) and onward and replace it with the closing quotes and bracket
content = content.replace(whitespace, "\n"); // remove whitespace

var contentArray = content.split("<"); // ...'topic label="Quick Start" href="Quick_Start.html">'...
//console.log(contentArray);

for (i in contentArray) { // add split character back to each element in array
    contentArray[i] = "<" + contentArray[i];
};

for (i in contentArray) {
  if (contentArray[i].length == 1) {
    contentArray.splice(i, 1); // remove dead '<'
  }
  if (contentArray[i].indexOf(" />") > 0) { // replace self-closing elements with open-close elements
    contentArray[i] = contentArray[i].replace(" />","></topic>");
  }
  if (contentArray[i].indexOf("/>") > 0) { // replace self-closing elements with open-close elements
    contentArray[i] = contentArray[i].replace("/>","></topic>");
  }
}
// loop through array and find the href
var a = [];
for (i in contentArray) {
  if (contentArray[i].indexOf('<topic') > -1) {
    var start = contentArray[i].indexOf('href=') + 6; // 59
    var end = contentArray[i].indexOf('.html'); // 63
    var hrefLength = (end + 5) - start; // // get the length of the href value
    var href = contentArray[i].substr(start,hrefLength); // Home.html
    a.push(href);
  }
}
//console.log("all element's href:\n" + a + "\n");
var b = uniqBy(a, JSON.stringify); // can this take a match of contentArray? like
//console.log("cleaned:\n" + b);

function uniqBy(a, key) {
    var index = [];
    return a.filter(function (item) {
        var k = key(item);
        if (index.indexOf(k) >= 0) {
          false;
        } else {
          return index.push(k);
        }
    });
}

//console.log("\nall:\n" + contentArray + "\n");
var b = uniqBy2(contentArray, JSON.stringify); // can this take a match of contentArray? like
//console.log("cleaned:\n" + b);

// turn the contentArray into an object with these properties:
  // name (label without spaces) (this will be used to delete the object as necessary)
  // element (topic)
  // label
  // href

function uniqBy2(a, key) {  // use this with an object instead of an array
    var index = [];
    return a.filter(function (item) {
        var k = key(item);
        if (index.indexOf(k) >= 0) {
          false;
        } else {
          return index.push(k);
        }
    });
}
function returnItem(array,target1,offset1,target2,offset2,offset3) {
  var start = array.indexOf(target1) + offset1; // 59
  var end = array.indexOf(target2) + offset2; // 63
  var itemLength = (end + offset3) - start; // // get the length of the href value
  return array.substr(start,itemLength); // Home.html
}
var myObj = []; // array to collect all objects that will be generated while looping through the contentArray
var myArray = [];
for (i in contentArray) {
  var href, element, label, name;
  if (contentArray[i].indexOf('<topic') > -1) {
    href = returnItem(contentArray[i],'href=',6,'.html',0,5) // href
    element = returnItem(contentArray[i],'<',1,'label',-1,0); // element
    label = returnItem(contentArray[i],'label',7,'href',-2,0); // label
    name = label.replace(/ /g,"_") + "-" + href;
  } else if (contentArray[i].indexOf('</topic>') > -1) {
    href = "na";
    element = "/topic";
    label = "na";
    name = "closing_topic";
  } else if (contentArray[i].indexOf('xml') > -1) {
    href = "na";
    element = "xml";
    label = "na";
    name = "xml";
  } else if (contentArray[i].indexOf('</toc>') > -1) {
    href = "na";
    element = "/toc";
    label = "na";
    name = "closing_toc";
  } else if (contentArray[i].indexOf('<toc') > -1) {
    href = "na";
    element = "toc";
    label = "na";
    name = "toc";
  } else {
    href = "error";
    element = "error";
    label = "error";
    name = "error";
  }
  var string = contentArray[i].substr(0,contentArray[i].length - 2);
  //console.log(i + "- " + contentArray[i]);
  //console.log(i + "- href: " + href);
  //console.log(i + "- element: " + element);
  //console.log(i + "- label: " + label);
  //console.log(i + "- name: " + name);
  //myObj = Object(name, label, element, href);
  myArray.push(i, string, href, element, label, name);
}
function populateFromArray(array) {
  var output = {};
  array.forEach(function(item, index) {
    if (!item) return;
    if (Array.isArray(item)) {
      output[index] = populateFromArray(item);
    } else {
      output[index] = item;
    }
  });
  return output;
}

//var obj = populateFromArray(myArray);
var obj = myArray.reduce((p,c,i) => (Array.isArray(c) && (p[i] = {[c.length-1]:c[c.length-1]}),p),{});
console.log(obj);
/*
var count = 0;
var copyArray = contentArray;
for (i in contentArray) {
  if (contentArray[i].indexOf('<topic') > -1) {
    var start = contentArray[i].indexOf('href=') + 6; // 59
    var end = contentArray[i].indexOf('.html'); // 63
    var hrefLength = (end + 5) - start; // // get the length of the href value
    var href = contentArray[i].substr(start,hrefLength); // Home.html
    //console.log("\nline: " + contentArray[i]); // 'line: <topic label="Appcelerator Platform Troubleshooting" href="Home.html">'
    //console.log("start: " + start + " end: " + end); // 'start: 59 end: 63'
    //console.log("href: " + href); // 'href: Home.html'
  }

  for (var j = 1; j < copyArray.length; j++) {
    if (copyArray[j].indexOf('<topic') > -1) {
      var childStart = copyArray[j].indexOf('href=') + 6; // 59
      var childEnd = copyArray[j].indexOf('.html'); // 63
      var childHrefLength = (childEnd + 5) - childStart; // // get the length of the href value
      var childHref = copyArray[j].substr(childStart,childHrefLength); // Home.html
      if (childHref == href) {
        console.log(i + ": found a duplicate at: " + j + " = " + copyArray[j])
        //contentArray.splice(i,1);
        //break;
        //tempArray.push(contentArray[j]);
        //count++;
        //break;
      }
    }
  }
}
*/
//console.log("found " + count + " duplicates");
/*
topic label="Appcelerator Documentation and Guides" href="Home.html">
    <topic label="Quick Start" href="Home.html"></topic>
*/

// function to build objects for each element in the contentArray array
//function Objects(id, type, href, parent, content) {
function Object(name, label, element, href) {
  this.name = name;
  this.label = label;
  this.element = element;
  this.href = href;
}



// convert array back into a string
var outputString = "";
for (i in contentArray) {
  outputString += contentArray[i];
}

fs.writeFileSync(location + outputFile, outputString);
