#####################################################################
## Purpose: Get the latest version of the guide2 Confluence space  ##
## so one can have one piece of the documentation puzzle.          ##
##                                                                 ##
## For more information visit                                      ##
## https://wiki.appcelerator.org/x/MJzBAg                          ##
#####################################################################

SECONDS=0
DATE=$(date +%Y-%m-%d)
CONFLUENCE_FILE=confluence_guide2-$DATE.zip
date
DOCTOOLSDIR=$TI_ROOT/doctools
HTMLGUIDESDIR=$DOCTOOLSDIR/htmlguides
WORKINGDIR=$TI_ROOT/Confluence_working

## function to download guide2 confluence space
function downloadJarFile() {
	REST_URL='https://wiki.appcelerator.org/rest/scroll-eclipsehelp/1.0/sync-export?exportSchemeId=guides2-7F000001015A6C6CD20B1E0B58AE1D82&rootPageId=29004729'
	wget --content-disposition "$REST_URL&os_username=$CONFLUENCE_USERNAME&os_password=$CONFLUENCE_PASSWORD"
	## rename the downloaded .jar file to include the a human readable name
	mv com.*.jar $CONFLUENCE_FILE
	## If the working Confluence directory doesn't exist, create it
	if [ -d $WORKINGDIR ]; then
		cd $TI_ROOT
		mkdir Confluence_working
		cd -
	fi
	## move .jar file to working directory
	mv $CONFLUENCE_FILE $WORKINGDIR
}

unzipFile() {
	## detect if the htmlguides directory is populated or not
	cd $HTMLGUIDESDIR
	current=${PWD}
	if [ "$(ls -A $HTMLGUIDESDIR)" ]; then
			echo "Emptying $current"
			rm -r *
			echo "Unzipping $WORKINGDIR/$CONFLUENCE_FILE in $current"
			unzip -o $WORKINGDIR/$CONFLUENCE_FILE
	else
		## current directory is empty; unzip files in it.
		echo "Current directory is empty; proceeding with unzipping of $CONFLUENCE_FILE."
		echo "Unzipping $WORKINGDIR/$CONFLUENCE_FILE in $current"
		unzip -o $WORKINGDIR/$CONFLUENCE_FILE
	fi
}

parse_xml() {
	#cd $DOCTOOLSDIR
	## parse the $TI_ROOT/doctools/htmlguides/toc.xml file for items related to TIDOC-2718
	#node $DOCTOOLSDIR/parse_xml $HTMLGUIDESDIR toc.xml
	#echo "Parsing $HTMLGUIDESDIR/toc.xml"
	echo
}

getWiki() {
	if [ -s $WORKINGDIR/$CONFLUENCE_FILE ]; then
		printf "$CONFLUENCE_FILE exists. Do you wish to download it again, unzip the current file, or download and unzip latest version (total package)? [d]ownload/[u]nzip/[t]otal?"
		read -r input
		if [ $input == "download" ] || [ $input == "d" ]; then
			echo "Downloading today's guide2 .jar file."
			downloadJarFile
		elif [ $input == "unzip" ] || [ $input == "u" ]; then
			echo "Unzipping the existing guide2 file in $HTMLGUIDESDIR."
			cd $HTMLGUIDESDIR
			unzipFile
			parse_xml
		elif [ $input == "total" ] || [ $input == "t" ]; then
			echo "Downloading latest version of guide2 space and unzipping in $HTMLGUIDESDIR."
			downloadJarFile
			cd $HTMLGUIDESDIR
			unzipFile
			parse_xml
		else
			Echo "Quitting"
		fi
	else
		echo "The guide2 .jar file is out of date or does not exist. Downloading today's version."
		## download .jar file into a working directory outside of htmlguides directory
		downloadJarFile
		unzipFile
		parse_xml
	fi
}

## Create a series of potentially missing directories
## if the htmlguides directory is missing, add it back in
if [ ! -d $HTMLGUIDESDIR ]; then
	echo "htmlguide directory is missing. Creating that directory."
	mkdir $HTMLGUIDESDIR
fi
## empty the output directory of the guides
if [ -d $HTMLGUIDESDIR ]; then
	echo "Emptying ../htmlguides directory."
	cd $HTMLGUIDESDIR
	rm -r *
fi
## this addition of the dist/platform and dist/arrowdb directories are not necessary for the creation of the htmlguides content but this directory is wiped out from the update_modules.sh script and needs to be added back in before the doc pub can finish.
if [ ! -d $DOCTOOLSDIR/dist/platform ]; then
	echo "../dist/platform directory is missing. Creating that directory."
	mkdir -p $DOCTOOLSDIR/dist/platform
fi
if [ ! -d $DOCTOOLSDIR/dist/arrowdb ]; then
	echo "../dist/arrowdb directory is missing. Creating that directory."
	mkdir -p $DOCTOOLSDIR/dist/arrowdb
fi
## if the Confluence_working is missing, create it
if [ ! -d $WORKINGDIR ]; then
	echo "../Confluence_working directory is missing. Create that directory."
	mkdir $WORKINGDIR
fi

## Ask user if this is a major or minor SDK release; if so, edit the Titanium Compatibility Matrix wiki page and carry on normally
printf "Is this a major or minor SDK release? "
read -r edit
if [ $edit == "y" ]; then
  echo "\nBe sure to add info for the Supported SDK releases, CLI info, Appc NPM, Node.js, etc."
  echo "\nOpening browser to Titanium Compatibility Matrix"
  open https://wiki.appcelerator.org/pages/editpage.action?pageId=29004837 #open browser
  printf "Are you done editing? "
  read -r done
  if [ $done == "y" ]; then
    getWiki
  else
    echo "Finish editing the Titanium Compatibility Matrix wiki page and try again.\nQuitting script."
    exit 1
  fi
else
  getWiki
fi



say 'Download complete'

printf "Do you need to edit ../doctools/toc.xml?"
read -r edit
if [ $edit == "yes" ] || [ $edit == "y" ]; then
	open $DOCTOOLSDIR/toc.xml
else
	echo "Skip opening/editing $DOCTOOLSDIR/toc.xml"
fi

## temp fix to copy the ../doctools/toc.xml to ../doctools/htmlguides/
printf "Copy ../doctools/toc.xml to ../doctools/htmlguides/?"
read -r copy
if [ $copy == "yes" ] || [ $copy == "y" ]; then
	echo "copying ../doctools/toc.xml to ../doctools/htmlguides/"
	cp $DOCTOOLSDIR/toc.xml $HTMLGUIDESDIR/
else
	echo "If you need to update the $HTMLGUIDESDIR/toc.xml file, do it before"
	echo "executing the documentation build script."
fi

duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."
