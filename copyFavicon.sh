#copyFavicon.sh

## Copy the ../doctools/favicon.ico to various directories

DIRECTORIES=(
  doctools/dist/platform/latest/
  doctools/dist/arrowdb/latest/
  appc_web_docs/
  appc_web_docs/cloud/latest/
  appc_web_docs/platform/latest/
  jsduck/template-min/
)

for i in "${DIRECTORIES[@]}"
do
  echo "Copying Axway Griffin favicon.ico to $TI_ROOT/$i"
  cp $TI_ROOT/doctools/favicon.ico $TI_ROOT/$i
done
