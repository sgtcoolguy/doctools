# Getting Started: QuickStart Guide

Appcelerator ArrowDB provides a set of REST APIs for creating, managing, and
accessing different types of data in your cloud datasoucrce, such as
{@link Users}, {@link Places}, and {@link Photos} over HTTP or HTTPS. You can integrate ArrowDB into
your application using the [Titanium](#!/guide/titanium), [iOS](#!/guide/ios),
[Android](#!/guide/android) or [Node.js](#!/guide/nodejs) SDKs, or by calling the
[REST APIs](#!/guide/rest) directly.

To manage your application and its data&mdash;for example, to create or edit {@link Users} or manage
{@link Photos}&mdash;you use [Appcelerator Dashboard](https://platform.appcelerator.com).

This guide explains how to create a standalone ArrowDB datasource and make API calls to the
datasource using the REST APIs.  For intergrating ArrowDB with a specific platform,
see the following SDK guides:

  * [Titanium SDK](#!/guide/titanium)
  * [Android SDK](#!/guide/android)
  * [iOS SDK](#!/guide/ios)
  * [Node.js SDK](#!/guide/nodejs)

## Create an ArrowDB Datasource

You can create either a standalone ArrowDB datasource or create an ArrowDB datasource associated
with a Titanium, Android or iOS application.

### Standalone ArrowDB Datasource

A standalone ArrowDB datasource does not have a specific client application associated with it.
Use a standalone ArrowDB source if you want multiple applications to access the same datasource,
or if your client application is not Titanium, Android or iOS.

 1. Log into [Appcelerator Dashboard](https://platform.appcelerator.com).
 2. Click the Add menu (+) in the top navigation bar.
 3. Select **Create ArrowDB Datasource**.
 4. Enter a name for the datasource.
 5. If you have multiple environments, select the environments to enable for the datasource.
 6. Click **OK**.

 To make calls to ArrowDB, you will need your ArrowDB applications key.  After Dashboard
 creates the datasource, click **Configuration** in the left navigation, then click the **Show** link
 next to **App Key**.  Use the ArrowDB application key to make requests to ArrowDB. Note that you have
 a key for each deployment environment.

{@img addarrowdb.gif}

### ArrowDB with Titanium

Use Appcelerator Studio or the CLI to enable platform services and create an ArrowDB datasource
associated with a Titanium application.  After creating the application, load the `ti.cloud` module
to make requests to ArrowDB.

For directions, see the [Titanium SDK guide](#!/guide/titanium).

### ArrowDB with Android or iOS

Use Dashboard to register an Android application built with Java or iOS application built with
Objective-C or Swift.  The registration process creates a new ArrowDB datasource associated with the
application. Then, use the APS SDKs to integrate ArrowDB services with the application.

For directions, see:

 * [Android SDK](#!/guide/android)
 * [iOS SDK](#!/guide/ios)


## Make Calls to ArrowDB

You can make calls to ArrowDB using the following SDKs and modules, or by making HTTP requests directly to ArrowDB.

* [Titanium Cloud Module](http://docs.appcelerator.com/platform/latest/#!/api/Modules.Cloud)
* [Appcelerator Platform Services API Reference for Android](http://docs.appcelerator.com/aps-sdk-apidoc/latest/android/)
* [Appcelerator Platform Services API Reference for iOS](http://docs.appcelerator.com/aps-sdk-apidoc/latest/ios/)
* [Node.js SDK](#!/guide/nodejs-section-standard-arrowdb-apis)
* [ArrowDB API docs](#!/api)

To make ArrowDB calls from other applications, you need to use the platform's native HTTP client
to make HTTP requests directly.  You will need to pass the ArrowDB application key in the URL as the `key`
parameter with each request.

For example, the following Ruby code uses the `Net::HTTP` library to make an ArrowDB request:

    require 'net/http'
    require 'json'

    base_url = 'https://api.cloud.appcelerator.com/v1/'
    key_param = 'key=<APP_KEY>'
    url = URI(base_url + 'users/create.json?' + key_param)
    req = Net::HTTP::Post.new(url)
    req.set_form_data(:username => 'user1', :password => 'pass1', :password_confirmation => 'pass1'))
    res = Net::HTTP.start(url.host, url.port, :use_ssl => true) do |http|
      http.request(req)
    end
    response = JSON.parse(res.body)
    puts "You are now logged in as " + response["response"]["users"][0]["username"]

For requests that require a user to be logged in, you will need retrieve the `session_id` from
the meta header of the response from either the [users/login.json](#!/api/Users-method-login)
or [users/create.json](#!/api/Users-method-create) method, then
pass the `session_id` in the URL as the `_session_id` parameter with the request.

    session_id_param = '_session_id=' + response["meta"]["session_id"]
    url = URI(base_url + 'posts/create.json?' + key_param + '&' + session_id_param)
    req = Net::HTTP::Post.new(url)
    req.set_form_data(:content => 'Calling ArrowDB from Ruby')
    res = Net::HTTP.start(url.host, url.port, :use_ssl => true) do |http|
      http.request(req)
    end
    puts res.body

The SDKs and modules provided by Appcelerator abstract the HTTP request and will automatically
handle passing the application key and session ID between the client application and ArrowDB datasource.
For example, the following is an equivalent call using the Titanium Cloud module:

    var Cloud = require('ti.cloud');
    Cloud.Users.create({
        username: 'user1',
        password: 'pass1',
        password_confirmation: 'pass1'
     }, function (e) {
        if (e.success) {
            alert('You are now logged in as ' + e.users[0].username);
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
    Cloud.Posts.create({
        content: 'Calling ArrowDB from Titanium'
    }, function (e) {
        if (e.success) {
            alert('Post succeeded!');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });

## Next Steps

Review the [REST Guide](#!/guide/rest) if you are making HTTP requests directly to ArrowDB,
and the [ArrowDB API reference](#!/api), which contains Titanium, REST, Android, iOS and Node.js examples.
To setup a specfic type of client application, see the following SDK guides:

  * [Titanium SDK](#!/guide/titanium)
  * [Android SDK](#!/guide/android)
  * [iOS SDK](#!/guide/ios)
  * [Node.js SDK](#!/guide/nodejs)
