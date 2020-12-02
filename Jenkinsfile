#! groovy
library 'pipeline-library'

def nodeVersion = '10.19.0'

def isMainBranch = env.BRANCH_NAME.equals('docs')
def buildProperties = [
	// Keep logs/reports/etc of last 30 builds, only keep build artifacts of last 3 builds
	buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '3'))
]
// if on our main branch, trigger if a new wiki export happens
if (isMainBranch) {
	buildProperties << pipelineTriggers([
			upstream(
				threshold: 'SUCCESS',
				upstreamProjects: '../wiki-export/master'
			)
		])
}

properties(buildProperties)

// Overall workflow:
// wiki-export runs and generates a wiki export zipfile
// we do a checkout of doctools
// we process the wiki export to generate html/guides.json
// we check out sdk repos and lots of native module repos
// we generate a titanium.js file for JSDuck from the sdk/module apidoc files
// we run jsduck on the guides.json, titanium.js files to generate the doc site contents
// we generate solr json files from arrow, sdk/module apidocs, build/guides html contents
// weo copy around various assets/images/etc
// archive the generated site
// check it in to appc_web_docs (in effect firing off a new deploy/build there)
// we upload the solr files to server (so deploy of site can go forward while this happens) - they should finish around the same time, roughly

// So how can we re-arrange this?
// we can try to split apart the apidoc and wiki/guides sections, so updating either half is done entirely separately
// separate jobs for each half?
// (i.e. extend wiki-export to do the processing of guides, generation fo guides.json, updating solr?; 
// add new apidocs job/repo to do the apidoc checkouts/generation/solr updates?) Thenw e could work towards doing partial updates (i.e. don't re-upload entire wiki contents to solr, just changed pages since last export/build)
// both can be run in parallel, but must be finished to do the jsduck/final site contents


// Publish only on the 'docs' branch
def publish = isMainBranch
// FIXME: Sounds like zoomin uploads on production are busted, so temporarily turning off
// def pushToZoomin = publish
def pushToZoomin = false
def updateVuepress = publish

// Variables to tune to grab different branches of products
def SDK_BRANCH = 'master' // change to target branch to use for APIDoc generation: i.e. 7_4_X, master, 8_0_X
def ALLOY_BRANCH = 'master'  // change to target branch to use for alloy doc generation: i.e. master
def ARROW_BRANCH = 'master'  // change to target branch to use for arrow doc generation: i.e. master
// set of native modules to clone and include in docs
def MODULES = [
	'ti.map',
	'ti.facebook',
	'ti.nfc',
	// 'ti.newsstand', // This is archived and not useful anymore!
	'ti.cloud',
	'cloudpush',
	'ti.coremotion',
	'ti.crypto',
	'ti.urlsession',
	// 'ti.touchid', // Removed as deprecated/removed from SDK
	'titanium-identity',
	// 'Ti.SafariDialog', // Removed as deprecated/removed from SDK
	'ti.playservices',
	'ti.geofence',
	'appcelerator.https',
	'appcelerator.encrypteddatabase',
	'titanium-web-dialog',
	// 'ti.systemalert', // Removed since it has no apidoc folder
	'appcelerator.aca',
	'ti.barcode',
	'titanium-apple-sign-in'
	// TODO: add other modules?
	// 'ti.admob',
	// 'ti.compression',
	// 'titanium-socketio',
	// 'ti.ldap',
	// 'ti.framemetrics',
	// 'ti.airprint'
]

