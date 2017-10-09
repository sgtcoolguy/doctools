Ext.data.JsonP['Admin_Access']({"guide":"<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n        \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n    <title>Admin Access</title>\n\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n    <meta content=\"Scroll EclipseHelp Exporter\" name=\"generator\">\n\n    <link type=\"text/css\" rel=\"stylesheet\">\n    <link type=\"text/css\" rel=\"stylesheet\">\n    <link type=\"text/css\" rel=\"stylesheet\" media=\"print\">\n</link></link></link></meta></meta></head>\n<body>\n    <div class=\"container\">\n\t\t<div id=\"banner\" class=\"confbox admonition admonition-note aui-message warning shadowed information-macro\">\n\t\t\t<p>You can now find Appcelerator documentation at <a href=\"https://docs.axway.com/\" target=\"_blank\">https://docs.axway.com/</a>. This site will be taken down in the near future.</p>\n\t\t</div>\n        <div class=\"header\"/>\n\n        <div id=\"src-49153856\" class=\"content\">\n                        <h1>Admin Access</h1>\n    <p>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Admin_Access-section-src-49153856_AdminAccess-Createanadminuser\">Create an admin user</a>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Admin_Access-section-src-49153856_AdminAccess-Createanewadminuser\">Create a new admin user</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Admin_Access-section-src-49153856_AdminAccess-Addadminaccesstoanexistinguser\">Add admin access to an existing user</a>    </p>\n</li></ul></li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Admin_Access-section-src-49153856_AdminAccess-PerformMobileBackendServicesAPIcallsonbehalfofanotheruser\">Perform Mobile Backend Services API calls on behalf of another user</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Admin_Access-section-src-49153856_AdminAccess-Batchdelete\">Batch delete</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Admin_Access-section-src-49153856_AdminAccess-Admindropcustomcollection\">Admin drop custom collection</a>    </p>\n</li></ul>    <p>Mobile Backend Services (MBS) admin access allows application admin users to execute some batch operations and make MBS API calls on behalf of another user.    </p>\n    <div class=\"section section-2 \" id=\"src-49153856_AdminAccess-Createanadminuser\">\n        <h2 class=\"heading \"><span>Create an admin user</span></h2>\n    <p>Before creating an admin user, log in to the Dashboard and select your application.    </p>\n<ol class=\" \"><li class=\" \">    <p>Log in to <a class=\"external-link external-link\" href=\"https://platform.appcelerator.com/\" target=\"_blank\">https://platform.appcelerator.com</a>.    </p>\n</li><li class=\" \">    <p>Select an application from the <strong class=\" \">Apps</strong> drop-down list.    </p>\n</li></ol>    <p>Then, either create a new admin user or add admin access to an existing user.    </p>\n    <div class=\"section section-3 \" id=\"src-49153856_AdminAccess-Createanewadminuser\">\n        <h3 class=\"heading \"><span>Create a new admin user</span></h3>\n<ol class=\" \"><li class=\" \">    <p>In the left navigation bar, click <strong class=\" \">Manage Data</strong>.    </p>\n</li><li class=\" \">    <p>In the main pane, click <strong class=\" \">Users</strong>.    </p>\n</li><li class=\" \">    <p>Click <strong class=\" \">+ Create User</strong>. A dialog appears.    </p>\n</li><li class=\" \">    <p>Under the <strong class=\" \">Admin</strong> section, click the <strong class=\" \">Yes</strong> radio button.    </p>\n</li><li class=\" \">    <p>At a minimum, enter a username, password, and confirm the password.    </p>\n</li><li class=\" \">    <p>Click <strong class=\" \">Save Changes</strong>.<br><a class=\"attachment-link \" href=\"./attachments_51642519_1_admin_appc1_new.png\">    <img src=\"images/download/attachments/49153856/admin_appc1_new.png\" alt=\"images/download/attachments/49153856/admin_appc1_new.png\" class=\"confluence-embedded-image confluence-content-image-border\" width=\"500\" height=\"587\">\n</img></a>    </br></p>\n</li></ol>    <p>Mobile Backend Services creates a new user with admin access.    </p>\n    </div>\n    <div class=\"section section-3 \" id=\"src-49153856_AdminAccess-Addadminaccesstoanexistinguser\">\n        <h3 class=\"heading \"><span>Add admin access to an existing user</span></h3>\n<ol class=\" \"><li class=\" \">    <p>In the left navigation bar, click <strong class=\" \">Manage Data</strong>.    </p>\n</li><li class=\" \">    <p>In the main pane, click <strong class=\" \">Users</strong>.    </p>\n</li><li class=\" \">    <p>Locate the user you want to give admin access to and click the user name to edit the user.    </p>\n</li><li class=\" \">    <p>Locate the <strong class=\" \">Admin</strong> section and click the <strong class=\" \">Yes</strong> radio button.    </p>\n</li><li class=\" \">    <p>Scroll down and click <strong class=\" \">Save Changes</strong>.    </p>\n</li></ol>    <p>This user now has admin access. To disable access, follow the same steps except click the <strong class=\" \">No</strong> radio button.    </p>\n    </div>\n    </div>\n    <div class=\"section section-2 \" id=\"src-49153856_AdminAccess-PerformMobileBackendServicesAPIcallsonbehalfofanotheruser\">\n        <h2 class=\"heading \"><span>Perform Mobile Backend Services API calls on behalf of another user</span></h2>\n    <p>An admin user can perform MBS API calls on behalf of another user. For example, when you specify the <tt class=\" \">su_id</tt> parameter to an ID of another user as part of the create method, the admin user creates an object on behalf of that user. The <tt class=\" \">user</tt> parameter for the object will be reported as the other user, not the admin user.    </p>\n    <p>This admin operation is supported by any create, update and delete method, as well as the following methods:    </p>\n<ul class=\" \"><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/KeyValues-method-append\">KeyValues.append</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/KeyValues-method-incrby\">KeyValues.incrby</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/KeyValues-method-set\">KeyValues.set</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/PushNotifications-method-subscribe\">PushNotifications.subscribe</a>    </p>\n</li></ul>    <p>For example, the following curl command creates a new status for the specified user:    </p>\n    <div class=\"tablewrap\">\n        <table>\n        <thead class=\" \"/><tfoot class=\" \"/><tbody class=\" \">    <tr>\n            <td rowspan=\"1\" colspan=\"1\">\n        <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\">\n<div class=\"line\"><code class=\"plain\">curl -b cookies.txt -c cookies.txt -F </code><code class=\"string\">&quot;su_id=520289441e1ef70b1a0236d2&quot;</code><code class=\"plain\"> -F </code><code class=\"string\">&quot;message=Hola, Mundo\\!&quot;</code><code class=\"plain\"> </code></div>\n<div class=\"line\"><code class=\"string\">&quot;https://api.cloud.appcelerator.com/v1/statuses/create.json?key=APP_API_KEY&quot;</code></div>\n<div class=\"line\"><code class=\"plain\">{</code></div>\n<div class=\"line\"><code class=\"plain\">  </code><code class=\"string\">&quot;meta&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;code&quot;</code><code class=\"plain\">: 200,</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;status&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;ok&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;method_name&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;createStatus&quot;</code></div>\n<div class=\"line\"><code class=\"plain\">  },</code></div>\n<div class=\"line\"><code class=\"plain\">  </code><code class=\"string\">&quot;response&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;statuses&quot;</code><code class=\"plain\">: [</code></div>\n<div class=\"line\"><code class=\"plain\">      {</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;id&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;5202c1ed87173a0afc024524&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;message&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;Hola, Mundo\\\\!&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;created_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T21:53:49+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;updated_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T21:53:49+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;user&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;id&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;520289441e1ef70b1a0236d2&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;created_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T17:52:04+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;updated_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T17:52:04+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;external_accounts&quot;</code><code class=\"plain\">: [</code></div>\n<div class=\"line\">&#xA0;</div>\n<div class=\"line\"><code class=\"plain\">          ],</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;confirmed_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T17:52:04+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;username&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;not_an_admin&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;admin&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;false&quot;</code></div>\n<div class=\"line\"><code class=\"plain\">        }</code></div>\n<div class=\"line\"><code class=\"plain\">      }</code></div>\n<div class=\"line\"><code class=\"plain\">    ]</code></div>\n<div class=\"line\"><code class=\"plain\">  }</code></div>\n<div class=\"line\"><code class=\"plain\">}</code></div>\n</div>\n    </div>\n            </td>\n        </tr>\n</tbody>        </table>\n            </div>\n    <p>To verify that the other user created this status and not the admin user, run the following curl command and compare the user IDs:    </p>\n    <div class=\"tablewrap\">\n        <table>\n        <thead class=\" \"/><tfoot class=\" \"/><tbody class=\" \">    <tr>\n            <td rowspan=\"1\" colspan=\"1\">\n        <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\">\n<div class=\"line\"><code class=\"plain\">curl -b cookies.txt -c cookies.txt </code></div>\n<div class=\"line\"><code class=\"string\">&quot;https://api.cloud.appcelerator.com/v1/statuses/show.json?key=APP_API_KEY&amp;status_id=5202c1ed87173a0afc024524&quot;</code></div>\n<div class=\"line\"><code class=\"plain\">{</code></div>\n<div class=\"line\"><code class=\"plain\">  </code><code class=\"string\">&quot;meta&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;code&quot;</code><code class=\"plain\">: 200,</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;status&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;ok&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;method_name&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;showStatus&quot;</code></div>\n<div class=\"line\"><code class=\"plain\">  },</code></div>\n<div class=\"line\"><code class=\"plain\">  </code><code class=\"string\">&quot;response&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;statuses&quot;</code><code class=\"plain\">: [</code></div>\n<div class=\"line\"><code class=\"plain\">      {</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;id&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;5202c1ed87173a0afc024524&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;message&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;Hola, Mundo\\\\!&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;created_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T21:53:49+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;updated_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T21:53:49+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">        </code><code class=\"string\">&quot;user&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;id&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;520289441e1ef70b1a0236d2&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;created_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T17:52:04+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;updated_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T17:52:04+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;external_accounts&quot;</code><code class=\"plain\">: [</code></div>\n<div class=\"line\">&#xA0;</div>\n<div class=\"line\"><code class=\"plain\">          ],</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;confirmed_at&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;2013-08-07T17:52:04+0000&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;username&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;not_an_admin&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;admin&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;false&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">          </code><code class=\"string\">&quot;stats&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">            </code><code class=\"string\">&quot;photos&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">              </code><code class=\"string\">&quot;total_count&quot;</code><code class=\"plain\">: 0</code></div>\n<div class=\"line\"><code class=\"plain\">            },</code></div>\n<div class=\"line\"><code class=\"plain\">            </code><code class=\"string\">&quot;storage&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">              </code><code class=\"string\">&quot;used&quot;</code><code class=\"plain\">: 0</code></div>\n<div class=\"line\"><code class=\"plain\">            }</code></div>\n<div class=\"line\"><code class=\"plain\">          }</code></div>\n<div class=\"line\"><code class=\"plain\">        }</code></div>\n<div class=\"line\"><code class=\"plain\">      }</code></div>\n<div class=\"line\"><code class=\"plain\">    ]</code></div>\n<div class=\"line\"><code class=\"plain\">  }</code></div>\n<div class=\"line\"><code class=\"plain\">}</code></div>\n</div>\n    </div>\n            </td>\n        </tr>\n</tbody>        </table>\n            </div>\n    </div>\n    <div class=\"section section-2 \" id=\"src-49153856_AdminAccess-Batchdelete\">\n        <h2 class=\"heading \"><span>Batch delete</span></h2>\n    <p>Mobile Backend Services provides an API endpoint named <tt class=\" \">batch_delete</tt> that allows application admins to delete multiple MBS objects in one operation. The method takes a <tt class=\" \">where</tt> parameter that constrains the selection of objects to delete. If <tt class=\" \">where</tt> is omitted, all objects are deleted. For performance reasons, the number of objects that can be deleted in a single batch delete operation is limited to 100,000. Objects are deleted asynchronously in a separate process, not immediately upon method invocation.    </p>\n    <p>Certain MBS objects can have dependencies on other objects. For example, when you create a <tt class=\" \">Checkins</tt> object you can specify a <a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Places\">Places</a> or <a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Events\">Events</a> object to associate with it. In this case, the Checkins object is a dependency of the Places or Events object. If you delete the Places or Events object, the dependent Checkins object is <strong class=\" \">not</strong> deleted.    </p>\n    <p>For example, the following deletes all Users objects whose <tt class=\" \">favorite_color</tt> custom field is &apos;blue&apos;.    </p>\n    <div class=\"tablewrap\">\n        <table>\n        <thead class=\" \"/><tfoot class=\" \"/><tbody class=\" \">    <tr>\n            <td rowspan=\"1\" colspan=\"1\">\n        <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\">\n<div class=\"line\"><code class=\"plain\"> $curl -b cookies.txt -c cookies.txt -X DELETE -F </code><code class=\"string\">&quot;where={\\&quot;favorite_color\\&quot;:\\&quot;blue\\&quot;}&quot;</code><code class=\"plain\"> </code></div>\n<div class=\"line\"><code class=\"plain\"> https:</code><code class=\"comments\">//api.cloud.appcelerator.com/v1/users/batch_delete.json?key&lt;API_KEY&gt;&amp;pretty_json=true     </code></div>\n<div class=\"line\"><code class=\"plain\"> {</code></div>\n<div class=\"line\"><code class=\"plain\">  </code><code class=\"string\">&quot;meta&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;status&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;ok&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;code&quot;</code><code class=\"plain\">: 200,</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;method_name&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;adminBatchDelete&quot;</code></div>\n<div class=\"line\"><code class=\"plain\">  }</code></div>\n<div class=\"line\"><code class=\"plain\">}</code></div>\n</div>\n    </div>\n            </td>\n        </tr>\n</tbody>        </table>\n            </div>\n    <p>Note that the method returns an HTTP 200 code (success) even if the query matched no objects.    </p>\n    <p>The following MBS objects support batch delete operations:    </p>\n<ul class=\" \"><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Checkins\">Checkins</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/PhotoCollections\">PhotoCollections</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Events\">Events</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Files\">Files</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/CustomObjects\">CustomObjects</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Photos\">Photos</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Places\">Places</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Posts\">Posts</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Reviews\">Reviews</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Statuses\">Statuses</a>    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"/arrowdb/latest/#!/api/Users\">Users</a>    </p>\n</li></ul>    </div>\n    <div class=\"section section-2 \" id=\"src-49153856_AdminAccess-Admindropcustomcollection\">\n        <h2 class=\"heading \"><span>Admin drop custom collection</span></h2>\n    <p>An application admin user can also drop a Custom Object collection using <tt class=\" \">admin_drop_collection</tt> method. When calling the <tt class=\" \">admin_drop_collection</tt> method, the admin user must specify a class name to indicate which custom collection to drop.    </p>\n    <p>For example, the following drops the <tt class=\" \">car</tt> collection:    </p>\n    <div class=\"tablewrap\">\n        <table>\n        <thead class=\" \"/><tfoot class=\" \"/><tbody class=\" \">    <tr>\n            <td rowspan=\"1\" colspan=\"1\">\n        <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\">\n<div class=\"line\"><code class=\"plain\">$ curl -b c.txt -c c.txt -X DELETE </code></div>\n<div class=\"line\"><code class=\"string\">&quot;https://api.cloud.appcelerator.com/v1/objects/car/admin_drop_collection.json?key=hPkMYgNozXR8xegNvWjqBVTcWK8P5fIX&quot;</code></div>\n<div class=\"line\"><code class=\"plain\">{</code></div>\n<div class=\"line\"><code class=\"plain\">  </code><code class=\"string\">&quot;meta&quot;</code><code class=\"plain\">: {</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;status&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;ok&quot;</code><code class=\"plain\">,</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;code&quot;</code><code class=\"plain\">: 200,</code></div>\n<div class=\"line\"><code class=\"plain\">    </code><code class=\"string\">&quot;method_name&quot;</code><code class=\"plain\">: </code><code class=\"string\">&quot;dropCollection&quot;</code></div>\n<div class=\"line\"><code class=\"plain\">  }</code></div>\n<div class=\"line\"><code class=\"plain\">}</code></div>\n</div>\n    </div>\n            </td>\n        </tr>\n</tbody>        </table>\n            </div>\n    <p>Only Custom Objects support the drop custom collection method.    </p>\n    </div>\n        </div><a id=\"editButton\" href=\"https://wiki.appcelerator.org/pages/editpage.action?pageId=49153856\"><span>Edit</span></a>\n    \n        \n    </div>\n</body>\n</html>\n","title":"Admin Access"});