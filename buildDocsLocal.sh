#####################################################################
## Purpose: semi-automate the documentation build process locally  ##
##																   ##
## For more information visit 									   ##
## ?															   ##
#####################################################################

SECONDS=0
doctools=$TI_ROOT/doctools

## empty ../platform directory
#if [ -d $doctools/dist/platform ]; then
#	echo "Emptying ../dist/platform directory."
#	cd $doctools/dist/platform
#	rm -r *
#fi

## empty ../arrowdb directory
#if [ -d $doctools/dist/arrowdb ]; then
#	echo "Emptying ../dist/arrowdb directory."
#	cd $doctools/dist/arrowdb
#	rm -r *
#fi

cd $doctools
rm messages.txt
touch messages.txt

## ask if the repos should be updated. If not, check on the npm modules anyway
#printf "update repos? [y]es?"
#read -r input1
#cd $doctools
#if [ $input1 == "y" ] || [ $input1 == "yes" ]; then
#	echo "Updating repos.\n"
#	sh update_modules.sh ## update various modules needed by the API docs portion of the stripFooter
#else
#	echo "skipping repo update."
#fi

## assume the wiki content has been downloaded and it is ready to be used to build the htmlguide directory
#sh build_htmlguide.sh ## rebuild the htmlguide directory and it's content

#echo "Checking status of NPM modules.\n"
#sh updateNPMModules.sh ## confirm that npm modules are installed in titanium_mobile and titanium_mobile_windows

## run through the basic scripts to build the docs locally

## ** copy redirect documents into ../doctools/htmlguides
## see TIDOC-????
cp $doctools/page_redirects/htmlguides/*.html $doctools/htmlguides
cd $doctools

# update all the required npm modules
npm i

##echo "moved into $doctools\n"
echo "Executing deploy.sh prod script\n"
sh deploy.sh prod #> messages.txt

echo "Executing sh clouddeploy.sh\n"
sh clouddeploy.sh >> messages.txt
echo "Executing sh deploy.sh -o arrow -o alloy -o modules -s prod\n"
sh deploy.sh -o arrow -o alloy -o modules -s prod >> messages.txt
node stripFooter.js >> messages.txt ## not 100% necessary if building for test reasons
node redirects.js >> messages.txt ## not 100% necessary if building for test reasons
# node banner.js >> messages.txt ## add banners to each HTML doc
echo "Executing sh clouddeploy.sh -s prod\n"
sh clouddeploy.sh -s prod >> messages.txt
echo "Executing bash clouddeploy.sh prod\n"
bash clouddeploy.sh prod >> messages.txt

## this is where the index-template.html
## Update the ../doctools/dist/platform/latest/index-template.html file to remove any element with the !!REDIRECT!! text

echo "Executing bash build_platform.sh\n"
bash build_platform.sh >> messages.txt
cd $TI_ROOT/appc_web_docs
echo "Executing bash ../doctools/copy_platform.sh\n"
bash ../doctools/copy_platform.sh >> messages.txt
echo "Executing bash ../doctools/copy_cloud.sh\n"
bash ../doctools/copy_cloud.sh >> messages.txt
cd $doctools
node appendTitles.js >> messages.txt ## not 100% necessary if building for test reasons
sh copyFavicon.sh >> messages.txt ## copy Griffin favicon.ico from ../doctools to various directories
sh css_fix.sh ## See TIDOC-2739
sh js_fix.sh ## TIDOC-3141

## open the messages.txt file and you need to manually search for error messages
# open -a Atom messages.txt
rm messages.txt

## open localhost and manually review the pages
open http://localhost
echo "Manually check the page(s) you updated."
duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

say "local build done"

#Error: /Users/bimmel/Documents/Repositories/doctools/build/guides/guides.json is not a valid JSON file
