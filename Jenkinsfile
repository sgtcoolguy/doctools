#! groovy
library 'pipeline-library'

// Keep logs/reports/etc of last 30 builds, only keep build artifacts of last 3 builds
properties([buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '3'))])

// Variables to tune to grab different branches of products
def SDK_BRANCH = 'master' // change to target branch to use for APIDoc generation: i.e. 7_4_X, master, 8_0_X
def ALLOY_BRANCH = 'master'  // change to target branch to use for alloy doc generation: i.e. master
// set of native modules to clone and include in docs
def MODULES = [
	'ti.map',
	'ti.facebook',
	'ti.nfc',
	'ti.newsstand',
	'ti.coremotion',
	'ti.urlsession',
	'ti.touchid',
	'titanium-identity',
	'Ti.SafariDialog',
	'appcelerator.apm',
	'ti.playservices',
	'ti.geofence',
	'appcelerator.https',
	'com.appcelerator.apm'
]


node('linux && !master') {
	def SDK_DOC_DIR = '../titanium_mobile/apidoc'
	def alloyDirs = '../alloy/Alloy/lib ../alloy/docs/apidoc ./add-ons ../alloy/Alloy/builtins'
	def windowsArgs = '-a ../titanium_mobile_windows/apidoc/WindowsOnly -a ../titanium_mobile_windows/apidoc/Titanium'
	def moduleArgs = ''
	// TODO Include arrow repos/docs!

	def taskId = ''
	stage('Wiki Export Request') {
		// Immediately start the async wiki export and record the task id, so it can run while we do other things...
		withCredentials([usernamePassword(credentialsId: '58ae51f6-2708-4ed5-875c-ad410c06ef7c', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
			// Note that the synchronous APi just seems to never respond even with a 30 minute read timeout!
			// So here we schedule it to run async, then poll every 30 seconds to grab the result
			// We set a max 15 minute timeout for our sentinel loop
			def taskOut = sh(returnStdout: true, script: "curl -s -H Accept:application/json 'https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/export?exportSchemeId=guides2-7F000001015A6C6CD20B1E0B58AE1D82&rootPageId=29004729&os_username=${env.USER}&os_password=${env.PASS}'").trim()
			def exportTask = jsonParse(taskOut)
			taskId = exportTask['id']
		} // withCredentials
	} // stage

	nodejs(nodeJSInstallationName: 'node 8.11.4') {
		stage('Checkout') {
			ensureNPM('latest')

			sh 'rm -rf build' // wipe build directory
			sh 'rm -rf dist' // wipe dist directory

			// Create the 3 major repo folders we need!
			sh 'mkdir -p doctools'
			dir('doctools') {
				checkout([
					$class: 'GitSCM',
					branches: scm.branches,
					extensions: scm.extensions + [
						[$class: 'CloneOption', depth: 0, honorRefspec: true, noTags: true, reference: '', shallow: true],
						[$class: 'CleanBeforeCheckout']
					],
					userRemoteConfigs: scm.userRemoteConfigs
				])
			} // dir('doctools')

			// Alloy
			sh 'mkdir -p alloy'
			dir('alloy') {
				checkout(changelog: false,
					poll: false,
					scm: [$class: 'GitSCM',
						branches: [[name: "*/${ALLOY_BRANCH}"]],
						doGenerateSubmoduleConfigurations: false,
						extensions: [
							[$class: 'CloneOption', depth: 0, honorRefspec: true, noTags: true, reference: '', shallow: true],
							[$class: 'CleanBeforeCheckout'],
							[$class: 'SparseCheckoutPaths', sparseCheckoutPaths: [
								[path: 'Alloy/'],
								[path: 'docs/apidoc'],
								[path: '!Alloy/builtins/moment.js']
							]]
						],
						submoduleCfg: [],
						userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: 'git@github.com:appcelerator/alloy.git', refspec: "+refs/heads/${ALLOY_BRANCH}:refs/remotes/origin/${ALLOY_BRANCH}"]]
					]
				)
			} // dir('alloy')

			sh 'mkdir -p titanium_mobile'
			dir('titanium_mobile') {
				// do shallow clone of titanium_mobile, only checkout top-level dir and apidocs
				// do a git clean before checkout
				checkout(changelog: false,
					poll: false,
					scm: [$class: 'GitSCM',
						branches: [[name: "*/${SDK_BRANCH}"]],
						doGenerateSubmoduleConfigurations: false,
						extensions: [
							[$class: 'CloneOption', depth: 0, honorRefspec: true, noTags: true, reference: '', shallow: true],
							[$class: 'CleanBeforeCheckout'],
							[$class: 'SparseCheckoutPaths', sparseCheckoutPaths: [
								[path: '/*'],
								[path: '!android'],
								[path: '!build'],
								[path: '!cli'],
								[path: '!iphone'],
								[path: '!support'],
								// [path: '!templates'], // we need apidoc/templates!
								[path: '!tests']
							]]
						],
						submoduleCfg: [],
						userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: 'git@github.com:appcelerator/titanium_mobile.git', refspec: "+refs/heads/${SDK_BRANCH}:refs/remotes/origin/${SDK_BRANCH}"]]
					]
				)
				sh 'npm ci'
			} // dir('titanium_mobile')

			sh 'mkdir -p titanium_mobile_windows'
			dir('titanium_mobile_windows') {
				// do shallow clone of titanium_mobile_windows, only checkout top-level dir and apidocs
				// do a git clean before checkout
				checkout(changelog: false,
					poll: false,
					scm: [$class: 'GitSCM',
						branches: [[name: "*/${SDK_BRANCH}"]],
						doGenerateSubmoduleConfigurations: false,
						extensions: [
							[$class: 'CloneOption', depth: 0, honorRefspec: true, noTags: true, reference: '', shallow: true],
							[$class: 'CleanBeforeCheckout'],
							[$class: 'SparseCheckoutPaths', sparseCheckoutPaths: [
								[path: 'apidoc']
							]]
						],
						submoduleCfg: [],
						userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: 'git@github.com:appcelerator/titanium_mobile_windows.git', refspec: "+refs/heads/${SDK_BRANCH}:refs/remotes/origin/${SDK_BRANCH}"]]
					]
				)

				dir('apidoc') {
					sh 'npm ci'
					sh 'node ti_win_yaml'
					sh 'rm Titanium/Map.yml'
					sh 'rm -r Titanium/Map'
				} // dir('titanium_mobile_windows/apidoc')
			} // dir('titanium_mobile_windows')

			// Check out a series of native modules
			MODULES.each { mod ->
				sh "mkdir -p ${mod}"
				dir(mod) {
					checkout(changelog: false,
						poll: false,
						scm: [$class: 'GitSCM',
							branches: [[name: '*/master']],
							doGenerateSubmoduleConfigurations: false,
							extensions: [
								[$class: 'CloneOption', depth: 0, honorRefspec: true, noTags: true, reference: '', shallow: true],
								[$class: 'CleanBeforeCheckout'],
								[$class: 'SparseCheckoutPaths', sparseCheckoutPaths: [
									[path: 'apidoc']
								]]
							],
							submoduleCfg: [],
							userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: "git@github.com:appcelerator-modules/${mod}.git", refspec: '+refs/heads/master:refs/remotes/origin/master']]
						]
					)
					moduleArgs += " ../${mod}/apidoc"
				} // dir(mod)
			} // MODULES.each
		} // stage('Checkout')

		dir('doctools') {
			stage('Setup') {
				sh 'bundle install --path vendor/bundle' // install jsduck
				sh 'npm ci'
			} // stage('Setup')

			stage('APIDocs') {
				// First we generate APIdocs for titanium_mobile, modules, windows
				sh "node ${SDK_DOC_DIR}/docgen.js -f jsduck -o ./build/ ${moduleArgs} ${windowsArgs}" // generates build/titanium.js
				// TODO: Can we specify multiple formats at once and get solr output too? Looks like it does work (though the output for result filenames is busted and repeats last format)
			} // stage('APIDocs')

			stage('Wiki Download') {
				// Grab down a jar file with the contents of the wiki guide
				// we requested the export start at the very top and now we poll for the result.
				// It should likely already be done by time we reach here, but we'll wait for up to 5 more minutes to grab it
				withCredentials([usernamePassword(credentialsId: '58ae51f6-2708-4ed5-875c-ad410c06ef7c', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
					timeout(10) {
						while (true) {
							def headers = sh(returnStdout: true, script: "curl -Is --connect-timeout 5 'https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/export/${taskId}?os_username=${env.USER}&os_password=${env.PASS}' || echo 1 500").trim()
							// split headers by whitespace, second entry is http status code
							def httpCode = Integer.valueOf(headers.split()[1])
							if (httpCode == 200) { // yay! download it!
								sh "curl -f --remote-header-name --remote-name 'https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/export/${taskId}?os_username=${env.USER}&os_password=${env.PASS}'"
								break
							} else if (httpCode != 202) { // something went wrong, fail!
								error "Failed to grab down export of wiki with http code: ${httpCode}"
							}
							sleep 30 // sleep 30 seconds between polling again
						} // while
					} // timeout
				} // withCredentials
				sh 'mkdir Confluence_working'
				sh 'mv com.appcelerator.tisdk.help_*.jar Confluence_working/confluence_guide2.zip'
				// TODO: Archive the wiki export?
				sh 'mkdir htmlguides'
				dir ('htmlguides') {
					sh 'unzip -o ../Confluence_working/confluence_guide2.zip'
				}
				sh 'cp ./page_redirects/htmlguides/*.html ./htmlguides'
				// Massage the htmlguides: strip footer, add redirects, add banner, minify HTML
				sh 'node htmlguides.js'
			} // stage('Wiki Download')

			stage('Guides') {
				// TODO: Allow addon guides?
				sh 'mkdir -p build/guides'
				sh 'node guides_parser --input ./htmlguides/toc.xml --output ./build/guides --show_edit_button' // generates build/guides/guides.json (and various folders/files under guides)
			} // stage('Guides')

			// Copy videos.json over? WTF?
			sh 'cp videos.json build/videos.json'

			def outputDir = './dist/platform/latest'
			stage('JSDuck') {
				sh 'bundle exec compass compile ./template/resources/sass'

				// Grab extjs 4.1.1 to use
				sh 'curl -L -o template/extjs.zip http://download.huihoo.com/extjs/ext-4.1.1a-gpl.zip'
				// unzip it
				sh 'unzip template/extjs.zip -d template/'
				sh 'rm template/extjs.zip'
				// make dir for extjs files we need
				sh 'rm -rf template/extjs'
				sh 'mkdir -p template/extjs/resources/themes/images'
				// copy extjs-all.js and resources to template
				sh 'cp template/ext-4.1.1a/ext-all.js template/extjs/ext-all.js'
				sh 'cp -r template/ext-4.1.1a/resources/themes/images/default template/extjs/resources/themes/images'
				sh 'cp -r template/ext-4.1.1a/resources/css template/extjs/resources/css'
				sh 'rm -rf template/ext-4.1.1a' // wipe expanded zip dir

				// Create output dir tree
				sh "mkdir -p ${outputDir}"
				// Build docs
				sh "bundle exec jsduck --template ./template --seo --output ${outputDir} --title 'Appcelerator Platform - Appcelerator Docs' --config ./jsduck.config ${alloyDirs}"
			} // stage('JSDuck')

			stage('Solr') {
				sh "mkdir -p ${outputDir}/../data/solr" // create output dir

				// SDK search index
				sh "node ${SDK_DOC_DIR}/docgen -f solr -o ./build/" // TODO: Add windows/modules
				sh "cp ./build/api_solr.json ${outputDir}/../data/solr/."

				// Alloy search index
				sh 'bundle exec jsduck --external "void,Callback,Backbone.Collection,Backbone.Model,Backbone.Events" --export full --meta-tags ./meta --pretty-json -o - ../alloy/Alloy/lib ../alloy/docs/apidoc > ./build/alloy.json'
				sh "node ./jsduck2json/alloy2solr.js ./build/alloy.json ${outputDir}/../data/solr/alloy_api.json"

				// if [ $include_arrow ]; then
				// 		echo "Generating Solr content for Arrow..."/
				// 		bash $DOCTOOLS/jsduck2json.sh arrow solr
				// 		cp ./dist/solr.json $outdir/../data/solr/arrow_api.json
				// fi
			} // stage('Solr')

			stage('Misc Assets') {
				// TIDOC-1327 Fix server errors
				sh "cp -r ./htmlguides/images/icons ${outputDir}/resources/images/."

				// Copy resources
				// Workaround for new Confluence plugin
				sh "cp -r ./htmlguides/attachments_* ${outputDir}/."

				sh "cp -r ./htmlguides/css/common.css ${outputDir}/resources/css/common.css"
				sh "cp -r ./htmlguides/images ${outputDir}/images"

				// Copy API images folder
				sh "cp -r ${SDK_DOC_DIR}/images ${outputDir}/."

				// Wipe redundant html files!
				sh "rm -rf ${outputDir}/guides/*/README.html" // html files aren't actually used, README.js is!
				// sh "rm -rf ${outputDir}/guides/*/icon.png" // TODO: Remove icons too?
			} // stage('Misc Assets')

			stage('Archive') {
				dir('dist') {
					archiveArtifacts 'platform/'
				} // dir('doctools/dist')
			} // stage('Archive')
		} // dir('doctools')
	} // nodejs
} // node
