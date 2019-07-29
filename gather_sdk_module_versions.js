/*
  Purpose: Scrape https://github.com/appcelerator/titanium_mobile/blob/master/support/module/packaged/modules.json to gather SDK module version info for use in the SDK release notes
  Usage: node gather_sdk_module_versions.js -r #_#

  See https://wiki.appcelerator.org/x/pq6VAw for more details.
*/

const Nightmare = require("nightmare");
const cheerio = require('cheerio');
const fs = require('fs');
const opn = require('opn');
const program = require('commander');

program // set up flags
  .version('0.0.2')
  .usage('-r <release version>')
  .option('-r, --release', '*required* Version (release) of SDK (#_#)')
  .parse(process.argv);

var arguments = {}; // object to hold the entered argument(s)

for (var i = 0; i < program.rawArgs.length; i++) { // loop through the array of raw arguments to gather the entered arguments
  if (program.rawArgs[i] == '--release' || program.rawArgs[i] == '-r') {
    arguments.release = program.rawArgs[i + 1];
  }
}

if (!arguments.release) { // user id is required
  console.warn('SDK version number (#_#_X) is required. Quitting.');

  process.exit(1);
} else {
  const nightmare = Nightmare({
    show: false // use false if you don't want to see Electron "jumping through all the hoops"
    });
    const selector = 'div.Box-body.p-0.blob-wrapper.data.type-json table'; // selector of the SDK module version content
    var site = 'https://github.com/appcelerator/titanium_mobile/blob/' + arguments.release + '_X/support/module/packaged/modules.json';

    var modules = {
    module: {
      urlSession: {
        android: 'n/a',
        ios: 'n/a'
      },
      facebook: {
        android: 'n/a',
        ios: 'n/a'
      },
      ti_coremotion: {
        android: 'n/a',
        ios: 'n/a'
      },
      ti_map: {
        android: 'n/a',
        ios: 'n/a'
      },
      ti_safaridialog: {
        android: 'n/a',
        ios: 'n/a'
      },
      ti_webdialog: {
        android: 'n/a',
        ios: 'n/a'
      },
      ti_touchid: {
        android: 'n/a',
        ios: 'n/a'
      },
      ti_identity: {
        android: 'n/a',
        ios: 'n/a'
      },
      ti_cloudpush: {
        android: 'n/a',
        ios: 'n/a'
      },
      ti_playservices: {
        android: 'n/a',
        ios: 'n/a'
      }
    },
    commonjs: {
      ti_cloud: 'n/a',
    },
    hyperloop: {
      hyperloop: 'n/a'
    }
    }

    console.log('Getting SDK module version information for "' + arguments.release + '" release.')
    nightmare
    .goto(site) // go to the required document.
    .evaluate(selector => { // grab html content from browser
      return {
        html: document.querySelector(selector).innerHTML, // HTML element where the content is located
      }
    }, selector)
    .end() // close Electron browser
    .then(obj => { // render html
      $ = cheerio.load(obj.html.toString()); // read HTML object

      $('td[id^="LC"] span+span').each(function() {  // scan td elements for module version info
        var text = $(this).text(); // text of each td element
        if (text.indexOf('.zip') > -1) { // hyperloop sits outside the Android and iOS table
          if (text.indexOf('hyperloop') > -1) {
            modules.hyperloop.hyperloop = text.slice(text.lastIndexOf('/') + 11, text.length - 5);
          }
          if (text.indexOf('ti.cloud-commonjs') > -1) { // commonjs sits outside the Android and iOS table
            modules.commonjs.ti_cloud = text.slice(text.indexOf('ti.cloud-commonjs') + 18, text.length - 5);
          }

          var modulesId = ['ti.identity-android', 'ti.identity-iphone', 'ti.playservices-android', 'ti.touchid-android', 'ti.touchid-iphone', 'ti.cloudpush-android', 'facebook-android', 'facebook-iphone', 'ti.webdialog-android', 'ti.webdialog-iphone', 'ti.map-android', 'ti.map-iphone', 'urlSession-iphone', 'ti.coremotion-iphone', 'ti.safaridialog-iphone']; // ids to search for in the text. If a new module is added, update this array with the appropriate module id

          for (i in modulesId) { // loop through the arrays to gather module version info for both android and ios
            var name = modulesId[i].replace('.','_').replace('-', '.');
            getModule(text, modulesId[i], name);
          }
        }
      });

      var output = '<p>You may copy and paste the following tables into your release note section for the SDK module version info</p><hr/><h3>Android and iOS</h3><table><tr><th>Module</th><th>Android version</th><th>iOS version</th></tr>' // begin building HTML elements

      for (i in modules.module) { // module version output
        output += '<tr>';
        output += '<td>' + i + '</td>';
        output += '<td>' + modules.module[i].android + '</td>';
        output += '<td>' + modules.module[i].ios + '</td>';
        output += '</tr>';
      }

      output += '</table><h3>CommonJS</h3><table><tr><th>Module</th><th>Version</th></tr>'; // commonjs output
      output += '<tr><td>ti.cloud</td><td>' + modules.commonjs.ti_cloud + '</td></tr></table>';
      output += '<h3>Hyperloop</h3><table><tr><th>Module</th><th>Version</th></tr>';
      output += '<tr><td>Hyperloop</td><td>' + modules.hyperloop.hyperloop + '</td></tr></table>';

      fs.writeFileSync('./sdk_module_versions/sdk_module_versions_' + arguments.release + '.html', output, 'utf8'); // write out the HTML document

      opn('./sdk_module_versions/sdk_module_versions_' + arguments.release + '.html'); // open HTML document in default browser
    })
    .catch(error => { // catch any errors
      console.error(error);
  });
}

function getModule(text, id, moduleNamePlatform) {
  var moduleName = moduleNamePlatform.split('.')[0]; // module name
  var platform = moduleNamePlatform.split('.')[1]; // module platform (android or ios)
  if (platform == 'android') {
    if (text.indexOf(id) > -1) {
      modules.module[moduleName][platform] = text.slice(text.indexOf(id) + (id.length + 1), text.length - 5);
    }
  } else { // assume module is for iOS
    if (text.indexOf(id) > -1) {
      modules.module[moduleName].ios = text.slice(text.indexOf(id) + (id.length + 1), text.length - 5);
    }
  }
}