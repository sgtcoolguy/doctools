#####################################################################
## Purpose: Get the latest version of the guide2 Confluence space  ##
## so one can have one piece of the documentation puzzle.		   ##
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
	if [ -d $TI_ROOT/Confluence_working ]; then
		cd $TI_ROOT
		mkdir Confluence_working
		cd -
	fi
	## move .jar file to working directory
	mv $CONFLUENCE_FILE $TI_ROOT/Confluence_working
}

unzipFile() {
	date
	## detect if the htmlguides directory is populated or not
	cd $TI_ROOT/doctools/htmlguides
	current=${PWD}
	if [ "$(ls -A $TI_ROOT/doctools/htmlguides)" ]; then
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

## Create a series of potentially missing directories
## if the htmlguides directory is missing, add it back in
if [ ! -d $TI_ROOT/doctools/htmlguides ]; then
	echo "htmlguide directory is missing. Creating that directory."
	mkdir $TI_ROOT/doctools/htmlguides
fi
## this addition of the dist/platform and dist/arrowdb directories are not necessary for the creation of the htmlguides content but this directory is wiped out from the update_modules.sh script and needs to be added back in before the doc pub can finish.
if [ ! -d $TI_ROOT/doctools/dist/platform ]; then
	echo "../dist/platform directory is missing. Creating that directory."
	mkdir -p $TI_ROOT/doctools/dist/platform
fi
if [ ! -d $TI_ROOT/doctools/dist/arrowdb ]; then
	echo "../dist/arrowdb directory is missing. Creating that directory."
	mkdir -p $TI_ROOT/doctools/dist/arrowdb
fi

if [ -s $TI_ROOT/Confluence_working/$CONFLUENCE_FILE ]; then
	echo "$CONFLUENCE_FILE exists. Do you wish to download it again or unzip the current file? [y]es/[u]nzip?"
	read input
	if [ $input == "yes" ] || [ $input == "y" ]; then
		echo "Downloading today's guide2 .jar file."
		downloadJarFile
	elif [ $input == "unzip" ] || [ $input == "u" ]; then
		echo "Unzipping the existing guide2 file in $TI_ROOT/doctools/htmlguides."
		cd $TI_ROOT/doctools/htmlguides
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
