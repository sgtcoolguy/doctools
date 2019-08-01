/*
	Purpose: take an text file generated from modules_list.sh and pull module name, version, dependencies, and/or license information for each NPM module included in said text file.
	
	See https://wiki.appcelerator.org/x/PrHBAg for more details.
*/

var fs = require('fs');
var fileName = process.argv[2]; // should receive modules_list.txt
var option = process.argv[3]; // should receive which report to run ([module] name, version, dependencies, license)
//console.log(fileName);
console.log(option); // 'license'
var modules = fs.readFileSync(fileName).toString(); // get file will all modules
//console.log(modules);
var myArray = [];
var block = modules.split('###');

var blockArray = [];
for (var i = 0; i < block.length; i++) {
	blockArray.push(block[i].split("\n"));
}
//console.log(blockArray);
var findings = "";
if (option == "name") {
	findings += "Report on module names\n\n";
} else if (option == "version") {
	findings += "Report on module versions\n\n";
} else if (option == "dependencies") {
	findings += "Report on module dependencies\n\n";
} else if (option == "license") {
	console.log(option);
	findings += "Report on module license\n\n";
} else {
	console.log("Invalid report option. Please re-run with the option of name, version, dependencies, or license.");
	process.exit(0);
}

for (i in blockArray) {
	//var temp = [];
	for (j in blockArray[i]) {
		switch (option) {
			case "name":
				if (blockArray[i][j].indexOf("{ name:") > -1) {
					preString = "{ name: '";
					searchString = "',";
					var preIndex = blockArray[i][j].indexOf(preString);
					var searchIndex = preIndex + blockArray[i][j].substring(preIndex).indexOf(searchString);
					var moduleName = blockArray[i][j].substr(preIndex + 9,searchIndex - 9);
					findings += moduleName + "\n";
				}
				break;
			case "version":
				if (blockArray[i][j].indexOf("{ name:") > -1) {
					preString = "{ name: '";
					searchString = "',";
					var preIndex = blockArray[i][j].indexOf(preString);
					var searchIndex = preIndex + blockArray[i][j].substring(preIndex).indexOf(searchString);
					var moduleName = blockArray[i][j].substr(preIndex + 9,searchIndex - 9);
				}
				if (blockArray[i][j].indexOf("  'dist-tags': { latest: '") > -1) {
					preString = "  'dist-tags': { latest: '";
					searchString = "' },";
					var preIndex = blockArray[i][j].indexOf(preString);
					var searchIndex = preIndex + blockArray[i][j].substring(preIndex).indexOf(searchString);
					var version = blockArray[i][j].substr(preIndex + 26,searchIndex - 26);
					findings += moduleName + "::" + version + "\n";
				}
				break;
			case "dependencies":
				if (blockArray[i][j].indexOf("dependencies: {") > -1) {
					preString = "dependencies: {";
					searchString = "},";
					var preIndex = blockArray[i][j].indexOf(preString);
					var searchIndex = preIndex + blockArray[i][j].substring(preIndex).indexOf(searchString);
					var dependencies = blockArray[i][j].substr(preIndex + 16,searchIndex - 20);
					if (dependencies.length <= 0) {
						//console.log("No dependencies");
					} else {
						//console.log(moduleName + "'s dependencies: " + dependencies);
						//findings.push(moduleName + "'s dependencies: " + dependencies);
						//temp.push(moduleName + "'s dependencies: " + dependencies);
						findings += dependencies + "\n";
					}
				} // ** what happens if a dependency isn't defined?? currently, nothing is printed
				break;
			case "license":
				if (blockArray[i][j].indexOf("{ name:") > -1) {
					preString = "{ name: '";
					searchString = "',";
					var preIndex = blockArray[i][j].indexOf(preString);
					var searchIndex = preIndex + blockArray[i][j].substring(preIndex).indexOf(searchString);
					var moduleName = blockArray[i][j].substr(preIndex + 9,searchIndex - 9);
				}
				if (blockArray[i][j].indexOf("  license: '") > -1) {
					preString = "  license: '";
					searchString = "',";
					var preIndex = blockArray[i][j].indexOf(preString);
					var searchIndex = preIndex + blockArray[i][j].substring(preIndex).indexOf(searchString);
					var license = blockArray[i][j].substr(preIndex + 12,searchIndex - 12);
					if (license.length <= 0) {
						//console.log("No license");
						findings += moduleName + "::has no license info\n";
					} else {
						findings += moduleName + "::" + license + "\n";
					}
				}
				break;
			default:
				console.log("Invalid report option. Please re-run with the option of name, version, dependencies, or license.");
				process.exit(0);
				break;
		}
	}
}

console.log(findings);

// write out findings
if (findings.length <= 0) {
	if (option == "dependencies") {
		console.log("No dependencies found for this list.");
	} else if (option == "license") {
		console.log("No license found for this list.");
	}
} else {
	fs.writeFileSync("./module_list-" + option + ".txt", findings);
}