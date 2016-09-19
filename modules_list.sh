## Purpose: Generate a list of dependencies for a NPM modules
## For more details, please visit https://wiki.appcelerator.org/x/PrHBAg

rm modules_list.txt
touch modules_list.txt

while read name
do
  #do what you want to $name
  echo $name
  echo "###" >> modules_list.txt
  npm view $name >> modules_list.txt
done < modules_start_list.txt