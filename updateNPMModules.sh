##########################################################################################
##########################################################################################
## 									Purpose of Script                                                   ##
##                                                                                      ##
## Confirm all necessary npm modules are installed for various directories as they      ##
## relate to the doctools and titanium_mobile directories as needed for various doc     ##
## scripts.                                                                             ##
##                                                                                      ##
## Note: This script is usually executed by other scripts. It can be ran in a 			    ##
## stand-alone mode it normally isn't.                                                  ##
##                                                                                      ##
## For more information visit 							   							                            ##
## https://wiki.appcelerator.org/x/qdPBAg						   						                      ##
##########################################################################################

SECONDS=0

bold=$(tput bold)
normal=$(tput sgr0)
#mobile=( js-yaml@3.6.1 pagedown@1.1.0 cheerio@0.22.0 xml2js@0.4.17 ) ## npm modules necessary for titanium_mobile directory
mobile=( js-yaml@3.7.0 pagedown@1.1.0 cheerio@0.22.0 xml2js@0.4.17 ) ## npm modules necessary for titanium_mobile directory
doctools=( cheerio@0.19.0 pagedown@1.1.0 xml2js@0.4.17 html-entities@1.1.3 glob@7.1.0 shelljs@0.7.4 ) ## npm modules necessary for doctools directory
jsduck=( html-entities@1.2.0 ) ## npm modules necessary for jsduck

getNPMs () { ## check to see if a NPM modules is missing and install it if it is missing
	if [ $1 == "titanium_mobile" ]; then
		echo "Reviewing titanium_mobile for ${bold}$2${normal}"
		cd $TI_ROOT/titanium_mobile/apidoc
		module="$(echo $2|cut -d'@' -f 1)" ## js-yaml@3.6.1 becomes js-yaml
		if [ ! -d $TI_ROOT/titanium_mobile/$module ]; then
			echo "Missing $module npm. Installing it now.\n"
			cd $TI_ROOT/titanium_mobile
			npm install $2
		else
			echo "found $module in $TI_ROOT/titanium_mobile/$module; skipping the installer.\n";
		fi
	elif [ $1 == "doctools" ]; then
		echo "Reviewing doctools for ${bold}$2${normal}"
		cd $TI_ROOT/doctools
		module="$(echo $2|cut -d'@' -f 1)" ## cheerio@0.19.0 becomes cheerio
		if [ ! -d $TI_ROOT/doctools/node_modules/$module ]; then
			echo "Missing $module npm. Installing it now.\n"
			npm install $2
		else
			echo "found $2 in $TI_ROOT/doctools/node_modules/$module; skipping the installer.\n";
		fi
	elif [ $1 == "jsduck" ]; then
		echo "Reviewing jsduck for ${bold}$2${normal}"
		cd $TI_ROOT/jsduck
		if [ ! -d $TI_ROOT/jsduck/node_modules ]; then
			mkdir node_modules
		fi
		module="$(echo $2|cut -d'@' -f 1)" ## html-entities@1.2.0 becomes html-entities
		if [ ! -d $TI_ROOT/jsduck/node_modules/$module ]; then
			echo "Missing $module npm. Installing it now.\n"
			npm install $2
		else
			echo "found $2 in $TI_ROOT/jsduck/node_modules/$module; skipping the installer.\n";
		fi
	fi
}

## loop through all arrays and install missing npm modules
for i in "${mobile[@]}"
do
	getNPMs titanium_mobile $i ## install missing npm modules in the titanium_mobile directory
done
for i in "${doctools[@]}"
do
	getNPMs doctools $i ## install missing npm modules in the doctools directory
done
for i in "${jsduck[@]}"
do
	getNPMs jsduck $i ## install missing npm modules in the doctools directory
done

duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."
