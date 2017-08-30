# ArrowDB Release Notes

## ArrowDB 1.5.5 Release - 5 February 2016

This release of ArrowDB 1.5.5 includes one internal bug fix.

## ArrowDB 1.5.4 Release - 18 December 2016

This release of ArrowDB 1.5.4 includes a few internal bug fixes.

## ArrowDB 1.5.3 Release - 19 October 2016

This release of ArrowDB 1.5.3 includes several internal fixes.

## ArrowDB 1.5.2 Release - 29 June 2016

This release of ArrowDB 1.5.2 includes several internal improvements and bug fixes.

## ArrowDB 1.5.1 Release - 15 March 2016

This release of ArrowDB 1.5.1 addresses a few internal improvements and bug fixes.

## ArrowDB 1.5.0 Release - 14 February 2016

This release of ArrowDB 1.5.0 addresses a few internal improvements and bug fixes.

## ArrowDB 1.4.0 Release - 12 January 2016

This release of ArrowDB includes version 1.1.0 of the CLI and 1.4.0 of the
server, and includes a new feature and improvement.

**New Features and Improvements**

* *Size and exclusive containers*: Arrow Cloud supports deploying app to an exclusive
base container and setting the size of the container in this case.

## ArrowDB Release 1.3.0 - 17 September 2015

**Behavior changes**

