var fs = require('fs');
var shell = require('shelljs');

shell.ls('/Users/bimmel/Documents/Repositories/appc_web_docs/platform/latest/output/*.js').map(function(file) {
  console.log('Converting ' + file + ' into JSON format');
  var fileName = 'JSON-' + file.slice(file.lastIndexOf('/') + 1, file.length);
  // console.log(fileName)

  function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
  }

  var output = read(file, function(data) {
      var data = data.toString().split(/:/);
      var output = '';
      for (i in data) {
        if (data[i].indexOf('Ext.data.JsonP') > -1) { // clean up opening line
          output += '{"tagname":';
        } else if (data[i].indexOf('});\n') > -1) { // clean up ending line
          output += '"}';
        } else {
          output += data[i] + ':';
        }
      }
      // misc cleanup
      var matchList = ['>"});:','> :"}']; // items to find in content that needs to be replaced
      var cleanupList = ['>"}','>"}']; // item that will replace the matched item from the matchList
      for (i in matchList) {
        if (output.indexOf(matchList[i]) > -1) {
          output = output.replace(matchList[i],cleanupList[i]);
        }
      }
      if (output.indexOf('span> : ') > -1) {
        output = output.replace(/span> : /g,'span>: ');
      }
      if (output.indexOf(' ) : ') > -1) {
        output = output.replace(/ \) : /g,' ): ');
      }
      if (output.indexOf('( ') > -1) {
        output = output.replace(/\( /g,'(');
      }
      if (output.indexOf(' )') > -1) {
        output = output.replace(/ \)/g,')');
      }

      fs.writeFileSync('./json_files/' + fileName, output);
  });
});
