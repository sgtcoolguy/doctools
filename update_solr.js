/*
  use nightmare to upload solr json files

*/

const fs = require('fs');
const program = require('commander');
const cheerio = require('cheerio');
const Nightmare = require("nightmare");
const nightmare = Nightmare({
    show: true, // use false if you don't want to see Electron "jumping through all the hoops"
});
var arguments = {}; // object to hold user supplied info

program // set up flags
  .version('0.0.1')
  .usage('-c <commitWithin time> -f <path/filename> -w <milliseconds>')
  .option('-c, --commit', 'commitWithin time (in milliseconds; 1000ms for small files, 20000ms for large files). If not supplied, assume 20000ms.')
  .option('-f --file', '*required* path/filename of the JSON to be indexed')
  .option('-w, --wait', 'Wait time (in milliseconds) for server to response (default 3 seconds)')
  .parse(process.argv);


for (var i = 0; i < program.rawArgs.length; i++) { // loop through the array of raw arguments to gather the entered arguments
  if (program.rawArgs[i] == '--commit' || program.rawArgs[i] == '-c') {
    arguments.commit = parseInt(program.rawArgs[i + 1]);
  }
  if (program.rawArgs[i] == '--wait' || program.rawArgs[i] == '-w') {
    arguments.wait = parseInt(program.rawArgs[i + 1]);
  }
  if (program.rawArgs[i] == '--file' || program.rawArgs[i] == '-f') {
    arguments.file = program.rawArgs[i + 1];
  }
}

if (!arguments.wait) {
  arguments.wait = 3000; // default the delay of the server response time to three seconds
  console.log('Server response delay not set. Assuming ' + arguments.wait + ' millisecond delay.');
}
if (!arguments.commit) {
  arguments.commit = 20000; // default the delay of the server response time to three seconds
  console.log('commitWithin not set. Assuming ' + arguments.commit + ' millisecond delay.');
}
if (!arguments.file) {
  console.log('The path/filename must be supplied. Quitting.');

  process.exit(1);
} else {
  // var commitWithin = 2000; // time for the solr server to crunch the JSON data. Too little the indexer is not updated with the supplied data.
  var selector = 'div#response'; // element that has the response for the upload
  // var filename = '../Learning_Solr/node/json/arrowdbGuide.json';
  var file = fs.readFileSync(arguments.file).toString(); // JSON data to upload
  // the JSON files in ../appc_web_docs/platform/data/solr/ are wrapped with [] characters. Remove them.
  // console.log(file);
  if (file.indexOf('[') == 0) {
    file = file.slice(1, file.length - 1);
  }

  // ** confirm that everything is working as it should at this point
  // ** pick up here
  /*
  node update_solr.js -f '../Learning_Solr/node/json/arrowdb_guides.json'
  node update_solr.js -f '../Learning_Solr/node/json/cloud_guides.json'
  node update_solr.js -f '../appc_web_docs/platform/data/solr/alloy_api.json'

  The following hangs on the insert file step:
    node update_solr.js -f '../Learning_Solr/node/json/guides.json'
    node update_solr.js -f '../appc_web_docs/platform/data/solr/arrow_api.json'
    node update_solr.js -f '../appc_web_docs/platform/data/solr/api_solr.json'
  */

  nightmare
    .goto('http://52.37.19.182:8983/solr/#/appc_doc/documents') // navigate to the solr upload location
    .wait(arguments.wait) // wait for server to respond
    .insert('textarea#document', file) // enter json data
    // .wait(arguments.wait / 2) // wait for server to respond
    .insert('input#commitWithin', '') // clear the commitWithin field
    .insert('input#commitWithin', arguments.commit) // enter new commitWithin value (for smaller files 1000 is fine; 20000 for larger files)
    .click('button#submit') // click the submit button to upload the json
    .wait(arguments.commit / 10) // wait for server to respond
    .evaluate(selector => { // grab html content from browser
      // console.log(document.querySelector(selector).innerHTML)
      if (document.querySelector(selector).innerHTML) {
        return {
          html: document.querySelector(selector).innerHTML, // HTML element where the content is located
        }
      }
    }, selector)
    .end() // close Electron browser
    .then(obj => { // render html
      $ = cheerio.load(obj.html.toString()); // read object in
      var object = $('div.ng-binding').html();
      // console.log(object);
      object = object.split('&quot;');

      for (var i = 0; i < object.length; i++) {
        if (object[i].indexOf('400') > -1) {
          console.log('Successfully uploaded "' + arguments.file + '"');
          console.log(object[i + 1] + ': ' + object[i + 2].replace(':', '').replace('},',''));
          break;
        }
      }
    })
    .catch(error => { // catch any errors
      console.error(error);
    });
}
