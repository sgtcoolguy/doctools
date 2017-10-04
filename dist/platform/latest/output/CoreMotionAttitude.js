Ext.data.JsonP['CoreMotionAttitude']({"tagname":"class","name":"CoreMotionAttitude","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["iphone 3.3.0","ipad 3.3.0"],"pseudo":[null],"editurl":"https://github.com/appcelerator-modules/ti.coremotion/edit/master/apidoc/CoreMotion.yml"},"private":null,"id":"class-CoreMotionAttitude","members":{"cfg":[],"property":[{"name":"pitch","tagname":"property","owner":"CoreMotionAttitude","meta":{"readonly":true,"description":["<p>A pitch is a rotation around a lateral axis that passes through\nthe device from side to side.</p>"]},"id":"property-pitch"},{"name":"quaternion","tagname":"property","owner":"CoreMotionAttitude","meta":{"readonly":true,"description":["<p>See {@link CoreMotionQuaternion} for further information.</p>"]},"id":"property-quaternion"},{"name":"roll","tagname":"property","owner":"CoreMotionAttitude","meta":{"readonly":true,"description":["<p>A roll is a rotation around a longitudinal axis that passes\nthrough the device from its top to bottom.</p>"]},"id":"property-roll"},{"name":"rotationMatrix","tagname":"property","owner":"CoreMotionAttitude","meta":{"readonly":true,"description":["<p>A rotation matrix in linear algebra describes the rotation of a\nbody in three-dimensional Euclidean space.</p>"]},"id":"property-rotationMatrix"},{"name":"yaw","tagname":"property","owner":"CoreMotionAttitude","meta":{"readonly":true,"description":["<p>A yaw is a rotation around an axis that runs vertically through\nthe device. It is perpendicular to the body of the device, with\nits origin at the center of gravity and directed toward the bottom\nof the device.</p>"]},"id":"property-yaw"}],"method":[{"name":"multiplyByInverseOfAttitude","tagname":"method","owner":"CoreMotionAttitude","meta":{"description":["<p>This method multiplies the inverse of the specified {@link CoreMotionAttitude}\nobject by the attitude represented by the receiving object. It replaces\nthe receiving instance with the attitude change relative to the object\npassed in attitude. You should cache the {@link CoreMotionAttitude} instance\nyou want to use as a reference and pass that object as the argument to\nsubsequent calls of this method.</p>"]},"id":"method-multiplyByInverseOfAttitude"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":29377,"files":[{"filename":"titanium.js","href":"titanium.html#CoreMotionAttitude"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-iphone'\n        title='iPhone'>3.3.0</li><li class='platform-ipad'\n        title='iPad'>3.3.0</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-iphone' title='iPhone since Titanium SDK 3.3.0'>iPhone 3.3.0</li><li class='platform-ipad' title='iPad since Titanium SDK 3.3.0'>iPad 3.3.0</li></ul></div><div class='hierarchy'></div><div class='doc-contents'><p>The attitude of the device.</p>\n\n<ul class='platforms'><li class='platform-iphone'\n        title='iPhone'>3.3.0</li><li class='platform-ipad'\n        title='iPad'>3.3.0</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-pitch' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='CoreMotionAttitude'>CoreMotionAttitude</span></div><a href='#!/api/CoreMotionAttitude-property-pitch' class='name not-expandable'>pitch</a><span> : Number</span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>The pitch of the device, in radians.</p>\n\n</div><div class='long'><p>The pitch of the device, in radians.</p>\n\n<p><p>A pitch is a rotation around a lateral axis that passes through\nthe device from side to side.</p>\n\n</p></div></div></div><div id='property-quaternion' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='CoreMotionAttitude'>CoreMotionAttitude</span></div><a href='#!/api/CoreMotionAttitude-property-quaternion' class='name not-expandable'>quaternion</a><span> : <a href=\"#!/api/CoreMotionQuaternion\" rel=\"CoreMotionQuaternion\" class=\"docClass\">CoreMotionQuaternion</a></span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>Returns a quaternion representing the device's attitude.</p>\n\n</div><div class='long'><p>Returns a quaternion representing the device's attitude.</p>\n\n<p><p>See <a href=\"#!/api/CoreMotionQuaternion\" rel=\"CoreMotionQuaternion\" class=\"docClass\">CoreMotionQuaternion</a> for further information.</p>\n\n</p></div></div></div><div id='property-roll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='CoreMotionAttitude'>CoreMotionAttitude</span></div><a href='#!/api/CoreMotionAttitude-property-roll' class='name not-expandable'>roll</a><span> : Number</span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>The roll of the device, in radians.</p>\n\n</div><div class='long'><p>The roll of the device, in radians.</p>\n\n<p><p>A roll is a rotation around a longitudinal axis that passes\nthrough the device from its top to bottom.</p>\n\n</p></div></div></div><div id='property-rotationMatrix' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='CoreMotionAttitude'>CoreMotionAttitude</span></div><a href='#!/api/CoreMotionAttitude-property-rotationMatrix' class='name not-expandable'>rotationMatrix</a><span> : <a href=\"#!/api/CoreMotionRotationMatrix\" rel=\"CoreMotionRotationMatrix\" class=\"docClass\">CoreMotionRotationMatrix</a></span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>Returns a rotation matrix representing the device's attitude.</p>\n\n</div><div class='long'><p>Returns a rotation matrix representing the device's attitude.</p>\n\n<p><p>A rotation matrix in linear algebra describes the rotation of a\nbody in three-dimensional Euclidean space.</p>\n\n</p></div></div></div><div id='property-yaw' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='CoreMotionAttitude'>CoreMotionAttitude</span></div><a href='#!/api/CoreMotionAttitude-property-yaw' class='name not-expandable'>yaw</a><span> : Number</span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>The yaw of the device, in radians.</p>\n\n</div><div class='long'><p>The yaw of the device, in radians.</p>\n\n<p><p>A yaw is a rotation around an axis that runs vertically through\nthe device. It is perpendicular to the body of the device, with\nits origin at the center of gravity and directed toward the bottom\nof the device.</p>\n\n</p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-multiplyByInverseOfAttitude' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='CoreMotionAttitude'>CoreMotionAttitude</span></div><a href='#!/api/CoreMotionAttitude-method-multiplyByInverseOfAttitude' class='name expandable'>multiplyByInverseOfAttitude</a>( <span class='pre'>attitude</span> )</div><div class='description'><div class='short'>Yields the change in attitude given a specific attitude. ...</div><div class='long'><p>Yields the change in attitude given a specific attitude.</p>\n\n<p><p>This method multiplies the inverse of the specified <a href=\"#!/api/CoreMotionAttitude\" rel=\"CoreMotionAttitude\" class=\"docClass\">CoreMotionAttitude</a>\nobject by the attitude represented by the receiving object. It replaces\nthe receiving instance with the attitude change relative to the object\npassed in attitude. You should cache the <a href=\"#!/api/CoreMotionAttitude\" rel=\"CoreMotionAttitude\" class=\"docClass\">CoreMotionAttitude</a> instance\nyou want to use as a reference and pass that object as the argument to\nsubsequent calls of this method.</p>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attitude</span> : <a href=\"#!/api/CoreMotionAttitude\" rel=\"CoreMotionAttitude\" class=\"docClass\">CoreMotionAttitude</a><div class='sub-desc'><p>An object representing the device's attitude at a given moment of measurement.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div></div></div></div></div>"});