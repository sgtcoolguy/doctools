# Titanium SDK and ArrowDB

The ArrowDB APIs are supported in Titanium using the `ti.cloud`
module, an optional module which is packaged with the Titanium SDK.

When new APIs are added to ArrowDB, they may not be immediately
available in the Cloud module. See the
[module API reference](http://docs.appcelerator.com/platform/latest/#!/api/Modules.Cloud)
for a list of supported objects and methods.

## Adding ArrowDB to your Titanium Project

This section describes how to add ArrowDB to a Titanium application. If you don't have an
existing ArrowDB datasource, Studio can create one for you.

If you are using the CLI, the CLI automatically creates an ArrowDB datasource for you.

### Adding ArrowDB to a New Titanium Application

If you are using Studio to create a new Titanium application, you can create a new ArrowDB
datasource at the same time:

1. Click **File** > **New** > **Mobile Project** to start the new project wizard.
2. Choose a template and click **Next**.
3. On the next screen, make sure **Enable Appcelerator Platform Services** checked.
4. Enter the project name and ID and click **Finish**.

{@img studio-enable-new.png}

This creates a new Titanium application and a new ArrowDB datasource, and configures the
Titanium project to access ArrowDB.

### Adding ArrowDB to an Existing Titanium Application

If you have an existing Titanium project in Studio, and want to create a new ArrowDB
datasource for it:

1. Open the project's `tiapp.xml` and switch to the **Overview** tab.
2. Click to **Enable Services**.

{@img studio-enable-existing.png}

### Adding an Existing ArrowDB Application to a Titanium Project

If you have already created an ArrowDB datasource, you can add it to a Titanium project by
editing the `tiapp.xml` file. You'll need the application key generated when you created the ArrowDB datasource.

1.  Open the project's `tiapp.xml` and switch to the **tiapp.xml** (source view) tab.

2.  Add the following entries to the file:

        <property name="acs-api-key-development" type="string">YOUR DEVELOPMENT APP KEY HERE</property>
        <property name="acs-api-key-production" type="string">YOUR PRODUCTION APP KEY HERE</property>

3.  Find the `<modules>` element in the file, and add the following:

        <module platform="commonjs">ti.cloud</module>

    If there is no `<modules>` element, add the following inside the `<ti:app>`
    element:

        <modules>
            <module platform="commonjs">ti.cloud</module>
        </modules>

    (This element is usually placed just above the `<deployment-targets>` element.)

### Virtual Private Cloud Configuration

If you are using a virtual private cloud (VPC), you need to configure your Arrow Push dispatcher
URL in order to send push notifications with GCM.  In the `tiapp.xml` file, add the `acs-push-api-url`
application property and set the node text to the push dispatcher URL provided to you.  The URL may
be the same as your custom ArrowDB endpoint and have deployment-specific settings, that is, two
URLs--one for production and another for the development environment.

    <ti:app>
        <property name="acs-push-api-url-production">YOUR PRODUCTION PUSH DISPATCHER URL HERE</property>
        <property name="acs-push-api-url-development">YOUR DEVELOPMENT PUSH DISPATCHER URL HERE</property>
    </ti:app>

## Importing the Module

ArrowDB support is baked into Titanium. However, you must include the cloud
services module into your project to use ArrowDB functionality. In your `app.js` (or
other suitable file), include the `require()` statement as shown here:

    var Cloud = require('ti.cloud');
    Cloud.debug = true;  // optional; if you add this line, set it to false for production

## Authenticating your Application

To keep your ArrowDB data secure from unauthorized access, your application must prove that
it is allowed to communicate with ArrowDB in each HTTP request. The Titanium Cloud module passes
the ArrowDB application key, configured in the project's `tiapp.xml` file, with each request over SSL.

For more information, see [Authentication](#!/guide/acs/authentication).

## Push Notifications

To setup your Titanium application to use push notifications, see
[Push Notification guide](http://docs.appcelerator.com/platform/latest/#!/guide/Push_Notifications).

## Using the ArrowDB APIs

The `ti.cloud` module APIs follow the same basic pattern. For each ArrowDB method supported by
the API, the module supplies a JavaScript method that takes two arguments: a _parameters_
dictionary, which holds the parameters passed to the method, and a callback to be invoked
when the method completes.

The response callback receives a single object, which is a slightly modified version of
the REST response object. The REST response contains two objects:

*   `meta : Object`. Response metadata, such as success or failure, error messages, pagination
    information.
*   `response : Object`. Response data specific to the call. For example, if you search for places,
    the response object contains an array of places.

The module's response object includes any properties from `response` at the top level of the
object. For example, if the REST response includes `response.places`, this is included as
`places`.

The module's response object also includes the following fields:

*   `meta : Object`. Metadata from the REST response.
*   `success : Boolean`. True if the request succeeded (that is, `meta.status == "ok"`).
*   `error : Boolean`. True if the request failed (`meta.status != "ok"`).
*   `message : String`. Error message, if available.
*   `code : Number`. Error code, if available.

## Examples

With over 25 APIs available for you to use, we obviously can't
cover them all here. But let's take a look at a couple of examples.

Create a user

    // example assumes you have a set of text fields named username, password, etc.
    Cloud.Users.create({
        username: username.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
        first_name: firstName.value,
        last_name: lastName.value
    }, function (e) {
        if (e.success) {
    		// user created successfully
        } else {
            // oops, something went wrong
        }
    });

Post a photo to a photo collection. To post a photo to a collection, you need to create the collection first using
{@link PhotoCollections#create}.

    // assumes you've obtained a photo from the camera or gallery, with blob data stored in an object named photo,
    // and that collectionID contains the ID of an existing photo collection.
    Cloud.Photos.create({
        photo: photo,
        collection_id: collectionID,
        'photo_sync_sizes[]': 'small_240'
    }, function (e) {
        if (e.success) {
    		// null out our photo objects to clean up memory
            photo = null;
            collectionID = null;
        } else {
            // oops, something went wrong
        }
    });

Linking a Facebook login with your app. You must already be logged in using the
Titanium [Facebook module](http://docs.appcelerator.com//platform/latest/#!/api/Modules.Facebook) before
calling the `externalAccountLogin` method.

    // Not shown is the code to implement the Facebook module in your app
    var Facebook = require('facebook');

    // call the ArrowDB Facebook SocialIntegrations API to link logged in states
    function updateLoginStatus() {
        if (Facebook.loggedIn) {
            label.text = 'Logging in to ArrowDB as well, please wait...';
            Cloud.SocialIntegrations.externalAccountLogin({
                type: 'facebook',
                token: Facebook.accessToken
            }, function (e) {
                if (e.success) {
                    var user = e.users[0];
                    alert('Logged in! You are now logged in as ' + user.id);
                }
                else {
                    error(e);
                }
            });
        }
        else {
            label.text = 'Please login to Facebook.';
        }
    }

    // when the user logs into or out of Facebook, link their login state with ArrowDB
    Facebook.addEventListener('login', updateLoginStatus);
    Facebook.addEventListener('logout', updateLoginStatus);

    // add the Facebook login button
    win.add(Facebook.createLoginButton({
        top: 10
    }));

For more examples, see the [ArrowDB API documentation](#!/api).

## Importing and running the Ti.Cloud Sample application

The Titanium Cloud module also includes a sample application that demonstrates each of the ArrowDB request
types.

**To import and run the Ti.Cloud sample application**:

1. In Studio, select **File** > **New** > **Mobile App Project**.
2. Select the Classic application type with the Default Project template. {@img classic.png}
2. In the New Mobile App Project dialog, enter values for the **Project Name** and **App ID** fields, and check
the option to **Enable Appcelerator Platform Services**. {@img enableservices.png}
3. Click **Finish**.
4. From your desktop, navigate to the following folder, where `<latest_version>` is the folder containing
the latest SDK version:

    * **Mac**: `~Library/Application Support/Titanium/modules/commonjs/ti.cloud/<latest_version>/example`
    * **Windows 7**: `%ProgramData%\Titanium\modules\commonjs\ti.cloud\<latest_version>\example`
    * **Windows 8**: `%AppData%\Titanium\modules\commonjs\ti.cloud\<latest_version>\example`
    * **Linux**: `~/titaniumsdk/modules/commonjs/ti.cloud/<latest_version>\example`

5. Select all the folders and files in the **example** folder and drag them to your project's **Resources** folder. {@img dragfiles.png}

    * If prompted, select the option to **Copy Files and Folders** and click **OK**.
    * Click **Yes to All** when asked if you want to overwrite files.

7. Open the project's `tiapp.xml` file and, in the **Modules** section, add the **facebook**
and **ti.cloudpush** modules. {@img modules.png}
8. Save `tiapp.xml` and run the project on the desired device or emulator/simulator.

Once the application is running, try the following:

* Create a new user by selecting **Users > Create User**. Enter a username, password and password
confirmation, first name, and last name, then click **Create**. If the user is created successfully, the following dialog is shown:
{@img new_user_success.png}

* View the newly created user in Dashboard:
    1. Open [Dashboard](https://platform.appcelerator.com) and select your application from the **Apps** menu.
    2. Select **Cloud > Manage Data**, then click **Users** in the Manage Data Object table. You
    should see the user you created listed in the Users table.
    {@img verify_new_user.png}

## References

  * [ArrowDB API Reference](#!/api)
  * [Modules.Cloud Module Reference](http://docs.appcelerator.com/platform/latest/#!api/Modules.Cloud)

