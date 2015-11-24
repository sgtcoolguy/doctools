pushd $TI_ROOT/appc_web_docs/arrowdb
git rm -rf latest
cp -r $TI_ROOT/doctools/dist/arrowdb/latest .
git add latest
pushd data/solr
cp $TI_ROOT/doctools/dist/arrowdb/data/solr/* .
popd
popd
