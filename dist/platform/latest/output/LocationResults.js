Ext.data.JsonP['LocationResults']({"tagname":"class","name":"LocationResults","extends":"ErrorResponse","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 0.8","iphone 0.8","ipad 0.8"],"pseudo":[null],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Titanium/Geolocation/Geolocation.yml"},"private":null,"id":"class-LocationResults","members":{"cfg":[],"property":[{"name":"code","tagname":"property","owner":"ErrorResponse","meta":{"description":["<p>Error code will be 0 if <code>success</code> is <code>true</code>, nonzero otherwise. If the error\nwas generated by the operating system, that system's error value is used.\nOtherwise, this value will be -1.</p>"]},"id":"property-code"},{"name":"coords","tagname":"property","owner":"LocationResults","meta":{},"id":"property-coords"},{"name":"error","tagname":"property","owner":"ErrorResponse","meta":{"description":["<p>Will be undefined if <code>success</code> is <code>true</code>.</p>"]},"id":"property-error"},{"name":"provider","tagname":"property","owner":"LocationResults","meta":{"platform":["android 0.8"]},"id":"property-provider"},{"name":"success","tagname":"property","owner":"ErrorResponse","meta":{"description":["<p>Returns <code>true</code> if request succeeded, <code>false</code> otherwise.</p>"]},"id":"property-success"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":90400,"files":[{"filename":"titanium.js","href":"titanium.html#LocationResults"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["ErrorResponse","LocationResults"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 0.8'>Android 0.8</li><li class='platform-iphone' title='iPhone since Titanium SDK 0.8'>iPhone 0.8</li><li class='platform-ipad' title='iPad since Titanium SDK 0.8'>iPad 0.8</li></ul></div><div class='hierarchy'><div class='classes'><div class='subclass'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='docClass'>ErrorResponse</a></div><div class='subclass'> &gt; <strong>LocationResults</strong></div></div></div><div class='doc-contents'><p>Argument passed to the <a href=\"#!/api/Titanium.Geolocation-method-getCurrentPosition\" rel=\"Titanium.Geolocation-method-getCurrentPosition\" class=\"docClass\">getCurrentPosition</a> callback.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-code' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='defined-in docClass'>ErrorResponse</a></div><a href='#!/api/ErrorResponse-property-code' class='name expandable'>code</a><span> : Number</span></div><div class='description'><div class='short'>Error code. ...</div><div class='long'><p>Error code. Returns 0 if <code>success</code> is <code>true</code>.</p>\n\n<p><p>Error code will be 0 if <code>success</code> is <code>true</code>, nonzero otherwise. If the error\nwas generated by the operating system, that system's error value is used.\nOtherwise, this value will be -1.</p>\n\n</p></div></div></div><div id='property-coords' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LocationResults'>LocationResults</span></div><a href='#!/api/LocationResults-property-coords' class='name not-expandable'>coords</a><span> : <a href=\"#!/api/LocationCoordinates\" rel=\"LocationCoordinates\" class=\"docClass\">LocationCoordinates</a></span></div><div class='description'><div class='short'><p>If <code>success</code> is true, actual location data for this update.</p>\n\n</div><div class='long'><p>If <code>success</code> is true, actual location data for this update.</p>\n\n</div></div></div><div id='property-error' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='defined-in docClass'>ErrorResponse</a></div><a href='#!/api/ErrorResponse-property-error' class='name not-expandable'>error</a><span> : String</span></div><div class='description'><div class='short'><p>Error message, if any returned.</p>\n\n</div><div class='long'><p>Error message, if any returned.</p>\n\n<p><p>Will be undefined if <code>success</code> is <code>true</code>.</p>\n\n</p></div></div></div><div id='property-provider' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LocationResults'>LocationResults</span></div><a href='#!/api/LocationResults-property-provider' class='name not-expandable'>provider</a><span> : <a href=\"#!/api/LocationProviderDict\" rel=\"LocationProviderDict\" class=\"docClass\">LocationProviderDict</a></span></div><div class='description'><div class='short'><p>If <code>success</code> is true, object describing the location provider generating this update.</p>\n\n</div><div class='long'><p>If <code>success</code> is true, object describing the location provider generating this update.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-success' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='defined-in docClass'>ErrorResponse</a></div><a href='#!/api/ErrorResponse-property-success' class='name not-expandable'>success</a><span> : Boolean</span></div><div class='description'><div class='short'><p>Indicates if the operation succeeded.</p>\n\n</div><div class='long'><p>Indicates if the operation succeeded.</p>\n\n<p><p>Returns <code>true</code> if request succeeded, <code>false</code> otherwise.</p>\n\n</p></div></div></div></div></div></div></div>"});