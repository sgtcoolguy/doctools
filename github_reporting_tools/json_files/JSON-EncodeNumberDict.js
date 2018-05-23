{"tagname":"class","name":"EncodeNumberDict","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 0.8","iphone 0.8","ipad 0.8"],"pseudo":[null],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Titanium/Codec/Codec.yml"},"private":null,"id":"class-EncodeNumberDict","members":{"cfg":[],"property":[{"name":"byteOrder","tagname":"property","owner":"EncodeNumberDict","meta":{},"id":"property-byteOrder"},{"name":"dest","tagname":"property","owner":"EncodeNumberDict","meta":{},"id":"property-dest"},{"name":"position","tagname":"property","owner":"EncodeNumberDict","meta":{},"id":"property-position"},{"name":"source","tagname":"property","owner":"EncodeNumberDict","meta":{},"id":"property-source"},{"name":"type","tagname":"property","owner":"EncodeNumberDict","meta":{},"id":"property-type"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":84979,"files":[{"filename":"titanium.js","href":"titanium.html#EncodeNumberDict"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 0.8'>Android 0.8</li><li class='platform-iphone' title='iPhone since Titanium SDK 0.8'>iPhone 0.8</li><li class='platform-ipad' title='iPad since Titanium SDK 0.8'>iPad 0.8</li></ul></div><div class='hierarchy'></div><div class='doc-contents'><p>Named parameters for <a href=\"#!/api/Titanium.Codec-method-encodeNumber\" rel=\"Titanium.Codec-method-encodeNumber\" class=\"docClass\">Titanium.Codec.encodeNumber</a>.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-byteOrder' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeNumberDict'>EncodeNumberDict</span></div><a href='#!/api/EncodeNumberDict-property-byteOrder' class='name expandable'>byteOrder</a><span>: Number</span></div><div class='description'><div class='short'>Byte order to encode with. ...</div><div class='long'><p>Byte order to encode with.</p>\n\n<p>Default: Native byte order.</p></div></div></div><div id='property-dest' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeNumberDict'>EncodeNumberDict</span></div><a href='#!/api/EncodeNumberDict-property-dest' class='name not-expandable'>dest</a><span>: <a href=\"#!/api/Titanium.Buffer\" rel=\"Titanium.Buffer\" class=\"docClass\">Titanium.Buffer</a></span></div><div class='description'><div class='short'><p>Destination buffer.</p>\n\n</div><div class='long'><p>Destination buffer.</p>\n\n</div></div></div><div id='property-position' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeNumberDict'>EncodeNumberDict</span></div><a href='#!/api/EncodeNumberDict-property-position' class='name expandable'>position</a><span>: Number</span></div><div class='description'><div class='short'>Index in the dest buffer of the first byte of encoded data. ...</div><div class='long'><p>Index in the <code>dest</code> buffer of the first byte of encoded data.</p>\n\n<p>Default: 0</p></div></div></div><div id='property-source' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeNumberDict'>EncodeNumberDict</span></div><a href='#!/api/EncodeNumberDict-property-source' class='name not-expandable'>source</a><span>: Number</span></div><div class='description'><div class='short'><p>Number to encode.</p>\n\n</div><div class='long'><p>Number to encode.</p>\n\n</div></div></div><div id='property-type' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeNumberDict'>EncodeNumberDict</span></div><a href='#!/api/EncodeNumberDict-property-type' class='name expandable'>type</a><span>: String</span></div><div class='description'><div class='short'>Encoding type to use. ...</div><div class='long'><p>Encoding type to use.</p>\n\n\n\n\n<p>This API can be assigned the following constants:<ul>\n <li> <a href=\"#!/api/Titanium.Codec-property-TYPE_BYTE\" rel=\"Titanium.Codec-property-TYPE_BYTE\" class=\"docClass\">Titanium.Codec.TYPE_BYTE</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-TYPE_SHORT\" rel=\"Titanium.Codec-property-TYPE_SHORT\" class=\"docClass\">Titanium.Codec.TYPE_SHORT</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-TYPE_INT\" rel=\"Titanium.Codec-property-TYPE_INT\" class=\"docClass\">Titanium.Codec.TYPE_INT</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-TYPE_FLOAT\" rel=\"Titanium.Codec-property-TYPE_FLOAT\" class=\"docClass\">Titanium.Codec.TYPE_FLOAT</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-TYPE_LONG\" rel=\"Titanium.Codec-property-TYPE_LONG\" class=\"docClass\">Titanium.Codec.TYPE_LONG</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-TYPE_DOUBLE\" rel=\"Titanium.Codec-property-TYPE_DOUBLE\" class=\"docClass\">Titanium.Codec.TYPE_DOUBLE</a>\n</li></li></li></li></li></li></ul></p>\n\n</div></div></div></div></div></div></div>"}