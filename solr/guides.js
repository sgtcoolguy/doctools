const path = require('path');
const fs = require('fs-extra');
const axios = require('axios');
const FormData = require('form-data');
const pThrottle = require('p-throttle');

const BASE_URL = require('./constants').BASE_URL;
const TYPE = 'platform';
const workingDir = process.cwd();

// Throttle calls to server to only 2 per second to try and avoid overloading it
// This does seem to work. It'd be good to try and see if we can't do more per-second and still avoid time outs
const throttledPost = pThrottle(axios.post, 2, 1000);

async function uploadGuide(guideDir) {
	const dir = path.basename(guideDir);
	const id = `${dir}-${TYPE}`;
	const url = dir;
	const form = new FormData();
	const htmlFile = fs.createReadStream(path.join(guideDir, 'README.html'));
	form.append('myfile', htmlFile);
	return throttledPost(
		`${BASE_URL}/update/extract?literal.id=${id}&literal.url=${url}&literal.type=${TYPE}&commitWithin=600000&commit=true`,
		form,
		{ headers: form.getHeaders() }
	);
}

// TODO: Use Promise.all to run all files in parallel? We should probably limit the number of uploads simultaneously though!
// Even running in series, I ended up with a connection timeout eventually
// Can we catch timeouts and "back off"?
async function uploadGuides(dir) {
	const dirpath = path.resolve(workingDir, dir);
	const dirs = await fs.readdir(dirpath);
	// ignore guides.json!
	const filtered = dirs.filter(d => !d.endsWith('.json'));
	for (const subdir of filtered) {
		try {
			await uploadGuide(path.join(dirpath, subdir));
			console.log(`Uploaded guide: ${subdir}`);
		} catch (err) {
			if (err.code === 'ETIMEDOUT') {
				// can we "sleep"/back off for a little while and retry resuming here?
			}
			throw err;
		}
	}
}

async function main(dirs) {
	for (const dir of dirs) {
		await uploadGuides(dir);
		// console.log(result); // Do we need to check result.data.responseHeader.status === 0?
		// result.data.QTime is the milliseconds to execute operation
	}
}

// TODO: We really need a nice way to pass in the wiki pages/guides that actually changed so we don't have to upload them *all* every time
main(process.argv.slice(2))
	.then(() => process.exit(0))
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

