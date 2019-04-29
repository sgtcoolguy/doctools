/*
  Purpose: Scrape https://github.com/appcelerator/titanium_mobile/blob/master/support/module/packaged/modules.json to gather SDK module version info for use in the SDK release notes
  Usage:

  
*/

const Nightmare = require("nightmare");
const cheerio = require('cheerio');
const program = require('commander');
const fs = require('fs');

const nightmare = Nightmare({
    show: false // use false if you don't want to see Electron "jumping through all the hoops"
});
const selector = 'div.Box-body.p-0.blob-wrapper.data.type-json table'; // selector of the SDK module version content
const site = 'https://github.com/appcelerator/titanium_mobile/blob/master/support/module/packaged/modules.json';
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

// ** commander stuff (if necessary)

console.log('Getting SDK module version information from "' + site + '"')
nightmare
  .goto(site) // go to the required document.
  .evaluate(selector => { // grab html content from browser
    console.log(document.querySelector(selector).innerHTML)
    return {
      html: document.querySelector(selector).innerHTML, // HTML element where the content is located
    }
  }, selector)
  .end() // close Electron browser
  .then(obj => { // render html
    $ = cheerio.load(obj.html.toString()); // read object in

    var output = ''; // string to hold the names of the documents

    $('td[id^="LC"] span+span').each(function() {
      var text = $(this).text();
      if (text.indexOf('.zip') > -1) { // hyperloop
        console.log(text)
        if (text.indexOf('hyperloop') > -1) {
          modules.hyperloop.hyperloop = text.slice(text.lastIndexOf('/') + 11, text.length - 5);
        }
        if (text.indexOf('ti.cloud-commonjs') > -1) { // commonjs
          modules.commonjs.ti_cloud = text.slice(text.indexOf('ti.cloud-commonjs') + 18, text.length - 5);
        }

        var modulesId = ['ti.identity-android', 'ti.identity-iphone', 'ti.playservices-android', 'ti.touchid-android', 'ti.touchid-iphone', 'ti.cloudpush-android', 'facebook-android', 'facebook-iphone', 'ti.webdialog-android', 'ti.webdialog-iphone', 'ti.map-android', 'ti.map-iphone', 'urlSession-iphone', 'ti.coremotion-iphone', 'ti.safaridialog-iphone']; // ids to search for in the text. If a new module is added, update this array with the appropriate module id

        for (i in modulesId) { // loop through the arrays to gather module version info for both android and ios
          var name = modulesId[i].replace('.','_').replace('-', '.');
          getModule(text, modulesId[i], name);
        }
      }
    });

    function getModule(text, id, moduleNamePlatform) {
      var moduleName = moduleNamePlatform.split('.')[0];
      var platform = moduleNamePlatform.split('.')[1];
      if (platform == 'android') {
        if (text.indexOf(id) > -1) {
          modules.module[moduleName][platform] = text.slice(text.indexOf(id) + (id.length + 1), text.length - 5);
        }
      } else {
        if (text.indexOf(id) > -1) {
          modules.module[moduleName].ios = text.slice(text.indexOf(id) + (id.length + 1), text.length - 5);
        }
      }
    }

    console.log(modules);

    // create an HTML document with a simple table
    for (i in modules) {

    }

    // fs.writeFileSync(confluenceSiteMap, output, 'utf8'); // save out pages names
  })
  .catch(error => { // catch any errors
    console.error(error);
  });``

  // function temp(text) {
  //   console.log(text);
  //   console.log(typeof(text));
  //   for (i in modules.module) {
  //     // console.log(i)
  //     if (modules.module[i].android.htmlId) {
  //       console.log(modules.module[i].android.htmlId)
  //       console.log(typeof(modules.module[i].android.htmlId))
  //       // console.log(typeof('string'))
  //       // if (text.indexOf(modules.module[i].android.htmlId) > -1) {
  //       //   console.log('yup')
  //       // }
  //     }
  //     // if (modules.module[i].android.htmlId) {
  //     //   console.log('htmlId: ' + modules.module[i].android.htmlId)
  //     // }
  //
  //     // if (text.indexOf(modules.module[i].android.match) > -1) {
  //     //   console.log('found ' + i)
  //     // }
  //   }
    // console.log(target);
    // if (text.indexOf(target) > -1) {
    //   return obj = 'cheese'
    // }
    // if (text.indexOf('ti.playservices-android') > -1) {
    //   modules.module.ti_playservices.android = text.slice(text.indexOf('ti.playservices-android') + 24, text.length - 5);
    // }
  // }

  function getVersion(text, target, obj) {
    // console.log(text)
    // return 'cheese';
    // console.log('target: ' + target)
    // console.log()
    if (text.indexOf(target) > -1) {
      // console.log(text.slice(text.indexOf(target), text.length))
      var temp = text.slice(text.indexOf(target) + (target.length + 1), text.length - 5);
      console.log(temp)
      return temp
    }
    // var temp = text.split('"');
    // for (i in temp) {
    //   if (temp[i].indexOf(target) > -1) {
    //     return 'cheeseburger'
    //   }
    // }

    // var temp = text.split('"');
    // // console.log(temp)
    // for (i in temp) {
    //   if (temp[i].indexOf(target) > -1) {
    //     console.log(temp[i])
    //     console.log(temp[i].slice(temp[i].lastIndexOf('/') + (target.length + 2), temp[i].length - 4))
    //     // console.log(temp[i].slice(temp[i].indexOf(target) + (target.legnth + 1), temp[i].length - 5))
    //     return temp[i].slice(temp[i].lastIndexOf('/') + (target.length + 2), temp[i].length - 4);
    //   }
    // }


    // if (text.indexOf(target) > -1) {
    //   console.log(text.slice(text.indexOf(target) + (target.legnth + 1), text.length - 5))
    // }

    // if (text.indexOf(target) > -1) {
    //   obj = text.slice(text.indexOf(target) + target.length + 1, text.length - 5);
    //   // console.log(text.slice(text.indexOf(target) + target.length + 1, text.length - 5))
    // }
  }


  // $('tr').each(function() {
  //   // output += $(this).text();
  //   var text = $(this).text();
  //
  //   //			"url": "https://github.com/appcelerator-modules/titanium-identity/releases/download/android-2.1.0/ti.identity-android-2.1.0.zip",
  //   if (text.indexOf('ios') > -1) {
  //     if ($(this).next().text().indexOf('urlSession') > -1) {
  //       var value = $(this).next().next().text().split('/');
  //       modules.module.urlSession.ios = value[value.length -2].replace('v','');
  //     }
  //     // console.log($(this).next().text())
  //     // if ($(this).next().text().indexOf('facebook') > -1) {
  //     //   // console.log($(this).next().next().text())
  //     //   var value = $(this).next().next().text().split('/');
  //     //   console.log(value)
  //     //   // modules.module.urlSession.ios = value[value.length -2].replace('v','');
  //     // }
  //   }
  //   // if (text.indexOf('ios') > -1) {
  //   //   console.log($(this).next().text())
  //   //   // if ($(this).next().text().indexOf('facebook') > -1) {
  //   //   //   console.log('facebook')
  //   //   // }
  //   // }
  //
  //
  //   // grab ti.cloud version
  //   if (text.indexOf('ti.cloud') > -1 && text.indexOf('https') > -1) {
  //     var temp = text.split('/');
  //     modules.commonjs.ti_cloud = temp[temp.length - 2];
  //   }
  //   // grab hyperloop version
  //   if (text.indexOf('hyperloop') > -1 && text.indexOf('https') > -1) {
  //     var temp = text.split('/');
  //     for (i in temp) {
  //       if (temp[i].match(/v\d/)) {
  //         modules.hyperloop.hyperloop = temp[i].slice(1,temp[i].length);
  //         break;
  //       }
  //     }
  //   }
  // });
