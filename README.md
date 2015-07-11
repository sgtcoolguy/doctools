DocTools
========

This repository contains build scripts, configuration files, and other miscellany related
to building the Titanium docs for JsDuck.

To build the docs, you must have a local clone of this repo, the titanium_mobile repo, and
the [Titanium-flavored JsDuck](https://github.com/appcelerator/jsduck) repo.

## Initial Setup

1.   Clone all three repos, preferably into the same parent folder (for example, ~/work).

2.   Set the TI_ROOT environment variable to the parent directory of all three repos.

       TI_ROOT=~/work
        export TI_ROOT

     If the repos are in different locations, or use non-default names, you can set
     environment variables for each repo. See `deploy.sh`.

3.   Make sure you have Ruby 1.9.2 or greater installed, and install JsDuck's dependencies: 

        gem install rdiscount
        gem install rspec
        gem install json
        gem install parallel
        gem install compass
        gem install execjs
        gem install dimensions
    
4.  Install npm dependencies:

        npm install .

5. If using Mavericks (OS X 10.9 or greater), install the Xcode command-line tools:

        sudo xcode-select --install

6.  Export the wiki docs as an Eclise Help archive. Extract the archive and rename the
    folder to ${DOCTOOLS_DIR}/htmlguides.

7.  Here goes nothing! Try building the docs:

        sh deploy.sh

8.  If all goes well, open `dist/platform/latest/index.html` and see how it looks.

