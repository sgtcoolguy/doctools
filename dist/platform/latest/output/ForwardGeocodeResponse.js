Ext.data.JsonP['ForwardGeocodeResponse']({"tagname":"class","name":"ForwardGeocodeResponse","extends":"ErrorResponse","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 0.8","iphone 0.8","ipad 0.8"],"pseudo":[null],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Titanium/Geolocation/Geolocation.yml"},"private":null,"id":"class-ForwardGeocodeResponse","members":{"cfg":[],"property":[{"name":"accuracy","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["iphone 0.8","ipad 0.8"]},"id":"property-accuracy"},{"name":"address","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-address"},{"name":"city","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-city"},{"name":"code","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"description":["<p>Error code will be 0 if <code>success</code> is <code>true</code>, nonzero otherwise. If the error\nwas generated by the operating system, that system's error value is used.\nOtherwise, this value will be -1.</p>"],"platform":["android 3.1.0","iphone 3.1.0","ipad 3.1.0"]},"id":"property-code"},{"name":"country","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-country"},{"name":"countryCode","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-countryCode"},{"name":"country_code","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-country_code"},{"name":"displayAddress","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-displayAddress"},{"name":"error","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"description":["<p>Will be undefined if <code>success</code> is <code>true</code>.</p>"]},"id":"property-error"},{"name":"latitude","tagname":"property","owner":"ForwardGeocodeResponse","meta":{},"id":"property-latitude"},{"name":"longitude","tagname":"property","owner":"ForwardGeocodeResponse","meta":{},"id":"property-longitude"},{"name":"postalCode","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-postalCode"},{"name":"region1","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-region1"},{"name":"region2","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-region2"},{"name":"street","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-street"},{"name":"street1","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"platform":["android 0.8"]},"id":"property-street1"},{"name":"success","tagname":"property","owner":"ForwardGeocodeResponse","meta":{"description":["<p>Returns <code>true</code> if request succeeded, <code>false</code> otherwise.</p>"]},"id":"property-success"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":90962,"files":[{"filename":"titanium.js","href":"titanium.html#ForwardGeocodeResponse"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["ErrorResponse","ForwardGeocodeResponse"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 0.8'>Android 0.8</li><li class='platform-iphone' title='iPhone since Titanium SDK 0.8'>iPhone 0.8</li><li class='platform-ipad' title='iPad since Titanium SDK 0.8'>iPad 0.8</li></ul></div><div class='hierarchy'><div class='classes'><div class='subclass'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='docClass'>ErrorResponse</a></div><div class='subclass'> &gt; <strong>ForwardGeocodeResponse</strong></div></div></div><div class='doc-contents'><p>Simple object returned in the callback from the\n<a href=\"#!/api/Titanium.Geolocation-method-forwardGeocoder\" rel=\"Titanium.Geolocation-method-forwardGeocoder\" class=\"docClass\">forwardGeocoder</a> method.</p>\n\n\n\n\n<p>Note that Android includes a number of extra fields.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-accuracy' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-accuracy' class='name not-expandable'>accuracy</a><span> : Number</span></div><div class='description'><div class='short'><p>Estimated accuracy of the geocoding, in meters.</p>\n\n</div><div class='long'><p>Estimated accuracy of the geocoding, in meters.</p>\n\n<ul class='platforms'><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul></div></div></div><div id='property-address' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-address' class='name not-expandable'>address</a><span> : String</span></div><div class='description'><div class='short'><p>Full address.</p>\n\n</div><div class='long'><p>Full address.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-city' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-city' class='name not-expandable'>city</a><span> : String</span></div><div class='description'><div class='short'><p>City name.</p>\n\n</div><div class='long'><p>City name.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-code' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-code' class='name expandable'>code</a><span> : Number</span></div><div class='description'><div class='short'>Error code. ...</div><div class='long'><p>Error code. Returns 0 if <code>success</code> is <code>true</code>.</p>\n\n<p><p>Error code will be 0 if <code>success</code> is <code>true</code>, nonzero otherwise. If the error\nwas generated by the operating system, that system's error value is used.\nOtherwise, this value will be -1.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.1.0</li><li class='platform-iphone'\n        title='iPhone'>3.1.0</li><li class='platform-ipad'\n        title='iPad'>3.1.0</li></ul><p>Overrides: <a href='#!/api/ErrorResponse-property-code' rel='ErrorResponse-property-code' class='docClass'>ErrorResponse.code</a></p></div></div></div><div id='property-country' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-country' class='name not-expandable'>country</a><span> : String</span></div><div class='description'><div class='short'><p>Country name.</p>\n\n</div><div class='long'><p>Country name.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-countryCode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-countryCode' class='name not-expandable'>countryCode</a><span> : String</span></div><div class='description'><div class='short'><p>Country code.</p>\n\n</div><div class='long'><p>Country code.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-country_code' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-country_code' class='name expandable'>country_code</a><span> : String</span></div><div class='description'><div class='short'>Country code. ...</div><div class='long'><p>Country code. Same as <code>countryCode</code>.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-displayAddress' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-displayAddress' class='name expandable'>displayAddress</a><span> : String</span></div><div class='description'><div class='short'>Display address. ...</div><div class='long'><p>Display address. Identical to <code>address</code>.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-error' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-error' class='name not-expandable'>error</a><span> : String</span></div><div class='description'><div class='short'><p>Error message, if any returned.</p>\n\n</div><div class='long'><p>Error message, if any returned.</p>\n\n<p><p>Will be undefined if <code>success</code> is <code>true</code>.</p>\n\n</p><p>Overrides: <a href='#!/api/ErrorResponse-property-error' rel='ErrorResponse-property-error' class='docClass'>ErrorResponse.error</a></p></div></div></div><div id='property-latitude' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-latitude' class='name not-expandable'>latitude</a><span> : String</span></div><div class='description'><div class='short'><p>Latitude of the geocoded address.</p>\n\n</div><div class='long'><p>Latitude of the geocoded address.</p>\n\n</div></div></div><div id='property-longitude' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-longitude' class='name not-expandable'>longitude</a><span> : String</span></div><div class='description'><div class='short'><p>Longitude of the geocoded address.</p>\n\n</div><div class='long'><p>Longitude of the geocoded address.</p>\n\n</div></div></div><div id='property-postalCode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-postalCode' class='name not-expandable'>postalCode</a><span> : String</span></div><div class='description'><div class='short'><p>Postal code.</p>\n\n</div><div class='long'><p>Postal code.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-region1' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-region1' class='name not-expandable'>region1</a><span> : String</span></div><div class='description'><div class='short'><p>First line of region.</p>\n\n</div><div class='long'><p>First line of region.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-region2' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-region2' class='name not-expandable'>region2</a><span> : String</span></div><div class='description'><div class='short'><p>Not used.</p>\n\n</div><div class='long'><p>Not used.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-street' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-street' class='name not-expandable'>street</a><span> : String</span></div><div class='description'><div class='short'><p>Street name, without street address.</p>\n\n</div><div class='long'><p>Street name, without street address.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-street1' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-street1' class='name not-expandable'>street1</a><span> : String</span></div><div class='description'><div class='short'><p>Street name.</p>\n\n</div><div class='long'><p>Street name.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li></ul></div></div></div><div id='property-success' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ForwardGeocodeResponse'>ForwardGeocodeResponse</span></div><a href='#!/api/ForwardGeocodeResponse-property-success' class='name not-expandable'>success</a><span> : Boolean</span></div><div class='description'><div class='short'><p>Indicates if the operation succeeded.</p>\n\n</div><div class='long'><p>Indicates if the operation succeeded.</p>\n\n<p><p>Returns <code>true</code> if request succeeded, <code>false</code> otherwise.</p>\n\n</p><p>Overrides: <a href='#!/api/ErrorResponse-property-success' rel='ErrorResponse-property-success' class='docClass'>ErrorResponse.success</a></p></div></div></div></div></div></div></div>"});