Ext.data.JsonP['Modules_Cloud_Photos']({"tagname":"class","name":"Modules.Cloud.Photos","extends":"Titanium.Module","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"platform":["android 0.8","iphone 0.8","ipad 0.8"],"editurl":"https://github.com/appcelerator/titanium_mobile/edit/master/apidoc/Modules/Cloud/Photos/Photos.yml"},"private":null,"id":"class-Modules.Cloud.Photos","members":{"cfg":[],"property":[{"name":"apiName","tagname":"property","owner":"Titanium.Proxy","meta":{"readonly":true,"description":["<p>The value of this property is the fully qualified name of the API. For example, {@link Titanium.UI.Button Button}\nreturns <code>Ti.UI.Button</code>.</p>"],"platform":["android 3.2.0","iphone 3.2.0","ipad 3.2.0","windowsphone 4.1.0"]},"id":"property-apiName"},{"name":"bubbleParent","tagname":"property","owner":"Titanium.Proxy","meta":{"description":["<p>Some proxies (most commonly views) have a relationship to other proxies, often\nestablished by the add() method. For example, for a button added to a window, a\nclick event on the button would bubble up to the window. Other common parents are\ntable sections to their rows, table views to their sections, and scrollable views\nto their views. Set this property to false to disable the bubbling to the proxy's parent.</p>"],"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"property-bubbleParent"},{"name":"lifecycleContainer","tagname":"property","owner":"Titanium.Proxy","meta":{"description":["<p>If this property is set to a Window or TabGroup, then the corresponding Activity lifecycle event callbacks\nwill also be called on the proxy. Proxies that require the activity lifecycle will need this property set\nto the appropriate containing Window or TabGroup.</p>"],"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"property-lifecycleContainer"}],"method":[{"name":"applyProperties","tagname":"method","owner":"Titanium.Proxy","meta":{"description":["<p>Properties are supplied as a dictionary. Each key-value pair in the object is applied to the proxy such that\nmyproxy[key] = value.</p>"],"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-applyProperties"},{"name":"create","tagname":"method","owner":"Modules.Cloud.Photos","meta":{"description":["<p>Requires user login. </p>\n\n<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-create\">Photos: Create (Upload) a Photo</a>\nfor the request parameters supported by this method.</p>\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>"]},"id":"method-create"},{"name":"getApiName","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.2.0","iphone 3.2.0","ipad 3.2.0","windowsphone 4.1.0"]},"id":"method-getApiName"},{"name":"getBubbleParent","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-getBubbleParent"},{"name":"getLifecycleContainer","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"method-getLifecycleContainer"},{"name":"query","tagname":"method","owner":"Modules.Cloud.Photos","meta":{"description":["<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-query\">Photos: Custom Query Photos</a>\nfor the request parameters supported by this method.</p>\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>"]},"id":"method-query"},{"name":"remove","tagname":"method","owner":"Modules.Cloud.Photos","meta":{"description":["<p>Requires user login. </p>\n\n<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-delete\">Photos: Delete a Photo</a>\nfor the request parameters supported by this method.</p>"]},"id":"method-remove"},{"name":"search","tagname":"method","owner":"Modules.Cloud.Photos","meta":{"description":["<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-search\">Photos: Search for Photos</a>\nfor the request parameters supported by this method.</p>\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>"]},"id":"method-search"},{"name":"setBubbleParent","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.0.0","iphone 3.0.0","ipad 3.0.0","windowsphone 4.1.0"]},"id":"method-setBubbleParent"},{"name":"setLifecycleContainer","tagname":"method","owner":"Titanium.Proxy","meta":{"platform":["android 3.6.0","windowsphone 4.1.0"]},"id":"method-setLifecycleContainer"},{"name":"show","tagname":"method","owner":"Modules.Cloud.Photos","meta":{"description":["<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-show\">Photos: Show Photo Info</a>\nfor the request parameters supported by this method.</p>\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>"]},"id":"method-show"},{"name":"update","tagname":"method","owner":"Modules.Cloud.Photos","meta":{"description":["<p>Requires user login. </p>\n\n<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-update\">Photos: Update a Photo</a>\nfor the request parameters supported by this method.</p>\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>"]},"id":"method-update"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":41181,"files":[{"filename":"titanium.js","href":"titanium.html#Modules-Cloud-Photos"}],"html_meta":{"platform":"<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul>","editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["Titanium.Proxy","Titanium.Module","Modules.Cloud.Photos"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'><ul class=\"sidebar-platforms\"><li class='platform-android' title='Android since Titanium SDK 0.8'>Android 0.8</li><li class='platform-iphone' title='iPhone since Titanium SDK 0.8'>iPhone 0.8</li><li class='platform-ipad' title='iPad since Titanium SDK 0.8'>iPad 0.8</li></ul></div><div class='hierarchy'><div class='classes'><div class='subclass'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='docClass'>Titanium.Proxy</a></div><div class='subclass'> &gt; <a href='#!/api/Titanium.Module' rel='Titanium.Module' class='docClass'>Titanium.Module</a></div><div class='subclass'> &gt; <strong>Modules.Cloud.Photos</strong></div></div></div><div class='doc-contents'><p>Provides methods for accessing ArrowDB photos.</p>\n\n\n\n\n<h3>Examples</h3>\n\n\n<h4>Create Photo</h4>\n\n\n<p>This example creates a new photo and checks the response.</p>\n\n\n\n\n<pre><code>Cloud.Photos.create({\n    photo: <a href=\"#!/api/Titanium.Filesystem-method-getFile\" rel=\"Titanium.Filesystem-method-getFile\" class=\"docClass\">Titanium.Filesystem.getFile</a>('photo.jpg')\n}, function (e) {\n    if (e.success) {\n        var photo = e.photos[0];\n        alert('Success:\\n' +\n            'id: ' + photo.id + '\\n' +\n            'filename: ' + photo.filename + '\\n' +\n            'size: ' + photo.size,\n            'updated_at: ' + photo.updated_at);\n    } else {\n        alert('Error:\\n' +\n            ((e.error &amp;&amp; e.message) || JSON.stringify(e)));\n    }\n});\n</code></pre>\n\n\n<h4>Show a Photo</h4>\n\n\n<p>This example retrieves information about a photo and checks the response.</p>\n\n\n\n\n<pre><code>Cloud.Photos.show({\n    photo_id: savedPhotoId\n}, function (e) {\n    if (e.success) {\n        var photo = e.photos[0];\n        alert('Success:\\n' +\n            'id: ' + photo.id + '\\n' +\n            'filename: ' + photo.filename + '\\n' +\n            'updated_at: ' + photo.updated_at);\n    } else {\n        alert('Error:\\n' +\n            ((e.error &amp;&amp; e.message) || JSON.stringify(e)));\n    }\n});\n</code></pre>\n\n\n<h4>Search for Photos</h4>\n\n\n<p>This example searches for photos and checks the response.</p>\n\n\n\n\n<pre><code>Cloud.Photos.search({\n    user_id: savedUserId\n}, function (e) {\n    if (e.success) {\n        alert('Success:\\n' +\n            'Count: ' + e.photos.length);\n        for (var i = 0; i &lt; e.photos.length; i++) {\n            var photo = e.photos[i];\n            alert('id: ' + photo.id + '\\n' +\n                  'name: ' + photo.name + '\\n' +\n                  'filename: ' + photo.filename + '\\n' +\n                  'updated_at: ' + photo.updated_at);\n        }\n    } else {\n        alert('Error:\\n' +\n            ((e.error &amp;&amp; e.message) || JSON.stringify(e)));\n    }\n});\n</code></pre>\n\n\n<h4>Query for Photos</h4>\n\n\n<p>This example requests a list of photos and checks the response.</p>\n\n\n\n\n<pre><code>Cloud.Photos.query({\n    page: 1,\n    per_page: 20,\n    where: {\n        coordinates: {\n            '$nearSphere': [-122.23,37.12],\n            '$maxDistance': 0.00126\n        }\n    }\n}, function (e) {\n    if (e.success) {\n        alert('Success:\\n' +\n            'Count: ' + e.photos.length);\n        for (var i = 0; i &lt; e.photos.length; i++) {\n            var photo = e.photos[i];\n            alert('id: ' + photo.id + '\\n' +\n                  'name: ' + photo.name + '\\n' +\n                  'filename: ' + photo.filename + '\\n' +\n                  'updated_at: ' + photo.updated_at);\n        }\n    } else {\n        alert('Error:\\n' +\n            ((e.error &amp;&amp; e.message) || JSON.stringify(e)));\n    }\n});\n</code></pre>\n\n\n<h4>Update a Photo</h4>\n\n\n<p>This example updates a photo and checks the response.</p>\n\n\n\n\n<pre><code>Cloud.Photos.update({\n    photo_id: savedPhotoId,\n    photo: <a href=\"#!/api/Titanium.Filesystem-method-getFile\" rel=\"Titanium.Filesystem-method-getFile\" class=\"docClass\">Titanium.Filesystem.getFile</a>('newphoto.jpg'),\n    tags: 'mountains'\n}, function (e) {\n    if (e.success) {\n        var photo = e.photos[0];\n        alert('Success:\\n' +\n            'id: ' + photo.id + '\\n' +\n            'filename: ' + photo.filename + '\\n' +\n            'updated_at: ' + photo.updated_at);\n    } else {\n        alert('Error:\\n' +\n            ((e.error &amp;&amp; e.message) || JSON.stringify(e)));\n    }\n});\n</code></pre>\n\n\n<h4>Remove a Photo</h4>\n\n\n<p>This example deletes a photo and checks the response.</p>\n\n\n\n\n<pre><code>Cloud.Photos.remove({\n    photo_id: savedPhotoId\n}, function (e) {\n    if (e.success) {\n        alert('Success');\n    } else {\n        alert('Error:\\n' +\n            ((e.error &amp;&amp; e.message) || JSON.stringify(e)));\n    }\n});\n</code></pre>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>0.8</li><li class='platform-iphone'\n        title='iPhone'>0.8</li><li class='platform-ipad'\n        title='iPad'>0.8</li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-apiName' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-apiName' class='name not-expandable'>apiName</a><span> : String</span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>The name of the API that this proxy corresponds to.</p>\n\n</div><div class='long'><p>The name of the API that this proxy corresponds to.</p>\n\n<p><p>The value of this property is the fully qualified name of the API. For example, <a href=\"#!/api/Titanium.UI.Button\" rel=\"Titanium.UI.Button\" class=\"docClass\">Button</a>\nreturns <code>Ti.UI.Button</code>.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.2.0</li><li class='platform-iphone'\n        title='iPhone'>3.2.0</li><li class='platform-ipad'\n        title='iPad'>3.2.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div><div id='property-bubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-bubbleParent' class='name expandable'>bubbleParent</a><span> : Boolean</span></div><div class='description'><div class='short'>Indicates if the proxy will bubble an event to its parent. ...</div><div class='long'><p>Indicates if the proxy will bubble an event to its parent.</p>\n\n<p><p>Some proxies (most commonly views) have a relationship to other proxies, often\nestablished by the add() method. For example, for a button added to a window, a\nclick event on the button would bubble up to the window. Other common parents are\ntable sections to their rows, table views to their sections, and scrollable views\nto their views. Set this property to false to disable the bubbling to the proxy's parent.</p>\n\n</p><p>Default: true</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div><div id='property-lifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-property-lifecycleContainer' class='name not-expandable'>lifecycleContainer</a><span> : <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></span></div><div class='description'><div class='short'><p>The Window or TabGroup whose Activity lifecycle should be triggered on the proxy.</p>\n\n</div><div class='long'><p>The Window or TabGroup whose Activity lifecycle should be triggered on the proxy.</p>\n\n<p><p>If this property is set to a Window or TabGroup, then the corresponding Activity lifecycle event callbacks\nwill also be called on the proxy. Proxies that require the activity lifecycle will need this property set\nto the appropriate containing Window or TabGroup.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-applyProperties' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-applyProperties' class='name expandable'>applyProperties</a>( <span class='pre'>props</span> )</div><div class='description'><div class='short'>Applies the properties to the proxy. ...</div><div class='long'><p>Applies the properties to the proxy.</p>\n\n<p><p>Properties are supplied as a dictionary. Each key-value pair in the object is applied to the proxy such that\nmyproxy[key] = value.</p>\n\n</p><ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>props</span> : <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>A dictionary of properties to apply.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-create' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.Cloud.Photos'>Modules.Cloud.Photos</span></div><a href='#!/api/Modules.Cloud.Photos-method-create' class='name expandable'>create</a>( <span class='pre'>parameters, callback</span> )</div><div class='description'><div class='short'>Create or upload a new photo. ...</div><div class='long'><p>Create or upload a new photo.</p>\n\n<p><p>Requires user login. </p>\n\n\n\n\n<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-create\">Photos: Create (Upload) a Photo</a>\nfor the request parameters supported by this method.</p>\n\n\n\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>parameters</span> : <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>Parameters to send in the request.</p>\n\n</div></li><li><span class='pre'>callback</span> : Callback&lt;<a href=\"#!/api/CloudPhotosResponse\" rel=\"CloudPhotosResponse\" class=\"docClass\">CloudPhotosResponse</a>&gt;<div class='sub-desc'><p>Callback function to execute when the method completes.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-getApiName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getApiName' class='name expandable'>getApiName</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the value of the apiName property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-apiName\" rel=\"Titanium.Proxy-property-apiName\" class=\"docClass\">apiName</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.2.0</li><li class='platform-iphone'\n        title='iPhone'>3.2.0</li><li class='platform-ipad'\n        title='iPad'>3.2.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getBubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getBubbleParent' class='name expandable'>getBubbleParent</a>( <span class='pre'></span> ) : Boolean</div><div class='description'><div class='short'>Gets the value of the bubbleParent property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-bubbleParent\" rel=\"Titanium.Proxy-property-bubbleParent\" class=\"docClass\">bubbleParent</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getLifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-getLifecycleContainer' class='name expandable'>getLifecycleContainer</a>( <span class='pre'></span> ) : <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></div><div class='description'><div class='short'>Gets the value of the lifecycleContainer property. ...</div><div class='long'><p>Gets the value of the <a href=\"#!/api/Titanium.Proxy-property-lifecycleContainer\" rel=\"Titanium.Proxy-property-lifecycleContainer\" class=\"docClass\">lifecycleContainer</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-query' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.Cloud.Photos'>Modules.Cloud.Photos</span></div><a href='#!/api/Modules.Cloud.Photos-method-query' class='name expandable'>query</a>( <span class='pre'>[parameters], callback</span> )</div><div class='description'><div class='short'>Retrieve a list of photos with sorting and pagination. ...</div><div class='long'><p>Retrieve a list of photos with sorting and pagination.</p>\n\n<p><p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-query\">Photos: Custom Query Photos</a>\nfor the request parameters supported by this method.</p>\n\n\n\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>parameters</span> : <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a> (optional)<div class='sub-desc'><p>Parameters to send in the request.</p>\n\n</div></li><li><span class='pre'>callback</span> : Callback&lt;<a href=\"#!/api/CloudPhotosResponse\" rel=\"CloudPhotosResponse\" class=\"docClass\">CloudPhotosResponse</a>&gt;<div class='sub-desc'><p>Callback function to execute when the method completes.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-remove' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.Cloud.Photos'>Modules.Cloud.Photos</span></div><a href='#!/api/Modules.Cloud.Photos-method-remove' class='name expandable'>remove</a>( <span class='pre'>parameters, callback</span> )</div><div class='description'><div class='short'>Delete a photo. ...</div><div class='long'><p>Delete a photo.</p>\n\n<p><p>Requires user login. </p>\n\n\n\n\n<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-delete\">Photos: Delete a Photo</a>\nfor the request parameters supported by this method.</p>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>parameters</span> : <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>Parameters to send in the request.</p>\n\n</div></li><li><span class='pre'>callback</span> : Callback&lt;<a href=\"#!/api/CloudPhotosResponse\" rel=\"CloudPhotosResponse\" class=\"docClass\">CloudPhotosResponse</a>&gt;<div class='sub-desc'><p>Callback function to execute when the method completes.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-search' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.Cloud.Photos'>Modules.Cloud.Photos</span></div><a href='#!/api/Modules.Cloud.Photos-method-search' class='name expandable'>search</a>( <span class='pre'>parameters, callback</span> )</div><div class='description'><div class='short'>Retrieve a list of photos. ...</div><div class='long'><p>Retrieve a list of photos.</p>\n\n<p><p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-search\">Photos: Search for Photos</a>\nfor the request parameters supported by this method.</p>\n\n\n\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>parameters</span> : <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>Parameters to send in the request.</p>\n\n</div></li><li><span class='pre'>callback</span> : Callback&lt;<a href=\"#!/api/CloudPhotosResponse\" rel=\"CloudPhotosResponse\" class=\"docClass\">CloudPhotosResponse</a>&gt;<div class='sub-desc'><p>Callback function to execute when the method completes.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setBubbleParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-setBubbleParent' class='name expandable'>setBubbleParent</a>( <span class='pre'>bubbleParent</span> )</div><div class='description'><div class='short'>Sets the value of the bubbleParent property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.Proxy-property-bubbleParent\" rel=\"Titanium.Proxy-property-bubbleParent\" class=\"docClass\">bubbleParent</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.0.0</li><li class='platform-iphone'\n        title='iPhone'>3.0.0</li><li class='platform-ipad'\n        title='iPad'>3.0.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>bubbleParent</span> : Boolean<div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-setLifecycleContainer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Titanium.Proxy' rel='Titanium.Proxy' class='defined-in docClass'>Titanium.Proxy</a></div><a href='#!/api/Titanium.Proxy-method-setLifecycleContainer' class='name expandable'>setLifecycleContainer</a>( <span class='pre'>lifecycleContainer</span> )</div><div class='description'><div class='short'>Sets the value of the lifecycleContainer property. ...</div><div class='long'><p>Sets the value of the <a href=\"#!/api/Titanium.Proxy-property-lifecycleContainer\" rel=\"Titanium.Proxy-property-lifecycleContainer\" class=\"docClass\">lifecycleContainer</a> property.</p>\n\n<ul class='platforms'><li class='platform-android'\n        title='Android'>3.6.0</li><li class='platform-windowsphone'\n        title='Window Phone'>4.1.0</li></ul><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>lifecycleContainer</span> : <a href=\"#!/api/Titanium.UI.Window\" rel=\"Titanium.UI.Window\" class=\"docClass\">Titanium.UI.Window</a>/<a href=\"#!/api/Titanium.UI.TabGroup\" rel=\"Titanium.UI.TabGroup\" class=\"docClass\">Titanium.UI.TabGroup</a><div class='sub-desc'><p>New value for the property.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-show' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.Cloud.Photos'>Modules.Cloud.Photos</span></div><a href='#!/api/Modules.Cloud.Photos-method-show' class='name expandable'>show</a>( <span class='pre'>parameters, callback</span> )</div><div class='description'><div class='short'>Retrieve information about a photo. ...</div><div class='long'><p>Retrieve information about a photo.</p>\n\n<p><p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-show\">Photos: Show Photo Info</a>\nfor the request parameters supported by this method.</p>\n\n\n\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>parameters</span> : <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>Parameters to send in the request.</p>\n\n</div></li><li><span class='pre'>callback</span> : Callback&lt;<a href=\"#!/api/CloudPhotosResponse\" rel=\"CloudPhotosResponse\" class=\"docClass\">CloudPhotosResponse</a>&gt;<div class='sub-desc'><p>Callback function to execute when the method completes.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div><div id='method-update' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Modules.Cloud.Photos'>Modules.Cloud.Photos</span></div><a href='#!/api/Modules.Cloud.Photos-method-update' class='name expandable'>update</a>( <span class='pre'>parameters, callback</span> )</div><div class='description'><div class='short'>Update a photo. ...</div><div class='long'><p>Update a photo.</p>\n\n<p><p>Requires user login. </p>\n\n\n\n\n<p>See <a href=\"http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos-method-update\">Photos: Update a Photo</a>\nfor the request parameters supported by this method.</p>\n\n\n\n\n<p>Data is returned in the <code>photos</code> property of the parameter passed to the callback.</p>\n\n</p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>parameters</span> : <a href=\"#!/api/Dictionary\" rel=\"Dictionary\" class=\"docClass\">Dictionary</a><div class='sub-desc'><p>Parameters to send in the request.</p>\n\n</div></li><li><span class='pre'>callback</span> : Callback&lt;<a href=\"#!/api/CloudPhotosResponse\" rel=\"CloudPhotosResponse\" class=\"docClass\">CloudPhotosResponse</a>&gt;<div class='sub-desc'><p>Callback function to execute when the method completes.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span></li></ul></div></div></div></div></div></div></div>"});