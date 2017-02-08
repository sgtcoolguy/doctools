#####################################################################
## Purpose: semi-automate the documentation build process locally  ##
##																   ##
## For more information visit 									   ##
## ?															   ##
#####################################################################

SECONDS=0
## empty ../platform directory
#if [ -d $TI_ROOT/doctools/dist/platform ]; then
#	echo "Emptying ../dist/platform directory."
#	cd $TI_ROOT/doctools/dist/platform
#	rm -r *
#fi

## empty ../arrowdb directory
#if [ -d $TI_ROOT/doctools/dist/arrowdb ]; then
#	echo "Emptying ../dist/arrowdb directory."
#	cd $TI_ROOT/doctools/dist/arrowdb
#	rm -r *
#fi

cd $TI_ROOT/doctools
rm messages.txt
touch messages.txt

## ask if the repos should be updated. If not, check on the npm modules anyway
#printf "update repos? [y]es?"
#read -r input1
#cd $TI_ROOT/doctools
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
cd $TI_ROOT/doctools
echo "moved into $TI_ROOT/doctools\n"
echo "starting deploy.sh prod script\n"
sh deploy.sh prod #> messages.txt
echo "starting sh clouddeploy.sh\n"
sh clouddeploy.sh >> messages.txt
echo "starting sh deploy.sh -o arrow -o alloy -o modules -s prod\n"
sh deploy.sh -o arrow -o alloy -o modules -s prod >> messages.txt
node stripFooter.js >> message.txt ## not 100% necessary if building for test reasons
node redirects.js >> message.txt ## not 100% necessary if building for test reasons
echo "starting sh clouddeploy.sh -s prod\n"
sh clouddeploy.sh -s prod >> messages.txt
echo "starting bash clouddeploy.sh prod\n"
bash clouddeploy.sh prod >> messages.txt
echo "starting bash build_platform.sh\n"
bash build_platform.sh >> messages.txt
cd $TI_ROOT/appc_web_docs
echo "starting bash ../doctools/copy_platform.sh\n"
bash ../doctools/copy_platform.sh >> messages.txt
echo "starting bash ../doctools/copy_cloud.sh\n"
bash ../doctools/copy_cloud.sh >> messages.txt
cd $TI_ROOT/doctools
node appendTitles.js >> messages.txt ## not 100% necessary if building for test reasons
sh css_fix.sh ## See TIDOC-2739

## open the message.txt file and you need to manually search for error messages
open -a Atom messages.txt

## open localhost and manually review the pages
open http://localhost
echo "Manually check the page(s) you updated."
duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

say "local build done"

#Error: /Users/bimmel/Documents/Repositories/doctools/build/guides/guides.json is not a valid JSON file
