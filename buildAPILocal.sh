## The following commands should only be used to build local docs for the purposes of testing the API docs:

# update all the required npm modules
npm i

# clean up build report
cd /Users/bimmel/Documents/Repositories/doctools
rm API_local_build_report.txt
touch API_local_build_report.txt

## append start timestamp marking the building of the task
date
date >> API_local_build_report.txt

## build arrow, alloy, and modules api docs
sh deploy.sh -o arrow -o alloy -o modules >> API_local_build_report.txt

## ** I don't think the clouddeploy step is needed
#sh clouddeploy.sh >> API_local_build_report.txt
bash build_platform.sh >> API_local_build_report.txt

## copy build docs into the platform directories
cd /Users/bimmel/Documents/Repositories/appc_web_docs/
bash ../doctools/copy_platform.sh >> API_local_build_report.txt

## append end timestamp for the end of the task
date >> API_local_build_report.txt
date

## Review the locally generated docs
LOCAL_PATH='http://localhost/platform/latest/#!/api'
open $LOCAL_PATH
open -a Atom API_local_build_report.txt
say "API local build complete"
