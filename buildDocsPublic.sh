#####################################################################
## Purpose: semi-automate the documentation build process locally  ##
## for public documentation build								   ##
##																   ##
## For more information visit 									   ##
## https://wiki.appcelerator.org/x/uMHBAg						   ##
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

## ask if the repos should be updated. If not, check on the npm modules anyway
printf "update repos? [y]es?"
read -r input1

cd $TI_ROOT/doctools
if [ $input1 == "y" ] || [ $input2 == "yes" ]; then
	echo "Updating repos.\n"
	sh update_modules.sh
else
	## confirm that npm modules are installed in titanium_mobile and titanium_mobile_windows
	echo "Repo update skipped.\n Checking status of NPM modules.\n"
	sh updateNPMModules.sh
fi

rm messages.txt
touch messages.txt

## run through the basic scripts to build the docs locally
cd $TI_ROOT/doctools
sh deploy.sh prod 2> messages.txt
sh clouddeploy.sh 2>> messages.txt
sh deploy.sh -o arrow -o alloy -o modules -s prod 2>> messages.txt
node stripFooter.js 2>> message.txt
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
open http://localhost/platform/latest/
open http://localhost/platform/latest/#!/api
open http://localhost/arrowdb/latest/
open http://localhost/arrowdb/latest/#!/api
open http://localhost/platform/latest/#!/guide
echo "Manually check the page(s) you updated.\nIf everything looks good, check in the appc_web_docs directory."

## ** consider adding an input to update the repo and commit it **

## open the Jenkins job pages so you can publish the docs (as needed)
open http://devops-jenkins.appcelerator.org/job/appc_web_docs/
open http://devops-jenkins.appcelerator.org/job/server_package_deployment/
echo "c60fgOrunvxQnj8RY"

duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

say "public build done"

printf "Generate an HTML version of the release not (if this is for a SDK release)? [y]es?"
read -r input2
if [ $input2 == "y" ] || [ $input2 == "yes" ]; then
	printf "What is the Wiki page ID number?"
	read -r pageIDNumber
	if [ $pageIDNumber ]; then
		sh processSDKWikiPage.sh $pageIDNumber
	else
		echo "You must enter a page id number to generate the HTML version of the SDK release note.\nIf you still need to generate one, manually run processSDKWikiPage.sh."
	fi
fi

printf "update solr index? [y]es?"
read -r input3
if [ $input3 == "y" ] || [ $input3 == "yes" ]; then
	SECONDS=0
	echo "Executing update_solr.sh from the appc_web_docs directory"
	cd $TI_ROOT/appc_web_docs
	sh update_solr.sh
	duration=$SECONDS
	echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."
	say "solr index update done"
else
	echo "Make sure you run the update_solr.sh script after Jenkins is done:\ncd $TI_ROOT/appc_web_docs; sh update_solr.sh"
fi
