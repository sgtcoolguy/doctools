Ext.data.JsonP['ErrorCallbackArgs']({"tagname":"class","name":"ErrorCallbackArgs","extends":"FailureResponse","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 1.7","iphone 1.7","ipad 1.7"],"pseudo":[null],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Titanium/Network/Socket/TCP.yml"},"private":null,"id":"class-ErrorCallbackArgs","members":{"cfg":[],"property":[{"name":"code","tagname":"property","owner":"ErrorCallbackArgs","meta":{"description":["<p>If the error was generated by the operating system, that system's error value\nis used. Otherwise, this value will be -1.</p>"],"platform":["android 3.1.0","iphone 3.1.0","ipad 3.1.0"]},"id":"property-code"},{"name":"error","tagname":"property","owner":"FailureResponse","meta":{"description":["<p>May be undefined.</p>"]},"id":"property-error"},{"name":"errorCode","tagname":"property","owner":"ErrorCallbackArgs","meta":{"deprecated":{"version":"3.1.0","text":""}},"id":"property-errorCode"},{"name":"socket","tagname":"property","owner":"ErrorCallbackArgs","meta":{},"id":"property-socket"},{"name":"success","tagname":"property","owner":"ErrorCallbackArgs","meta":{"description":["<p>Returns <code>false</code>.</p>"],"platform":["android 3.1.0","iphone 3.1.0","ipad 3.1.0"]},"id":"property-success"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":117549,"files":[{"filename":"titanium.js","href":"titanium.html#ErrorCallbackArgs"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>1.7</li><li class='platform-iphone'\n        title='iPhone'>1.7</li><li class='platform-ipad'\n        title='iPad'>1.7</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["ErrorResponse","FailureResponse","ErrorCallbackArgs"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 1.7'>Android 1.7</li><li class='platform-iphone' title='iPhone since Titanium SDK 1.7'>iPhone 1.7</li><li class='platform-ipad' title='iPad since Titanium SDK 1.7'>iPad 1.7</li></ul></div><div class='hierarchy'><div class='classes'><div class='subclass'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='docClass'>ErrorResponse</a></div><div class='subclass'> &gt; <a href='#!/api/FailureResponse' rel='FailureResponse' class='docClass'>FailureResponse</a></div><div class='subclass'> &gt; <strong>ErrorCallbackArgs</strong></div></div></div><div class='doc-contents'><p>Object passed to the error callback when the socket enters the <a href=\"#!/api/Titanium.Network.Socket-property-ERROR\" rel=\"Titanium.Network.Socket-property-ERROR\" class=\"docClass\">ERROR</a> state.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>1.7</li><li class='platform-iphone'\n        title='iPhone'>1.7</li><li class='platform-ipad'\n        title='iPad'>1.7</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-code' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ErrorCallbackArgs'>ErrorCallbackArgs</span></div><a href='#!/api/ErrorCallbackArgs-property-code' class='name expandable'>code</a><span> : Number</span></div><div class='description'><div class='short'>Error code. ...</div><div class='long'><p>Error code. Returns a non-zero value.</p>\n\n<p><p>If the error was generated by the operating system, that system's error value\nis used. Otherwise, this value will be -1.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.1.0</li><li class='platform-iphone'\n        title='iPhone'>3.1.0</li><li class='platform-ipad'\n        title='iPad'>3.1.0</li></ul><p>Overrides: <a href='#!/api/FailureResponse-property-code' rel='FailureResponse-property-code' class='docClass'>FailureResponse.code</a></p></div></div></div><div id='property-error' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/FailureResponse' rel='FailureResponse' class='defined-in docClass'>FailureResponse</a></div><a href='#!/api/FailureResponse-property-error' class='name not-expandable'>error</a><span> : String</span></div><div class='description'><div class='short'><p>Error message, if any returned.</p>\n\n</div><div class='long'><p>Error message, if any returned.</p>\n\n<p><p>May be undefined.</p>\n\n</p><p>Overrides: <a href='#!/api/ErrorResponse-property-error' rel='ErrorResponse-property-error' class='docClass'>ErrorResponse.error</a></p></div></div></div><div id='property-errorCode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ErrorCallbackArgs'>ErrorCallbackArgs</span></div><a href='#!/api/ErrorCallbackArgs-property-errorCode' class='name expandable'>errorCode</a><span> : Number</span><strong class='deprecated signature' >deprecated</strong></div><div class='description'><div class='short'>The error code of the error (potentially system-dependent). ...</div><div class='long'><p>The error code of the error (potentially system-dependent).</p>\n\n        <div class='signature-box deprecated'>\n        <p><strong>deprecated</strong> since 3.1.0 \n</p>\n        </div>\n</div></div></div><div id='property-socket' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ErrorCallbackArgs'>ErrorCallbackArgs</span></div><a href='#!/api/ErrorCallbackArgs-property-socket' class='name not-expandable'>socket</a><span> : <a href=\"#!/api/Titanium.Network.Socket.TCP\" rel=\"Titanium.Network.Socket.TCP\" class=\"docClass\">Titanium.Network.Socket.TCP</a></span></div><div class='description'><div class='short'><p>Socket that experienced the error.</p>\n\n</div><div class='long'><p>Socket that experienced the error.</p>\n\n</div></div></div><div id='property-success' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ErrorCallbackArgs'>ErrorCallbackArgs</span></div><a href='#!/api/ErrorCallbackArgs-property-success' class='name expandable'>success</a><span> : Boolean</span></div><div class='description'><div class='short'>Indicates if the operation succeeded. ...</div><div class='long'><p>Indicates if the operation succeeded. Returns <code>false</code>.</p>\n\n<p><p>Returns <code>false</code>.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.1.0</li><li class='platform-iphone'\n        title='iPhone'>3.1.0</li><li class='platform-ipad'\n        title='iPad'>3.1.0</li></ul><p>Overrides: <a href='#!/api/FailureResponse-property-success' rel='FailureResponse-property-success' class='docClass'>FailureResponse.success</a></p></div></div></div></div></div></div></div>"});