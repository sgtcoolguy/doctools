Ext.data.JsonP['HeadingData']({"tagname":"class","name":"HeadingData","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 0.8","iphone 0.8","ipad 0.8"],"pseudo":[null],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Titanium/Geolocation/Geolocation.yml"},"private":null,"id":"class-HeadingData","members":{"cfg":[],"property":[{"name":"accuracy","tagname":"property","owner":"HeadingData","meta":{"description":["<p>On iOS, accuracy is returned as a maximum deviation in degrees,\nthe smaller the value, the more accurate the heading is. For example,\na value of 10 means the heading is plus or minus 10 degrees from the\nactual value. A negative value indicates the compass heading is invalid;\nfor example, if there is magnetic interference, or if the compass is not calibrated.</p>\n\n<p>On Android, the value is set to either 1 (low accuracy), 2 (medium accuracy)\nor 3 (high accuracy). No specific definition of these accuracy values is supplied.</p>"]},"id":"property-accuracy"},{"name":"magneticHeading","tagname":"property","owner":"HeadingData","meta":{},"id":"property-magneticHeading"},{"name":"timestamp","tagname":"property","owner":"HeadingData","meta":{},"id":"property-timestamp"},{"name":"trueHeading","tagname":"property","owner":"HeadingData","meta":{"description":["<p>Calculating the true heading requires correcting the magnetic declination based on\nthe device's current location. So <code>trueHeading</code> can only be calculated if the device\nhas a fairly recent location fix. If you want to obtain the true heading, you\nshould register for location updates as well as compass updates. The location fix\ndoes not need to be very accurate.</p>\n\n<p>On Android, <code>trueHeading</code> is <code>undefined</code> if a recent location fix is not available.</p>"]},"id":"property-trueHeading"},{"name":"x","tagname":"property","owner":"HeadingData","meta":{},"id":"property-x"},{"name":"y","tagname":"property","owner":"HeadingData","meta":{},"id":"property-y"},{"name":"z","tagname":"property","owner":"HeadingData","meta":{},"id":"property-z"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":91256,"files":[{"filename":"titanium.js","href":"titanium.html#HeadingData"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 0.8'>Android 0.8</li><li class='platform-iphone' title='iPhone since Titanium SDK 0.8'>iPhone 0.8</li><li class='platform-ipad' title='iPad since Titanium SDK 0.8'>iPad 0.8</li></ul></div><div class='hierarchy'></div><div class='doc-contents'><p>Simple object holding compass heading data.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-accuracy' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='HeadingData'>HeadingData</span></div><a href='#!/api/HeadingData-property-accuracy' class='name not-expandable'>accuracy</a><span> : Number</span></div><div class='description'><div class='short'><p>Accuracy of the compass heading, in platform-specific units.</p>\n\n</div><div class='long'><p>Accuracy of the compass heading, in platform-specific units.</p>\n\n<p><p>On iOS, accuracy is returned as a maximum deviation in degrees,\nthe smaller the value, the more accurate the heading is. For example,\na value of 10 means the heading is plus or minus 10 degrees from the\nactual value. A negative value indicates the compass heading is invalid;\nfor example, if there is magnetic interference, or if the compass is not calibrated.</p>\n\n\n\n\n<p>On Android, the value is set to either 1 (low accuracy), 2 (medium accuracy)\nor 3 (high accuracy). No specific definition of these accuracy values is supplied.</p>\n\n</p></div></div></div><div id='property-magneticHeading' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='HeadingData'>HeadingData</span></div><a href='#!/api/HeadingData-property-magneticHeading' class='name not-expandable'>magneticHeading</a><span> : Number</span></div><div class='description'><div class='short'><p>Declination in degrees from magnetic North.</p>\n\n</div><div class='long'><p>Declination in degrees from magnetic North.</p>\n\n</div></div></div><div id='property-timestamp' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='HeadingData'>HeadingData</span></div><a href='#!/api/HeadingData-property-timestamp' class='name not-expandable'>timestamp</a><span> : Number</span></div><div class='description'><div class='short'><p>Timestamp for the heading data, in milliseconds.</p>\n\n</div><div class='long'><p>Timestamp for the heading data, in milliseconds.</p>\n\n</div></div></div><div id='property-trueHeading' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='HeadingData'>HeadingData</span></div><a href='#!/api/HeadingData-property-trueHeading' class='name not-expandable'>trueHeading</a><span> : Number</span></div><div class='description'><div class='short'><p>Declination in degrees from true North.</p>\n\n</div><div class='long'><p>Declination in degrees from true North.</p>\n\n<p><p>Calculating the true heading requires correcting the magnetic declination based on\nthe device's current location. So <code>trueHeading</code> can only be calculated if the device\nhas a fairly recent location fix. If you want to obtain the true heading, you\nshould register for location updates as well as compass updates. The location fix\ndoes not need to be very accurate.</p>\n\n\n\n\n<p>On Android, <code>trueHeading</code> is <code>undefined</code> if a recent location fix is not available.</p>\n\n</p></div></div></div><div id='property-x' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='HeadingData'>HeadingData</span></div><a href='#!/api/HeadingData-property-x' class='name not-expandable'>x</a><span> : Number</span></div><div class='description'><div class='short'><p>Raw geomagnetic data for the X axis.</p>\n\n</div><div class='long'><p>Raw geomagnetic data for the X axis.</p>\n\n</div></div></div><div id='property-y' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='HeadingData'>HeadingData</span></div><a href='#!/api/HeadingData-property-y' class='name not-expandable'>y</a><span> : Number</span></div><div class='description'><div class='short'><p>Raw geomagnetic data for the Y axis.</p>\n\n</div><div class='long'><p>Raw geomagnetic data for the Y axis.</p>\n\n</div></div></div><div id='property-z' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='HeadingData'>HeadingData</span></div><a href='#!/api/HeadingData-property-z' class='name not-expandable'>z</a><span> : Number</span></div><div class='description'><div class='short'><p>Raw geomagnetic data for the Z axis.</p>\n\n</div><div class='long'><p>Raw geomagnetic data for the Z axis.</p>\n\n</div></div></div></div></div></div></div>"});