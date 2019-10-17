// Just use normal API here: https://lucene.apache.org/solr/guide/6_6/uploading-data-with-index-handlers.html#uploading-data-with-index-handlers
// We should be able to just POST to:
// http://34.214.104.105:8983/solr/#/appc_doc/update/json/docs?json.command=false
// with Content-Type: application/json
// overwrite should default to true
// curl 'http://34.214.104.105:8983/solr/appc_doc/update/json/docs?json.command=false' --data-binary @dist/solr.json -H 'Content-type:application/json'

const path = require('path');
const fs = require('fs-extra');
const axios = require('axios');

const BASE_URL = 'http://34.214.104.105:8983/solr/appc_doc';
const workingDir = process.cwd();

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size) {
    let results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size))
    }

    return results;
}
async function postJSON(json) {
	return axios.post(`${BASE_URL}/update?commit=true`, json);
}

async function uploadFile(file) {
	const filepath = path.resolve(workingDir, file);
	const json = await fs.readJSON(filepath);
	// To help avoid issues, if json is an Array split and do like 1000 objects at a time
	if (Array.isArray(json)) {
		console.log('Chunking array of documents to POST into documents of length <= 1000 at a time');
		const chunks = chunkArray(json, 1000);
		return Promise.all(chunks.map(c => postJSON(c)));
	}
	return postJSON(json);
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
