#####################################################################
## Purpose: automatically rebuilds the .../doctools/htmlguides     ##
## directory. Typically used within other scripts.                 ##
##                                                                 ##
## For more information visit                                      ##
## https://wiki.appcelerator.org/x/kAfjAg                          ##
#####################################################################

htmlguides=$TI_ROOT/doctools/htmlguides ## set htmlguides path
confluenceDir=$TI_ROOT/Confluence_working ## set confluence_working path
CONFLUENCE_FILE=$(ls $confluenceDir | tail -n 1) ## get the newest confluence zip file (in theory)

cd $TI_ROOT/doctools

## if the htmlguides directory is missing, add it back in
if [ ! -d $htmlguides ]; then
 echo "htmlguide directory is missing. Creating that directory."
 mkdir $htmlguides
else
  echo "htmlguide directory exists. Move along."
fi

cd $htmlguides
if [ "$(ls -A $htmlguides)" ]; then
 echo "Emptying $htmlguides"
 rm -r *
 echo "Unzipping $confluenceDir/$CONFLUENCE_FILE in $htmlguides"
 unzip -o $TI_ROOT/Confluence_working/$CONFLUENCE_FILE
else ## current directory is empty; unzip files in it.
 echo "$htmlguides directory is empty; proceeding with unzipping of $TI_ROOT/Confluence_working/$CONFLUENCE_FILE."
 unzip -o $TI_ROOT/Confluence_working/$CONFLUENCE_FILE
fi
