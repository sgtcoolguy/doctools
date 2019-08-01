outdir=$TI_ROOT/doctools/dist/titanium/2.1 

cd $TI_ROOT/titanium_mobile 
git checkout 2.1.4_docs 
# git pull appcelerator 2_1_X
cd $TI_ROOT/doctools
rm -rf $outdir
sh deploy.sh -d $outdir -g htmlguides-2.1.3 -t "Titanium 2.X - Appcelerator Docs" debug 
rm -rf ~/Sites/titanium/2.1
rm -rf ~/Sites/titanium/landing/index.html
cp -rf $outdir ~/Sites/titanium/2.1
cp $TI_ROOT/appc_web_docs/titanium/landing/index.html ~/Sites/titanium/landing/index.html

