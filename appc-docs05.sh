bash
blue="\033[0;34m"
green="\033[0;32m"
white="\033[0m"
date
git config --global --list
##export PATH=$PATH:/var/lib/jenkins/bin/Sencha/Cmd/4.0.4.84
export PATH=$PATH:Users/bimmel/bin/Sencha/Cmd/6.0.2.14 ## set path for Sencha
BRANCH='master' ## added
export BRANCH=$BRANCH
echo $BRANCH ## added
BUILD_DATE=$BRANCH-`date +"%Y-%m-%d_%H-%M-%S"`
echo $BUILD_DATE
WORKSPACE=$TI_ROOT/workspace ## added

build_env='prod'
jsduck_config_platform=''
if [ "$BRANCH" = "master" ]; then
	echo "Setting debug mode"
	build_env="debug"
    jsduck_config_platform="-c jsduck_static.config"
fi
echo "Build environment: $build_env"

if [ ! -d $TI_ROOT/workspace ]; then ## added
	mkdir $TI_ROOT/workspace
fi
cd $WORKSPACE
export TI_ROOT=$PWD

## get all repos before moving along!
## create the appc_modules directory if it is missing
if [ ! -d $WORKSPACE/appc_modules ]; then
	echo "appc_modules directory is missing. Creating that directory."
	mkdir $WORKSPACE/appc_modules
fi

## cd into the modules directory
cd $WORKSPACE/appc_modules

updateModules () { ## check to see if a module exists and update it
	date
	echo "${blue}Updating/Retrieving ${green}$2${white}"
	if [ $1 == "apidoc" ]; then ## if the first parameter is a module
		ACTIVE=$TI_ROOT/appc_modules/$2
		GITPATH=git@github.com:appcelerator-modules
	elif [ $1 == "misc" ]; then ## if the first parameter is a misc
		ACTIVE=$TI_ROOT/$2
		GITPATH=git@github.com:appcelerator
	fi
	echo "Setting active directory to $ACTIVE"
	if [ ! -d "$ACTIVE" ]; then ## if the repo doesn't exist, clone it
		echo "${blue}Cloning $2${white}"
		if [ $1 == "apidoc" ]; then
			cd $ACTIVE
		elif [ $1 == "misc" ]; then
			cd $TI_ROOT
		fi
		pwd
		git clone $GITPATH/$2.git
	else ## if the repo exists, update it
		echo "${blue}$2 exists; updating${white}"
		cd $ACTIVE
		pwd
		git clean -dfx
		git reset --hard HEAD
		git pull origin master
	fi
}

## array of apidoc modules to update from their respective repos
moduleArray=( appcelerator.apm appcelerator.https ti.cloud ti.coremotion ti.facebook ti.geofence ti.map ti.newsstand ti.nfc Ti.SafariDialog ti.touchid ti.urlsession )

## array of misc repos to update. These repos should live outside the appc_modules directory.
repoArray=( alloy appc-docs appc_web_docs arrow arrow-orm cloud_docs doctools jsduck titanium_mobile titanium_mobile_windows )

for i in "${moduleArray[@]}"
do
	echo " "
	echo "updating $i module"
	echo " "
	updateModules apidoc $i
done

for i in "${repoArray[@]}"
do
	echo " "
	echo "updating $i repo"
	echo " "
	updateModules misc $i
done

## Update the repos
echo " "
echo "Running repo_update_jenkins.sh"
cd $TI_ROOT/doctools
pwd
bash repo_update_jenkins.sh

## Sencha ExtJS for JSDuck
date
if [ ! -d "$TI_ROOT/jsduck/template/extjs" ]; then
	cd $TI_ROOT/jsduck/template
    git clone https://github.com/probonogeek/extjs.git extjs    
fi
## Set sdk-vars.rb
cd $TI_ROOT/jsduck
if [ ! -f "sdk-vars.rb" ]; then
    echo "OUT_DIR='$TI_ROOT/jsduck/output'
    EXT_BUILD='$TI_ROOT/jsduck/template/extjs'" > sdk-vars.rb
fi


## Download Wiki content
date
cd $TI_ROOT/doctools
pwd
sh get_confluence_auto.sh 

## **** pick up here!!! ****

## Workaround to point to yuicompressor jar
#date
#cd $TI_ROOT/jsduck
#sed -i 's/\$(dirname \$(which sencha))\/bin\/yuicompressor\.jar/\/var\/lib\/jenkins\/bin\/Sencha\/Cmd\/6\.0\.2\.14\/lib\/yuicompressor\-2\.4\.7\.jar/g' Rakefile

#sed -i 's/\$(dirname \$(which sencha))\/bin\/yuicompressor\.jar/\/var\/lib\/jenkins\/bin\/Sencha\/Cmd\/4\.0\.4\.84\/lib\/yuicompressor\-2\.4\.7\.jar/g' Rakefile
#rake compress

## Install doctool depedencies
date
echo "npm'ing $TI_ROOT/titanium_mobile/apidoc"
cd $TI_ROOT/titanium_mobile/apidoc
npm install .
echo "npm'ing $TI_ROOT/doctools"
cd $TI_ROOT/doctools
npm install .

## Build and package docs
#date
#outdir=$TI_ROOT/doctools/dist/platform/latest
#echo "emptying $outdir"
#rm -rf $outdir
#mkdir -p $outdir
#cd $TI_ROOT/doctools

#date
#bash deploy.sh $jsduck_config_platform -o alloy -o modules -o arrow -g htmlguides -d $outdir -t "Appcelerator Platform - Appcelerator Docs" $build_env

## **** Also, the latest dir is missing from the top-most level (same level as the modules). ****
## this is the only outstanding issue left to fix, I believe. Maybe the zip files??

## Create cloud docs
#bash clouddeploy.sh $jsduck_config_platform $build_env
#rm -rf dist/arrowdb/latest/extjs/.git

## Write landing page
#date
#cd $TI_ROOT/doctools/dist/platform
#pwd
#rm -rf landing
#mkdir -p landing
#cd landing
#wget http://docs.appcelerator.com/platform/landing/index.html
#wget "http://docs.appcelerator.com/platform/landing/start-display.png"
#cd ..
#echo '<HTML><HEAD><META http-equiv="refresh" content="0;URL=latest/index.html" /></HEAD></HTML>' > README.html
#cd ..

## Zip docs
## ** is this even needed? **
#date
#zip -r docs-$BUILD_DATE.zip *
#/var/lib/jenkins/Source/titanium_build/common/s3_uploader.py mobile docs-$BUILD_DATE.zip docs "SHA1" "https://jenkins.appcelerator.org/"
## ** this directory doesn't exist locally **
#rm docs-$BUILD_DATE.zip
