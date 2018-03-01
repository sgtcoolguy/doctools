##########################################################################################
##########################################################################################
## 									Purpose of Script  								                                  ##
##                                                                                      ##
## Generate a report of API changes between a previous and current                      ##
## version of the SDK based on user's input                                             ##
##                                                                                      ##
## For more information visit 							   																			    ##
## https://wiki.appcelerator.org/x/U7bBAg						   																	##
##########################################################################################
##########################################################################################

SECONDS=0

ROOT="/Users/bimmel/temp_repos"

printf "Which branch of titanium_mobile should do you need to be on? (#_#_X)" ## 6_0_x
read -r branch
if [[ -z $branch ]]; then
	echo "You must enter a branch to pull the data from."
	echo -e "\a\a"
	exit 1
else
	## Repo fetch and/or update
	## Update/fetch titanium_mobile repo
	if [ ! -d $ROOT/titanium_mobile ]; then
		echo "\nTitanium_mobile repo wasn't found; fetching it now."
		cd $ROOT
		git clone https://github.com/appcelerator/titanium_mobile.git
	fi
	cd $ROOT/titanium_mobile
	echo "Checking out $branch titanium_mobile"
	git checkout $branch
	echo "Getting $branch commits"
	git pull
	## Update/fetch titanium_mobile_windows repo
	if [ ! -d $ROOT/titanium_mobile_windows ]; then
		echo "\nTitanium_mobile_windows repo wasn't found; fetching it now."
		cd $ROOT
		git clone https://github.com/appcelerator/titanium_mobile_windows.git
	fi
	cd $ROOT/titanium_mobile_windows
	echo "Checking out $branch for titanium_mobile_windows"
	git checkout $branch
	git pull
fi

## Ask user for previous and current versions to generate report on
echo "Enter the prior and current versions to generate API change."
printf "Previous version (#.#.#): "
read -r previous
echo "Enter the target version plus 0.0.1 so that the current version is included in the report."
printf "Current version (+0.0.1)(#.#.#): " ## 5.3.2 (version higher than the previous)
read -r current
FILENAME=$previous-${current}_changes.html
printf "Target release version (#.#.#): "
read -r targetRelease

## Check to see if user entered in numbers for both inputs
if [[ -z $previous || -z $current ]]; then
	echo "You must enter both a previous and current version for this script to work."
	echo -e "\a\a"
	exit 1
fi

## Check for select NPM modules and confirm they are installed
npmModules=( pagedown js-yaml node-appc colors ejs )

npmUpdate () { ## check to see if a module exists and update it
	echo "Updating/Installing $1 npm module"
	if [ ! -d $ROOT/titanium_mobile/node_modules/$1 ]; then
		echo "\nThe $1 NPM module was not found. Installing it now."
		# cd $ROOT/titanium_mobile
		cd /Users/bimmel/temp_repos
		npm install $1
	fi
}

for i in "${npmModules[@]}"
do
	npmUpdate $i
done

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
mv *.html $FILENAME

node ../../API_report_cleanup.js $current $targetRelease

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