// FIXME: Newer build nodes are failing to install jsduck related stuff via bundler
// Not sure what specifically it needs that soem have but others do not!
//def nodeLabels = 'osx' // Need to use osx, because our sencha command zip is for osx right now!
// we need to use macos 10.13/10.14 or else the install of jsduck dependency v8 fails
def nodeLabels = 'osx-10.13 || osx-10.14'
node(nodeLabels) { 
	def SDK_DOC_DIR = '../titanium_mobile/apidoc'
	def alloyDirs = '../alloy/Alloy/lib ../alloy/docs/apidoc ../alloy/Alloy/builtins'
	def arrowDirs = '../arrow-orm/apidoc ../arrow-orm/lib/connector/capabilities/index.js ../arrow-orm/lib/collection.js ../arrow-orm/lib/connector.js ../arrow-orm/lib/error.js ../arrow-orm/lib/instance.js ../arrow-orm/lib/model.js ../arrow/apidoc ../arrow/lib/engines ../arrow/lib/api.js ../arrow/lib/arrow.js ../arrow/lib/block.js ../arrow/lib/middleware.js ../arrow/lib/router.js'
	def windowsArgs = '-a ../titanium_mobile_windows/apidoc/WindowsOnly -a ../titanium_mobile_windows/apidoc/Titanium'
	def moduleArgs = ''

	nodejs(nodeJSInstallationName: "node ${nodeVersion}") {
		ensureNPM('latest')

	// Can we do some stages like:
	// Checkout
	// Setup
	//   - Wiki
	//     - copy artifacts
	//     - npm run wiki:unzip
	//   - APIDocs
	//     - clone a bunch of repos
	// Build
	//   - Vuepress
	//     - npm run wiki:convert:vuepress
	//     - various scripts/copying to update
	//     - push to repo
	//   - docs.appcelerator.com
	//     - npm run wiki:redirects
	//     - npm run wiki:convert:html
	//     - docgen jsduck/JSDuck stuff
	//     - SOLR stuff
	//     - various asset copies/manipulation
	//     - upload to SOLR
	//     - push to appc_web_docs repo
	//   - appc-open-docs
	//     - npm run wiki:convert:markdown
	//     - various scripts/copying to update
	//     - push to repo

		sh 'mkdir -p doctools'
		dir('doctools') {
			// check out doctools
			stage('Setup') {
				checkout([
						$class: 'GitSCM',
						branches: scm.branches,
						extensions: scm.extensions + [
							[$class: 'CloneOption', depth: 0, honorRefspec: true, noTags: true, reference: '', shallow: true],
							[$class: 'CleanBeforeCheckout']
						],
						userRemoteConfigs: scm.userRemoteConfigs
					])
				sh 'npm ci'
			} // stage('Setup')

			// run the wiki export/conversion
			stage('Wiki') {
				dir('wiki') {
					copyArtifacts fingerprintArtifacts: true, projectName: '../wiki-export/master'
				}

				// Trigger Zoomin to sync up
				if (pushToZoomin) {
					withCredentials([sshUserPrivateKey(credentialsId: '190db4ff-79b3-459d-8cec-20048b3e91d5', keyFileVariable: 'SSH_KEY', passphraseVariable: 'PASSPHRASE', usernameVariable: 'USERNAME')]) {
						// Use our special keypair installed on Jenkins and set up with zoomin
						// (see https://axway.jiveon.com/docs/DOC-99675#jive_content_id_Connecting_to_Zoomins_SFTP_server for details on who to give public key to)
						// Also, avoid prompt about the host key
						sh 'npm run wiki:zoomin -- -i $SSH_KEY -oStrictHostKeyChecking=no'
					}
				}

				// Generate the various formats: html for jsduck/docs.appc.com; markdown for appc-open-docs; markdown for vuepress
				// build/guides for jsduck/docs.appc.com
				// build/appc-open-docs for appc-open-docs
				// build/titanium-docs for Vuepress
				sh 'npm run wiki:post-export'
			} // stage('Wiki')
		} // dir('doctools')

		// Then checkout modules/sdk/alloy/arrow
		stage('APIDocs Repos') {
			// Alloy
			sparseCheckout('appcelerator', 'alloy', ALLOY_BRANCH, [ 'Alloy/lib/', 'Alloy/builtins/', '!Alloy/builtins/moment.js', '!Alloy/builtins/moment/', 'docs/apidoc/' ])

			// Titanium Mobile
			sparseCheckout('appcelerator', 'titanium_mobile', SDK_BRANCH, [ 'apidoc/', 'package.json', 'package-lock.json' ])

			// Titanium Mobile Windows
			sparseCheckout('appcelerator', 'titanium_mobile_windows', SDK_BRANCH, [ 'apidoc/', 'package.json', 'package-lock.json', 'Source' ])
			dir('titanium_mobile_windows') {
				// generate more apidocs on demand...
				sh 'npm ci'
				dir('apidoc') {
					sh 'node ti_win_yaml'
					sh 'rm Titanium/Map.yml'
					sh 'rm -r Titanium/Map'
				} // dir('titanium_mobile_windows/apidoc')
			} // dir('titanium_mobile_windows')

			// Titanium Docs (Vuepress)
			shallowClone('titanium-docs', 'master')

			// Arrow
			sparseCheckout('appcelerator-archive', 'arrow', ARROW_BRANCH, [ 'apidoc/', 'lib/' ])

			// Arrow ORM
			sparseCheckout('appcelerator-archive', 'arrow-orm', ARROW_BRANCH, [ 'apidoc/', 'lib/' ])

			// Check out a series of native modules
			MODULES.each { mod ->
				sparseCheckout('appcelerator-modules', mod, 'master', [ 'apidoc/ '])
				moduleArgs += " ../${mod}/apidoc"
			} // MODULES.each
		} // stage('APIDocs Repos')

		stage('APIDocs') {
			dir('titanium-docs') {
				sh 'npm ci'

				// Copy converted wiki guides
				sh 'npm run clean:guide'
				// Remove sections we don't want in vuepress TODO: Have the markdown convert script do all the work to avoid this!
				sh 'rm -rf ../doctools/build/titanium-docs/docs/guide/AMPLIFY_Appcelerator_Services'
				sh 'rm -rf ../doctools/build/titanium-docs/docs/guide/AMPLIFY_Appcelerator_Services_Overview'
				sh 'rm -rf ../doctools/build/titanium-docs/docs/guide/AMPLIFY_CLI'
				sh 'rm -rf ../doctools/build/titanium-docs/docs/guide/AMPLIFY_Runtime_Services'
				sh 'rm -rf ../doctools/build/titanium-docs/docs/guide/Appcelerator_Dashboard'
				sh 'rm -rf ../doctools/build/titanium-docs/docs/guide/AMPLIFY_Dashboard'
				sh 'rm -rf ../doctools/build/titanium-docs/docs/guide/Axway_API_Builder'
				sh 'rm -rf ../doctools/build/titanium-docs/docs/guide/Mobile_Backend_Services'
				sh 'cp -R ../doctools/build/titanium-docs/docs/guide docs/guide'
				sh 'rm -rf docs/.vuepress/public/images/guide'
				sh 'cp -R ../doctools/build/titanium-docs/docs/.vuepress/public/images/guide docs/.vuepress/public/images/guide'
				sh 'rm -f docs/.vuepress/guide.json'
				sh 'cp -R ../doctools/build/titanium-docs/docs/.vuepress/guide.json docs/.vuepress/guide.json'

				// Re-generate API docs
				// sh 'npm run clean:api'// TODO: just run: sh 'npm run clean:api', then do copies. Can't do this until we generate the api.json sidebar file
				sh 'rm -rf docs/api'
				sh 'git checkout -- docs/api/README.md' // add back the index page
				sh "npm run docs:metadata -- ${moduleArgs}" // this will generate an api.json file from all of our apidocs
				sh "npm run docs:migrate -- ${moduleArgs}" // this will generate new markdown files from the api.json file
				// TODO: Update docs/.vuepress/api.json with generated files! This is the sidebar/navigation!

				if (updateVuepress) {
					// add all our changes to staged in git
					sh 'git add docs'
					def changes = getChangeString()
					writeFile file: 'commit.txt', text: "docs: update based on latest apidocs and guides\n\n${changes}"
					def status = sh returnStatus: true, script: 'git commit -F commit.txt' // commit it!
					if (status == 0) {
						pushGit(name: 'master') // push 'master' branch to github
					}
				} else {
					// Archive the results
					archiveArtifacts 'docs/'
				}
			}

			dir('doctools') {
				sh 'mkdir -p dist'
				// run docgen to generate build/titanium.js
				// First we generate APIdocs for titanium_mobile, modules, windows
				sh "npm run docgen -- -f jsduck -o ./build/ ${SDK_DOC_DIR} ${moduleArgs} ${windowsArgs}" // generates build/titanium.js
				// TODO: Can we specify multiple formats at once and get solr output too? Looks like it does work (though the output for result filenames is busted and repeats last format)
			}
		} // stage('APIDocs')

		def outputDir = './dist/platform/latest'
		// FIXME: Don't include solr index files in the dist/platform folder, appc_web_docs doesn't need them since we upload them in this job
		def solrDir = "${outputDir}/../data/solr"
		dir('doctools') {
			// run jsduck on that to generate html output (as well as point it at Alloy/Arrow JS files)
			stage('JSDuck') {
				dir('apidocs') {
					sh 'bundle install --path vendor/bundle' // install jsduck
				}
				sh "npm run jsduck ${alloyDirs} ${arrowDirs}"
			} // stage('JSDuck')

			// generate solr indices
			stage('Solr') {
				sh "mkdir -p ${solrDir}" // create output dir

				// SDK/modules apidocs search index
				sh "npm run docgen -- -f solr -o ./build/ ${SDK_DOC_DIR} ${moduleArgs} ${windowsArgs}"
				sh "cp ./build/api_solr.json ${solrDir}/."

				// Alloy search index
				dir('apidocs') {
					sh 'bundle exec jsduck --external "void,Callback,Backbone.Collection,Backbone.Model,Backbone.Events" --export full --meta-tags ./meta --pretty-json -o - ../../alloy/Alloy/lib ../../alloy/docs/apidoc > ../build/alloy.json'
				}
				sh "node apidocs/jsduck2json/alloy2solr.js ./build/alloy.json ${solrDir}/alloy_api.json"

				// Arrow Search Index
				// Looks like we just have a static version of arrow's output already?
				sh "cp ./solr/arrow_api.json ${solrDir}/arrow_api.json"
				// dir('apidocs') {
				// 	sh 'bundle exec jsduck --export full --meta-tags ./meta --pretty-json -o - ../../arrow-orm/apidoc ../../arrow-orm/lib/collection.js ../../arrow-orm/lib/connector.js ../../arrow-orm/lib/error.js ../../arrow-orm/lib/instance.js ../../arrow-orm/lib/model.js ../../arrow-orm/lib/connector/capabilities/index.js ../../arrow/apidoc ../../arrow/lib/engines ../../arrow/lib/api.js ../../arrow/lib/arrow.js ../../arrow/lib/block.js ../../arrow/lib/middleware.js ../../arrow/lib/router.js > ./build/arrow.json'
				// }
				// sh "node apidocs/jsduck2json/alloy2solr.js ./build/arrow.json ${solrDir}/arrow_api.json"
			} // stage('Solr')

			// assemble final contents of dist/platform/latest
			stage('Misc Assets') {
				// TODO: Move this htmlguides stuff into the Wiki stage and have it push the files into the template dir?
				// TIDOC-1327 Fix server errors
				sh "cp -r wiki/htmlguides/images/icons ${outputDir}/resources/images/."

				// Copy resources
				// Workaround for new Confluence plugin
				sh "cp -r wiki/htmlguides/attachments_* ${outputDir}/."

				sh "cp -r wiki/htmlguides/css/common.css ${outputDir}/resources/css/common.css"
				sh "cp -r wiki/htmlguides/images ${outputDir}/images"

				// Copy API doc images
				// TODO: Do this for the modules too!
				// Copy all images inside the apidocs folder tree flattened into platform/latest
				// This will allow images to live alongside the yml files
				// (rather than separated into a distinct images folder with invalid relative path references)
				sh "find ${SDK_DOC_DIR} -type f -iname '*.png' -exec cp \\{\\} ${outputDir}/ \\;"
				sh "find ${SDK_DOC_DIR} -type f -iname '*.gif' -exec cp \\{\\} ${outputDir}/ \\;"

				// Copy videos.json over? WTF?
				// TODO: Remove? This seems unnecesary
				sh 'cp videos.json build/videos.json'

				// Copy landing
				sh "cp -r ./landing ${outputDir}/.."

				// Copy release-notes
				sh "cp -r ./release-notes ${outputDir}/.."
			} // stage('Misc Assets')

			stage('Archive') {
				dir('dist') {
					archiveArtifacts 'platform/'
				} // dir('doctools/dist')
				dir('build') {
					archiveArtifacts 'appc-open-docs/'
				}
			} // stage('Archive')
		} // dir('doctools')

		if (publish) {
			stage('Publish') {
				// when branch is "docs" check out appc_web_docs, then check in platform/latest to it!
				updateDocsAppceleratorCom()
				updateAppcOpenDocs()
			} // stage('Publish')

			// Upload the solr index files to the server!
			stage('Solr Upload') {
				dir('doctools') {
					// api docs
					sh "npm run solr:upload -- ${solrDir}/arrow_api.json"
					sh "npm run solr:upload -- ${solrDir}/alloy_api.json"
					sh "npm run solr:upload -- ${solrDir}/api_solr.json"
					// guides / wiki
					sh 'npm run solr:guides'
				} // dir('doctools')
			} // stage('Solr Upload')
		} // if 'docs' branch
	} // nodejs
} // node

