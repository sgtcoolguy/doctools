# Troubleshooting Guide

## Titanium SDK and Studio

### Error enabling Cloud service for project

If you receive a message similar to "Error enabling Cloud service for project" in Studio when trying
to enable Cloud services for your project, the ArrowDB server may be down or Studio is unable to connect
to the ArrowDB server.  Try to enable Cloud services later.

If you are still receiving this error when trying to enable Cloud services, check to see if your
application was created in [https://platform.appcelerator.com/](https://platform.appcelerator.com/).

If the application was created, check to see if ArrowDB keys were created for the application. To
find your ArrowDB keys, go to [https://platform.appcelerator.com/](https://platform.appcelerator.com/),
select your application from the **Apps** drop-down list, then click **Configuration**.
You should see items for **App Key**, **OAuth Consumer Key** and **OAuth Secret**.
Click the **Show** link to expand these items.  Note that you need both the
Development and Production version of these items.  You can switch between the two by clicking the
drop-down box in the top-right corner that displays either **Development** or **Production**.

If you do *not* have ArrowDB keys, try to enable Cloud services again at a later time.

If you do have ArrowDB keys, manually enter the ArrowDB key information in the `tiapp.xml` file.
To manually enter this information:

  1. Double-click your `tiapp.xml` file to open it in the **Editor**.
  2. Click the **tiapp.xml** tab in the lower-left corner of the **Editor**.
  3. Insert the following ArrowDB property keys as children of the `ti:app` parent tag and replace with the
     application's ArrowDB keys found earlier: 

        <?xml version="1.0" encoding="UTF-8"?>
        <ti:app xmlns:ti="http://ti.appcelerator.org">
            <!-- Add these six tags and replace with your application's ArrowDB keys -->
            <property name="acs-oauth-secret-development" type="string">OAUTH_CONSUMER_SECRET_DEV</property>
            <property name="acs-oauth-key-development" type="string">OAUTH_CONSUMER_KEY_DEV</property>
            <property name="acs-api-key-development" type="string">APP_KEY_DEV</property>
            <property name="acs-oauth-secret-production" type="string">OAUTH_CONSUMER_SECRET_PROD</property>
            <property name="acs-oauth-key-production" type="string">OAUTH_CONSUMER_KEY_PROD</property>
            <property name="acs-api-key-production" type="string">APP_KEY_PROD</property>
            <!-- Add these two tags if you are using Appcelerator Studio -->
            <property name="acs-authbase-url" type="string">https://secure-identity.cloud.appcelerator.com</property>
            <property name="acs-base-url" type="string">https://api.cloud.appcelerator.com</property>
            ...
        </ti:app>

  4. Save and close your `tiapp.xml` file.
  5. Reopen your `tiapp.xml` file.  In the **Overview** tab, it should show that Cloud services is enabled.

## Push Notification Error Messages

The following table lists error messages reported by the ArrowDB push notification dispatcher, which is responsible for sending push notifications
to the Apple Push Notification Service (APNS) and Google Cloud Messaging (GCM). 

### Apple Push Notification Server (APNS) Errors

Code | Message | Description
--- | --- 
2001 | There was a problem loading or reading the keystore. | There was a problem loading the keystore (APNS certificate). Try [re-creating](http://docs.appcelerator.com/platform/latest/#!/guide/Configuring_push_services-section-37551713_Configuringpushservices-ConfiguringpushservicesforiOSdevices) and uploading your keystore.
2002 | There was a network problem communicating with APNS, such as an SSL or socket error. | Network communication between the ArrowDB push notification dispatcher and APNS was interrupted for some reason.
2003 | Certificate does not exist. | The specified [APNS push certificate](http://docs.appcelerator.com/platform/latest/#!/guide/Configuring_push_services-section-37551713_Configuringpushservices-ConfiguringpushservicesforiOSdevices) does not exist.
2004 | Certificate is disabled. | The specified [APNS push certificate](http://docs.appcelerator.com/platform/latest/#!/guide/Configuring_push_services-section-37551713_Configuringpushservices-ConfiguringpushservicesforiOSdevices) is disabled.
2005 | Payload is invalid. | The [JSON payload](http://docs.appcelerator.com/platform/latest/#!/guide/Sending_and_Scheduling_Push_Notifications-section-37551726_SendingandSchedulingPushNotifications-CustomJSONpayloads) is invalid.
2006 | Payload is longer than 2048 bytes. | The JSON payload is longer than 2048 bytes. You need to make the payload smaller.
2007 | Certificate is revoked. | The specified [APNS push certificate](http://docs.appcelerator.com/platform/latest/#!/guide/Configuring_push_services-section-37551713_Configuringpushservices-ConfiguringpushservicesforiOSdevices) has been revoked. You need to generate a new certificate.
2008 | Certificate is expired. | The specified [APNS push certificate](http://docs.appcelerator.com/platform/latest/#!/guide/Configuring_push_services-section-37551713_Configuringpushservices-ConfiguringpushservicesforiOSdevices) has expired. You need to generate a new certificate.
2008 | Certificate is invalid. | The specified [APNS push certificate](http://docs.appcelerator.com/platform/latest/#!/guide/Configuring_push_services-section-37551713_Configuringpushservices-ConfiguringpushservicesforiOSdevices) is invalid. You need to generate a new certificate.
2010 | Socket is closed. | The socket connection between the ArrowDB push dispatcher and APNS was closed.

### Google Cloud Messaging (GCM) Errors

Error codes in the 3000-3099 range are [GCM error codes](http://developer.android.com/reference/com/google/android/gcm/server/Constants.html). 
Error codes above 3100 are for custom ArrowDB push dispatcher errors.

Code | Message | Description
--- | --- 
3001 | Too many messages were sent to a specific device. Retry sending after a while. | GCM limits the number of push messages that can be sent to a particular device over a period. Increase the period between notifications for this device.
3002 | A particular message could not be sent because the GCM servers encountered an error. | GCM servers encountered an error.
3003 | Bad registration_id. Sender should remove this registration_id. | The GCM client sent a bad [registration ID](https://developer.android.com/google/gcm/client.html#sample-register) and should re-register with GCM to obtain a new ID. This error is uncommon if you are using the [Modules.CloudPush](http://docs.appcelerator.com/platform/latest/#!/api/Modules.CloudPush) module.
3004 | Time-to-live value provided is less than zero, or more than the allowed maximum. | The message's [Time to Live](http://developer.android.com/google/gcm/adv.html#ttl) (expiration date) value is invalid. This error is uncommon if you are using the [Modules.CloudPush](http://docs.appcelerator.com/platform/latest/#!/api/Modules.CloudPush) module.
3005 | Payload is longer than maximum allowed size of 4096 bytes. | GCM limits push notification payload size to 4096 bytes; try reducing the JSON message size and sending again.
3006 | The sender_id contained in the registration_id does not match the sender_id used to register with the GCM servers. | The [GCM client](https://developer.android.com/google/gcm/client.html) did not use the proper sender_id. This error is uncommon if you are using the [Modules.CloudPush](http://docs.appcelerator.com/platform/latest/#!/api/Modules.CloudPush) module.
3007 | Collapse key is required. Include collapse key in the request. | If you are using a custom GCM client you need to include a [collapse key](http://developer.android.com/google/gcm/adv.html) in the request. This error is uncommon if you are using the [Modules.CloudPush](http://docs.appcelerator.com/platform/latest/#!/api/Modules.CloudPush) module.
3008 | The request was missing a registration_id; registration_id is required with every request. | The GCM client did not include a [registration ID](https://developer.android.com/google/gcm/client.html#sample-register) in its request. This error is uncommon if you are using the [Modules.CloudPush](http://docs.appcelerator.com/platform/latest/#!/api/Modules.CloudPush) module.
3009 | The user has un-installed the application or turned off notifications. Sender should stop sending messages to this device and delete the registration_id. The client needs to re-register with the GCM servers to receive notifications again. |
3010 | Too many messages sent by the sender. Retry after a while. | GCM limits the number of push notifications that can be sent by particular sender over a given period. Increase the period between push notification send requests.
3011 | A particular message could not be sent because the GCM servers were not available. | The GCM server were not available for an unknown reason. Try again later.
3101 | No result retrieved from GCM Server. | The GCM server did not return a response from the push notification request.
3102 | gcm_apiKey is null. | Make sure you've [configured ArrowDB push notifications](http://docs.appcelerator.com/platform/latest/#!/guide/Configuring_push_services-section-37551713_Configuringpushservices-ConfiguringArrowapplicationforGCMservice) with your API key. 
3103 | RegistrationId(s) is null or empty. | The GCM client provided a null or empty [registration ID](https://developer.android.com/google/gcm/client.html#sample-register). This error is uncommon if you are using the [Modules.CloudPush](http://docs.appcelerator.com/platform/latest/#!/api/Modules.CloudPush) module.
3104 | GCM internal error. | An internal error occured with GCM. Check GCM status.
3105 | Message could not be sent, or there was a JSON parsing error. | Make sure that the notification [JSON payload](http://docs.appcelerator.com/platform/latest/#!/guide/Sending_and_Scheduling_Push_Notifications-section-37551726_SendingandSchedulingPushNotifications-CustomJSONpayloads) is properly formatted.

<style>
table tr:nth-child(even) {
    background-color: #eee;
}
</style>
