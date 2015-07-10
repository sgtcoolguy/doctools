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

if [ ! "$ARROW" ]; then
    if [ "$TI_ROOT" ]; then
        ARROW=${TI_ROOT}
    else
        echo "No alloy dir \$ARROW and \$TI_ROOT not defined. Exiting."
        exit 1
    fi
fi

    arrowDirs="${ARROW}/arrow-orm/apidoc
               ${ARROW}/arrow-orm/lib
               ${ARROW}/arrow/apidoc
               ${ARROW}/arrow/lib/engines
               ${ARROW}/arrow/lib/api.js
               ${ARROW}/arrow/lib/arrow.js
               ${ARROW}/arrow/lib/block.js
               ${ARROW}/arrow/lib/middleware.js
               ${ARROW}/arrow/lib/router.js"

OUTPUT="arrow_api.json"
SCRIPT="alloy2solr.py"


ruby ${JSDUCK}/bin/jsduck --external "void,Callback,Backbone.Collection,Backbone.Model,Backbone.Events" --export full --pretty-json -o - $arrowDirs > ${DOCTOOLS}/build/arrow.json
python ${DOCTOOLS}/jsduck2json/${SCRIPT} ${DOCTOOLS}/build/arrow.json ${DOCTOOLS}/dist/${OUTPUT}
echo "Done! File generated at: $DOCTOOLS/dist/$OUTPUT"
