// Just use normal API here: https://lucene.apache.org/solr/guide/6_6/uploading-data-with-index-handlers.html#uploading-data-with-index-handlers
// We should be able to just POST to:
// http://52.37.19.182:8983/solr/#/appc_doc/update/json/docs?json.command=false
// with Content-Type: application/json
// overwrite should default to true
// curl 'http://52.37.19.182:8983/solr/appc_doc/update/json/docs?json.command=false' --data-binary @dist/solr.json -H 'Content-type:application/json'

const path = require('path');
const fs = require('fs-extra');
const axios = require('axios');

const BASE_URL = 'http://52.37.19.182:8983/solr/appc_doc';
const workingDir = process.cwd();

async function uploadFile(file) {
	const filepath = path.resolve(workingDir, file);
	const json = fs.readJSON(filepath);
	return axios.post(`${BASE_URL}/update/json/docs?json.command=false`, json);
}

async function main(files) {
	for (const file of files) {
		const result = await uploadFile(file);
		console.log(result); // Do we need to check result.data.responseHeader.status === 0?
		// result.data.QTime is the milliseconds to execute operation
	}
}

main(process.argv.slice(2))
	.then(() => process.exit(0))
	.catch(err => {
		console.error(err);
		process.exit(1);
	});
