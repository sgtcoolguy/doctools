##########################################################################################
##########################################################################################
## 									Purpose of Script                                                   ##
##                                                                                      ##
## Generate a list of contributors for major and minor SDK releases.                    ##
##                                                                                      ##
## For more information visit                                                           ##
## https://wiki.appcelerator.org/x/g6vBAg                                               ##
##########################################################################################
##########################################################################################

SECONDS=0
date

## array of apidoc modules to update from their respective repos to check for contributors
moduleArray=( appcelerator.apm appcelerator.https ti.cloud ti.coremotion ti.facebook ti.geofence ti.map ti.newsstand ti.nfc Ti.SafariDialog ti.touchid ti.urlsession )
## array of non-module repos (cloned) to check for contributors
nonModuleArray=( appc-cli titanium_mobile_windows appc-cli-titanium titanium )
## array of forked repo to check for contributors
forkedArray=( alloy titanium_mobile )


echo "Enter months/weeks/days ago of last SDK release."
printf "month(s): "
read -r months
printf "week(s): "
read -r weeks
printf "day(s): "
read -r days

if [ ! -f $TI_ROOT/SDK-contributors.txt ]; then
	echo "SDK-contributors.txt does not exist. Create it now."
	touch $TI_ROOT/SDK-contributors.txt
else
	echo "Emptying SDK-contributors.txt file."
	rm $TI_ROOT/SDK-contributors.txt
	touch $TI_ROOT/SDK-contributors.txt
	echo "SDK contributor list updated on " > $TI_ROOT/SDK-contributors.txt
	date >> $TI_ROOT/SDK-contributors.txt
	echo "Pulling from $months months, $weeks weeks, and $days days ago."  >> $TI_ROOT/SDK-contributors.txt
	echo "" >> $TI_ROOT/SDK-contributors.txt

	## loop through the nonModuleArray and get contributors
	for i in "${nonModuleArray[@]}"
	do
		echo "Getting contributors for $i"
		cd $TI_ROOT/$i
		echo "$i contributors:" >>  $TI_ROOT/SDK-contributors.txt
		echo "---------------------------------------" >>  $TI_ROOT/SDK-contributors.txt
		git clean -dfx
		git reset --hard HEAD
		git pull origin master
		git shortlog -e -n --since="$months months $weeks weeks $days days ago" >> $TI_ROOT/SDK-contributors.txt
		echo "" >>  $TI_ROOT/SDK-contributors.txt
		echo "" >>  $TI_ROOT/SDK-contributors.txt
	done

	## loop through the moduleArray and get contributors
	for i in "${moduleArray[@]}"
	do
		echo ""
		echo ""
		echo "Getting contributors for $i"
		cd $TI_ROOT/appc_modules/$i
		echo "$i contributors:" >>  $TI_ROOT/SDK-contributors.txt
		echo "---------------------------------------" >>  $TI_ROOT/SDK-contributors.txt
		git clean -dfx
		git reset --hard HEAD
		git pull origin master
		git shortlog -e -n --since="$months months $weeks weeks $days days ago" >> $TI_ROOT/SDK-contributors.txt
		echo "" >>  $TI_ROOT/SDK-contributors.txt
		echo "" >>  $TI_ROOT/SDK-contributors.txt
	done

	## Loop through the forkedArray and get contributors
	for i in "${forkedArray[@]}"
	do
		echo "Getting contributors for Alloy"
		cd $TI_ROOT/$i
		echo "$i contributors:" >>  $TI_ROOT/SDK-contributors.txt
		echo "---------------------------------------" >>  $TI_ROOT/SDK-contributors.txt
		git fetch appcelerator
		git checkout master
		git shortlog -e -n --since="$months months $weeks weeks $days days ago" >> $TI_ROOT/SDK-contributors.txt
		echo "" >>  $TI_ROOT/SDK-contributors.txt
		echo "" >>  $TI_ROOT/SDK-contributors.txt
	done
fi

duration=$SECONDS
echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

say "Contributor list complete"

open -a Atom $TI_ROOT/SDK-contributors.txt
