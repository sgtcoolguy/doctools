##########################################################################################
##########################################################################################
## 									Purpose of Script                                   ##
##                                                                                      ##
## Confirm all necessary npm modules are installed for various directories as they      ##
## relate to the doctools and titanium_mobile directories as needed for various doc     ##
## scripts.																				##
##                                                                                      ##
## Note: This script is usually executed by other scripts. It can be ran in a 			##
## stand-alone mode it normally isn't.													##
##                                                                                      ##
## For more information visit 							   							    ##
## https://wiki.appcelerator.org/x/qdPBAg						   						##
##########################################################################################

bold=$(tput bold)
normal=$(tput sgr0)
mobile=( js-yaml pagedown ) ## npm modules necessary for titanium_mobile directory
doctools=( cheerio xml2js glob shelljs ) ## npm modules necessary for doctools directory

getNPMs () { ## check to see if a NPM modules is missing and install it if it is missing
	if [ $1 == "titanium_mobile" ]; then
		echo "Reviewing titanium_mobile for ${bold}$2${normal}"
		cd $TI_ROOT/titanium_mobile/apidoc
		if [ ! -d $TI_ROOT/titanium_mobile/node_modules/$2 ]; then 
			echo "Missing $2 npm. Installing it now.\n"
			cd $TI_ROOT/titanium_mobile
			npm install $2
		else 
			echo "found $2 in $TI_ROOT/titanium_mobile/node_modules/$2; skipping the installer.\n";
		fi
	elif [ $1 == "doctools" ]; then
		echo "Reviewing doctools for ${bold}$2${normal}"		
		cd $TI_ROOT/doctools
			if [ ! -d $TI_ROOT/doctools/node_modules/$2 ]; then 
			echo "Missing $2 npm. Installing it now.\n"
			npm install $2
		else 
			echo "found $2 in $TI_ROOT/doctools/node_modules/$2; skipping the installer.\n";
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