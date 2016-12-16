#####################################################################
## Purpose: semi-automate the documentation build process locally  ##
##																   ##
## For more information visit 									   ##
## ?															   ##
#####################################################################

SECONDS=0
## empty ../platform directory
if [ -d $TI_ROOT/doctools/dist/platform ]; then
	echo "Emptying ../dist/platform directory."
	cd $TI_ROOT/doctools/dist/platform
	rm -r *
fi

## empty ../arrowdb directory
if [ -d $TI_ROOT/doctools/dist/arrowdb ]; then
	echo "Emptying ../dist/arrowdb directory."
	cd $TI_ROOT/doctools/dist/arrowdb
	rm -r *
fi

cd $TI_ROOT/doctools
rm messages.txt
touch messages.txt

## ask if the repos should be updated. If not, check on the npm modules anyway
printf "update repos? [y]es?"
read -r input1
cd $TI_ROOT/doctools
if [ $input1 == "y" ] || [ $input1 == "yes" ]; then
	echo "Updating repos.\n"
	sh update_modules.sh ## update various modules needed by the API docs portion of the stripFooter
	sh build_htmlguide.sh ## rebuild the htmlguide directory and it's content
else
	echo "skipping repo update."
fi

echo "Checking status of NPM modules.\n"
#sh updateNPMModules.sh ## confirm that npm modules are installed in titanium_mobile and titanium_mobile_windows

## run through the basic scripts to build the docs locally
cd $TI_ROOT/doctools
sh deploy.sh prod > messages.txt
## open the message.txt file and you need to manually search for error messages
#open -a Atom messages.txt

sh clouddeploy.sh 2>> messages.txt
sh deploy.sh -o arrow -o alloy -o modules -s prod 2>> messages.txt
node stripFooter.js 2>> message.txt
node redirects.js 2>> message.txt
sh clouddeploy.sh -s prod 2>> messages.txt
bash clouddeploy.sh prod 2>> messages.txt
bash build_platform.sh 2>> messages.txt
cd $TI_ROOT/appc_web_docs
bash ../doctools/copy_platform.sh 2>> messages.txt
bash ../doctools/copy_cloud.sh 2>> messages.txt

## open the message.txt file and you need to manually search for error messages
open -a TextWrangler messages.txt

## open localhost and manually review the pages
open http://localhost
echo "Manually check the page(s) you updated."
duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

say "local build done"

#Error: /Users/bimmel/Documents/Repositories/doctools/build/guides/guides.json is not a valid JSON file