* **Search APIs**: All search APIs are deprecated. For text searches, use a
[`$text` query operator](#!/guide/search_query) with the query method.
Existing datasources created before ArrowDB 1.3.0 can continue to use the search API.
New datasources created since ArrowDB 1.3.0 cannot use the search API.
Affected APIs include {@link Events#search}, {@link Friends#search},
{@link Places#search} and {@link Users#search}.

**New feautres**

* **Subscribe or Unsubscribe to Multiple Push Channels**: Comma-separate a list of channel names to
subscribe or unsubscribe to multiple push channels with the {@link PushNotifications} APIs.

* **Text Query Operator**: To perform a full-text search on ArrowDB objects,
use the `$text` query operator with the `where` parameter of query methods.
For details, see the [Search and Query guide](#!/guide/search_query).

## ArrowDB Release 1.2.0 - 3 August 2015

**Bug fixes**

* Fixed an issue where objects created before the batch delete job started were deleted.

## ArrowDB Release 1.1.13 - 11 June 2015

**New features**

* Add ability to batch create custom objects using the
  {@link CustomObjects#batch_create objects/:classname/batch_create.json method}.

**Bug fixes**

* Fixed an issue where relational fields were not expanded in responses from Message APIs.
* Fixed an issue where using the coordinates, order, skip and limit fields together did not
  return the correct results.
* Fixed an issue where a device could subscribe multiple times to push notifications with
  the same device token.


## ArrowDB Release 1.1.12 - 05 May 2015

**New Features**

* Add ability to set private file permission on File objects using the `s3_acl` field. When creating
or updating a File object, set the `s3_acl` field to `private` to only allow logged-in users to
access the file. The retrieved URL will be temporary and expire, by default, after five minutes.  You
can adjust the expiration time with the query or show method's `expires` field.
Previously, all files without an access control list were public.

* Add ability to update the owner of a Place object using the `user_id` field. When using the update
method, set the `user_id` field to the ID of the new owner.

**Bug fixes**

* Fixed an issue where email templates were failing to insert passed parameters.

## ArrowDB Release 1.1.11 - 21 April 2015

**Bug fixes**

* Fixed an issue where GeoFence objects were not exported during data exports.

## ACS Release 1.1.10 - 22 March 2015

**Bug fixes**

* Fixed an issue where updating a custom object with invalid fields would return a 500 error code
  instead of a 400 error code.

## ACS Release 1.1.9 - 05 March 2015

**New Features, Improvements and Changes**

* **ACL queries** &mdash;
In prior ACS releases, any user could query ACLs created by another user.  In applications created with
ACS 1.1.9 and later, a user can only query ACLs they create, while an application admin can query
ACLs for any arbitrary user by specifying the `user_id` field.

* **Send push notifications to multiple push channels** &mdash;
The Push Notifications API now supports sending push notifications to multiple push channels.
Simply comma-separate the list of channels you want to send the notification to.  Due to this
change, push channel names cannot contain a comma.

* **`user_id` field renamed to `sudo_id` for admin operations** &mdash;
The `user_id` field, which was used to indicate the user that an application administrator could
perform an ACS API call on behalf of, was renamed to the `sudo_id` field. For details, see
[Admin Access: Perform ACS API Calls on Behalf of Another User](#!/guide/admin_access-section-perform-acs-api-calls-on-behalf-of-another-user).

**Bug Fixes**

* Fixed an issue where a delayed job, such as exporting a large data set, would exit silently.
* Fixed pagination on push channel queries. Previously, push channel query results would not be
correctly paginated.

## ACS Release 1.1.8

This version was skipped.

## ACS Release 1.1.7 - 05 Jan 2015

**New Features, Improvements and Changes**

* **Photo resizing** &mdash; By default, ACS no longer automatically resizes photo uploads.
To resize photos upon upload, include the `photo_sizes[<size>]` parameter in the request.
See [Photo Uploading & Resizing](http://docs.appcelerator.com/cloud/latest/#!/guide/photosizes) for details.

* **Default JSON response depth** &mdash; If not specified in the request, the default value for the `response_json_depth`\
parameter for ACS method calls is now **1**. For applications created prior to ACS 1.1.7,
the default value for `response_json_depth` is still **3**. Valid values are between 1-8.

    A higher `response_json_depth` value can reduce the number of API calls
    your application makes to retrieve related or dependent objects. It can also
    increase the size of the JSON response payload and the server's response time.

* **Filtering of unauthorized results** &mdash;
In prior ACS releases, if a query request matched objects whose ACL settings
did not allow access to the current user, the response would include "placeholder" records that
indicates the permissions error. In applications created with ACS 1.1.7 and later, query objects the current user
is not allowed to view are not included in the response at all.

**Bug Fixes**

Below is a selected list of bug fixes in this ACS release.

* Fixed internal server error when querying a user by their geographic coordinates.
* Fixed internal error when calling messages/show.json when providing a deleted message ID.
* Fixed internal server error when calling users/show with invalid or missing session ID.
* Fixed issue with updating/deleting ACS object with custom ACL permission.
* Fixed error when configuring SMTP settings for Office 365.
* Fixed error that occurred when updating the primary photo for an ACS object.
* Fixed issue that occurred after deleting application data in the web console that caused changes to the application settings to fail.
* Fixed issue with Cloud API logs not appearing in Dashboard.
* Fixed HTTP 500 error when calling keyvalues/append.json.
* Fixed issue uploading photos using the community web console.
* Attempting to access an ACS object whose ACL does allow access by the current user now returns an HTTP 401 error instead of 403.
* Fixed an issue with notification emails not being sent when an error with an iOS push certificate was encountered.
* Fixed 500 error in the community web console when browsing Place objects.
* Deleting a review of a object now properly updates the review count for that object.
* Querying objects with selectors on relational fields now works as expected.

## ACS Release 1.1.6 - 29 October 2014

Appcelerator Cloud Services version 1.1.6 contains the following new features, bug fixes,
and  improvements.

**New Features**

* With respect to ACS query operations, starting with ACS 1.1.6, we have made the following changes:

    * Skip is limited to 0-4999; as a result you can not skip beyond 5000 records.
    * If the query includes `count=true`, the query response's `meta` object will contains a `count`
field whose value is the total number of objects that matched the query criteria.
If the query matches more than 5000 objects, the `count` field will contain the value "5000+".
If your query result set includes more than 5000 records,
you should perform range-based queries for pagination as discussed
in [Query Pagination](#!/guide/search_query-section-query-pagination).

* Increased size limit of iOS [push notification payloads](/cloud/latest/#!/api/PushPayload) to 2048KB.
* Added support for `category` field in push notifications to support
[interactive notifications](http://docs.appcelerator.com/platform/latest/#!/guide/iOS_Interactive_Notifications)
on iOS 8 devices.

**Bug Fixes and Improvements**

* Fixed errors that occurred in the [Community web console](https://my.appcelerator.com/apps) when
creating, editing, updating, or deleting application users.
* The total [photo count](/cloud/latest/#!/api/Photos-method-count) for an application now
properly updates when adding or removing an  object's primary photo, such as
{@link Places#photo} or {@link Users#photo}.

## ACS Release 1.1.5 - 15 September 2014

The 1.1.5 release of Appcelerator Cloud Services includes the following
new features and bug fixes.

### New Features and Behavior Changes

* **New Paging Restriction on Queries** &mdash; Previously, if a query matched 1
  million records (for example) ACS performed a sort and limit on those records in memory, which
  was highly inefficient. There is now a "hard stop" on queries at 5000 records.
  This means that if a query matches 1 million records, ACS will only
  look at the first 5000, in random order, and then sort on them.

    To narrow down query results, developers should now use range-based queries
    using a `where` clause. See the [documentation](#!/guide/search_query-section-query-pagination)
    and [examples](#!/guide/search_query-section-range-based-query-pagination-examples) for
    more information.

* A new parameter named **`count`** has been added to all query methods.
When a query contains `count=true` as a parameter, the `meta` object in the response
contains a `count` field whose value is the total number of objects that matched the query.
See the [examples](#!/guide/search_query-section-range-based-query-pagination-examples) for more information.

* The `page` and `per_page` query parameters are no longer supported in ACS
  1.1.5, and responses do not contain `page`, `per_page`, `total_pages`, or `total_results` fields.
  Applications created with ACS 1.1.4 and earlier can continue to these these parameters,
  but they will eventually be deprecated and removed. Developers are encouraged to migrate
  their applications to use the [range-based queries](#!/guide/search_query-section-query-pagination)
  available in ACS 1.1.5.  

* **Batch delete** &mdash; [Batch delete](#!/guide/admin_access-section-batch-delete) of ACS
  objects is now performed asynchronously in a separate process, rather than
  immediately on method invocation.
* **Deleted Objects and Dependencies** &mdash; When an object is deleted that has dependencies, the dependent objects are not deleted.
  For instance, if you delete a Users object that had a {@link Photos} object specified as the user's primary photo,
  the corresponding Photos object is not deleted.
* **Wildcard regular expressions** are now not allowed in [query operations](#!/guide/search_query). For
  example, the ACS query `where="color": {"$regex" :"^.*b"}` will result in the following error:

        This regex query is not supported, regex expression should start with ^letter or ^digit.
* When [creating an ACL](#!/api/ACLs) the `public_read` and `public_write` parameters must now be strings.
* The **{@link CustomObjects#count}** method has been modified to include the object
  type in the request (`objects/<object>/count.json`, for example), and only
  returns the count for the specified type. The `count` field is returned in the `meta` JSON response object,
  and not in the `response` object.

        $ curl -X GET "http://${HOST}/v1/car/count.json?key=${KEY}&pretty_json=true"
        {
          "meta": {
            "code": 200,
            "status": "ok",
            "method_name": "objectsCount",            
            "count": 15
        }

* The response of `count` methods for all ACS objects now includes a `method_name` field, and
the `count` field is included in the `meta` object and not the `response` object.

        $ curl -X GET "http://${HOST}/v1/checkins/count.json?key=${KEY}&pretty_json=true"
        {
          "meta": {
            "code": 200,
            "status": "ok",
            "method_name": "checkinsCount",
            "count": 15
        }

### Bug Fixes

* Fixed an issue where subscribing a device using the `subscribe_token` method
  did not increment the application's push notifications count.

## ACS Release 1.1.4 - 14 August 2014

The 1.1.4 release of Appcelerator Cloud Services includes the following updates and bug fixes:

### New Features

* Added a new `count` API to that returns the total number of objects of the specified type. This API
is available to the following ACS types: {@link ACLs}, {@link Chats}, {@link Checkins}, {@link PhotoCollections},
{@link Emails}, {@link Events}, {@link Files}, {@link GeoFences}, {@link KeyValues}, {@link Messages},
{@link CustomObjects}, {@link Photos}, {@link Places}, {@link Posts}, {@link PushNotifications}, {@link Reviews},
{@link Statuses}, and {@link Users}.

For example, the following shows an example `cURL` request and response for the number of Photos:

    $ curl -b cookies.txt -c cookies.txt "https://api.cloud.appcelerator.com/v1/photos/count.json?key=<YOUR_APP_KEY>&pretty_json=true"

Example response:

    {
      "meta": {
        "code": 200,
        "status": "ok",
      },
      "response": {
        "photos": 10.0
      }
    }


### Bug Fixes

* [`get_chat_groups`](http://docs.appcelerator.com/cloud/latest/#!/api/Chats-method-get_chat_groups)
now only returns chat groups that the current user belongs to, as expected.
* [`subscribe_token`](http://docs.appcelerator.com/cloud/latest/#!/api/PushNotifications-method-subscribe_token)
now properly increases the subscribed device count, as displayed in Dashboard or My Apps.
* Queries now properly limit the number of results specified by the query
[`limit`](http://docs.appcelerator.com/cloud/latest/#!/guide/search_query-section-skip-and-limit) parameter.
* Fixed an issue where valid .p12 certificates were being disabled when ACS could not make a successful
connection to Apple Push Notification Service (APNS).
* Fixed an issue where calling [`keyvalues.incrby`](http://docs.appcelerator.com/cloud/latest/#!/api/KeyValues-method-incrby)
or [`keyvalues.append`](http://docs.appcelerator.com/cloud/latest/#!/api/KeyValues-method-append)
as an application admin on behalf of another user (by specifying the `user_id` parameter) would create a
new keyvalue belonging to the admin, rather than updating the one belonging to the specified user.
* Fixed an unexpected error ("Export currently in progress") when exporting application data from
the My Apps web console.
* An ACS user's `first_name` or `last_name` fields can now be set to an empty string, as expected,
as long the `username` field is not empty.
* Fixed an issue when assigning binary data to a Keyvalue object.
* Fixed an issue with [`push_notification/notify.json`](http://docs.appcelerator.com/cloud/latest/#!/api/PushNotifications-method-notify)
 where a non-admin user was able to send a geo-based notification without specifying
 either `to_ids` or `friends` fields.
* Fixed an issue where creating a new [`Review`](http://docs.appcelerator.com/cloud/latest/#!/api/Reviews-method-create)
 for a Photo object made the reviewed photo the primary photo for the new Review.
* The push notification logs in the [My Apps](https://my.appcelerator.com/apps) web console now shows the correct push count for Android and IOS
devices.

## ACS Release 1.1.3 - 17 July 2014

The 1.1.3 release of Appcelerator Cloud Services includes the following fixes and features:

### New features

* Add ability to query for all ACS objects a user liked. See the [Likes.query](#!/api/Likes-method-query) method.

* Add ability to create a Files object by using a URL to access the file to upload.  See the
[Files.create](#!/api/Files-method-create) method.

* Add `pretty_json` field to all method requests to enable or disable prettifying JSON response
data.  JSON pretty print is disabled by default.

### Bug fixes

* Fixed an issue with sending ACS request from Titanium Mobile Web applications.

* Fixed an issue where tags were not being stored for Events objects.

* Fixed an issue where using the `expire_after_seconds` field with the PushNotifications
`notify_token` method would return an error.

* Fixed an issue with the ACS web console where SMTP settings were not saved when switching Test mode off.

* Fixed an issue where updating a relation object for a Places object was not being updated.

* Fixed an issue where the application fails to unregister from push notifications when the application is uninstalled.

* Fixed an issue on the Cloud Dashboard where the Storage statistic was not being displayed.

* Fixed an issue on the Cloud Dashboard when editing a Statuses object. The Places object
associated with the Statuses object was not updated.


## ACS Release 1.1.2

This version was skipped.


## ACS Release 1.1.1 - 16 May 2014

The 1.1.1 release of Appcelerator Cloud Services includes the following fixes and features:

### New features ###

* When calling an ACS object's `query` or `show` methods you can include a new parameter called
`show_user_like`. If the current user has liked the object being queried or shown, the JSON response
contains `"current_user_liked":true`. See the {@link Checkins#method-query Checkins.query}
and {@link Checkins#method-show Checkins.show} REST API examples for examples.

* ACS now uses `yajl-ruby` to generate JSON responses. YAJL is faster than the previous `Hash.to_json`
implementation.

* ACS now supports SSL uploads for File and Photo objects.

### Bug fixes ###

* Fixed an Android issue with UTF-8 encoded characters not being displayed properly in push notifications.

* Fixed an issue where an application administrator was unable to check ACLs for a regular user.

## 07 March 2014

  * ACS now supports sending push notifications to devices located within a geographic region you specify.
  For more information, see "Location-Based Push Notifications" in the [PushNotification](/cloud/latest/#!/api/PushNotifications)
  API reference.

## 11 January 2013

  * The namespace used by the ACS SDKs for [Android](#!/guide/android) and [iOS](#!/guide/ios)
  has changed from `Cocoafish` to `ACSClient`. The documentation and sample code has been updated to reflect this change.

## 18 December 2013

  * Fixed a JSON parsing error with the Messages API.

## 6 December 2013

This update includes the following bug fixes and enhancements:

  * Add ability to increment or decrement the badge value when sending a push notification.  See the
    "Badge" section in [PushNotifications](#!/api/PushNotifications).

  * Add ability to use a query to send push notifications to specific users.  See the `where`
    parameter in [push_notification/notify.json](#!/api/PushNotifications-method-notify).

  * Add support for admin batch delete operations.  See the "Admin Batch Delete" section in
    [Admin Access](#!/guide/admin_access).

  * Change admin operation to send push notification to all users.  Set the `to_ids` parameter to
    `everyone` for the `push_notification/notify.json` method.  Only new applications need to
    use this mechanism.  Old applications made prior to this release can continue not to specify
    `to_ids`.  You do not need to set this parameter in the web interface.

  * Add support for application admin to send push notifications to all users with the
    `push_notification/notify_tokens.json` method. Set the `to_tokens` parameter to `everyone`.
    Previously, you could not send push notifications to all users with this method.

## 7 November 2013

This update includes the following bug fixes and enhancements:

  * Add ability to set an expiration date for push notificiations with the `expire_after_seconds`
    parameter. See the `options` parameter for [push_notification/notify.json](#!/api/PushNotifications-method-notify)
    and [push_notification/notify_token.json](#!/api/PushNotifications-method-notify_tokens).

  * Add ability to schedule push notifications to be sent at specific times and intervals.  This
    feature is only available to Enterprise customers.  See [PushSchedules](#!/api/PushSchedules).

  * Changed PushNotification API to use `android` as the push notification type for either MQTT or GCM.
    After you have configured the ACS web console for either MQTT or GCM,
    the ACS server automatically sends the push notification to the correct service.
    Previously, you had to specify either `android` for MQTT or `gcm` for GCM.

  * Fixed an issue where a currently logged in user could not create a new user.

## 10 October 2013

This update includes the following enhancements:

  * New PushNotifications API to query existing push channels and the number of devices subscribed
    to a push channel. See [push_notification/channels/query.json](#!/api/PushNotifications-method-channels_query)
    and [push_notification/channels/show.json](#!/api/PushNotifications-method-channels_show).

## 26 September 2013

This update includes the following bug fixes and enhancements:

  * The query methods support two new parameters: `sel` and `unsel`.  Use these parameters to
    specify which fields to return or not to return.  You cannot use these parameters together.

  * Website: Added new feature to unsubscribe devices from push noticifactions using
    the ACS web console.

  * Fixed an issue where the `$inc` operation was not autoincrementing a custom field.


## 1 August 2013

### Google Cloud Messaging for Android Push Notifications

ACS now supports Google Cloud Messaging (GCM) for push notifications on Android devices.

For instructions on setting up GCM, see the "Configure Your App For Enabling Push Notifications"
subsection under the "Push Notifications" section of the [Android SDK guide](#!/guide/android).

To send push notifications, refer to [PushNotifications](#!/api/PushNotifications).


## 10 June 2013

### Fixed Issues and Enhancements

This update includes the following bug fixes and enhancements:

  * Removed dependency between push notifications, and device and user registrations.
    Users are no longer required to have an ACS account to receive push notifications.

  * Fixed an issue where using special characters cause the query to fail.

  * Website: Fixed an issue viewing relational field objects.
    Relational field objects were being displayed as objects and not ID strings.

  * Website: Fixed an issue viewing custom objects.
    Some custom objects could not be viewed in the web interface.

  * Website: Fixed an issue with SMTP settings.
    If a TLS value was specified, it was not properly checked.

### Future Behavior Changes

In a future release, currently scheduled in a few months,
the following changes are being made to user sessions and geo query.

#### Application User Session Expiration

An application user session never expires today.  We are introducing a policy of expiring and
removing sessions that have been inactive for six months.

If your application logins a user and saves the `session_id`,
normally stored in a cookie, every time it makes a REST call to ACS using the same `session_id`, the
expiry clock is reset and the user gets another six months. As long as the ACS user is active using
the same `session_id` within six months, there is no impact on your application and currently logged in
user. If an application user is completely inactive for six months or more, this user session is
removed and any subsequent ACS call that requires user login such as `create.json`, `update.json` and
`remove.json` will get a 404 error. We recommend your application to handle an invalid user session
error and prompt a login screen to the user to login again.

#### Geo Query

ACS currently supports MongoDB’s
[$nearSphere](http://docs.mongodb.org/manual/reference/operator/nearSphere/) geo query.
Geo query requires a field to be indexed with a geo index.
The ACS fields you can perform `$nearSphere` on are `lnglat` (pre-defined location
data and only available in [Places](http://docs.appcelerator.com/cloud/latest/#!/api/Places)
and [Events](http://docs.appcelerator.com/cloud/latest/#!/api/Events)) and `coordinates`
(list of custom defined location data and available in all objects).
It implies that Places and Events have two geo indexes in the same
collection and that prevents us from supporting the
[$geoNear](http://docs.mongodb.org/manual/reference/command/geoNear/) operation that is more powerful than
`$nearSphere`.  We will consolidate the `lnglat` value with the `coordinates` values and remove geo index on
the `lnglat` field.

For Events and Places, even if you never explicitly copied
the `lnglat` value to `coordinates`, `lnglat` appears as the first element of `coordinates`.  Performing
`$nearSphere` on the `coordinates` field returns a match if it matches the `lnglat` value.  `$nearSphere`
query on `lnglat` or `coordinates` continues to work as before.

## 26 Apr 2013

This update includes bug fixes and performance improvements.

## 19 Apr 2013 -- Session Expiration Policy Update

On May 15th, Appcelerator will start enforcing a new expiration policy for user sessions.
Previously, user sessions were never removed from the database, no matter how long
they had been idle.

Starting May 15th, user login sessions will expire after they have been unused for a period of time.
By default, the expiration period is six months. You can configure the user session
expiration period in the application management console.

## 11 Apr 2013

This update included the following bug fixes:

  * Fixed a regression causing user confirmation email requests to fail with an error ("400 Bad Request - Invalid app key").

  * When querying ACS objects, regular expressions are limited to those expressions that can be processed efficiently. To be processed efficiently, the regex must be _anchored_ at the beginning of the string with "^" followed by a letter or digit. The initial character must be case sensitive. For example, "^[aA]" and ".*Foo" are not allowed, but "^a.*Foo" is allowed.

  * Website: Fixed an issue with creating places. When creating an event from the website, the place ID was not added to the event, even though a place is selected.

  * Website: Fixed an issue with photo collections. If an error was encountered when browsing a subcollection on the photo collection page, it caused an infinite redirect loop.

## 28 Mar 2013

This update included a number of bug fixes and scalability improvements.
Notable fixes include:

  * Fixed an error that occurred when trying to create an event with the `recurring` field set.

  * Fixed an issue that prevented editing of custom fields using the ACS web site.

  * Fixed an issue that prevented tags from being deleted using the ACS web site.

## 14 Mar 2013

Added support for iOS Newsstand `content-available` flag in push
notifications. Setting `content-available: 1` in the payload of a push
notification identifies it as a Newsstand push notification used to initiate
background download. Note that this feature is only supported by Newsstand
apps. For more information, see the [Apple Newsstand
FAQ](http://developer.apple.com/library/ios/#technotes/tn2280/_index.html) on
the iOS Developer Center.

## 14 Feb 2013

Added new admin operation:

  * Admin Drop Custom Collection allows admin users to drop a Custom Object collection.

For details, see [Admin Access](#!/guide/admin_access).

Added support for atomic increment operator, $inc. For details see [Atomic
Increment Operation](#!/guide/atomic_increment).

Fixed ACS website issues:

  * Places could not be added manually from the website.
  * Longitude and latitude fields were limited to 4 characters.
  * Custom field boolean could be interpreted as a string.

## 31 Jan 2013

Fixed an unhandled exception when a file was passed as the payload of a push
notification. For example, a `curl` command like this would cause an
exception:

    curl -b cookies.txt -c cookies.txt -F "channel=change_request" -F "to_ids=<ids>"
    -F "payload=@photo2.jpg"
    https://api.cloud.appcelerator.com/v1/push_notification/notify.json?key=<api_key>


File payloads are not allowed. With the fix, ACS supplies an error message
instead of throwing an exception.

## 21 Jan 2013

The ACS service was updated today with a number of bug fixes and improvements.
Highlights include:

  * Updated API usage reporting to report number of pushes.
  * On the ACS website, added ability to add a record to an existing custom object without requiring the user to duplicate and recreate the object.
  * Fixed an issue where HTML tags were stripped from custom object fields when editing the fields in the ACS website.
  * When exporting data from the website, the mechanism for selecting date ranges is improved, and invalid date ranges are rejected.
  * Fixed an issue that prevented users from unsubscribing from push notifications when multiple users subscribe to push notifications from the same device.
  * A number of fixes to the ACS web administration console.
  * An update was made to the ACS Android SDK. You can download the latest version from
  * <https://github.com/cocoafish/cocoafish-android-sdk>. For more information on the SDK, see [Getting Started: Using the Android SDK](#!/guide/android).
