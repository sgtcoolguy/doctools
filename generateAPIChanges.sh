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

printf "Which branch of titanium_mobile should do you need to be on? " ## 6_0_x
read -r branch
if [[ -z $branch ]]; then
	echo "You must enter a branch to pull the data from."
	echo -e "\a\a"
	exit 1
else
	cd $ROOT/titanium_mobile
	echo "Checking out $branch"
	git checkout $branch
	echo "Getting $branch commits"
	git pull
fi

## Ask user for previous and current versions to generate report on
echo "Enter the prior and current versions to generate API change."
printf "Previous version: "
read -r previous
echo "Enter the target version plus 0.0.1 so that the current version is included in the report."
printf "Current version (+0.0.1): " ## 5.3.2 (version higher than the previous)
read -r current


## Check to see if user entered in numbers for both inputs
if [[ -z $previous || -z $current ]]; then
	echo "You must enter both a previous and current version for this script to work."
	echo -e "\a\a"
	exit 1
fi

## Repo fetch and/or update
## If the titanium_mobile repo isn't present, go get it; otherwise, attempt to update it
if [ ! -d $ROOT/titanium_mobile ]; then
	echo "\nTitanium_mobile repo wasn't found; fetching it now."
	cd $ROOT
	git clone https://github.com/appcelerator/titanium_mobile.git
else
	echo "\nUpdating titanium_mobile repo."
	cd $ROOT/titanium_mobile
	git fetch origin master
fi

## If the Titanium_mobile_windows repo isn't present, go get it; otherwise, attempt to update it
if [ ! -d $ROOT/titanium_mobile_windows ]; then
	echo "\nTitanium_mobile_windows repo wasn't found; fetching it now."
	cd $ROOT
	git clone https://github.com/appcelerator/titanium_mobile_windows.git
else
	echo "\nUpdating titanium_mobile_windows repo."
	cd $ROOT/titanium_mobile_windows
	git fetch origin master
fi


## Check for select NPM modules
## Check to see in pagedown NPM module has been installed
if [ ! -d $ROOT/titanium_mobile/node_modules/pagedown ]; then
	echo "\nThe pagedown NPM module was not found. Installing it now."
	cd $ROOT/titanium_mobile
	npm install pagedown
fi

## Confirm js-yaml is installed, if not, get it
if [ ! -d $ROOT/titanium_mobile/node_modules/js-yaml ]; then
	echo "\nThe ys-yaml NPM module was not found. Installing it now."
	cd $ROOT/titanium_mobile
	npm install js-yaml
fi


## Remove previous API change reports
if [ -d $ROOT/titanium_mobile/dist/ ]; then
	echo "\nRemoving old API change reports from $ROOT/titanium_mobile/dist"
	cd $ROOT/titanium_mobile/dist
	rm *.html
fi


## Generate API change report
echo "Looking for API changes from version $previous to $current"
cd $ROOT/titanium_mobile/apidoc
node docgen -f changes --start $previous --end $current -a $ROOT/titanium_mobile_windows/apidoc/Titanium

## rename HTML file to reflect what was requested
cd $ROOT/titanium_mobile/dist
FILENAME=$previous-${current}_changes.html
mv *.html $FILENAME


## Open API report if one was generated
if [ -f $ROOT/titanium_mobile/dist/$FILENAME ]; then
	open $ROOT/titanium_mobile/dist/$FILENAME
	say "API change scan complete. End of line."
else
	echo "\nNo API changes between versions $previous and $current."
	say "No API changes between $previous and $current. End of line"
fi


duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."