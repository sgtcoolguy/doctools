/*
npm install jsdom jquery

cat > in.xml << DONE
<topic label="Prerequisites" href="Prerequisites.html">
  <topic label="Overview" href="Prerequisites.html">
      <child>
          child 1 of dup Prerequisites.html
      </child>
      <child>
          child 2 of dup Prerequisites.html
      </child>
  </topic>
  <topic label="Installing Oracle JDK" href="Installing_Oracle_JDK.html">
  </topic>
  <topic label="Installing Node" href="Installing_Node.html">
  </topic>
</topic>
DONE

node clean.js in.xml
node --stack-size=16000 nodejquery.js toc.xml

cat toc.xml | sed -e 's/.*href..//g' -e 's@\"\ /\>@@g' | grep -v "</topic>" > hrefs.txt
wc -l hrefs.txt
sort hrefs.txt | uniq | wc -l
*/

var fs = require('fs');
var jsdom = require("jsdom").jsdom;

fs.readFile(process.argv[2], function (err, data) {
  if (err) {
    throw err;
  }

  var doc = jsdom(data);

  var window = doc.defaultView;
  var $ = require('jquery')(window);

  //console.log("before:\n" + $("body").html());

  // remove elements with duplicate hrefs
  var seen = {};
  $("topic").each(function(index){
    var href = $(this).attr("href");
    //console.log(href);
    //href = href.replace(/#.*"/g, '"');
    //console.log(href);
    if (seen[href]) {
      var elemsBeneath = $(this).children();
      $(this).replaceWith(elemsBeneath);
    }
    seen[href] = 1;
  });
  console.log("after:\n" + $("body").html());
});
