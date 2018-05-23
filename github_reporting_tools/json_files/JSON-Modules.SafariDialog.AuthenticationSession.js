{"tagname":"class","name":"Modules.SafariDialog.AuthenticationSession","extends":"Titanium.Proxy","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["iphone 6.3.0","ipad 6.3.0"],"editurl":"https://github.com/appcelerator-modules/Ti.SafariDialog/edit/master/apidoc/AuthenticationSession.yml","description":["<p>The <code>AuthenticationSession</code> puts the user in control of whether they want to use \ntheir existing logged-in session from Safari. The app provides a URL that points \nto the authentication webpage. The page will be loaded in a secure view controller. \nFrom the webpage, the user can authenticate herself and grant access to the app. \nOn completion, the service will send a callback URL with an authentication token, \nand this URL will be passed to the app by the <code>callback</code>.</p>\n\n<p>The callback URL usually has a custom URL scheme. For the app to receive the \ncallback URL, it needs to either register the custom URL scheme in its Info.plist, \nor set the scheme to <code>scheme</code> argument in the initializer.</p>\n\n<p>If the user has already logged into the web service in Safari or other apps via \nthe <code>AuthenticationSession</code>, it is possible to share the existing login information. \nAn alert will be presented to get the user's consent for sharing their existing login\ninformation. If the user cancels the alert, the session will be canceled, and \nthe callback will be called.</p>\n\n<p>If the user taps Cancel when showing the login webpage for the web service, \nthe session will be canceled, and the callback will be called as well.</p>\n\n<p>The app can cancel the session by calling <code>cancel()</code>. This will also dismiss \nthe window that is showing the web service's login page.</p>\n\n<h3>Requirements</h3>\n\n<p>The AuthenticationSession API is available with the Titanium SDK starting with Release 6.3.0.\nThis module only works with devices running iOS 11.0 and later.\nPlease make sure you have at least Xcode 9 to build to the required sources.</p>\n\n<h3>Getting Started</h3>\n\n<p>Create a new authentication session by providing a <code>url</code> and <code>scheme</code>, create an event-listener and start:</p>\n\n<pre><code>var Safari = require('ti.safaridialog');\n\nvar authSession = Safari.createAuthenticationSession({\n  url: 'https://example.com/oauth?callbackURL=myapp://',\n  scheme: 'myapp://'\n});\n\nauthSession.addEventListener('callback', function(e) {\n  if (!e.success) {\n      Ti.API.error('Error authenticating: ' + e.error);\n      return;\n  }\n\n  Ti.API.info('Callback URL: ' + e.callbackURL);\n});\n\nauthSession.start(); // Or cancel() to cancel it manually.\n</code></pre>"]},"private":null,"id":"class-Modules.SafariDialog.AuthenticationSession","members":{"cfg":[],"property":[{"name":"apiName","tagname":"property","owner":"Titanium.Proxy","meta":{"readonly":true,"description":["<p>The value of this property is the fully qualified name of the API. For example, {@link Titanium.UI.Button Button}\nreturns <code>Ti.UI.Button</code>.</p>"],"platform":["android 3.2.0","iphone 3.2.0","ipad 3.2.0","windowsphone 4.1.0"]},"id":"property-apiName"},{"name":"bubbleParent","tagname":"property","owner":"Titanium.Proxy","meta":{"description":["<p>Some proxies (most commonly views) have a relationship to other proxies, often\nestablished by the add() method. For example, for a button added to a window, a\nclick event on the button would bubble up to the window. Other common parents are\ntable sections to their rows, table views to their sections, and scrollable views\nto their views. Set this property to false to disable the bubbling to the proxy's parent.</p>"],"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"property-bubbleParent"},{"name":"lifecycleContainer","tagname":"property","owner":"Titanium.Proxy","meta":{"description":["<p>If this property is set to a Window or TabGroup, then the corresponding Activity lifecycle event callbacks\nwill also be called on the proxy. Proxies that require the activity lifecycle will need this property set\nto the appropriate containing Window or TabGroup.</p>"],"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"property-lifecycleContainer"},{"name":"scheme","tagname":"property","owner":"Modules.SafariDialog.AuthenticationSession","meta":{},"id":"property-scheme"},{"name":"url","tagname":"property","owner":"Modules.SafariDialog.AuthenticationSession","meta":{},"id":"property-url"}],"method":[{"name":"addEventListener","tagname":"method","owner":"Titanium.Proxy","meta":{},"id":"method-addEventListener"},{"name":"applyProperties","tagname":"method","owner":"Titanium.Proxy","meta":{"description":["<p>Properties are supplied as a dictionary. Each key-value pair in the object is applied to the proxy such that\nmyproxy[key] = value.</p>"],"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-applyProperties"},{"name":"cancel","tagname":"method","owner":"Modules.SafariDialog.AuthenticationSession","meta":{"description":["<p>If the view controller is already presented to load the webpage for \nauthentication, it will be dismissed. Calling cancel on an already canceled \nsession will have no effect.</p>"]},"id":"method-cancel"},{"name":"fireEvent","tagname":"method","owner":"Titanium.Proxy","meta":{},"id":"method-fireEvent"},{"name":"getApiName","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.2.0","iphone 3.2.0","ipad 3.2.0","windowsphone 4.1.0"]},"id":"method-getApiName"},{"name":"getBubbleParent","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-getBubbleParent"},{"name":"getLifecycleContainer","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"method-getLifecycleContainer"},{"name":"getScheme","tagname":"method","owner":"Modules.SafariDialog.AuthenticationSession","meta":{},"id":"method-getScheme"},{"name":"getUrl","tagname":"method","owner":"Modules.SafariDialog.AuthenticationSession","meta":{},"id":"method-getUrl"},{"name":"removeEventListener","tagname":"method","owner":"Titanium.Proxy","meta":{"description":["<p>Multiple listeners can be registered for the same event, so the\n<code>callback</code> parameter is used to determine which listener to remove.</p>\n\n<p>When adding a listener, you must save a reference to the callback function\nin order to remove the listener later:</p>\n\n<pre><code>var listener = function() { Ti.API.info(\"Event listener called.\"); }\nwindow.addEventListener('click', listener);\n</code></pre>\n\n<p>To remove the listener, pass in a reference to the callback function:</p>\n\n<pre><code>window.removeEventListener('click', listener);\n</code></pre>"]},"id":"method-removeEventListener"},{"name":"setBubbleParent","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-setBubbleParent"},{"name":"setLifecycleContainer","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"method-setLifecycleContainer"},{"name":"setScheme","tagname":"method","owner":"Modules.SafariDialog.AuthenticationSession","meta":{},"id":"method-setScheme"},{"name":"setUrl","tagname":"method","owner":"Modules.SafariDialog.AuthenticationSession","meta":{},"id":"method-setUrl"},{"name":"start","tagname":"method","owner":"Modules.SafariDialog.AuthenticationSession","meta":{"description":["<p>The <code>start</code> method can only be called once for an <code>AuthenticationSession</code> \ninstance. This also means calling start on a canceled session will fail.</p>"]},"id":"method-start"}],"event":[{"name":"callback","tagname":"event","owner":"Modules.SafariDialog.AuthenticationSession","meta":{},"id":"event-callback"}],"css_var":[],"css_mixin":[]},"linenr":34504,"files":[{"filename":"titanium.js","href":"titanium.html#Modules-SafariDialog-AuthenticationSession"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-iphone'\n        title='iPhone'>6.3.0</li><li class='platform-ipad'\n        title='iPad'>6.3.0</li></ul>","editurl":null,"description":"<p><p>The <code>AuthenticationSession</code> puts the user in control of whether they want to use \ntheir existing logged-in session from Safari. The app provides a URL that points \nto the authentication webpage. The page will be loaded in a secure view controller. \nFrom the webpage, the user can authenticate herself and grant access to the app. \nOn completion, the service will send a callback URL with an authentication token, \nand this URL will be passed to the app by the <code>callback</code>.</p>\n\n\n\n\n<p>The callback URL usually has a custom URL scheme. For the app to receive the \ncallback URL, it needs to either register the custom URL scheme in its Info.plist, \nor set the scheme to <code>scheme</code> argument in the initializer.</p>\n\n\n\n\n<p>If the user has already logged into the web service in Safari or other apps via \nthe <code>AuthenticationSession</code>, it is possible to share the existing login information. \nAn alert will be presented to get the user's consent for sharing their existing login\ninformation. If the user cancels the alert, the session will be canceled, and \nthe callback will be called.</p>\n\n\n\n\n<p>If the user taps Cancel when showing the login webpage for the web service, \nthe session will be canceled, and the callback will be called as well.</p>\n\n\n\n\n<p>The app can cancel the session by calling <code>cancel()</code>. This will also dismiss \nthe window that is showing the web service's login page.</p>\n\n\n\n\n<h3>Requirements</h3>\n\n\n\n\n<p>The AuthenticationSession API is available with the Titanium SDK starting with Release 6.3.0.\nThis module only works with devices running iOS 11.0 and later.\nPlease make sure you have at least Xcode 9 to build to the required sources.</p>\n\n\n\n\n<h3>Getting Started</h3>\n\n\n\n\n<p>Create a new authentication session by providing a <code>url</code> and <code>scheme</code>, create an event-listener and start:</p>\n\n\n\n\n<pre><code>var Safari = require('ti.safaridialog');\n\nvar authSession = Safari.createAuthenticationSession({\n  url: 'https://example.com/oauth?callbackURL=myapp://',\n  scheme: 'myapp://'\n});\n\nauthSession.addEventListener('callback', function(e) {\n  if (!e.success) {\n      Ti.API.error('Error authenticating: ' + e.error);\n      return;\n  }\n\n  Ti.API.info('Callback URL: ' + e.callbackURL);\n});\n\nauthSession.start(); // Or cancel() to cancel it manually.\n</code></pre>\n\n</p>"},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["Titanium.Proxy","Modules.SafariDialog.AuthenticationSession"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-iphone' title='iPhone since Titanium SDK 6.3.0'>iPhone 6.3.0</li><li class='platform-ipad' title='iPad since Titanium SDK 6.3.0'>iPad 6.3.0</li></ul></div><div class='hierarchy'><div class='classes'><div class='subclass'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='docClass'>Titanium.Proxy</a></div><div class='subclass'> &gt; <strong>Modules.SafariDialog.AuthenticationSession</strong></div></div></div><div class='doc-contents'><p>Authenticate a user with a web service, even if the web service is run by a third party.</p>\n\n\n\n\n<p> <b>Requires:</b> \niOS 11.0 and later \n</p>\n\n<p><p>The <code>AuthenticationSession</code> puts the user in control of whether they want to use \ntheir existing logged-in session from Safari. The app provides a URL that points \nto the authentication webpage. The page will be loaded in a secure view controller. \nFrom the webpage, the user can authenticate herself and grant access to the app. \nOn completion, the service will send a callback URL with an authentication token, \nand this URL will be passed to the app by the <code>callback</code>.</p>\n\n\n\n\n<p>The callback URL usually has a custom URL scheme. For the app to receive the \ncallback URL, it needs to either register the custom URL scheme in its Info.plist, \nor set the scheme to <code>scheme</code> argument in the initializer.</p>\n\n\n\n\n<p>If the user has already logged into the web service in Safari or other apps via \nthe <code>AuthenticationSession</code>, it is possible to share the existing login information. \nAn alert will be presented to get the user's consent for sharing their existing login\ninformation. If the user cancels the alert, the session will be canceled, and \nthe callback will be called.</p>\n\n\n\n\n<p>If the user taps Cancel when showing the login webpage for the web service, \nthe session will be canceled, and the callback will be called as well.</p>\n\n\n\n\n<p>The app can cancel the session by calling <code>cancel()</code>. This will also dismiss \nthe window that is showing the web service's login page.</p>\n\n\n\n\n<h3>Requirements</h3>\n\n\n\n\n<p>The AuthenticationSession API is available with the Titanium SDK starting with Release 6.3.0.\nThis module only works with devices running iOS 11.0 and later.\nPlease make sure you have at least Xcode 9 to build to the required sources.</p>\n\n\n\n\n<h3>Getting Started</h3>\n\n\n\n\n<p>Create a new authentication session by providing a <code>url</code> and <code>scheme</code>, create an event-listener and start:</p>\n\n\n\n\n<pre><code>var Safari = require('ti.safaridialog');\n\nvar authSession = Safari.createAuthenticationSession({\n  url: 'https://example.com/oauth?callbackURL=myapp://',\n  scheme: 'myapp://'\n});\n\nauthSession.addEventListener('callback', function(e) {\n  if (!e.success) {\n      Ti.API.error('Error authenticating: ' + e.error);\n      return;\n  }\n\n  Ti.API.info('Callback URL: ' + e.callbackURL);\n});\n\nauthSession.start(); // Or cancel() to cancel it manually.\n</code></pre>\n\n</p><ul class='platforms'><li class='platform-iphone'\n        title='iPhone'>6.3.0</li><li class='platform-ipad'\n        title='iPad'>6.3.0</li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-apiName' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-apiName' class='name not-expandable'>apiName</a><span>: String</span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>The name of the API that this proxy corresponds to.</p>\n\n</div><div class='long'><p>The name of the API that this proxy corresponds to.</p>\n\n<p><p>The value of this property is the fully qualified name of the API. For example, <a href=\"#!/api/Titanium.UI.Button\" rel=\"Titanium.UI.Button\" class=\"docClass\">Button</a>\nreturns <code>Ti.UI.Button</code>.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.2.0</li><li class='platform-iphone'\n        title='iPhone'>3.2.0</li><li class='platform-ipad'\n        title='iPad'>3.2.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div><div id='property-bubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-bubbleParent' class='name expandable'>bubbleParent</a><span>: Boolean</span></div><div class='description'><div class='short'>Indicates if the proxy will bubble an event to its parent. ...</div><div class='long'><p>Indicates if the proxy will bubble an event to its parent.</p>\n\n<p><p>Some proxies (most commonly views) have a relationship to other proxies, often\nestablished by the add() method. For example, for a button added to a window, a\nclick event on the button would bubble up to the window. Other common parents are\ntable sections to their rows, table views to their sections, and scrollable views\nto their views. Set this property to false to disable the bubbling to the proxy's parent.</p>\n\n</p><p>Default: true</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div><div id='property-lifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-lifecycleContainer' class='name not-expandable'>lifecycleContainer</a><span>: <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></span></div><div class='description'><div class='short'><p>The Window or TabGroup whose Activity lifecycle should be triggered on the proxy.</p>\n\n</div><div class='long'><p>The Window or TabGroup whose Activity lifecycle should be triggered on the proxy.</p>\n\n<p><p>If this property is set to a Window or TabGroup, then the corresponding Activity lifecycle event callbacks\nwill also be called on the proxy. Proxies that require the activity lifecycle will need this property set\nto the appropriate containing Window or TabGroup.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div><div id='property-scheme' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-property-scheme' class='name not-expandable'>scheme</a><span>: String</span></div><div class='description'><div class='short'><p>The custom URL scheme that the app expects in the callback URL.</p>\n\n</div><div class='long'><p>The custom URL scheme that the app expects in the callback URL.</p>\n\n</div></div></div><div id='property-url' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-property-url' class='name expandable'>url</a><span>: String</span></div><div class='description'><div class='short'>The initial URL pointing to the authentication webpage. ...</div><div class='long'><p>The initial URL pointing to the authentication webpage. \nOnly supports URLs with http:// or https:// schemes.</p>\n\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-addEventListener' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-addEventListener' class='name expandable'>addEventListener</a>(<span class='pre'>name, callback</span>)</div><div class='description'><div class='short'>Adds the specified callback as an event listener for the named event. ...</div><div class='long'><p>Adds the specified callback as an event listener for the named event.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span>: String<div class='sub-desc'><p>Name of the event.</p>\n\n</div></li><li><span class='pre'>callback</span>: Callback&lt;Object&gt;<div class='sub-desc'><p>Callback function to invoke when the event is fired.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-applyProperties' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-applyProperties' class='name expandable'>applyProperties</a>(<span class='pre'>props</span>)</div><div class='description'><div class='short'>Applies the properties to the proxy. ...</div><div class='long'><p>Applies the properties to the proxy.</p>\n\n<p><p>Properties are supplied as a dictionary. Each key-value pair in the object is applied to the proxy such that\nmyproxy[key] = value.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>props</span>: <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>A dictionary of properties to apply.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-cancel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-method-cancel' class='name expandable'>cancel</a>(<span class='pre'></span>)</div><div class='description'><div class='short'>Cancel an authentication-session. ...</div><div class='long'><p>Cancel an authentication-session.</p>\n\n<p><p>If the view controller is already presented to load the webpage for \nauthentication, it will be dismissed. Calling cancel on an already canceled \nsession will have no effect.</p>\n\n</p><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-fireEvent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-fireEvent' class='name expandable'>fireEvent</a>(<span class='pre'>name, event</span>)</div><div class='description'><div class='short'>Fires a synthesized event to any registered listeners. ...</div><div class='long'><p>Fires a synthesized event to any registered listeners.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span>: String<div class='sub-desc'><p>Name of the event.</p>\n\n</div></li><li><span class='pre'>event</span>: <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>A dictionary of keys and values to add to the <a href=\"#!/api/Titanium.Event\" rel=\"Titanium.Event\" class=\"docClass\">Titanium.Event</a> object sent to the listeners.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-getApiName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getApiName' class='name expandable'>getApiName</a>(<span class='pre'></span>): String</div><div class='description'><div class='short'>Gets the value of the apiName property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-apiName\" rel=\"Titanium.Proxy-property-apiName\" class=\"docClass\">apiName</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.2.0</li><li class='platform-iphone'\n        title='iPhone'>3.2.0</li><li class='platform-ipad'\n        title='iPad'>3.2.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getBubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getBubbleParent' class='name expandable'>getBubbleParent</a>(<span class='pre'></span>): Boolean</div><div class='description'><div class='short'>Gets the value of the bubbleParent property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-bubbleParent\" rel=\"Titanium.Proxy-property-bubbleParent\" class=\"docClass\">bubbleParent</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getLifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getLifecycleContainer' class='name expandable'>getLifecycleContainer</a>(<span class='pre'></span>): <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></div><div class='description'><div class='short'>Gets the value of the lifecycleContainer property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-lifecycleContainer\" rel=\"Titanium.Proxy-property-lifecycleContainer\" class=\"docClass\">lifecycleContainer</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getScheme' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-method-getScheme' class='name expandable'>getScheme</a>(<span class='pre'></span>): String</div><div class='description'><div class='short'>Gets the value of the scheme property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Modules.SafariDialog.AuthenticationSession-property-scheme\" rel=\"Modules.SafariDialog.AuthenticationSession-property-scheme\" class=\"docClass\">scheme</a> property.</p>\n\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getUrl' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-method-getUrl' class='name expandable'>getUrl</a>(<span class='pre'></span>): String</div><div class='description'><div class='short'>Gets the value of the url property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Modules.SafariDialog.AuthenticationSession-property-url\" rel=\"Modules.SafariDialog.AuthenticationSession-property-url\" class=\"docClass\">url</a> property.</p>\n\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-removeEventListener' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-removeEventListener' class='name expandable'>removeEventListener</a>(<span class='pre'>name, callback</span>)</div><div class='description'><div class='short'>Removes the specified callback as an event listener for the named event. ...</div><div class='long'><p>Removes the specified callback as an event listener for the named event.</p>\n\n<p><p>Multiple listeners can be registered for the same event, so the\n<code>callback</code> parameter is used to determine which listener to remove.</p>\n\n\n\n\n<p>When adding a listener, you must save a reference to the callback function\nin order to remove the listener later:</p>\n\n\n\n\n<pre><code>var listener = function() { Ti.API.info(\"Event listener called.\"); }\nwindow.addEventListener('click', listener);\n</code></pre>\n\n\n\n\n<p>To remove the listener, pass in a reference to the callback function:</p>\n\n\n\n\n<pre><code>window.removeEventListener('click', listener);\n</code></pre>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span>: String<div class='sub-desc'><p>Name of the event.</p>\n\n</div></li><li><span class='pre'>callback</span>: Callback&lt;Object&gt;<div class='sub-desc'><p>Callback function to remove. Must be the same function passed to <code>addEventListener</code>.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setBubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-setBubbleParent' class='name expandable'>setBubbleParent</a>(<span class='pre'>bubbleParent</span>)</div><div class='description'><div class='short'>Sets the value of the bubbleParent property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.Proxy-property-bubbleParent\" rel=\"Titanium.Proxy-property-bubbleParent\" class=\"docClass\">bubbleParent</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>bubbleParent</span>: Boolean<div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setLifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-setLifecycleContainer' class='name expandable'>setLifecycleContainer</a>(<span class='pre'>lifecycleContainer</span>)</div><div class='description'><div class='short'>Sets the value of the lifecycleContainer property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.Proxy-property-lifecycleContainer\" rel=\"Titanium.Proxy-property-lifecycleContainer\" class=\"docClass\">lifecycleContainer</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>lifecycleContainer</span>: <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a><div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setScheme' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-method-setScheme' class='name expandable'>setScheme</a>(<span class='pre'>scheme</span>)</div><div class='description'><div class='short'>Sets the value of the scheme property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Modules.SafariDialog.AuthenticationSession-property-scheme\" rel=\"Modules.SafariDialog.AuthenticationSession-property-scheme\" class=\"docClass\">scheme</a> property.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>scheme</span>: String<div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setUrl' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-method-setUrl' class='name expandable'>setUrl</a>(<span class='pre'>url</span>)</div><div class='description'><div class='short'>Sets the value of the url property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Modules.SafariDialog.AuthenticationSession-property-url\" rel=\"Modules.SafariDialog.AuthenticationSession-property-url\" class=\"docClass\">url</a> property.</p>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>url</span>: String<div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-start' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-method-start' class='name expandable'>start</a>(<span class='pre'></span>): Boolean</div><div class='description'><div class='short'>Starts the AuthenticationSession instance after it is instantiated. ...</div><div class='long'><p>Starts the <code>AuthenticationSession</code> instance after it is instantiated.</p>\n\n<p><p>The <code>start</code> method can only be called once for an <code>AuthenticationSession</code> \ninstance. This also means calling start on a canceled session will fail.</p>\n\n</p><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>Returns <code>true</code> if the session starts successfully.</p>\n</div></li></ul></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-event'>Events</h3><div class='subsection'><div id='event-callback' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.SafariDialog.AuthenticationSession'>Modules.SafariDialog.AuthenticationSession</span></div><a href='#!/api/Modules.SafariDialog.AuthenticationSession-event-callback' class='name expandable'>callback</a></div><div class='description'><div class='short'>The callback which is called when the session is completed successfully \nor canceled by user. ...</div><div class='long'><p>The callback which is called when the session is completed successfully \nor canceled by user.</p>\n\n<h3 class=\"pa\">Properties</h3><ul><li><span class='pre'>error</span>: String<div class='sub-desc'><p>The error-message returned in case something went wrong.</p>\n\n</div></li><li><span class='pre'>callbackURL</span>: String<div class='sub-desc'><p>The callback-URL returned in case the OAuth-flow succeeded.</p>\n\n</div></li><li><span class='pre'>bubbles</span>: Boolean<div class='sub-desc'><p>True if the event will try to bubble up if possible.</p>\n\n<ul class=\"platforms\"><li class='platform-android' title='Android' >&nbsp;</li><li class='platform-iphone' title='iPhone' >&nbsp;</li><li class='platform-ipad' title='iPad' >&nbsp;</li></ul></div></li><li><span class='pre'>cancelBubble</span>: Boolean<div class='sub-desc'><p>Set to true to stop the event from bubbling.</p>\n\n<ul class=\"platforms\"><li class='platform-android' title='Android' >&nbsp;</li><li class='platform-iphone' title='iPhone' >&nbsp;</li><li class='platform-ipad' title='iPad' >&nbsp;</li></ul></div></li><li><span class='pre'>source</span>: Object<div class='sub-desc'><p>Source object that fired the event.</p>\n\n<ul class=\"platforms\"><li class='platform-android' title='Android' >&nbsp;</li><li class='platform-iphone' title='iPhone' >&nbsp;</li><li class='platform-ipad' title='iPad' >&nbsp;</li><li class='platform-windowsphone' title='Windows Phone' >&nbsp;</li></ul></div></li><li><span class='pre'>type</span>: String<div class='sub-desc'><p>Name of the event fired.</p>\n\n<ul class=\"platforms\"><li class='platform-android' title='Android' >&nbsp;</li><li class='platform-iphone' title='iPhone' >&nbsp;</li><li class='platform-ipad' title='iPad' >&nbsp;</li><li class='platform-windowsphone' title='Windows Phone' >&nbsp;</li></ul></div></li></ul></div></div></div></div></div></div></div>"}