#!/bin/bash

# Comments
# - Customize for your installation, for instance you might want to add default parameters like the following:
#java -jar `dirname $0`/lib/confluence-cli-5.1.0.jar --server https://wiki.appcelerator.org --user $USER --password $PASSWORD "$@"

java -jar `dirname $0`/lib/confluence-cli-5.1.0.jar "$@"