def updateAppcOpenDocs() {
	shallowClone('appc-open-docs', 'master')
	dir('appc-open-docs') {
		sh 'rm -rf content/en/docs'
		sh 'rm -rf static/images'
		// copy what we generated into repo
		sh 'cp -R ../doctools/build/appc-open-docs/content/en/docs content/en/docs'
		sh 'cp -R ../doctools/build/appc-open-docs/static/images static/images'
		// add all our changes to staged in git
		sh 'git add content/en/docs'
		sh 'git add static/images'
		//  Add details of any changes to this build of doctools into our commit message here!
		// https://support.cloudbees.com/hc/en-us/articles/217630098-How-to-access-Changelogs-in-a-Pipeline-Job-
		def changes = getChangeString()
		writeFile file: 'commit.txt', text: "chore(release): update platform docs\n\n${changes}"
		def status = sh returnStatus: true, script: 'git commit -F commit.txt' // commit it!
		if (status == 0) {
			pushGit(name: 'master') // push 'master' branch to github
		}
	}
}

def shallowClone(reponame, branchName) {
	sh "mkdir -p ${reponame}"
	dir(reponame) {
		// checkout repo
		checkout(changelog: false,
			poll: false,
			scm: [$class: 'GitSCM',
				branches: [[name: "*/${branchName}"]],
				doGenerateSubmoduleConfigurations: false,
				extensions: [
					[$class: 'CloneOption', depth: 1, honorRefspec: true, noTags: true, reference: '', shallow: true],
					[$class: 'CleanBeforeCheckout'],
					[$class: 'LocalBranch'] // so we can make changes and push them!
				],
				submoduleCfg: [],
				userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: "git@github.com:appcelerator/${reponame}.git", refspec: "+refs/heads/${branchName}:refs/remotes/origin/${branchName}"]]
			]
		)
	}
}

