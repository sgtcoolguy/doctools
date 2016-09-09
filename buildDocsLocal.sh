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

## confirm that npm modules are installed in titanium_mobile and titanium_mobile_windows

## Install npm js-yaml and pagedown in the titanium_mobile/apidoc (as it may have been wiped out from pulling a fresh copy of the repo)
echo "Confirming npm modules ys-yaml and pagedown are installed in $TI_ROOT/titanium_mobile/apidoc"
cd $TI_ROOT/titanium_mobile/apidoc
npm install js-yaml
npm install pagedown

## Install npm cheerio, xml2js, and shelljs in the doctools directory (in case it was wiped out by a result repo update)
echo "Confirming npm modules cheerio, xml2js, and shelljs are installed in $TI_ROOT/doctools"
cd $TI_ROOT/doctools
npm install cheerio
npm install xml2js
npm install shelljs

## run through the basic scripts to build the docs locally

cd $TI_ROOT/doctools
sh deploy.sh prod > messages.txt
sh clouddeploy.sh >> messages.txt
sh deploy.sh -o arrow -o alloy -o modules -s prod >> messages.txt
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
echo "Manually check the page(s) you updated."
duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

say "local build done"

#Error: /Users/bimmel/Documents/Repositories/doctools/build/guides/guides.json is not a valid JSON file
