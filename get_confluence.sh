#####################################################################
## Purpose: Get the latest version of the guide2 Confluence space  ##
## so one can publish the latest version of the documentation from ##
## that space.                                                     ##
##																   ##
## This script should be executed from the doctools/htmlguides 	   ##
## directory.													   ##
#####################################################################

DATE=$(date +%Y-%m-%d)
CONFLUENCE_FILE=confluence_guide2-$DATE.zip
date

## function to download guide2 confluence space
function downloadJarFile() {
	CONFLUENCE_USERNAME='doc-robot'
	CONFLUENCE_PASSWORD='szE8U9OWiJmVsfuCEQCMAgYwHokRrkqowyixe5HLqwzPUJOziy'
	REST_URL='https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/sync-export?exportSchemeId=guides2-7F0000010146EBA9ABDB43844FCF8B50&rootPageId=29004729'
	wget --content-disposition "$REST_URL&os_username=$CONFLUENCE_USERNAME&os_password=$CONFLUENCE_PASSWORD"
	## rename the downloaded .jar file to include the a human readable name
	mv com.*.jar $CONFLUENCE_FILE
	## If the working Confluence directory doesn't exist, create it
	if [ -d $TI_ROOT/Confluence_working]; then
		cd $TI_ROOT
		mkdir Confluence_working
		cd -
	fi
	## move .jar file to working directory
	mv $CONFLUENCE_FILE $TI_ROOT/Confluence_working
}

unzipFile() {
	date
	echo "Unzipping $TI_ROOT/Confluence_working/$CONFLUENCE_FILE"
	unzip -o $TI_ROOT/Confluence_working/$CONFLUENCE_FILE
	date
}

if [ -s $TI_ROOT/Confluence_working/$CONFLUENCE_FILE ]; then
	echo "$CONFLUENCE_FILE exists. Do you wish to download it again? [y]es/[n]o/[u]nzip?"
	read input
	if [ $input == "yes" ] || [ $input == "y" ]; then
		echo "Downloading today's guide2 .jar file."
		downloadJarFile
	elif [ $input == "unzip" ] || [ $input == "u" ]; then
		echo "Unzipping the existing guide2 file."
		unzipFile
	else
		Echo "Quitting"
	fi
else
	echo "The guide2 .jar file is out of date or does not exist. Downloading today's version."
	## download .jar file into a working directory outside of htmlguides directory
	downloadJarFile
	unzipFile
fi