def updateDocsAppceleratorCom() {
	shallowClone('appc_web_docs', 'docs')

	dir('appc_web_docs') {
		sh 'rm -rf platform/data'
		sh 'rm -rf platform/landing'
		sh 'rm -rf platform/latest'
		sh 'rm -rf platform/release-notes'
		// copy what we generated into repo
		sh 'cp -R ../doctools/dist/platform/data platform/data'
		sh 'cp -R ../doctools/dist/platform/landing platform/landing'
		sh 'cp -R ../doctools/dist/platform/latest platform/latest'
		sh 'cp -R ../doctools/dist/platform/release-notes platform/release-notes'
		// add all our changes to staged in git
		sh 'git add platform'
		//  Add details of any changes to this build of doctools into our commit message here!
		// https://support.cloudbees.com/hc/en-us/articles/217630098-How-to-access-Changelogs-in-a-Pipeline-Job-
		def changes = getChangeString()
		writeFile file: 'commit.txt', text: "chore(release): update platform docs\n\n${changes}"
		def status = sh returnStatus: true, script: 'git commit -F commit.txt' // commit it!
		if (status == 0) {
			pushGit(name: 'docs') // push 'docs' branch to github
		}
	}
}

@NonCPS
def getChangeString() {
    MAX_MSG_LEN = 100
    def changeString = ''

    echo 'Gathering SCM changes'
    def changeLogSets = currentBuild.changeSets
    for (int i = 0; i < changeLogSets.size(); i++) {
        def entries = changeLogSets[i].items
        for (int j = 0; j < entries.length; j++) {
            def entry = entries[j]
            truncated_msg = entry.msg.take(MAX_MSG_LEN)
            changeString += " - ${truncated_msg} [${entry.author}] (${entry.commitId})\n"
        }
    }

    if (!changeString) {
        changeString = ' - No new changes\n'
    }
    return changeString
}

def sparseCheckout(orgName, dirName, branchName, paths) {
	sh "rm -rf ${dirName}" // forcibly wipe it
	sh "mkdir -p ${dirName}" // recreate it
	dir(dirName) {
		checkout(changelog: false,
			poll: false,
			scm: [$class: 'GitSCM',
				branches: [[name: "*/${branchName}"]],
				doGenerateSubmoduleConfigurations: false,
				extensions: [
					[$class: 'CloneOption', depth: 1, honorRefspec: true, noTags: true, reference: '', shallow: true],
					[$class: 'SparseCheckoutPaths', sparseCheckoutPaths: paths.collect { p -> [path: p] }]
				],
				submoduleCfg: [],
				userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: "git@github.com:${orgName}/${dirName}.git", refspec: "+refs/heads/${branchName}:refs/remotes/origin/${branchName}"]]
			]
		)
		sh 'git config --get remote.origin.url'
	}
}
