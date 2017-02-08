##########################################################################################
##########################################################################################
## 									Purpose of Script                                                   ##
##                                                                                      ##
## bash loader for css_fix.js                                                           ##
##                                                                                      ##
## This script should grab the only CSS file that starts with app in the directory      ##
## listed in FILE. Then is passes the file to a node script so it can fix the CSS       ##
## mentioned in TIDOC-2739.                                                             ##
## Note: This script needs to be executed before the retrieval and update of the        ##
## wiki guide2 space as it will update and wipe out the doctools/htmlguides directory.  ##
##                                                                                      ##
## For more information visit                                                           ##
## https://wiki.appcelerator.org/x/jQ-uAg                                               ##
##########################################################################################
##########################################################################################


say "cleaning CSS"

FILE=$(ls $TI_ROOT/appc_web_docs/platform/latest/resources/css/app*.css) # grab the only CSS that starts with 'app'

if [ -e $FILE ]; then
  echo "found $FILE. Modifying it now."
  node css_fix.js $FILE
else
  echo "$file not found. Aborting."
  exit 1
fi
