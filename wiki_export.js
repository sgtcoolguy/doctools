const axios = require('axios');
const path = require('path');
const fs = require('fs');

async function requestExport(username, password) {
	const url = `https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/export?exportSchemeId=guides2-7F000001015A6C6CD20B1E0B58AE1D82&rootPageId=29004729&os_username=${username}&os_password=${password}`;
	const response = await axios.get(url);
	return response.data.id;
}

async function main(username, password) {
	const taskId = await requestExport(username, password);
	await pollForExport(taskId, username, password);
	return downloadExport(taskId, username, password);
}

async function pollForExport(taskId, username, password) {
	while (true) {
		const status = await queryExportStatus(taskId, username, password);
		console.log(`Wiki export http status: ${status}`);
		if (status === 200) {
			return;
		}
		// wait 30 seconds!
		await delay(30000);
	}
}

async function delay(ms) {
	// return await for better async stack trace support in case of errors.
	return await new Promise(resolve => setTimeout(resolve, ms));
  }

async function queryExportStatus(taskId, username, password) {
	const url = `https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/export/${taskId}?os_username=${username}&os_password=${password}`
	const response = await axios({
		method: 'head',
		url,
	});
	return response.status;
}

async function downloadExport(taskId, username, password) {
	const outputFile = path.join(__dirname, 'wiki_export.zip');
	console.log(`Downloading wiki export to ${outputFile}`);
	const url = `https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/export/${taskId}?os_username=${username}&os_password=${password}`;
	const response = await axios({
		method: 'get',
		url,
		responseType: 'stream'
	});
	const contentLength = response.headers['content-length']
	console.log(`Expected filesize: ${contentLength}`);
	
	return new Promise((resolve, reject) => {
		const writeStream = fs.createWriteStream(outputFile);
		writeStream.on('finish', resolve);
		writeStream.on('end', resolve);
		writeStream.on('error', reject);
		response.data.pipe(writeStream);
	});
}

// FIXME: Allow breaking up process into just requesting and getting task id back; polling on task given id; or doing full request + polling/export
if (process.argv.length !== 4) {
	console.log('This script expects two arguments: username and password - used to interact with Confluence wiki APIs');
	process.exit(1);
}

main(process.argv[2], process.argv[3]).then(() => process.exit(0)).catch(err => {
	console.error(err);
	process.exit(1);
});

// TODO: Query to see if any wiki pages have been edited since our last export!
// Need to iterate over pagination of:
// curl -s -H Accept:application/json 'https://wiki.appcelerator.org/rest/api/content?type=page&spaceKey=guides2&expand=history.lastUpdated&limit=100'
// and check result[i].history.lastUpdated.when for a date string of format: "2012-04-20T17:30:38.000-0700"
