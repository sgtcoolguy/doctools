##########################################################################################
##########################################################################################
## 									Purpose of Script                                   ##
##                                                                                      ##
## Generate a report of API changes between a previous and current                      ##
## version of the SDK based on user's input                                             ##
##                                                                                      ##
## For more information visit 							   							    ##
## https://wiki.appcelerator.org/x/U7bBAg						   						##
##########################################################################################
##########################################################################################
## write a script to update the temporary copy of titanium_mobile, npm pagedown, and run API changes script (with arguments), and open the report to generate the API changes from version to version of the SDK releases.

date
SECONDS=0

ROOT="/Users/bimmel/temp_repos"

echo "Enter the prior and current versions to generate API change"
echo "Previous version: " ## 5.2.0
read previous
echo "Current version: " ## 5.3.2 (version higher than the previous)
read current

if [[ -z $previous || -z $current ]]; then
	echo "You must enter both a previous and current version for this script to work."
	exit 1
fi

## if the titanium_mobile repo isn't present, go get it; otherwise, update it
if [ ! -d $ROOT/titanium_mobile ]; then
	echo "titanium_mobile repo wasn't found; fetching it now."
	cd $ROOT
	git clone https://github.com/appcelerator/titanium_mobile.git
else
	echo "Updating titanium_mobile repo."
	cd $ROOT/titanium_mobile
	git fetch origin master
fi

## check to see in pagedown npm module has been installed
if [ ! -d $ROOT/titanium_mobile/node_modules/pagedown ]; then
	echo "The pagedown NPM module was not found. Installing it now."
	cd $ROOT/titanium_mobile
	npm install pagedown
fi

## remove previous API change reports
if [ -f $ROOT/titanium_mobile/dist/*.html ]; then
	echo "Removing previous API change reports."
	cd $ROOT/titanium_mobile/dist/
	rm *.html
fi

## generate API change report
echo "Looking for API changes from $previous to $current"
cd $ROOT/titanium_mobile/apidoc
node docgen -f changes --start $previous --end $current > $ROOT/report.txt

grep 'No API changes found.' $ROOT/report.txt
open $ROOT/titanium_mobile/dist/*.html
say "API change scan complete. End of line."

duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."