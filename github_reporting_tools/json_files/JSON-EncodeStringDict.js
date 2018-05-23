{"tagname":"class","name":"EncodeStringDict","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 0.8","iphone 0.8","ipad 0.8"],"pseudo":[null],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Titanium/Codec/Codec.yml"},"private":null,"id":"class-EncodeStringDict","members":{"cfg":[],"property":[{"name":"charset","tagname":"property","owner":"EncodeStringDict","meta":{},"id":"property-charset"},{"name":"dest","tagname":"property","owner":"EncodeStringDict","meta":{},"id":"property-dest"},{"name":"destPosition","tagname":"property","owner":"EncodeStringDict","meta":{},"id":"property-destPosition"},{"name":"source","tagname":"property","owner":"EncodeStringDict","meta":{},"id":"property-source"},{"name":"sourceLength","tagname":"property","owner":"EncodeStringDict","meta":{},"id":"property-sourceLength"},{"name":"sourcePosition","tagname":"property","owner":"EncodeStringDict","meta":{},"id":"property-sourcePosition"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":85232,"files":[{"filename":"titanium.js","href":"titanium.html#EncodeStringDict"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 0.8'>Android 0.8</li><li class='platform-iphone' title='iPhone since Titanium SDK 0.8'>iPhone 0.8</li><li class='platform-ipad' title='iPad since Titanium SDK 0.8'>iPad 0.8</li></ul></div><div class='hierarchy'></div><div class='doc-contents'><p>Named parameters for <a href=\"#!/api/Titanium.Codec-method-encodeString\" rel=\"Titanium.Codec-method-encodeString\" class=\"docClass\">Titanium.Codec.encodeString</a>.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-charset' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeStringDict'>EncodeStringDict</span></div><a href='#!/api/EncodeStringDict-property-charset' class='name expandable'>charset</a><span>: String</span></div><div class='description'><div class='short'>Character encoding to use when encoding this string to bytes. ...</div><div class='long'><p>Character encoding to use when encoding this string to bytes.</p>\n\n\n\n\n<p>This API can be assigned the following constants:<ul>\n <li> <a href=\"#!/api/Titanium.Codec-property-CHARSET_ASCII\" rel=\"Titanium.Codec-property-CHARSET_ASCII\" class=\"docClass\">Titanium.Codec.CHARSET_ASCII</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-CHARSET_ISO_LATIN_1\" rel=\"Titanium.Codec-property-CHARSET_ISO_LATIN_1\" class=\"docClass\">Titanium.Codec.CHARSET_ISO_LATIN_1</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-CHARSET_UTF8\" rel=\"Titanium.Codec-property-CHARSET_UTF8\" class=\"docClass\">Titanium.Codec.CHARSET_UTF8</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-CHARSET_UTF16\" rel=\"Titanium.Codec-property-CHARSET_UTF16\" class=\"docClass\">Titanium.Codec.CHARSET_UTF16</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-CHARSET_UTF16BE\" rel=\"Titanium.Codec-property-CHARSET_UTF16BE\" class=\"docClass\">Titanium.Codec.CHARSET_UTF16BE</a>\n <li> <a href=\"#!/api/Titanium.Codec-property-CHARSET_UTF16LE\" rel=\"Titanium.Codec-property-CHARSET_UTF16LE\" class=\"docClass\">Titanium.Codec.CHARSET_UTF16LE</a>\n</li></li></li></li></li></li></ul></p>\n\n<p>Default: <a href=\"#!/api/Titanium.Codec-property-CHARSET_UTF8\" rel=\"Titanium.Codec-property-CHARSET_UTF8\" class=\"docClass\">Titanium.Codec.CHARSET_UTF8</a></p></div></div></div><div id='property-dest' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeStringDict'>EncodeStringDict</span></div><a href='#!/api/EncodeStringDict-property-dest' class='name not-expandable'>dest</a><span>: <a href=\"#!/api/Titanium.Buffer\" rel=\"Titanium.Buffer\" class=\"docClass\">Titanium.Buffer</a></span></div><div class='description'><div class='short'><p>Destination buffer.</p>\n\n</div><div class='long'><p>Destination buffer.</p>\n\n</div></div></div><div id='property-destPosition' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeStringDict'>EncodeStringDict</span></div><a href='#!/api/EncodeStringDict-property-destPosition' class='name expandable'>destPosition</a><span>: Number</span></div><div class='description'><div class='short'>Index in the dest buffer of the first byte of the encoded string. ...</div><div class='long'><p>Index in the <code>dest</code> buffer of the first byte of the encoded string.</p>\n\n<p>Default: 0</p></div></div></div><div id='property-source' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeStringDict'>EncodeStringDict</span></div><a href='#!/api/EncodeStringDict-property-source' class='name not-expandable'>source</a><span>: String</span></div><div class='description'><div class='short'><p>Source string to encode.</p>\n\n</div><div class='long'><p>Source string to encode.</p>\n\n</div></div></div><div id='property-sourceLength' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeStringDict'>EncodeStringDict</span></div><a href='#!/api/EncodeStringDict-property-sourceLength' class='name expandable'>sourceLength</a><span>: Number</span></div><div class='description'><div class='short'>Number of characters in source to encode. ...</div><div class='long'><p>Number of characters in <code>source</code> to encode.</p>\n\n<p>Default: The length of `source`</p></div></div></div><div id='property-sourcePosition' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='EncodeStringDict'>EncodeStringDict</span></div><a href='#!/api/EncodeStringDict-property-sourcePosition' class='name expandable'>sourcePosition</a><span>: Number</span></div><div class='description'><div class='short'>Position in source to start encoding. ...</div><div class='long'><p>Position in <code>source</code> to start encoding.</p>\n\n<p>Default: 0</p></div></div></div></div></div></div></div>"}