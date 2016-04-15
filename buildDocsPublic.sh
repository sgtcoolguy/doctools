#####################################################################
## Purpose: semi-automate the documentation build process locally  ##
##																   ##
## For more information visit 									   ##
## ?															   ##
#####################################################################

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
	##echo "Emptying ../htmlguides directory."
	##cd $TI_ROOT/doctools/htmlguides
	##rm -r *
##fi

remove messages.txt
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

## open the Jenkins job pages so you can publish the docs (as needed)
open http://devops-jenkins.appcelerator.org/job/appc_web_docs/
open http://devops-jenkins.appcelerator.org/job/server_package_deployment/

echo "Make sure you run the update_solr.sh script after Jenkins is done."