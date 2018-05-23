{"tagname":"class","name":"Titanium.UI.iOS.SnapBehavior","extends":"Titanium.Proxy","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["iphone 3.2","ipad 3.2"],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Titanium/UI/iOS/SnapBehavior.yml","description":["<p>The following APIs are supported on iOS 7 and later.</p>\n\n<p>A snap behavior specifies how an item moves towards a specified point with a spring-like\neffect, ending with an oscillation.</p>\n\n<ol>\n<li>Use the {@link Titanium.UI.iOS#method-createSnapBehavior} method to create the behavior.</li>\n<li>Set the {@link Titanium.UI.iOS.SnapBehavior#property-item item} and\n {@link Titanium.UI.iOS.SnapBehavior#property-snapPoint snapPoint} properties.</li>\n<li>Add the behavior to an {@link Titanium.UI.iOS.Animator Animator object}.</li>\n</ol> \n<h3>Examples</h3>\n<h4>Simple Example</h4>\n<p>The following example snaps the block to the location of a click on the window.</p>\n\n<p><img src=\"images/animator/snapbehavior.gif\" height=\"455\" style=\"border:1px solid black\"/></p>\n\n<pre><code>var win = Ti.UI.createWindow({backgroundColor: 'white', fullscreen: true});\n\n// Create an Animator object using the window as the coordinate system\nvar animator = Ti.UI.iOS.createAnimator({referenceView: win});\n\nvar block = Ti.UI.createView({\n    width: 100,\n    height: 100,\n    backgroundColor: 'blue'\n});\n\n// Snap to the top-left corner when the app starts\nvar snap = Ti.UI.iOS.createSnapBehavior({\n    item: block,\n    snapPoint: {x: 0, y: 0},\n});\nanimator.addBehavior(snap);\n\n// Snap the block to the point of the click event\nwin.addEventListener('click', function(e){\n    snap.snapPoint = {x: e.x, y: e.y};\n    snap.damping = Math.random();\n});\n\n// Start the animation when the window opens\nwin.addEventListener('open', function(e){\n    animator.startAnimator();\n});\n\nwin.add(block);\nwin.open();\n</code></pre>"]},"private":null,"id":"class-Titanium.UI.iOS.SnapBehavior","members":{"cfg":[],"property":[{"name":"apiName","tagname":"property","owner":"Titanium.Proxy","meta":{"readonly":true,"description":["<p>The value of this property is the fully qualified name of the API. For example, {@link Titanium.UI.Button Button}\nreturns <code>Ti.UI.Button</code>.</p>"],"platform":["android 3.2.0","iphone 3.2.0","ipad 3.2.0","windowsphone 4.1.0"]},"id":"property-apiName"},{"name":"bubbleParent","tagname":"property","owner":"Titanium.Proxy","meta":{"description":["<p>Some proxies (most commonly views) have a relationship to other proxies, often\nestablished by the add() method. For example, for a button added to a window, a\nclick event on the button would bubble up to the window. Other common parents are\ntable sections to their rows, table views to their sections, and scrollable views\nto their views. Set this property to false to disable the bubbling to the proxy's parent.</p>"],"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"property-bubbleParent"},{"name":"damping","tagname":"property","owner":"Titanium.UI.iOS.SnapBehavior","meta":{"description":["<p>A value of 0.0 indicates minimum oscillation, while 1.0 indicates maximum oscillation.</p>"]},"id":"property-damping"},{"name":"item","tagname":"property","owner":"Titanium.UI.iOS.SnapBehavior","meta":{},"id":"property-item"},{"name":"lifecycleContainer","tagname":"property","owner":"Titanium.Proxy","meta":{"description":["<p>If this property is set to a Window or TabGroup, then the corresponding Activity lifecycle event callbacks\nwill also be called on the proxy. Proxies that require the activity lifecycle will need this property set\nto the appropriate containing Window or TabGroup.</p>"],"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"property-lifecycleContainer"},{"name":"snapPoint","tagname":"property","owner":"Titanium.UI.iOS.SnapBehavior","meta":{"description":["<p>The coordinate system depends on the animator's reference view.</p>"]},"id":"property-snapPoint"}],"method":[{"name":"addEventListener","tagname":"method","owner":"Titanium.Proxy","meta":{},"id":"method-addEventListener"},{"name":"applyProperties","tagname":"method","owner":"Titanium.Proxy","meta":{"description":["<p>Properties are supplied as a dictionary. Each key-value pair in the object is applied to the proxy such that\nmyproxy[key] = value.</p>"],"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-applyProperties"},{"name":"fireEvent","tagname":"method","owner":"Titanium.Proxy","meta":{},"id":"method-fireEvent"},{"name":"getApiName","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.2.0","iphone 3.2.0","ipad 3.2.0","windowsphone 4.1.0"]},"id":"method-getApiName"},{"name":"getBubbleParent","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-getBubbleParent"},{"name":"getDamping","tagname":"method","owner":"Titanium.UI.iOS.SnapBehavior","meta":{},"id":"method-getDamping"},{"name":"getItem","tagname":"method","owner":"Titanium.UI.iOS.SnapBehavior","meta":{},"id":"method-getItem"},{"name":"getLifecycleContainer","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"method-getLifecycleContainer"},{"name":"getSnapPoint","tagname":"method","owner":"Titanium.UI.iOS.SnapBehavior","meta":{},"id":"method-getSnapPoint"},{"name":"removeEventListener","tagname":"method","owner":"Titanium.Proxy","meta":{"description":["<p>Multiple listeners can be registered for the same event, so the\n<code>callback</code> parameter is used to determine which listener to remove.</p>\n\n<p>When adding a listener, you must save a reference to the callback function\nin order to remove the listener later:</p>\n\n<pre><code>var listener = function() { Ti.API.info(\"Event listener called.\"); }\nwindow.addEventListener('click', listener);\n</code></pre>\n\n<p>To remove the listener, pass in a reference to the callback function:</p>\n\n<pre><code>window.removeEventListener('click', listener);\n</code></pre>"]},"id":"method-removeEventListener"},{"name":"setBubbleParent","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-setBubbleParent"},{"name":"setDamping","tagname":"method","owner":"Titanium.UI.iOS.SnapBehavior","meta":{},"id":"method-setDamping"},{"name":"setItem","tagname":"method","owner":"Titanium.UI.iOS.SnapBehavior","meta":{},"id":"method-setItem"},{"name":"setLifecycleContainer","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"method-setLifecycleContainer"},{"name":"setSnapPoint","tagname":"method","owner":"Titanium.UI.iOS.SnapBehavior","meta":{},"id":"method-setSnapPoint"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":230410,"files":[{"filename":"titanium.js","href":"titanium.html#Titanium-UI-iOS-SnapBehavior"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-iphone'\n        title='iPhone'>3.2</li><li class='platform-ipad'\n        title='iPad'>3.2</li></ul>","editurl":null,"description":"<p><p>The following APIs are supported on iOS 7 and later.</p>\n\n\n\n\n<p>A snap behavior specifies how an item moves towards a specified point with a spring-like\neffect, ending with an oscillation.</p>\n\n\n\n\n<ol>\n<li>Use the <a href=\"#!/api/Titanium.UI.iOS-method-createSnapBehavior\" rel=\"Titanium.UI.iOS-method-createSnapBehavior\" class=\"docClass\">Titanium.UI.iOS.createSnapBehavior</a> method to create the behavior.</li>\n<li>Set the <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-item\" rel=\"Titanium.UI.iOS.SnapBehavior-property-item\" class=\"docClass\">item</a> and\n <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-snapPoint\" rel=\"Titanium.UI.iOS.SnapBehavior-property-snapPoint\" class=\"docClass\">snapPoint</a> properties.</li>\n<li>Add the behavior to an <a href=\"#!/api/Titanium.UI.iOS.Animator\" rel=\"Titanium.UI.iOS.Animator\" class=\"docClass\">Animator object</a>.</li>\n</ol>\n\n\n<p></p>\n\n<h3>Examples</h3>\n\n\n<h4>Simple Example</h4>\n\n\n<p>The following example snaps the block to the location of a click on the window.</p>\n\n\n\n\n<p><img src=\"images/animator/snapbehavior.gif\" height=\"455\" style=\"border:1px solid black\"/></p>\n\n\n\n\n<pre><code>var win = Ti.UI.createWindow({backgroundColor: 'white', fullscreen: true});\n\n// Create an Animator object using the window as the coordinate system\nvar animator = Ti.UI.iOS.createAnimator({referenceView: win});\n\nvar block = Ti.UI.createView({\n    width: 100,\n    height: 100,\n    backgroundColor: 'blue'\n});\n\n// Snap to the top-left corner when the app starts\nvar snap = Ti.UI.iOS.createSnapBehavior({\n    item: block,\n    snapPoint: {x: 0, y: 0},\n});\nanimator.addBehavior(snap);\n\n// Snap the block to the point of the click event\nwin.addEventListener('click', function(e){\n    snap.snapPoint = {x: e.x, y: e.y};\n    snap.damping = Math.random();\n});\n\n// Start the animation when the window opens\nwin.addEventListener('open', function(e){\n    animator.startAnimator();\n});\n\nwin.add(block);\nwin.open();\n</code></pre>\n\n</p>"},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["Titanium.Proxy","Titanium.UI.iOS.SnapBehavior"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-iphone' title='iPhone since Titanium SDK 3.2'>iPhone 3.2</li><li class='platform-ipad' title='iPad since Titanium SDK 3.2'>iPad 3.2</li></ul></div><div class='hierarchy'><div class='classes'><div class='subclass'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='docClass'>Titanium.Proxy</a></div><div class='subclass'> &gt; <strong>Titanium.UI.iOS.SnapBehavior</strong></div></div></div><div class='doc-contents'><p>Dynamic behavior defining an item's movement to a specific point.</p>\n\n\n\n\n<p> <b>Requires:</b> \niOS 7.0 and later \n</p>\n\n<p><p>The following APIs are supported on iOS 7 and later.</p>\n\n\n\n\n<p>A snap behavior specifies how an item moves towards a specified point with a spring-like\neffect, ending with an oscillation.</p>\n\n\n\n\n<ol>\n<li>Use the <a href=\"#!/api/Titanium.UI.iOS-method-createSnapBehavior\" rel=\"Titanium.UI.iOS-method-createSnapBehavior\" class=\"docClass\">Titanium.UI.iOS.createSnapBehavior</a> method to create the behavior.</li>\n<li>Set the <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-item\" rel=\"Titanium.UI.iOS.SnapBehavior-property-item\" class=\"docClass\">item</a> and\n <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-snapPoint\" rel=\"Titanium.UI.iOS.SnapBehavior-property-snapPoint\" class=\"docClass\">snapPoint</a> properties.</li>\n<li>Add the behavior to an <a href=\"#!/api/Titanium.UI.iOS.Animator\" rel=\"Titanium.UI.iOS.Animator\" class=\"docClass\">Animator object</a>.</li>\n</ol>\n\n\n<p></p>\n\n<h3>Examples</h3>\n\n\n<h4>Simple Example</h4>\n\n\n<p>The following example snaps the block to the location of a click on the window.</p>\n\n\n\n\n<p><img src=\"images/animator/snapbehavior.gif\" height=\"455\" style=\"border:1px solid black\"/></p>\n\n\n\n\n<pre><code>var win = Ti.UI.createWindow({backgroundColor: 'white', fullscreen: true});\n\n// Create an Animator object using the window as the coordinate system\nvar animator = Ti.UI.iOS.createAnimator({referenceView: win});\n\nvar block = Ti.UI.createView({\n    width: 100,\n    height: 100,\n    backgroundColor: 'blue'\n});\n\n// Snap to the top-left corner when the app starts\nvar snap = Ti.UI.iOS.createSnapBehavior({\n    item: block,\n    snapPoint: {x: 0, y: 0},\n});\nanimator.addBehavior(snap);\n\n// Snap the block to the point of the click event\nwin.addEventListener('click', function(e){\n    snap.snapPoint = {x: e.x, y: e.y};\n    snap.damping = Math.random();\n});\n\n// Start the animation when the window opens\nwin.addEventListener('open', function(e){\n    animator.startAnimator();\n});\n\nwin.add(block);\nwin.open();\n</code></pre>\n\n</p><ul class='platforms'><li class='platform-iphone'\n        title='iPhone'>3.2</li><li class='platform-ipad'\n        title='iPad'>3.2</li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-apiName' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-apiName' class='name not-expandable'>apiName</a><span>: String</span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>The name of the API that this proxy corresponds to.</p>\n\n</div><div class='long'><p>The name of the API that this proxy corresponds to.</p>\n\n<p><p>The value of this property is the fully qualified name of the API. For example, <a href=\"#!/api/Titanium.UI.Button\" rel=\"Titanium.UI.Button\" class=\"docClass\">Button</a>\nreturns <code>Ti.UI.Button</code>.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.2.0</li><li class='platform-iphone'\n        title='iPhone'>3.2.0</li><li class='platform-ipad'\n        title='iPad'>3.2.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div><div id='property-bubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-bubbleParent' class='name expandable'>bubbleParent</a><span>: Boolean</span></div><div class='description'><div class='short'>Indicates if the proxy will bubble an event to its parent. ...</div><div class='long'><p>Indicates if the proxy will bubble an event to its parent.</p>\n\n<p><p>Some proxies (most commonly views) have a relationship to other proxies, often\nestablished by the add() method. For example, for a button added to a window, a\nclick event on the button would bubble up to the window. Other common parents are\ntable sections to their rows, table views to their sections, and scrollable views\nto their views. Set this property to false to disable the bubbling to the proxy's parent.</p>\n\n</p><p>Default: true</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div><div id='property-damping' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-property-damping' class='name expandable'>damping</a><span>: Number</span></div><div class='description'><div class='short'>Specifies the amount of oscillation during the conclusion of the snap. ...</div><div class='long'><p>Specifies the amount of oscillation during the conclusion of the snap.</p>\n\n<p><p>A value of 0.0 indicates minimum oscillation, while 1.0 indicates maximum oscillation.</p>\n\n</p><p>Default: 0.5</p></div></div></div><div id='property-item' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-property-item' class='name not-expandable'>item</a><span>: <a href=\"#!/api/Titanium.UI.View\" rel=\"Titanium.UI.View\" class=\"docClass\">Titanium.UI.View</a></span></div><div class='description'><div class='short'><p>Item to add to this behavior.</p>\n\n</div><div class='long'><p>Item to add to this behavior.</p>\n\n</div></div></div><div id='property-lifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-lifecycleContainer' class='name not-expandable'>lifecycleContainer</a><span>: <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></span></div><div class='description'><div class='short'><p>The Window or TabGroup whose Activity lifecycle should be triggered on the proxy.</p>\n\n</div><div class='long'><p>The Window or TabGroup whose Activity lifecycle should be triggered on the proxy.</p>\n\n<p><p>If this property is set to a Window or TabGroup, then the corresponding Activity lifecycle event callbacks\nwill also be called on the proxy. Proxies that require the activity lifecycle will need this property set\nto the appropriate containing Window or TabGroup.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div><div id='property-snapPoint' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-property-snapPoint' class='name expandable'>snapPoint</a><span>: <a href=\"#!/api/Point\" rel=\"Point\" class=\"docClass\">Point</a></span></div><div class='description'><div class='short'>Specifies the point to snap to. ...</div><div class='long'><p>Specifies the point to snap to.</p>\n\n<p><p>The coordinate system depends on the animator's reference view.</p>\n\n</p><p>Default: (0,0)</p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-addEventListener' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-addEventListener' class='name expandable'>addEventListener</a>(<span class='pre'>name, callback</span>)</div><div class='description'><div class='short'>Adds the specified callback as an event listener for the named event. ...</div><div class='long'><p>Adds the specified callback as an event listener for the named event.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span>: String<div class='sub-desc'><p>Name of the event.</p>\n\n</div></li><li><span class='pre'>callback</span>: Callback&lt;Object&gt;<div class='sub-desc'><p>Callback function to invoke when the event is fired.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-applyProperties' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-applyProperties' class='name expandable'>applyProperties</a>(<span class='pre'>props</span>)</div><div class='description'><div class='short'>Applies the properties to the proxy. ...</div><div class='long'><p>Applies the properties to the proxy.</p>\n\n<p><p>Properties are supplied as a dictionary. Each key-value pair in the object is applied to the proxy such that\nmyproxy[key] = value.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>props</span>: <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>A dictionary of properties to apply.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-fireEvent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-fireEvent' class='name expandable'>fireEvent</a>(<span class='pre'>name, event</span>)</div><div class='description'><div class='short'>Fires a synthesized event to any registered listeners. ...</div><div class='long'><p>Fires a synthesized event to any registered listeners.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span>: String<div class='sub-desc'><p>Name of the event.</p>\n\n</div></li><li><span class='pre'>event</span>: <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>A dictionary of keys and values to add to the <a href=\"#!/api/Titanium.Event\" rel=\"Titanium.Event\" class=\"docClass\">Titanium.Event</a> object sent to the listeners.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-getApiName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getApiName' class='name expandable'>getApiName</a>(<span class='pre'></span>): String</div><div class='description'><div class='short'>Gets the value of the apiName property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-apiName\" rel=\"Titanium.Proxy-property-apiName\" class=\"docClass\">apiName</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.2.0</li><li class='platform-iphone'\n        title='iPhone'>3.2.0</li><li class='platform-ipad'\n        title='iPad'>3.2.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getBubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getBubbleParent' class='name expandable'>getBubbleParent</a>(<span class='pre'></span>): Boolean</div><div class='description'><div class='short'>Gets the value of the bubbleParent property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-bubbleParent\" rel=\"Titanium.Proxy-property-bubbleParent\" class=\"docClass\">bubbleParent</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDamping' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-method-getDamping' class='name expandable'>getDamping</a>(<span class='pre'></span>): Number</div><div class='description'><div class='short'>Gets the value of the damping property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-damping\" rel=\"Titanium.UI.iOS.SnapBehavior-property-damping\" class=\"docClass\">damping</a> property.</p>\n\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-method-getItem' class='name expandable'>getItem</a>(<span class='pre'></span>): <a href=\"#!/api/Titanium.UI.View\" rel=\"Titanium.UI.View\" class=\"docClass\">Titanium.UI.View</a></div><div class='description'><div class='short'>Gets the value of the item property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-item\" rel=\"Titanium.UI.iOS.SnapBehavior-property-item\" class=\"docClass\">item</a> property.</p>\n\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Titanium.UI.View\" rel=\"Titanium.UI.View\" class=\"docClass\">Titanium.UI.View</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getLifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getLifecycleContainer' class='name expandable'>getLifecycleContainer</a>(<span class='pre'></span>): <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></div><div class='description'><div class='short'>Gets the value of the lifecycleContainer property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-lifecycleContainer\" rel=\"Titanium.Proxy-property-lifecycleContainer\" class=\"docClass\">lifecycleContainer</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getSnapPoint' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-method-getSnapPoint' class='name expandable'>getSnapPoint</a>(<span class='pre'></span>): <a href=\"#!/api/Point\" rel=\"Point\" class=\"docClass\">Point</a></div><div class='description'><div class='short'>Gets the value of the snapPoint property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-snapPoint\" rel=\"Titanium.UI.iOS.SnapBehavior-property-snapPoint\" class=\"docClass\">snapPoint</a> property.</p>\n\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Point\" rel=\"Point\" class=\"docClass\">Point</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-removeEventListener' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-removeEventListener' class='name expandable'>removeEventListener</a>(<span class='pre'>name, callback</span>)</div><div class='description'><div class='short'>Removes the specified callback as an event listener for the named event. ...</div><div class='long'><p>Removes the specified callback as an event listener for the named event.</p>\n\n<p><p>Multiple listeners can be registered for the same event, so the\n<code>callback</code> parameter is used to determine which listener to remove.</p>\n\n\n\n\n<p>When adding a listener, you must save a reference to the callback function\nin order to remove the listener later:</p>\n\n\n\n\n<pre><code>var listener = function() { Ti.API.info(\"Event listener called.\"); }\nwindow.addEventListener('click', listener);\n</code></pre>\n\n\n\n\n<p>To remove the listener, pass in a reference to the callback function:</p>\n\n\n\n\n<pre><code>window.removeEventListener('click', listener);\n</code></pre>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span>: String<div class='sub-desc'><p>Name of the event.</p>\n\n</div></li><li><span class='pre'>callback</span>: Callback&lt;Object&gt;<div class='sub-desc'><p>Callback function to remove. Must be the same function passed to <code>addEventListener</code>.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setBubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-setBubbleParent' class='name expandable'>setBubbleParent</a>(<span class='pre'>bubbleParent</span>)</div><div class='description'><div class='short'>Sets the value of the bubbleParent property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.Proxy-property-bubbleParent\" rel=\"Titanium.Proxy-property-bubbleParent\" class=\"docClass\">bubbleParent</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>bubbleParent</span>: Boolean<div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setDamping' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-method-setDamping' class='name expandable'>setDamping</a>(<span class='pre'>damping</span>)</div><div class='description'><div class='short'>Sets the value of the damping property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-damping\" rel=\"Titanium.UI.iOS.SnapBehavior-property-damping\" class=\"docClass\">damping</a> property.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>damping</span>: Number<div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-method-setItem' class='name expandable'>setItem</a>(<span class='pre'>item</span>)</div><div class='description'><div class='short'>Sets the value of the item property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-item\" rel=\"Titanium.UI.iOS.SnapBehavior-property-item\" class=\"docClass\">item</a> property.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span>: <a href=\"#!/api/Titanium.UI.View\" rel=\"Titanium.UI.View\" class=\"docClass\">Titanium.UI.View</a><div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setLifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-setLifecycleContainer' class='name expandable'>setLifecycleContainer</a>(<span class='pre'>lifecycleContainer</span>)</div><div class='description'><div class='short'>Sets the value of the lifecycleContainer property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.Proxy-property-lifecycleContainer\" rel=\"Titanium.Proxy-property-lifecycleContainer\" class=\"docClass\">lifecycleContainer</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>lifecycleContainer</span>: <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a><div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setSnapPoint' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Titanium.UI.iOS.SnapBehavior'>Titanium.UI.iOS.SnapBehavior</span></div><a href='#!/api/Titanium.UI.iOS.SnapBehavior-method-setSnapPoint' class='name expandable'>setSnapPoint</a>(<span class='pre'>snapPoint</span>)</div><div class='description'><div class='short'>Sets the value of the snapPoint property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.UI.iOS.SnapBehavior-property-snapPoint\" rel=\"Titanium.UI.iOS.SnapBehavior-property-snapPoint\" class=\"docClass\">snapPoint</a> property.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>snapPoint</span>: <a href=\"#!/api/Point\" rel=\"Point\" class=\"docClass\">Point</a><div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div></div></div></div></div>"}