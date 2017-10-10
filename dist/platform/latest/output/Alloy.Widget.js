Ext.data.JsonP['Alloy_Widget']({"tagname":"class","name":"Alloy.Widget","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"editurl":"https://github.com/appcelerator/alloy/edit/master/docs/apidoc/widgets.js"},"private":null,"id":"class-Alloy.Widget","members":{"cfg":[],"property":[],"method":[{"name":"createCollection","tagname":"method","owner":"Alloy.Widget","meta":{"since":["1.1.0"]},"id":"method-createCollection"},{"name":"createController","tagname":"method","owner":"Alloy.Widget","meta":{"since":["1.1.0"]},"id":"method-createController"},{"name":"createModel","tagname":"method","owner":"Alloy.Widget","meta":{"since":["1.1.0"]},"id":"method-createModel"},{"name":"createWidget","tagname":"method","owner":"Alloy.Widget","meta":{"since":["1.1.0"]},"id":"method-createWidget"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":1,"files":[{"filename":"widgets.js","href":"widgets.html#Alloy-Widget"},{"filename":"alloy.js","href":"alloy2.html#Alloy-Widget"}],"html_meta":{"editurl":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><div class='sidebar'></div><div class='hierarchy'></div><div class='doc-contents'><p>Widgets are self-contained components that can be easily dropped into an Alloy project.\nThey were conceived as a way to reuse code in multiple projects or to be used multiple\ntimes in the same project.</p>\n\n<p>Note that to use the methods list below, the correct namespace is <code>Widget.create*</code> not\n<code>Alloy.Widget.create*</code>.</p>\n\n<p>For more information on widgets, see <a href=\"http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Widgets\">Alloy Widgets</a>.</p>\n\n<h4>Creating a Widget</h4>\n\n<p>Widgets are essentially miniature Alloy projects that contain their own models, views, controllers\nand assets.  They are laid out the same way as an Alloy project.</p>\n\n<p>Use <code>Widget.createController()</code>, <code>Widget.createWidget()</code>,  <code>Widget.createModel()</code> and\n<code>Widget.createCollection()</code> rather than the <code>Alloy.create*</code> methods to create\ncomponents relative to the widget context rather than the Alloy project.</p>\n\n<h4>Using a Widget</h4>\n\n<p>To import a widget in to a project:</p>\n\n<ol>\n<li>Copy the widget to the <code>app/widgets</code> folder.  The widget must be contained within its own folder.</li>\n<li>Update the <code>dependencies</code> object in the <code>config.json</code> file by adding a key/value pair with the name of\nthe widget as the key and the version number as the value.</li>\n<li><p>Add the widget to a view or create an instance of the widget in a controller:</p>\n\n<ul>\n<li>To add a widget to a view, add the <Widget> tag in the XML markup and\nset the <code>src</code> attribute to the folder name of the widget.</Widget></li>\n<li>To create an instance of a widget in a controller, use the <a href=\"#!/api/Alloy-method-createController\" rel=\"Alloy-method-createController\" class=\"docClass\">Alloy.createController</a> method.</li>\n</ul>\n</li>\n</ol>\n\n\n<p>You can optionally add the <code>id</code> and <code>name</code> attributes to the <code>Widget</code> element:</p>\n\n<ul>\n<li>The <code>id</code> attribute allows you to reference the widget in the controller code.  You can use this\nreference to call methods exported by the widget.</li>\n<li>The <code>name</code> attribute allows you to import a specific view-controller in the widget rather than the\ndefault one (<code>widget.xml</code>/<code>widget.js</code>).  Specify the name of the view-controller minus the extension.</li>\n</ul>\n\n\n<p>For example, to import a widget called <code>mywidget</code> in to a project, copy <code>mywidget</code> to the\n<code>app/widgets</code> folder, where its assets, controllers, views, etc. are contained in the\n<code>app/widgets/mywidget</code> folder.</p>\n\n<pre><code>app\n├── config.json\n├── controllers\n│   └── index.js\n├── views\n│   └── index.xml\n└── widgets\n    └── mywidget\n        ├── controllers\n        │   ├── foo.js\n        │   └── widget.js\n        ├── views\n        │   ├── foo.xml\n        │   └── widget.xml\n        └── widget.json\n</code></pre>\n\n<p>Next, add it as a dependency in your <code>config.json</code> file:</p>\n\n<pre><code>...\n\"dependencies\":{\n    \"mywidget\":\"1.0\"\n}\n</code></pre>\n\n<p>Finally, either add the widget in the XML markup of the view or create an instance of the widget in the controller.</p>\n\n<p>To add the widget in the view, use the <code>Widget</code> tag, specifying the <code>src</code> attribute as the name of\nthe widget:</p>\n\n<pre><code>&lt;Alloy&gt;\n    &lt;Window id=\"win\"&gt;\n        &lt;Widget id=\"myWidget\" src=\"mywidget\" /&gt;\n    &lt;/Window&gt;\n&lt;/Alloy&gt;\n</code></pre>\n\n<p>Since the <code>id</code> attribute is defined, the widget can be referenced in the controller using\n<code>$.myWidget</code>.</p>\n\n<p>To add the widget in the controller, use the <code><a href=\"#!/api/Alloy-method-createWidget\" rel=\"Alloy-method-createWidget\" class=\"docClass\">Alloy.createWidget</a></code> method. The first required parameter is\nthe name of the widget. The second optional parameter can specify the view component to\ninstantiate and the last optional parameter can specify the arguments to instantiate the widget.\nFor example, the following controller code is equivalent to the previous view markup example.</p>\n\n<pre><code>var myWidget = <a href=\"#!/api/Alloy-method-createWidget\" rel=\"Alloy-method-createWidget\" class=\"docClass\">Alloy.createWidget</a>(\"mywidget\");\nwin.add(myWidget.getView());\n</code></pre>\n\n<p>A widget can also be added to other widgets.  Follow the same procedure as above except the widget\nconfiguration file is called <code>widget.json</code> instead of <code>config.json</code>.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-createCollection' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Alloy.Widget'>Alloy.Widget</span></div><a href='#!/api/Alloy.Widget-method-createCollection' class='name expandable'>createCollection</a>( <span class='pre'>name, [args]</span> ) : Backbone.Collection</div><div class='description'><div class='short'>Factory method for instantiating a Backbone collection of model objects. ...</div><div class='long'><p>Factory method for instantiating a Backbone collection of model objects. Creates and returns a\ncollection for holding the named type of model objects.</p>\n\n<p>See <a href=\"http://docs.appcelerator.com/backbone/0.9.2/#Collection\">Backbone.Collection</a> in the Backbone.js\ndocumentation for  information on the methods and  properties provided by the\nCollection object.</p>\n<h3>Since 1.1.0</h3><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>Name of model to hold in this collection.</p>\n\n</div></li><li><span class='pre'>args</span> : Object (optional)<div class='sub-desc'><p>Arguments to pass to the collection.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Backbone.Collection</span><div class='sub-desc'><p>Backbone collection object.</p>\n\n</div></li></ul></div></div></div><div id='method-createController' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Alloy.Widget'>Alloy.Widget</span></div><a href='#!/api/Alloy.Widget-method-createController' class='name expandable'>createController</a>( <span class='pre'>name, [args]</span> ) : <a href=\"#!/api/Alloy.Controller\" rel=\"Alloy.Controller\" class=\"docClass\">Alloy.Controller</a></div><div class='description'><div class='short'>Factory method for instantiating a controller. ...</div><div class='long'><p>Factory method for instantiating a controller. Creates and returns an instance of the\nnamed controller.</p>\n<h3>Since 1.1.0</h3><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>Name of controller to instantiate.</p>\n\n</div></li><li><span class='pre'>args</span> : Object (optional)<div class='sub-desc'><p>Arguments to pass to the controller.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Alloy.Controller\" rel=\"Alloy.Controller\" class=\"docClass\">Alloy.Controller</a></span><div class='sub-desc'><p>Alloy controller object.</p>\n\n</div></li></ul></div></div></div><div id='method-createModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Alloy.Widget'>Alloy.Widget</span></div><a href='#!/api/Alloy.Widget-method-createModel' class='name expandable'>createModel</a>( <span class='pre'>name, [args]</span> ) : Backbone.Model</div><div class='description'><div class='short'>Factory method for instantiating a Backbone Model object. ...</div><div class='long'><p>Factory method for instantiating a Backbone Model object. Creates and returns an instance of the\nnamed model.</p>\n\n<p>See <a href=\"http://docs.appcelerator.com/backbone/0.9.2/#Model\">Backbone.Model</a> in the Backbone.js documentation for\ninformation on the methods and properties provided by the Model object.</p>\n<h3>Since 1.1.0</h3><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>Name of model to instantiate.</p>\n\n</div></li><li><span class='pre'>args</span> : Object (optional)<div class='sub-desc'><p>Arguments to pass to the model.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Backbone.Model</span><div class='sub-desc'><p>Backbone model object.</p>\n\n</div></li></ul></div></div></div><div id='method-createWidget' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Alloy.Widget'>Alloy.Widget</span></div><a href='#!/api/Alloy.Widget-method-createWidget' class='name expandable'>createWidget</a>( <span class='pre'>id, [name], [args]</span> ) : <a href=\"#!/api/Alloy.Controller\" rel=\"Alloy.Controller\" class=\"docClass\">Alloy.Controller</a></div><div class='description'><div class='short'>Factory method for instantiating a widget controller. ...</div><div class='long'><p>Factory method for instantiating a widget controller. Creates and returns an instance of the\nnamed widget.</p>\n<h3>Since 1.1.0</h3><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Id of widget to instantiate.</p>\n\n</div></li><li><span class='pre'>name</span> : String (optional)<div class='sub-desc'><p>Name of the view within the widget to instantiate ('widget' by default)</p>\n\nDefault: \"widget\"</div></li><li><span class='pre'>args</span> : Object (optional)<div class='sub-desc'><p>Arguments to pass to the widget.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Alloy.Controller\" rel=\"Alloy.Controller\" class=\"docClass\">Alloy.Controller</a></span><div class='sub-desc'><p>Alloy widget controller object.</p>\n\n</div></li></ul></div></div></div></div></div></div></div>"});