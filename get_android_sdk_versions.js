/*
  Purpose: Get the Android SDK versions for the Android SDK / Target Android platform section of https://wiki.appcelerator.org/x/M5S6AQ
  Usage: node get_android_sdk_versions.js -r #_# -d 5000
  Documentation: https://wiki.appcelerator.org/x/hxN1Aw
*/

const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const request = require('request');
const nightmare = Nightmare({
  show: false // use false if you don't want to see Electron "jumping through all the hoops"
});
const program = require('commander');
const selector = 'table.highlight'; // selector of where Github content can be found
var arguments = {}; // object to hold the entered arguments

program // set up flags
  .version('0.0.1')
  .usage('-release <#_#> -d <milliseconds>')
  .option('-r, --release', '*required* Version number of the release. For example: 8_0')
  .option('-d, --delay', 'Delay (in milliseconds) to wait for server response')
  .parse(process.argv);

for (var i = 0; i < program.rawArgs.length; i++) { // loop through the array of raw arguments to gather the entered arguments
  if (program.rawArgs[i] == '--release' || program.rawArgs[i] == '-r') {
    arguments.release = program.rawArgs[i + 1];
  }
  if (program.rawArgs[i] == '--delay' || program.rawArgs[i] == '-d') {
    arguments.delay = parseInt(program.rawArgs[i + 1]);
  }
}

if (!arguments.delay) { // if the delay flag isn't set, assume 10 seconds
  arguments.delay = 10000; // default the delay of the server response time to ten seconds
  console.log('Server response delay not set. Assuming ' + arguments.delay + ' millisecond delay.');
}

if (!arguments.release) { // required flag not supplied
  console.log('Release version number is required. For example: 8_0. Quitting attempt.');

  process.exit(1);
} else {
  nightmare
    .goto('https://github.com/appcelerator/titanium_mobile/blob/' + arguments.release + '_X/android/package.json') // go to the repo where the android info is found
    .wait(arguments.delay) // wait for server to respond
    .evaluate(selector => { // grab html content from browser
      return {
        html: document.querySelector(selector).innerHTML, // HTML element where the content is located
        title: document.title // title of document
      }
    }, selector)
    .end() // close Electron browser
    .then(obj => { // render html
      console.log('Grabbing contents from "' + obj.title + '".');

      var minSDKVersion = ''; // Minimum Android/SDK Version
      var androidSdkMin = ''; // Min Target Android/SDK Version
      var androidSdkMax = ''; // Max Target Android/SDK Version

      $ = cheerio.load(obj.html.toString()); // read document object

      $('td').each(function() { // loop through the table to find the version info
        if ($(this).text().indexOf('minSDKVersion') > -1) { // min android
          minSDKVersion = $(this).text().split('": "')[1].replace('",', '');
        }

        if ($(this).text().indexOf('"android sdk":') > -1) { // sdk min/max
          var text = $(this).text().split(' ');
          androidSdkMin = text[2].replace('">=', '').replace('.x', '');
          androidSdkMax = text[3].replace('<=', '').replace('.x",', '')
        }
      });

      request('https://source.android.com/setup/start/build-numbers', function(error, response, body) { // figure out android info
        console.log('Getting Android build numbers from Android release note.\n')
        if (!error && response.statusCode == 200) { // if the document loads without any errors, process it's data
          $ = cheerio.load(body.toString()); // read document object

          var table = []; // array to hold table data

          $('td').each(function() { // gather Android API data  based on the info found in the only table element
            table.push($(this).text());
          });

          for (var i = 0; i < table.length; i++) { // report the Android versions
            if (table[i] == 'API level ' + androidSdkMin) {
              console.log('Min Target Android/SDK Version: ' + table[i - 1] + '.x (' + table[i].replace('level ', '') + ')');
            }
            if (table[i] == 'API level ' + androidSdkMax) {
              console.log('Max Target Android/SDK Version: ' + table[i - 1] + '.x (' + table[i].replace('level ', '') + ')');
            }
            if (table[i] == 'API level ' + minSDKVersion) {
              if (table[i - 1].indexOf(' - ') > -1) { // sometimes the version info will contain extra info (formatted like this: 4.4 - 4.4.x)
                console.log('Minimum Android/SDK Version: ' + table[i - 1].slice(0, table[i - 1].indexOf(' - ')) + '.x (' + table[i].replace('level ', '') + ')');
              } else {
                console.log('Minimum Android/SDK Version: ' + table[i - 1] + '.x (' + table[i].replace('level ', '') + ')');
              }
            }
          }

          console.log('\nBe sure to cross reference this is info in https://github.com/appcelerator/titanium_mobile/blob/master/android/package.json (replacing master with the version) and https://developer.android.com/studio/releases/platforms.')
        }
      });
    });
}
