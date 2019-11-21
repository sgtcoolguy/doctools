'use strict';

const path = require('path');
const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);
const fs = require('fs-extra');

// Upload the zip files underneath the zoomin folders to:
// Staging: upload.zoominsoftware.io username: axway, dir: /axway.zoominsoftware.io/
// Production: upload.zoominsoftware.io username: axway, dir: /docs.axway.com/
const USERNAME = 'axway';
const SERVER = 'upload.zoominsoftware.io';
const STAGING_PATH = '/axway.zoominsoftware.io/confluence/incoming/';
const PRODUCTION_PATH = '/docs.axway.com/confluence/incoming/';

/**
 * @param {string[]} zipFileNames absolute paths to zip files to upload
 * @param {string} remotePath remote directory to upload file to
 * @param {string[]} [args=[]] extra command line arguments to pass to the sftp command (typically to specify the private key to use, via -i /path/to/id_rsa)
 */
async function uploadZips(zipFileNames, remotePath, args = []) {
	for (const file of zipFileNames) {
		const baseName = path.basename(file);
		const dir = path.dirname(file);
		// execute in the directory containing the file, use one-liner to upload special zip file
		console.log(`Uploading ${file} to ${SERVER}:${remotePath}${baseName}`);
		await exec(`sftp ${args.join(' ')} ${USERNAME}@${SERVER}:${remotePath} <<< $'put ${baseName}'`, { cwd: dir });
	}
}

async function main(args = []) {
	// Gather all the special zoomin zip files to upload
	// TODO: Probably easier to use glob
	const zoominDir = path.join(__dirname, 'zoomin');
	const dirs = (await fs.readdir(zoominDir)).filter(d => d !== '.DS_Store');
	const zipFileNames = await Promise.all(dirs.map(async d => {
		const files = await fs.readdir(path.join(zoominDir, d));
		const zipFile = files.find(f => f.endsWith('.zip'));
		return path.join(zoominDir, d, zipFile);
	}));
	// First upload to staging
	await uploadZips(zipFileNames, STAGING_PATH, args);
	// then to production
	return uploadZips(zipFileNames, PRODUCTION_PATH, args);
}

// TODO: Use commander to process args, allow specifying staging or production
main(process.argv.slice(2)).then(() => {
	console.log('Successfully uploaded zoomin zips to sync content');
	process.exit(0);
}).catch (err => {
	console.error(err);
	process.exit(1);
});