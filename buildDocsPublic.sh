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

## empty the output directory of the guides
##if [ -d $TI_ROOT/doctools/htmlguides ]; then
##	echo "Emptying ../htmlguides directory."
##	cd $TI_ROOT/doctools/htmlguides
##	rm -r *
##fi

rm messages.txt
touch messages.txt

## run through the basic scripts to build the docs locally
cd $TI_ROOT/doctools
sh deploy.sh prod > messages.txt
sh clouddeploy.sh >> messages.txt
sh deploy.sh -o arrow -o alloy -o modules -s prod >> messages.txt
node stripFooter.js >> message.txt
sh clouddeploy.sh -s prod >> messages.txt
bash clouddeploy.sh prod >> messages.txt
bash build_platform.sh >> messages.txt
cd $TI_ROOT/appc_web_docs
bash ../doctools/copy_platform.sh >> messages.txt
bash ../doctools/copy_cloud.sh >> messages.txt

## open the message.txt file and you need to manually search for error messages
open -a TextWrangler messages.txt

## open localhost and manually review the pages
open http://localhost
open http://localhost/platform/latest/
open http://localhost/platform/latest/#!/api
open http://localhost/arrowdb/latest/
open http://localhost/arrowdb/latest/#!/api
open http://localhost/platform/latest/#!/guide
echo "Manually check the page(s) you updated."
echo "If everything looks good, check in the appc_web_docs directory."

## ** consider adding an input to update the repo and commit it **

## open the Jenkins job pages so you can publish the docs (as needed)
open http://devops-jenkins.appcelerator.org/job/appc_web_docs/
open http://devops-jenkins.appcelerator.org/job/server_package_deployment/
echo "c60fgOrunvxQnj8RY"

duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

say "public build done"

echo "If this is a GA release, don't forget to generate the HTML version of the release note."
open https://wiki.appcelerator.org/display/~bimmel/Modifying+and+Cleaning+Up+SDK+Release+Note+-+HTML+Version

echo "update solr index? [y]es?"
read input
if [ $input == "y" ] || [ $input == "yes" ]; then
	SECONDS=0
	date
	echo "Executing update_solr.sh from the appc_web_docs directory"
	cd $TI_ROOT/appc_web_docs
	sh update_solr.sh
	duration=$SECONDS
	echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."
	say "solr index update done"
else
	echo "Make sure you run the update_solr.sh script after Jenkins is done:"
	echo "cd $TI_ROOT/appc_web_docs; sh update_solr.sh"
fi
