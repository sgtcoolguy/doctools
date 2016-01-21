#####################################################################
## Purpose: Get the latest version of the guide2 Confluence space  ##
## so one can have one piece of the documentation puzzle.		   ##
##																   ##
## For more information visit 									   ##
## https://wiki.appcelerator.org/x/MJzBAg						   ##
#####################################################################

DATE=$(date +%Y-%m-%d)
CONFLUENCE_FILE=confluence_guide2-$DATE.zip
WORKSPACE=$TI_ROOT/workspace
date

## Create a series of potentially missing directories
## if the htmlguides directory is missing, add it back in
if [ ! -d $WORKSPACE/doctools/htmlguides ]; then
	echo "htmlguide directory is missing. Creating that directory."
	mkdir $WORKSPACE/doctools/htmlguides
fi
## this addition of the dist/platform and dist/arrowdb directories are not necessary for the creation of the htmlguides content but this directory is wiped out from the update_modules.sh script and needs to be added back in before the doc pub can finish.
if [ ! -d $WORKSPACE/doctools/dist/platform ]; then
	echo "../dist/platform directory is missing. Creating that directory."
	mkdir -p $WORKSPACE/doctools/dist/platform
fi
if [ ! -d $WORKSPACE/doctools/dist/arrowdb ]; then
	echo "../dist/arrowdb directory is missing. Creating that directory."
	mkdir -p $WORKSPACE/doctools/dist/arrowdb
fi
## if the Confluence_working is missing, create it
if [ ! -d $WORKSPACE/Confluence_working ]; then
	echo "../Confluence_working directory is missing. Create that directory."
	mkdir $WORKSPACE/Confluence_working
fi

cd $WORKSPACE/Confluence_working
pwd


## **** something isn't working right here.
## **** the downloaded .jar file isn't being saved anywhere.

echo "Downloading today's guide2 .jar file."
## function to download guide2 confluence space
#CONFLUENCE_USERNAME='doc-robot'
#CONFLUENCE_PASSWORD='szE8U9OWiJmVsfuCEQCMAgYwHokRrkqowyixe5HLqwzPUJOziy'
	#REST_URL='https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/sync-export?exportSchemeId=guides2-7F0000010146EBA9ABDB43844FCF8B50&rootPageId=29004729'
#wget --content-disposition "$REST_URL&os_username=$CONFLUENCE_USERNAME&os_password=$CONFLUENCE_PASSWORD"
#touch com.something.jar
## rename the downloaded .jar file to include the a human readable name
mv com.*.jar $CONFLUENCE_FILE

date
## detect if the htmlguides directory is populated or not
#cd $TI_ROOT/doctools/htmlguides
#current=${PWD}
#if [ "$(ls -A $TI_ROOT/doctools/htmlguides)" ]; then
#	echo "Emptying $current"
#	rm -r *
#	echo "Unzipping $TI_ROOT/Confluence_working/$CONFLUENCE_FILE in $current"
#	unzip -o $TI_ROOT/Confluence_working/$CONFLUENCE_FILE
#	date		
#fi

