Ext.data.JsonP['ThumbnailResponse']({"tagname":"class","name":"ThumbnailResponse","extends":"ErrorResponse","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 3.6.0","iphone 0.8","ipad 0.8"],"pseudo":[null],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Titanium/Media/VideoPlayer.yml","description":["<p>The callback is invoked when a movie thumbnail is available.</p>"]},"private":null,"id":"class-ThumbnailResponse","members":{"cfg":[],"property":[{"name":"code","tagname":"property","owner":"ThumbnailResponse","meta":{"description":["<p>Error code will be 0 if <code>success</code> is <code>true</code>, nonzero otherwise. If the error\nwas generated by the operating system, that system's error value is used.\nOtherwise, this value will be -1.</p>"],"platform":["android 3.6.0","iphone 3.1.0","ipad 3.1.0"]},"id":"property-code"},{"name":"error","tagname":"property","owner":"ErrorResponse","meta":{"description":["<p>Will be undefined if <code>success</code> is <code>true</code>.</p>"]},"id":"property-error"},{"name":"image","tagname":"property","owner":"ThumbnailResponse","meta":{},"id":"property-image"},{"name":"success","tagname":"property","owner":"ErrorResponse","meta":{"description":["<p>Returns <code>true</code> if request succeeded, <code>false</code> otherwise.</p>"]},"id":"property-success"},{"name":"time","tagname":"property","owner":"ThumbnailResponse","meta":{},"id":"property-time"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":111404,"files":[{"filename":"titanium.js","href":"titanium.html#ThumbnailResponse"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null,"description":"<p><p>The callback is invoked when a movie thumbnail is available.</p>\n\n</p>"},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["ErrorResponse","ThumbnailResponse"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 3.6.0'>Android 3.6.0</li><li class='platform-iphone' title='iPhone since Titanium SDK 0.8'>iPhone 0.8</li><li class='platform-ipad' title='iPad since Titanium SDK 0.8'>iPad 0.8</li></ul></div><div class='hierarchy'><div class='classes'><div class='subclass'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='docClass'>ErrorResponse</a></div><div class='subclass'> &gt; <strong>ThumbnailResponse</strong></div></div></div><div class='doc-contents'><p>Simple object passed to the thumbnail callback in response to the\n<a href=\"#!/api/Titanium.Media.VideoPlayer-method-requestThumbnailImagesAtTimes\" rel=\"Titanium.Media.VideoPlayer-method-requestThumbnailImagesAtTimes\" class=\"docClass\">requestThumbnailImagesAtTimes</a>\nmethod.</p>\n\n<p><p>The callback is invoked when a movie thumbnail is available.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-code' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ThumbnailResponse'>ThumbnailResponse</span></div><a href='#!/api/ThumbnailResponse-property-code' class='name expandable'>code</a><span> : Number</span></div><div class='description'><div class='short'>Error code. ...</div><div class='long'><p>Error code. Returns 0 if <code>success</code> is <code>true</code>.</p>\n\n<p><p>Error code will be 0 if <code>success</code> is <code>true</code>, nonzero otherwise. If the error\nwas generated by the operating system, that system's error value is used.\nOtherwise, this value will be -1.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-iphone'\n        title='iPhone'>3.1.0</li><li class='platform-ipad'\n        title='iPad'>3.1.0</li></ul><p>Overrides: <a href='#!/api/ErrorResponse-property-code' rel='ErrorResponse-property-code' class='docClass'>ErrorResponse.code</a></p></div></div></div><div id='property-error' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='defined-in docClass'>ErrorResponse</a></div><a href='#!/api/ErrorResponse-property-error' class='name not-expandable'>error</a><span> : String</span></div><div class='description'><div class='short'><p>Error message, if any returned.</p>\n\n</div><div class='long'><p>Error message, if any returned.</p>\n\n<p><p>Will be undefined if <code>success</code> is <code>true</code>.</p>\n\n</p></div></div></div><div id='property-image' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ThumbnailResponse'>ThumbnailResponse</span></div><a href='#!/api/ThumbnailResponse-property-image' class='name not-expandable'>image</a><span> : <a href=\"#!/api/Titanium.Blob\" rel=\"Titanium.Blob\" class=\"docClass\">Titanium.Blob</a></span></div><div class='description'><div class='short'><p>Thumbnail image, as a <code>Blob</code>.</p>\n\n</div><div class='long'><p>Thumbnail image, as a <code>Blob</code>.</p>\n\n</div></div></div><div id='property-success' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/ErrorResponse' rel='ErrorResponse' class='defined-in docClass'>ErrorResponse</a></div><a href='#!/api/ErrorResponse-property-success' class='name not-expandable'>success</a><span> : Boolean</span></div><div class='description'><div class='short'><p>Indicates if the operation succeeded.</p>\n\n</div><div class='long'><p>Indicates if the operation succeeded.</p>\n\n<p><p>Returns <code>true</code> if request succeeded, <code>false</code> otherwise.</p>\n\n</p></div></div></div><div id='property-time' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ThumbnailResponse'>ThumbnailResponse</span></div><a href='#!/api/ThumbnailResponse-property-time' class='name not-expandable'>time</a><span> : Number</span></div><div class='description'><div class='short'><p>Time offset for the thumbnail, in seconds.</p>\n\n</div><div class='long'><p>Time offset for the thumbnail, in seconds.</p>\n\n</div></div></div></div></div></div></div>"});