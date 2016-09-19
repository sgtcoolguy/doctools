##########################################################################################
##########################################################################################
## 									Purpose of Script                                   ##
##                                                                                      ##
## Generate a list of Titanium API modules that have Yaml issues.                       ##
##                                                                                      ##
## For more information visit 							   							    ##
## ??????						   						##
##########################################################################################
##########################################################################################

SECONDS=0
REPORT=$TI_ROOT/doctools/api_report.txt ## report of all broken files
DIRECTORIES=$TI_ROOT/doctools/module_directories.txt ## create a temporarily list of API module directories

## if report file exists, wipe it out
cd $TI_ROOT/doctools
if [ -f $REPORT ]; then
	rm $REPORT
fi
touch api_report.txt

## Update titanium_mobile local repo
cd $TI_ROOT/titanium_mobile
git clean -dfx
git reset --hard HEAD
git pull origin master

## Check to see if js-yaml and pagedown npm modules are installed (required by various scripts)
if [ ! -d $TI_ROOT/titanium_mobile/node_modules/js-yaml ]; then 
	echo "Missing js-yaml. Installing it now."
	cd $TI_ROOT/titanium_mobile
	npm install js-yaml
else 
	echo "found it js-yaml; skipping the installer";
fi
if [ ! -d $TI_ROOT/titanium_mobile/node_modules/pagedown ]; then 
	echo "Missing pagedown"
	cd $TI_ROOT/titanium_mobile
	npm install pagedown
else 
	echo "found it pagedown; skipping the installer";
fi

## check the top level of $TI_ROOT/titanium_mobile/apidoc
cd $TI_ROOT/titanium_mobile/apidoc
echo "Checking $TI_ROOT/titanium_mobile/apidoc" > $REPORT
node validate.js 2> $REPORT
echo "" >> $REPORT
echo "" >> $REPORT

## generate a list of API module directories
touch $DIRECTORIES
find $TI_ROOT/titanium_mobile/apidoc/Titanium -type d > $DIRECTORIES

## loop through $DIRECTORIES; cd into each dir, and execute node validate.js in each dir
cd $TI_ROOT/titanium_mobile/apidoc/Titanium
while read p; do
	needle="/" ## character I'm going to count
	occurrences=$(grep -o "$needle" <<< "$p" | wc -l) ## Find the needle in the haystack
	cd $p
	echo "" >> $REPORT
	echo "Checking $p" >> $REPORT
	if [ $occurrences = "9" ]; then ## if the count is more than 8 (shouldn't be more than 9)
		#echo "sub dir"
		node ../../../validate.js 2>> $REPORT ## run validate a depth lower and report errors to $REPORT
	else
		node ../../validate.js 2>> $REPORT ## run validate at "normal" level and report errors to $REPORT
	fi
	echo "" >> $REPORT
done <DIRECTORIES

rm $DIRECTORIES ## remove list of API module directories file 

open -a TextWrangler $REPORT ## open report in Text Wrangler
duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."