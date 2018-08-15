// Purpose: to generate a list of missing Jira tickets between two HTML documents (wiki release note and Jira release board). See https://wiki.appcelerator.org/x/fhhbAw for details.

const fs = require('fs');
const cheerio = require('cheerio');
const shell = require('shelljs');
var wikifile = process.argv[2]; // HTML document for wiki release note: './downloads/wiki.html'
var jirafile = process.argv[3]; // HTML document for Jira release board: './downloads/jira.html'

var jiraArray = []; // array to hold all Jira ticket links found in a Jira release board
var wikiJiraArray = []; // array to hold all Jira ticket links found in a release note

if (wikifile && jirafile) {
  getList('ul li a', wikifile, wikiJiraArray);
  getList('div#page section#content div div section ul li a', jirafile, jiraArray);

  reportDiff(wikiJiraArray, jiraArray, 'Jira'); // report on unmatched tickets in the Jira release board
  reportDiff(jiraArray, wikiJiraArray, 'wiki'); // report on unmatched tickets in the release note
} else {
  console.log('You need to supply a path to either the wiki release note or Jira release board HTML docuement(s).\nQuitting app.');
  process.exitCode = 1;
}



function getList(linkLocation, file, array) { // find all Jira links within a file
  $ = cheerio.load(fs.readFileSync(file).toString()); // read file in

  $(linkLocation).each(function() { // find all links
    if ($(this).attr('href').indexOf('jira.') > -1) { // if the link uses 'jira.' as part of it's URL, assume it's a Jira ticket link
      array.push($(this).text()); // push the link into an array
    }
  });
}

function reportDiff(array1, array2, listName) { // report the differences between two lists of links from two different files
  let difference = array1.filter(x => !array2.includes(x)); // find the difference between two arrays
  console.log('\nFound the following items were NOT found in the ' + listName + ' list:');
  for (i in difference) {
    if (difference[i] == 'Appcelerator JIRA' || difference[i] == 'Report a bug' || difference[i] == 'Configure Release Notes' || difference[i] == 'Appcelerator JIRA') {
    } else {
      console.log(difference[i]);
    }
  }
  console.log();
}
