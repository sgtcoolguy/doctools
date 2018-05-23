{"tagname":"class","name":"ArrowQueryOptions","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"pseudo":[null]},"private":null,"id":"class-ArrowQueryOptions","members":{"cfg":[],"property":[{"name":"limit","tagname":"property","owner":"ArrowQueryOptions","meta":{},"id":"property-limit"},{"name":"order","tagname":"property","owner":"ArrowQueryOptions","meta":{},"id":"property-order"},{"name":"page","tagname":"property","owner":"ArrowQueryOptions","meta":{},"id":"property-page"},{"name":"per_page","tagname":"property","owner":"ArrowQueryOptions","meta":{},"id":"property-per_page"},{"name":"sel","tagname":"property","owner":"ArrowQueryOptions","meta":{},"id":"property-sel"},{"name":"skip","tagname":"property","owner":"ArrowQueryOptions","meta":{},"id":"property-skip"},{"name":"unsel","tagname":"property","owner":"ArrowQueryOptions","meta":{},"id":"property-unsel"},{"name":"where","tagname":"property","owner":"ArrowQueryOptions","meta":{},"id":"property-where"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":122,"files":[{"filename":"model.js","href":"model2.html#ArrowQueryOptions"}],"html_meta":{"pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'></div><div class='hierarchy'></div><div class='doc-contents'><p>Standard query options used by API Builder for query requests.</p>\n<p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-limit' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ArrowQueryOptions'>ArrowQueryOptions</span></div><a href='#!/api/ArrowQueryOptions-property-limit' class='name expandable'>limit</a><span>: Number</span></div><div class='description'><div class='short'>The number of records to fetch. ...</div><div class='long'><p>The number of records to fetch. Range: (0, 1000].</p>\n<p>Default: 10</p></div></div></div><div id='property-order' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ArrowQueryOptions'>ArrowQueryOptions</span></div><a href='#!/api/ArrowQueryOptions-property-order' class='name expandable'>order</a><span>: Object</span></div><div class='description'><div class='short'>A dictionary of key-value pairs describing the field(s) for sorting. ...</div><div class='long'><p>A dictionary of key-value pairs describing the field(s) for sorting.  The field name is the key\nand the value is set to either <code>-1</code> for ascending order or <code>1</code> for descending order.</p>\n</div></div></div><div id='property-page' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ArrowQueryOptions'>ArrowQueryOptions</span></div><a href='#!/api/ArrowQueryOptions-property-page' class='name expandable'>page</a><span>: Number</span></div><div class='description'><div class='short'>Starting page number. ...</div><div class='long'><p>Starting page number.</p>\n<p>Default: 1</p></div></div></div><div id='property-per_page' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ArrowQueryOptions'>ArrowQueryOptions</span></div><a href='#!/api/ArrowQueryOptions-property-per_page' class='name expandable'>per_page</a><span>: Number</span></div><div class='description'><div class='short'>Results per page. ...</div><div class='long'><p>Results per page.</p>\n<p>Default: 10</p></div></div></div><div id='property-sel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ArrowQueryOptions'>ArrowQueryOptions</span></div><a href='#!/api/ArrowQueryOptions-property-sel' class='name expandable'>sel</a><span>: Object</span></div><div class='description'><div class='short'>A dictionary of key-value pairs describing which fields to include in the query results. ...</div><div class='long'><p>A dictionary of key-value pairs describing which fields to include in the query results. The\nfield name is the key and the value is set to <code>1</code>.</p>\n</div></div></div><div id='property-skip' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ArrowQueryOptions'>ArrowQueryOptions</span></div><a href='#!/api/ArrowQueryOptions-property-skip' class='name expandable'>skip</a><span>: Number</span></div><div class='description'><div class='short'>The number of records to skip. ...</div><div class='long'><p>The number of records to skip. Value is greater than zero.</p>\n</div></div></div><div id='property-unsel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ArrowQueryOptions'>ArrowQueryOptions</span></div><a href='#!/api/ArrowQueryOptions-property-unsel' class='name expandable'>unsel</a><span>: Object</span></div><div class='description'><div class='short'>A dictionary of key-value pairs describing which fields to exclude from the query results. ...</div><div class='long'><p>A dictionary of key-value pairs describing which fields to exclude from the query results. The\nfield name is the key and the value is set to <code>1</code>.</p>\n</div></div></div><div id='property-where' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ArrowQueryOptions'>ArrowQueryOptions</span></div><a href='#!/api/ArrowQueryOptions-property-where' class='name expandable'>where</a><span>: Object</span></div><div class='description'><div class='short'>JSON-encoded object specifying field constraints. ...</div><div class='long'><p>JSON-encoded object specifying field constraints. The field name is the key and the value is the\nconstraint statement or value.</p>\n</div></div></div></div></div></div></div>"}