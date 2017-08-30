# ArrowDB SDK for Node.js

The ArrowDB Node SDK lets you easily integrate ArrowDB services with your Node.js application.
The SDK provides two APIs:

* An API for each class and method.
* A set of generic REST APIs.

Your Node application can optionally handle session data itself. For more information see,
[User Login Session Management](#!/guide/nodejs-section-user-login-session-management).


## Installation

To use the module within your Node application, add the `arrowdb` module to the `dependencies`
section of your `package.json` file, as follows:

    "dependencies": {
      "arrowdb": ">=1.0.6"
    }

You can then run `npm install` from your application folder to install the module and its dependencies.

You can also install the module directly using `npm`:

    [sudo] npm install arrowdb

As of this writing, the latest version is **1.0.6**.

## API Usage

### Setup

To use the ArrowDB APIs, load the `arrowdb` module, then create an instance with the `new` constructor,
passing it your ArrowDB application key. Invoke API calls on the instance.

    var ArrowDB = require('arrowdb'),
        arrowDBApp = new ArrowDB('<App Key>');
    arrowDBApp.usersLogin(params, callback);

This only needs to be done once, typically in the main `app.js` script file.

You may optionally pass the constructor an object as the second argument.
You may set the following properties on the object:

* `apiEntryPoint`: Base URL of the ArrowDB server.  By default, it is `https://api.cloud.appcelerator.com`.
* `autoSessionManagement`: Set to `false` to manually manage the session cookie or session ID.
  By default, it is `true` and the SDK automatically handles the sessions.
* `prettyJson`: Set to `true` to enable the `pretty_json` parameter for all API calls.
  By default, the value is undefined and behaves as false.
* `responseJsonDepth`: Sets the `response_json_depth` parameter for all API calls. By default, the
  value is `1`. You may the set value from 1 to 8.

For example:

    var ArrowDB = require('arrowdb'),
        arrowDBApp = new ArrowDB('<App Key>', {
            apiEntryPoint: 'https://api.cloud.appcelerator.com'
            autoSessionManagement: false,
            prettyJson: true,
            responseJsonDepth: 3
        });

### Standard ArrowDB APIs

The standard ArrowDB APIs provide a standardized API name for each REST object and method.
Invoke the method on the ArrowDB SDK instance.

The API name of most of the standard ArrowDB Node API calls is the concatenation of the
REST class name and method in lower camel case notation.  For example, the Users object login
method will be `usersLogin`.  Check the Node example of the method to see its exact name.

Pass each method an optional parameters object and a required callback.

Set any method parameters on the parameters object. The parameters object may be omitted.
For middleware calls, such as Express, you may optionally pass the request and response objects to the
parameters object using the `req` and `res` keys, respectively.

The callback is passed an Error object (or null if successful) and the results of the method call.
The results object contains the following properties:

* `body`: HTTP response body as a JSON object.
* `cookieString`: Session cookie string if the API returns a session ID else it will be an empty string.
* `reason`: HTTP error message.
* `response`: [Node.js http.ServerResponse object](https://nodejs.org/docs/latest/api/http.html#http_class_http_serverresponse).
* `statusCode`: HTTP status code.

To access the results from the returned object, use the object's `body` property
to access the HTTP response body. The body object will contain a `meta` object,
which contains the metadata of the response, and a `response` object, which contains the
results of the method call.

Below is a more complete example that uses the standard ArrowDB APIs to
login a user. It defines a custom `login()` function that takes the `username` and `password`
properties from the HTTP request body, and in turn, passes those values as input to the
[`Users.login()`](http://docs.appcelerator.com/arrowdb/latest/#!/api/Users-method-login) method. On
successful login, the user's information is displayed in the console or, in case of an error, the
error response is displayed.

    var ArrowDB = require('arrowdb'),
        arrowDBApp = new ArrowDB('<App Key>');
    function login(req, res) {
        var data = {
            login: req.body.username,
            password: req.body.password,
            // the req and res parameters are optional
            req: req,
            res: res
        };
        arrowDBApp.usersLogin(data, function(err, result) {
            if (err) {
                console.error("Login error:" + (err.message || result.reason));
            } else {
                console.log("Login successful!");
                console.log("UserInfo: " + JSON.stringify(result.body.response.users[0]));
            }
        });
    }


### Generic ArrowDB APIs

The ArrowDB Node SDK provides the following four methods to make generic calls to ArrowDB:

* <code><em>sdkObject</em>.post(<em>path</em>, <em>parameters</em>, <em>callback</em>)</code>
* <code><em>sdkObject</em>.put(<em>path</em>, <em>parameters</em>, <em>callback</em>)</code>
* <code><em>sdkObject</em>.get(<em>path</em>, <em>parameters</em>, <em>callback</em>)</code>
* <code><em>sdkObject</em>.delete(<em>path</em>, <em>parameters</em>, <em>callback</em>)</code>

Each method is passed the following parameters:

* `path` -- The path of the REST resource to call relative to the base URL (by default, it is `https://api.cloud.appcelerator.com`).
* `parameters` -- The parameters to pass to the method. May be omitted.
* `callback` -- The function to call when the request completes.
The callback is passed an Error object (or null if successful) and the results of the method call.

Below is a complete REST example that is functionally equivalent to the previous version
that used the standard ArrowDB APIs.

    var ArrowDB = require('arrowdb'),
        arrowDBApp = new ArrowDB('<App Key>');
    function login(req, res) {
        var data = {
            login: req.body.username,
            password: req.body.password
        };
        arrowDBApp.post('/v1/users/login.json', data, function(err, result) {
            if (err) {
                console.error("Login error:" + (err.message || result.reason));
            } else {
                console.log("Login successful!");
                console.log("UserInfo: " + JSON.stringify(result.body.response.users[0]));
            }
        });
    }

## User Login Session Management

Most of the ArrowDB APIs require a user to be logged in, so it is important to have a
way to manage user sessions in your Node.js application. The ArrowDB Node SDK provides
two ways of managing ArrowDB login sessions in a Node.js application:

  * **Cookie-based**. Cookies are used to store session information, and passed between the client and server.
  * **Session ID**. Must pass a session ID with every API call.

These methods are described in the following sections.

### Cookie-Based Session Management

Cookies are frequently used by ArrowDB applications to store session information
and are passed between the client and server.

The ArrowDB Node SDK retrieves the session ID from the request's cookies. If a
`_session_id` cookie is present, it uses that session ID to make the ArrowDB API
call. If not, it performs a regular API call without session information.

If a session ID is returned in the API response (for example,
`users/login.json`), the session information is added into the response
object. Specifically, it adds a `Set-Cookie` header to pass back to the client.

To manually manage cookie sessions, disable automatic session management by passing an object as the
second parameter to the constructor with the `autoSessionManagement` property set to `false`.
ArrowDB will no longer automatically retrieve and set the session cookie.  You must manually set
the ArrowDB instance's `sessionCookieString` property once you retrieve a cookie string.
The cookie string will be available as the `cookieString` property in the callback's result object
if the API response returns a session ID.

The example below retrieves and sets the cookie string:

    var ArrowDB = require('arrowdb'),
        arrowDBApp = new ArrowDB('<App Key>', {autoSessionManagement: false});
    function login(req, res) {
        var data = {
            login: req.body.username,
            password: req.body.password
        };
        arrowDBApp.post('/v1/users/login.json', data, function(err, result){
            if (err) {
                console.error("Login error:" + (err.message || result.reason));
            } else {
                console.log("Login successful!");
                arrowDBApp.sessionCookieString = result.cookieString;
            }
        });
    }

**Important**

*   The ArrowDB Node SDK sets the cookie header in the response object, which must be done _before_
    sending any response data (for example, by calling the response object's `send` method). If you
    send any response data _before_ the API callback function is invoked, the ArrowDB Node SDK will
    throw an exception when it tries to set the cookie headers, with a message like, "Can't render
    headers after they are sent to the client."

*   Session information is stored in a cookie named `_session_id`. You can also manually set this
    session ID cookie on the client side. For example, if you are calling your Arrow Cloud service from
    a Titanium application that uses ArrowDB directly, you can retrieve the active session ID from the
    [Titanium.Cloud.sessionId](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Cloud-
    property-sessionId) property, and adding a `Set-Cookie` header when making a request to the
    Arrow Cloud service.

### Manual Session Management

An ArrowDB user login session is identified by a `session_id` parameter in the
request or response data. When logging in to a user account or creating a new
user, the `session_id` is returned in the response data of the API calls. It
can be retrieved from the response data by using the `body.meta.session_id` property of the callback's
result object. For example:

    function loginUser(req, res) {
        arrowDBApp.usersLogin({
            login: 'test',
            password: 'test'
        }, function(err, result) {
            console.log('Login session is: ' + result.body.meta.session_id);
        });
    }

To reuse this session for making other API calls, pass it in as part of the
request parameters (`session_id: _stored_session_id_`). This gives you full control
of the sessions. You can store the session in any ways and reuse them anytime
(as long as the session is not expired on the ArrowDB server) later for making API
calls. For example:

    function createPlace(req, res) {
        arrowDBApp.placesCreate({
            name: 'test',
            city: 'city_name',
            session_id: '<stored session_id>'
        }, function(err, result) {
            console.log('New place created!');
        });
    }
