## Purpose of script: Download a user supplied wiki page pageId, extract it's contents, and send the HTML file to a node script for content conditioning.
##
## See https://wiki.appcelerator.org/x/bK3BAg for documentation

TEMPDIR='SDK-HTMLtemp'
cd $TI_ROOT/doctools
echo "Removing any leftover Titanium release note HTML files"
rm Titanium_SDK*.html -r

pageId = $1 ## the only argument this script takes is the pageId of the wiki page you are trying to retrieve and process

CONFLUENCE_USERNAME='doc-robot'
CONFLUENCE_PASSWORD='szE8U9OWiJmVsfuCEQCMAgYwHokRrkqowyixe5HLqwzPUJOziy'
## Build REST URL
URL='https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/sync-export?'
schemeId='exportSchemeId=-7F0000010152F0E7EDD50F3B77351114&'
rootPageId='&rootPageId='
REST_URL=$URL$schemeId$rootPageId$1
##REST_URL=$URL$schemeId$rootPageId$pageId

echo "Getting wiki page"
wget --content-disposition "$REST_URL&os_username=$CONFLUENCE_USERNAME&os_password=$CONFLUENCE_PASSWORD"

## create two temporary directory: one for the extract HTML file and one for the unzipped content
echo "Moving wiki page contents into temp directory"
mkdir $TEMPDIR
cd $TEMPDIR
mkdir temp
mv ../com.*.jar temp/
cd temp
mv com.*.jar $1.zip
unzip -o $1.zip
echo "Moving HTML file out of temp directory"
mv *.html ../
echo "Empty temp directory"
rm -r *
cd ../
rmdir temp
HTML=Titanium_SDK*.html ## grab the allegedly only HTML in this directory. 
location=$(pwd) ## get current path so the node script knows where to pull data from
outputDir=$TI_ROOT'/appc_web_docs/platform/release-notes' ## output directory where the processed HTML will be moved to

node ../processSDKWikiPage $HTML $location $outputDir

open $HTML ## open the post-processed version of the HTML file