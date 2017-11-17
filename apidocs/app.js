var fs   = require('fs');
var YAML = require('yamljs');

var file = 'KeychainItem';
var myString = '/Users/bimmel/Documents/Repositories/doctools/apidocs/yaml/' + file + '.yml';

var nativeObject = YAML.load(myString);
var yamlString = YAML.stringify(nativeObject, 4);
var nativeObject = YAML.parse(yamlString);
console.log(nativeObject);

fs.writeFileSync(file + '.json',nativeObject);
