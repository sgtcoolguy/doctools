#! groovy
library 'pipeline-library'

// Keep logs/reports/etc of last 30 builds, only keep build artifacts of last 3 builds
properties([buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '3'))])

// Publish only on the 'docs' branch
def publish = env.BRANCH_NAME.equals('docs')

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
	'com.appcelerator.apm',
	'appcelerator.encrypteddatabase',
	'titanium-web-dialog',
	// 'ti.systemalert', // Removed since it has no apidoc folder
	'appcelerator.aca'
]


node('osx') { // Need to use osx, because our sencha command zip is for osx right now!
	def SDK_DOC_DIR = '../titanium_mobile/apidoc'
	def alloyDirs = '../alloy/Alloy/lib ../alloy/docs/apidoc ../alloy/Alloy/builtins'
	def windowsArgs = '-a ../titanium_mobile_windows/apidoc/WindowsOnly -a ../titanium_mobile_windows/apidoc/Titanium'
	def moduleArgs = ''
	// TODO Include arrow repos/docs!

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
								[path: 'apidoc'],
								[path: 'package.json'],
								[path: 'package-lock.json'],
								[path: 'Source']
							]]
						],
						submoduleCfg: [],
						userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: 'git@github.com:appcelerator/titanium_mobile_windows.git', refspec: "+refs/heads/${SDK_BRANCH}:refs/remotes/origin/${SDK_BRANCH}"]]
					]
				)

				sh 'npm ci'
				dir('apidoc') {
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
				copyArtifacts fingerprintArtifacts: true, projectName: '../wiki-export/master'
				sh 'npm run wiki:unzip'
				sh 'npm run wiki:redirects'
				sh 'npm run wiki:finalize' // Massage the htmlguides: strip footer, add redirects, add banner, minify HTML
			} // stage('Wiki Download')

			stage('Guides') {
				// TODO: Allow addon guides?
				sh 'npm run wiki:guides'
			} // stage('Guides')

			// Copy videos.json over? WTF?
			// TODO: Remove? This seems unnecesary
			sh 'cp videos.json build/videos.json'

			def outputDir = './dist/platform/latest'
			stage('JSDuck') {
				sh "npm run jsduck ${alloyDirs}"
			} // stage('JSDuck')

			stage('Solr') {
				sh "mkdir -p ${outputDir}/../data/solr" // create output dir

				// SDK search index
				sh "node ${SDK_DOC_DIR}/docgen -f solr -o ./build/" // TODO: Add windows/modules
				sh "cp ./build/api_solr.json ${outputDir}/../data/solr/."

				// Alloy search index
				sh 'bundle exec jsduck --external "void,Callback,Backbone.Collection,Backbone.Model,Backbone.Events" --export full --meta-tags ./meta --pretty-json -o - ../alloy/Alloy/lib ../alloy/docs/apidoc > ./build/alloy.json'
				sh "node ./jsduck2json/alloy2solr.js ./build/alloy.json ${outputDir}/../data/solr/alloy_api.json"

				// Arrow search index
				// TODO: If we still need to do this, we need to clone 'arrow' and 'arrow-orm' repositories
				// sh 'bundle exec jsduck --export full --meta-tags ./meta --pretty-json -o - ../arrow-orm/apidoc ../arrow-orm/lib/collection.js ../arrow-orm/lib/connector.js ../arrow-orm/lib/error.js ../arrow-orm/lib/instance.js ../arrow-orm/lib/model.js ../arrow-orm/lib/connector/capabilities/index.js ../arrow/apidoc ../arrow/lib/engines ../arrow/lib/api.js ../arrow/lib/arrow.js ../arrow/lib/block.js ../arrow/lib/middleware.js ../arrow/lib/router.js > ./build/arrow.json'
				// sh "node ./jsduck2json/alloy2solr.js ./build/arrow.json ${outputDir}/../data/solr/arrow_api.json"
			} // stage('Solr')

			stage('Misc Assets') {
				// TODO: Move this htmlguides stuff into the wiki Download/Guides section!
				// TIDOC-1327 Fix server errors
				sh "cp -r ./htmlguides/images/icons ${outputDir}/resources/images/."

				// Copy resources
				// Workaround for new Confluence plugin
				sh "cp -r ./htmlguides/attachments_* ${outputDir}/."

				sh "cp -r ./htmlguides/css/common.css ${outputDir}/resources/css/common.css"
				sh "cp -r ./htmlguides/images ${outputDir}/images"

				// Copy API images folder
				sh "cp -r ${SDK_DOC_DIR}/images ${outputDir}/."

				// Copy landing
				sh "cp -r ./landing ${outputDir}/.."
			} // stage('Misc Assets')

			stage('Archive') {
				dir('dist') {
					archiveArtifacts 'platform/'
				} // dir('doctools/dist')
			} // stage('Archive')

		} // dir('doctools')

		if (publish) {
			stage('Publish') {
				// when branch is "docs" check out appc_web_docs, then check in platform/latest to it!
				sh 'mkdir -p appc_web_docs'
				dir('appc_web_docs') {
					// checkout appc_web_docs repo
					checkout(changelog: false,
						poll: false,
						scm: [$class: 'GitSCM',
							branches: [[name: '*/docs']],
							doGenerateSubmoduleConfigurations: false,
							extensions: [
								[$class: 'CloneOption', depth: 1, honorRefspec: true, noTags: true, reference: '', shallow: true],
								[$class: 'CleanBeforeCheckout'],
								[$class: 'LocalBranch'] // so we can make changes and push them!
							],
							submoduleCfg: [],
							userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: "git@github.com:appcelerator/appc_web_docs.git", refspec: '+refs/heads/docs:refs/remotes/origin/docs']]
						]
					)
					sh 'rm -rf platform/data'
					sh 'rm -rf platform/landing'
					// copy what we generated into repo
					sh 'cp -R ../doctools/dist/platform/latest platform/latest'
					sh 'cp -R ../doctools/dist/platform/data platform/data'
					sh 'cp -R ../doctools/dist/platform/landing platform/landing'
					// add all our changes to staged in git
					sh 'git add platform'
					//  Add details of any changes to this build of doctools into our commit message here!
					// https://support.cloudbees.com/hc/en-us/articles/217630098-How-to-access-Changelogs-in-a-Pipeline-Job-
					def changes = getChangeString()
					writeFile file: 'commit.txt', text: "chore(release): update platform docs\n\n${changes}"
					sh 'git commit -F commit.txt' // commit it!
					pushGit(name: 'docs') // push 'docs' branch to github
				}
			} // stage('Publish')
		} // if 'docs' branch
	} // nodejs
} // node

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