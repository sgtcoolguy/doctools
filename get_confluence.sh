#####################################################################
## Purpose: Get the latest version of the guide2 Confluence space  ##
## so one can have one piece of the documentation puzzle.		   ##
##																   ##
## This script should be executed from the doctools/htmlguides 	   ##
## directory.													   ##
##																   ##
## For more information visit 									   ##
## https://wiki.appcelerator.org/x/MJzBAg						   ##
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
	## detect if the current directory is populated or not
	current=${PWD}
	if [ "$(ls -A $current)" ]; then
		echo "current directory of $current is populated; it should be emptied. [e]mpty?"
		## Are you sure it should be emptied?
		read input
		## if user requests to empty directory, empty it and unzip files
		if [ $input == "empty" ] || [ $input == "e" ]; then
			echo "Emptying $current"
			rm -r *
			echo "Unzipping $TI_ROOT/Confluence_working/$CONFLUENCE_FILE in $current"
			unzip -o $TI_ROOT/Confluence_working/$CONFLUENCE_FILE
			date		
		else
			echo "Quitting"
			exit 1
		fi
	else
		## current directory is empty; unzip files in it.
		echo "Current directory is empty; proceeding with unzipping of $CONFLUENCE_FILE."
		echo "Unzipping $TI_ROOT/Confluence_working/$CONFLUENCE_FILE in $current"
		unzip -o $TI_ROOT/Confluence_working/$CONFLUENCE_FILE
		date		
	fi
	
}

## if the htmlguides directory is missing, add it back in
## this may be unnecessary but it might be needed as a step for future functionality
if [ ! -d $TI_ROOT/doctools/htmlguides ]; then
	echo "htmlguide directory is missing. Creating that directory"
	mkdir $TI_ROOT/doctools/htmlguides
fi

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
