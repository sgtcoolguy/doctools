## bash loader for css_fix.js

FILE=$(ls $TI_ROOT/appc_web_docs/platform/latest/resources/css/app*.css) # grab the only CSS that starts with 'app'

if [ -e $FILE ]; then
  echo "found $FILE. Modifying it now."
  node css_fix.js $FILE
else
  echo "$file not found. Aborting."
  exit 1
fi
