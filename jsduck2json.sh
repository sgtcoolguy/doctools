if [ ! "$JSDUCK" ]; then
    if [ "$TI_ROOT" ]; then
        JSDUCK=${TI_ROOT}/jsduck
    else
        echo "No JSDuck dir \$JSDUCK and \$TI_ROOT not defined. Exiting."
        exit 1
    fi
fi

if [ ! "$DOCTOOLS" ]; then
    if [ "$TI_ROOT" ]; then
        DOCTOOLS=${TI_ROOT}/doctools
    else
        echo "No doctools dir \$DOCTOOLS and \$TI_ROOT not defined. Exiting."
        exit 1
    fi
fi

case "$1" in
    alloy)
        if [ ! "$ALLOY" ]; then
            if [ "$TI_ROOT" ]; then
                ALLOY=${TI_ROOT}/alloy
            else
                echo "No alloy dir \$ALLOY and \$TI_ROOT not defined. Exiting."
                exit 1
            fi
        fi
        INPUT="${DOCTOOLS}/build/alloy.json"
        SRC="${ALLOY}/Alloy/lib ${ALLOY}/docs/apidoc"
        FLAGS='--external "void,Callback,Backbone.Collection,Backbone.Model,Backbone.Events"'
        ;;
    arrow)
        if [ ! "$ARROW" ]; then
            if [ "$TI_ROOT" ]; then
                ARROW=${TI_ROOT}
            else
                echo "No alloy dir \$ARROW and \$TI_ROOT not defined. Exiting."
                exit 1
            fi
        fi
        INPUT="${DOCTOOLS}/build/arrow.json"
        SRC="${ARROW}/arrow-orm/apidoc
                   ${ARROW}/arrow-orm/lib
                   ${ARROW}/arrow/apidoc
                   ${ARROW}/arrow/lib/engines
                   ${ARROW}/arrow/lib/api.js
                   ${ARROW}/arrow/lib/arrow.js
                   ${ARROW}/arrow/lib/block.js
                   ${ARROW}/arrow/lib/middleware.js
                   ${ARROW}/arrow/lib/router.js"
        ;;
    cloud)
        if [ ! "$TI_ROOT" ]; then
            echo "No \$TI_ROOT not defined. Exiting."
            exit 1
        fi
        INPUT="${DOCTOOLS}/build/cloud.json"
        SRC="${TI_ROOT}/cloud_docs/"
        FLAGS="--rest"
        ;;
    *)
        echo "Unknown input format: $1"
        echo "Specify: alloy, arrow or cloud"
        exit 1
        ;;
esac

case "$2" in
    appledoc)
        OUTPUT=${DOCTOOLS}/dist/ios.json
        ;;
    javadoc)
        OUTPUT=${DOCTOOLS}/dist/android.json
        ;;
    jsca)
        OUTPUT=${DOCTOOLS}/dist/api.jsca
        ;;
    json)
        OUTPUT=${DOCTOOLS}/dist/api.json
        ;;
    solr)
        OUTPUT=${DOCTOOLS}/dist/solr.json
        ;;
    *)
        echo "Unknown output format: $2"
        echo "Specify: appledoc (cloud only), javadoc (cloud only), jsca (arrow or alloy only), json (arrow or alloy only), or solr"
        exit 1
        ;;
esac

if [ $1 = "arrow" ];then
    SCRIPT=${DOCTOOLS}/jsduck2json/alloy2${2}
else
    SCRIPT=${DOCTOOLS}/jsduck2json/${1}2${2}
fi
if [[ ! -f  "${SCRIPT}.js" ]]; then
    echo "Unsupported conversion from ${1} to ${2}"
    exit 1
fi

ruby ${JSDUCK}/bin/jsduck $FLAGS --export full  --meta-tags ${DOCTOOLS}/meta --pretty-json -o - $SRC > ${INPUT}

sed -i '' 's/Warning: Skipping tag summary//g' $INPUT
sed -i '' 's/Warning: Skipping tag base-url//g' $INPUT
sed -i '' 's/Warning: Skipping tag pseudo//g' $INPUT

node $SCRIPT $INPUT $OUTPUT