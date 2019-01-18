/*
  Purpose: Generate a list of missing tickets from both the release note (wiki page) and Jira release board so the writer can see what was added and/or removed from the release after the draft of the release note has been written. See https://wiki.appcelerator.org/x/fhhbAw for details.
  Usage: node compare_tickets.js -u <Atlasssian username> -p <Atlasssian password> -j <URL for Jira release board> -c <URL for release note in Confluence>
  Note: This script assumes the username and password for both Confluence and Jira are the same.
*/

const Nightmare = require("nightmare");
const cheerio = require('cheerio');
const request = require('request');
const nightmare = Nightmare({
    show: true // use false if you don't want to see Electron "jumping through all the hoops"
});
const program = require('commander');
const jiraSelector = 'section.aui-page-panel-content'; // selector of where the list of Jira tickets can be found
const confluenceSelector = '#main-content'; // selector of where the list of Confluence tickets can be found

program // set up flags
  .version('0.0.1')
  .usage('-u <username> -p <password> -j <Jira url> -c <Confluence url> -d <milliseconds>')
  .option('-u, --user', '*required* Username id')
  .option('-p, --password', '*required* User\'s password')
  .option('-j, --jira', '*required* URL for Jira release board')
  .option('-c, --confluence', '*required* URL for Confluence release note')
  .option('-d, --delay', 'Delay (in milliseconds) to wait for server response')
  .parse(process.argv);

async function run() { // execute the functions in proper order
  var arguments = {}; // object to hold the entered arguments
  var confluenceList = []; // array to hold a list of tickets found in the release note
  var jiraList = []; // array to hold a list of tickets found in the Jira release board

  for (var i = 0; i < program.rawArgs.length; i++) { // loop through the array of raw arguments to gather the entered arguments
    if (program.rawArgs[i] == '--user' || program.rawArgs[i] == '-u') {
      arguments.user = program.rawArgs[i + 1];
    }
    if (program.rawArgs[i] == '--password' || program.rawArgs[i] == '-p') {
      // ** password doesn't process some special characters like ', ", !, $....
      arguments.pass = program.rawArgs[i + 1];
    }
    if (program.rawArgs[i] == '--jira' || program.rawArgs[i] == '-j') {
      arguments.jira = program.rawArgs[i + 1];
    }
    if (program.rawArgs[i] == '--confluence' || program.rawArgs[i] == '-c') {
      arguments.confluence = program.rawArgs[i + 1];
    }
    if (program.rawArgs[i] == '--delay' || program.rawArgs[i] == '-d') {
      arguments.delay = parseInt(program.rawArgs[i + 1]);
    }
  }

  if (!arguments.delay) { // if the delay flag isn't set, assume 10 seconds
    arguments.delay = 10000; // default the delay of the server response time to six seconds
    console.log('Server response delay not set. Assuming ' + arguments.delay + ' millisecond delay.');
  }

  if (!arguments.user || !arguments.pass || !arguments.jira || !arguments.confluence) {
    if (!arguments.user) { // user id is required
      console.log('Username is required.');
    }
    if (!arguments.pass) { // password is required
      console.log('Password is required.')
    }
    if (!arguments.jira) { // Jira's url is required
      console.log('Jira\'s URL is required.')
    }
    if (!arguments.confluence) { // Confluence's url is required
      console.log('Confluence\'s URL is required.')
    }

    process.exit(1);
  } else {
    console.log('Processing release note and Jira release board information.')

    nightmare
      .goto(arguments.confluence) // go to the required document. Jive will redirect to the login page but then load the requested document.
      .type('#os_username', arguments.user)
      .type('#os_password', arguments.pass)
      .click('#loginButton')
      .wait(arguments.delay) // wait for server to respond
      .evaluate(confluenceSelector => { // grab html content from browser
        return {
          html: document.querySelector(confluenceSelector).innerHTML, // HTML element where the content is located
          title: document.title // title of document
        }
      }, confluenceSelector)
      .end() // close Electron browser
      .then(obj => { // render html
        $ = cheerio.load(obj.html.toString()); // read file in

        $('ul li>a').each(function() { // find all links
          if ($(this).html().indexOf('<s>') > -1) { // skip strike through links
          } else if ($(this).attr('href').indexOf('jira.') > -1) { // if the link uses 'jira.' as part of it's URL, assume it's a Jira ticket link
            confluenceList.push($(this).text().replace(/ /g,'')); // push the link into an array after removing any spaces from the text
          }
        });

        var jiraArray = [];

        request(arguments.jira, function(error, response, body) { // grab content from Jira release board (doesn't require a login since the project is public)
          if (!error && response.statusCode == 200) {
            $ = cheerio.load(body.toString());
            $('section.aui-page-panel-content li a').each(function() { // find all links
              if ($(this).text() != 'Configure Release Notes') {
                jiraArray.push($(this).text())
              }
            });

            let confluenceDiff = confluenceList.filter(x => !jiraArray.includes(x)).sort(); // find the differences between Confluence and Jira lists
            let jiraDiff = jiraArray.filter(x => !confluenceList.includes(x)).sort(); // find the differences between Jira and Confluence lists

            function uniq(a) { // remove duplicates in an array
              var seen = {};
              return a.filter(function(item) {
                  return seen.hasOwnProperty(item) ? false : (seen[item] = true);
              });
            }

            if (confluenceDiff.length > 0) {
              console.log('Listed in release note but not found in Jira:');
              var confluenceUniq = uniq(confluenceDiff);
              for (i in confluenceUniq) {
                console.log(confluenceUniq[i]);
              }
            } else {
              console.log('There was no differences between release note and Jira release board ticket lists.');
            }
            if (jiraDiff.length > 0) {
              console.log('Listed in Jira but not found in release note:');
              var jiraUniq = uniq(jiraDiff);
              for (i in jiraUniq) {
                console.log(jiraUniq[i]);
              }
            } else {
              console.log('There was no difference between Jira release board and release note ticket lists')
            }
          } else {
            console.log('Error! Cannot find "' + arguments.jira + '".');
          }
        });
      })
      .catch(error => { // catch any errors
        console.error(error);
      });
  }
}
run();
