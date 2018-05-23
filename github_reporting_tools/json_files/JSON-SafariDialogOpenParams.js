{"tagname":"class","name":"SafariDialogOpenParams","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 0.8","iphone 0.8","ipad 0.8"],"pseudo":[null],"editurl":"https://github.com/appcelerator-modules/Ti.SafariDialog/edit/master/apidoc/SafariDialog.yml"},"private":null,"id":"class-SafariDialogOpenParams","members":{"cfg":[],"property":[{"name":"barCollapsingEnabled","tagname":"property","owner":"SafariDialogOpenParams","meta":{},"id":"property-barCollapsingEnabled"},{"name":"barColor","tagname":"property","owner":"SafariDialogOpenParams","meta":{},"id":"property-barColor"},{"name":"dismissButtonStyle","tagname":"property","owner":"SafariDialogOpenParams","meta":{},"id":"property-dismissButtonStyle"},{"name":"entersReaderIfAvailable","tagname":"property","owner":"SafariDialogOpenParams","meta":{},"id":"property-entersReaderIfAvailable"},{"name":"tintColor","tagname":"property","owner":"SafariDialogOpenParams","meta":{},"id":"property-tintColor"},{"name":"title","tagname":"property","owner":"SafariDialogOpenParams","meta":{},"id":"property-title"},{"name":"url","tagname":"property","owner":"SafariDialogOpenParams","meta":{},"id":"property-url"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":35195,"files":[{"filename":"titanium.js","href":"titanium.html#SafariDialogOpenParams"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul>","pseudo":["<p class='private'><strong>NOTE</strong> ","This is an abstract type. Any object meeting this description can be used ","where this type is used.</p>"],"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 0.8'>Android 0.8</li><li class='platform-iphone' title='iPhone since Titanium SDK 0.8'>iPhone 0.8</li><li class='platform-ipad' title='iPad since Titanium SDK 0.8'>iPad 0.8</li></ul></div><div class='hierarchy'></div><div class='doc-contents'><p>Parmaters used in the <a href=\"#!/api/Modules.SafariDialog-method-open\" rel=\"Modules.SafariDialog-method-open\" class=\"docClass\">Modules.SafariDialog.open</a> method</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul><p class='private'><strong>NOTE</strong> This is an abstract type. Any object meeting this description can be used where this type is used.</p></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-barCollapsingEnabled' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SafariDialogOpenParams'>SafariDialogOpenParams</span></div><a href='#!/api/SafariDialogOpenParams-property-barCollapsingEnabled' class='name expandable'>barCollapsingEnabled</a><span>: Boolean</span></div><div class='description'><div class='short'>Indicates if the Safari dialog should enable collapsing of the navigation \nbar and hiding of the bottom toolbar when ...</div><div class='long'><p>Indicates if the Safari dialog should enable collapsing of the navigation \nbar and hiding of the bottom toolbar when the user scrolls web content.\nAvailable on iOS 11+ and Titanium SDK 6.3.0+.</p>\n\n<p>Default: true</p></div></div></div><div id='property-barColor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SafariDialogOpenParams'>SafariDialogOpenParams</span></div><a href='#!/api/SafariDialogOpenParams-property-barColor' class='name expandable'>barColor</a><span>: String</span></div><div class='description'><div class='short'>The bar-color of the Safari dialog. ...</div><div class='long'><p>The bar-color of the Safari dialog. Available on iOS 10 and later.</p>\n\n</div></div></div><div id='property-dismissButtonStyle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SafariDialogOpenParams'>SafariDialogOpenParams</span></div><a href='#!/api/SafariDialogOpenParams-property-dismissButtonStyle' class='name expandable'>dismissButtonStyle</a><span>: Number</span></div><div class='description'><div class='short'>The dismiss-button-style of the Safari dialog close button. ...</div><div class='long'><p>The dismiss-button-style of the Safari dialog close button.\nAvailable on iOS 11+ and Titanium SDK 6.3.0+.</p>\n\n\n\n\n<p>This API can be assigned the following constants:<ul>\n <li> <a href=\"#!/api/Modules.SafariDialog-property-DISMISS_BUTTON_STYLE_DONE\" rel=\"Modules.SafariDialog-property-DISMISS_BUTTON_STYLE_DONE\" class=\"docClass\">Modules.SafariDialog.DISMISS_BUTTON_STYLE_DONE</a>\n <li> <a href=\"#!/api/Modules.SafariDialog-property-DISMISS_BUTTON_STYLE_CLOSE\" rel=\"Modules.SafariDialog-property-DISMISS_BUTTON_STYLE_CLOSE\" class=\"docClass\">Modules.SafariDialog.DISMISS_BUTTON_STYLE_CLOSE</a>\n <li> <a href=\"#!/api/Modules.SafariDialog-property-DISMISS_BUTTON_STYLE_CANCEL\" rel=\"Modules.SafariDialog-property-DISMISS_BUTTON_STYLE_CANCEL\" class=\"docClass\">Modules.SafariDialog.DISMISS_BUTTON_STYLE_CANCEL</a>\n</li></li></li></ul></p>\n\n</div></div></div><div id='property-entersReaderIfAvailable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SafariDialogOpenParams'>SafariDialogOpenParams</span></div><a href='#!/api/SafariDialogOpenParams-property-entersReaderIfAvailable' class='name not-expandable'>entersReaderIfAvailable</a><span>: Boolean</span></div><div class='description'><div class='short'><p>Indicates if the Safari Reader version of content should be shown automatically.</p>\n\n</div><div class='long'><p>Indicates if the Safari Reader version of content should be shown automatically.</p>\n\n</div></div></div><div id='property-tintColor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SafariDialogOpenParams'>SafariDialogOpenParams</span></div><a href='#!/api/SafariDialogOpenParams-property-tintColor' class='name not-expandable'>tintColor</a><span>: String</span></div><div class='description'><div class='short'><p>The tint-color of the Safari dialog.</p>\n\n</div><div class='long'><p>The tint-color of the Safari dialog.</p>\n\n</div></div></div><div id='property-title' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SafariDialogOpenParams'>SafariDialogOpenParams</span></div><a href='#!/api/SafariDialogOpenParams-property-title' class='name not-expandable'>title</a><span>: String</span></div><div class='description'><div class='short'><p>The URL to be opened.</p>\n\n</div><div class='long'><p>The URL to be opened.</p>\n\n</div></div></div><div id='property-url' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='SafariDialogOpenParams'>SafariDialogOpenParams</span></div><a href='#!/api/SafariDialogOpenParams-property-url' class='name not-expandable'>url</a><span>: String</span></div><div class='description'><div class='short'><p>The URL to be opened.</p>\n\n</div><div class='long'><p>The URL to be opened.</p>\n\n</div></div></div></div></div></div></div>"}