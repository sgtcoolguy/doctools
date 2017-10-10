Ext.data.JsonP['Installing_the_Android_SDK']({"guide":"<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n        \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n    <title>Installing the Android SDK</title>\n\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n    <meta content=\"Scroll EclipseHelp Exporter\" name=\"generator\">\n\n    <link type=\"text/css\" rel=\"stylesheet\">\n    <link type=\"text/css\" rel=\"stylesheet\">\n    <link type=\"text/css\" rel=\"stylesheet\" media=\"print\">\n</link></link></link></meta></meta></head>\n<body>\n    <div class=\"container\">\n\t\t<div id=\"banner\" class=\"confbox admonition admonition-note aui-message warning shadowed information-macro\">\n\t\t\t<p>You can now find Appcelerator documentation at <a href=\"https://docs.axway.com/\" target=\"_blank\">https://docs.axway.com/</a>. This site will be taken down in the near future.</p>\n\t\t</div>\n        <div class=\"header\"/>\n\n        <div id=\"src-29004851\" class=\"content\">\n                        <h1>Installing the Android SDK</h1>\n    <div class=\"section section-2 \" id=\"src-29004851_InstallingtheAndroidSDK-Contents\">\n        <h2 class=\"heading \"><span>Contents</span></h2>\n    <p>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-Overview\">Overview</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-CompatibilityandDownload\">Compatibility and Download</a>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-RequiredAndroidPackages\">Required Android Packages</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_safe-id-SW5zdGFsbGluZ3RoZUFuZHJvaWRTREstQW5kcm9pZFNESy9UYXJnZXRBbmRyb2lkUGxhdGZvcm0\">Android SDK / Target Android Platform</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-AndroidNativeAdd-onModuleDevelopmentonmacOS\">Android Native Add-on Module Development on macOS</a>    </p>\n</li></ul></li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-Installation\">Installation</a>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-macOS\">macOS</a>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-InstallingAndroidSDKToolsonmacOS\">Installing Android SDK Tools on macOS</a>    </p>\n</li></ul></li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-Windows\">Windows</a>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-InstallingAndroidSDKToolsonWindows\">Installing Android SDK Tools on Windows</a>    </p>\n</li></ul></li></ul></li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-InstallingAndroidPackageswithAndroidSDKManager\">Installing Android Packages with Android SDK Manager</a>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-Installingx86EmulatorPackages\">Installing x86 Emulator Packages</a>    </p>\n</li></ul></li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-UpdatingAndroidPackages\">Updating Android Packages</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-ConfiguringStudio\">Configuring Studio</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-ConfiguringtheCLI\">Configuring the CLI</a>    </p>\n</li></ul>    </div>\n    <div class=\"section section-2 \" id=\"src-29004851_InstallingtheAndroidSDK-Overview\">\n        <h2 class=\"heading \"><span>Overview</span></h2>\n    <p>This guide describes where to obtain and how to install the Google Android SDK and associated packages.    </p>\n    </div>\n    <div class=\"section section-2 \" id=\"src-29004851_InstallingtheAndroidSDK-CompatibilityandDownload\">\n        <h2 class=\"heading \"><span>Compatibility and Download</span></h2>\n    <p>Titanium requires the Android SDK Tools to be installed in order to allow you to develop Android applications.    </p>\n    <div class=\"confbox admonition admonition-note aui-message warning shadowed information-macro\">\n            <p>Remember that Oracle JDK is a prerequisite for Android development and should be installed first. Note that macOS systems need to have the Java 6 runtime installed. See <a class=\"document-link \" href=\"#!/guide/Installing_Oracle_JDK\">Installing Oracle JDK</a> for instructions.    </p>\n    </div>\n        <p>    <img src=\"images/download/attachments/29004836/download_05.png\" alt=\"images/download/attachments/29004836/download_05.png\" class=\"confluence-embedded-image image-center\" width=\"64\">\n        </img></p>\n    <p>The <i class=\" \">Android SDK Manager</i> installer may be obtained from the <a class=\"external-link external-link\" href=\"http://developer.android.com/sdk/index.html\" target=\"_blank\">Official Website</a>.    </p>\n    <div class=\"section section-3 \" id=\"src-29004851_InstallingtheAndroidSDK-RequiredAndroidPackages\">\n        <h3 class=\"heading \"><span>Required Android Packages</span></h3>\n    <p>The following packages, and the respective versions shown, must be installed to be able to develop for Android:    </p>\n    <div class=\"tablewrap\">\n        <table class=\"confluenceTable\">\n        <thead class=\" \">    <tr>\n            <td class=\"confluenceTh\" rowspan=\"1\" colspan=\"1\">\n        <p>Package    </p>\n            </td>\n                <td class=\"confluenceTh\" rowspan=\"1\" colspan=\"1\">\n        <p>Minimum Version    </p>\n            </td>\n        </tr>\n</thead><tfoot class=\" \"/><tbody class=\" \">    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Android SDK Tools    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Rev 23    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Android SDK Platform-tools/Build-tools    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Rev 23    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Android SDK    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>You need to have at least one Android SDK installed within the supported minimum and maximum target versions.    </p>\n    <p>For Android modules, you need to install Android SDK 6.0.x (API 23) and SDK 6.0.0+.    </p>\n            </td>\n        </tr>\n</tbody>        </table>\n            </div>\n    <p>    </p>\n    <div class=\"confbox admonition admonition-note aui-message warning shadowed information-macro\">\n            <p>Titanium SDK 6.1.0+ requires Android SDK Build Tools v23 or newer as minimum requirement.    </p>\n    </div>\n        <div class=\"confbox admonition admonition-note aui-message warning shadowed information-macro\">\n            <p>Take caution before upgrading these packages, as changes to the way they work has broken the Titanium toolchain a number of times in the past. Although these problems are often beyond our control, we always do our utmost to fix them as soon as we are made aware of them.    </p>\n    <p>With this in mind, it&apos;s important to only upgrade these packages <i class=\" \">between</i> major projects, so that you have time to fix any problems that may result. Always consult the Android Tools <a class=\"external-link external-link\" href=\"http://developer.android.com/sdk/tools-notes.html\" target=\"_blank\">Release Notes</a> and <a class=\"external-link external-link\" href=\"http://tools.android.com/knownissues\" target=\"_blank\">Known Issues</a> first, and refer to our <a class=\"document-link \" href=\"#!/guide/Installation_Troubleshooting\">Installation Troubleshooting</a> guide to check whether there are any further actions that need to be taken to make the Titanium and the Android SDK compatible.    </p>\n    </div>\n        </div>\n    <div class=\"section section-3 \" id=\"src-29004851_safe-id-SW5zdGFsbGluZ3RoZUFuZHJvaWRTREstQW5kcm9pZFNESy9UYXJnZXRBbmRyb2lkUGxhdGZvcm0\">\n        <h3 class=\"heading \"><span>Android SDK / Target Android Platform</span></h3>\n    <p>Each Titanium SDK supports building against a specific range of Android versions, as shown in the following table, and requires at least one of these versions to be installed. If you specify a <tt class=\" \">android:targetSDKVersion</tt> in the <tt class=\" \">tiapp.xml</tt> file of your project, you must specify one within the target min and max values. The minimum Android/SDK version column indicates the minimum version of Android that a device can run, which a Titanium application supports.    </p>\n    <div class=\"tablewrap\">\n        <table class=\"confluenceTable\">\n        <thead class=\" \">    <tr>\n            <td class=\"confluenceTh\" rowspan=\"1\" colspan=\"1\">\n        <p>Titanium SDK Version    </p>\n            </td>\n                <td class=\"confluenceTh\" rowspan=\"1\" colspan=\"1\">\n        <p>Min <u class=\" \">Target</u> Android/SDK Version<br>(android:targetSdkVersion)    </br></p>\n            </td>\n                <td class=\"confluenceTh\" rowspan=\"1\" colspan=\"1\">\n        <p>Max <u class=\" \">Target</u> Android/SDK Version<br>(android:targetSdkVersion)    </br></p>\n            </td>\n                <td class=\"confluenceTh\" rowspan=\"1\" colspan=\"1\">\n        <p>Minimum Android/SDK Version<br>(android:minSdkVersion)    </br></p>\n            </td>\n        </tr>\n</thead><tfoot class=\" \"/><tbody class=\" \">    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>6.2.0 - latest    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>6.0.x (API 23)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>8.0.x (API 26)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.1.x (API 16)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>6.0.0 - latest    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>6.0.x (API 23)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>6.0.x (API 23)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.1.x (API 16)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>5.1.0 - 5.5.x    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>6.0.x (API 23)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>6.0.x (API 23)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.0.x (API 14)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>5.0.0 - 5.0.x    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>5.0.x (API 21)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>6.0.x (API 23)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.0.x (API 14)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.0.0 - 4.1.x    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>5.0.x (API 21)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>5.1.x (API 22)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.0.x (API 14)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>3.4.1 - 3.5.1    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.0.x (API 14)*    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>5.0.x (API 21)**    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.3.x (API 10)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>3.3.0 - 3.4.0    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.0.x (API 14)*    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.4.x (API 19)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.3.x (API 10)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>3.2.0 - 3.2.3    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.3.x (API 10)*    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.4.x (API 19)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.3.x (API 10)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>3.1.2 - 3.1.3    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.3.x (API 10)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.3.x (API 18)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.3.x (API 10)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>3.1.1    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.3.x (API 10)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.2.x (API 17)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.3.x (API 10)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>3.1.0    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.2 (API 8)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.2.x (API 17)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.2 (API 8)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.1.2 - 3.0.2    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.2 (API 8)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.1.x (API 16)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.2 (API 8)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.0 - 2.1.1    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.2 (API 8)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>4.0.x (API 15)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.2 (API 8)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>1.8.x    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.2 (API 8)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>3.x.x (API 11)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.2 (API 8)    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>1.7.x    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.1 (API 7)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>3.x.x (API 11)    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>2.1 (API 7)    </p>\n            </td>\n        </tr>\n</tbody>        </table>\n            </div>\n    <p>    </p>\n    <div class=\"confbox admonition admonition-note aui-message warning shadowed information-macro\">\n            <div class=\"title\">Notes</div>\n            <p>(*) If you are building an Android module, you need to have Android SDK 6.0.x (API 23) installed if using Release 6.0.0 and greater.<br>(**) The Titanium SDK does not support the <a class=\"external-link external-link\" href=\"http://developer.android.com/wear/index.html\" target=\"_blank\">Android 4.4W SDK</a> (API 20), also know as the Android Wear SDK.    </br></p>\n    </div>\n        <p>    </p>\n    <p>Most mobile device manufacturers have been licensed to use Google&apos;s enhanced API, which provides support for Maps and other functionality. If this is the case for your target devices, you will need to install the relevant Google packages, listed as <i class=\" \">Google APIs by Google Inc., Android API x...</i> by the <strong class=\" \">Android SDK Manager</strong> tool. In Studio, choose the SDKs with the naming format &quot;Google APIs x.x&quot; to use the enhanced APIs, or those without the &quot;Google APIs&quot; prefix otherwise.    </p>\n    <p>Android SDK packages can be installed using the <strong class=\" \">Android SDK Manager</strong> tool. See <a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK\">Installing the Android SDK</a> for detailed instructions.    </p>\n    <p>The default Android SDK can be configured using Studio&apos;s <i class=\" \">Preferences</i>, and then selected per-project using the <i class=\" \">Run Configurations</i>.    </p>\n    <div class=\"confbox admonition admonition-note aui-message warning shadowed information-macro\">\n            <p>For Android API levels 14 and above, the emulator system images are installed separately from the SDK platform packages. To run in the emulator for Android API 14+, you must install at least one of the emulator system images.    </p>\n    </div>\n        <p>    </p>\n    </div>\n    <div class=\"section section-3 \" id=\"src-29004851_InstallingtheAndroidSDK-AndroidNativeAdd-onModuleDevelopmentonmacOS\">\n        <h3 class=\"heading \"><span>Android Native Add-on Module Development on macOS</span></h3>\n    <p>The Xcode command line tools are required to develop native Android add-on modules on macOS.    </p>\n    <p>See <a class=\"document-link \" href=\"#!/guide/Installing_the_iOS_SDK-section-src-29004875_InstallingtheiOSSDK-InstallingCommandLineToolsandPreviousSimulators\">Installing the iOS SDK: Installing Command Line Tools</a> for detailed instructions.    </p>\n    </div>\n    </div>\n    <div class=\"section section-2 \" id=\"src-29004851_InstallingtheAndroidSDK-Installation\">\n        <h2 class=\"heading \"><span>Installation</span></h2>\n    <div class=\"section section-3 \" id=\"src-29004851_InstallingtheAndroidSDK-macOS\">\n        <h3 class=\"heading \"><span>macOS</span></h3>\n    <p>Note that the typical filesystem location of this software can be found in the <a class=\"document-link \" href=\"#!/guide/Software_Locations_and_Environment_Variables-section-src-29004844_SoftwareLocationsandEnvironmentVariables-OSXSoftwareLocations\">macOS&#xA0;Software Locations</a> section of these guides.    </p>\n    <div class=\"section section-4 \" id=\"src-29004851_InstallingtheAndroidSDK-InstallingAndroidSDKToolsonmacOS\">\n        <h4 class=\"heading \"><span>Installing Android SDK Tools on macOS</span></h4>\n    <p>Once you have downloaded the Android SDK Tools archive, double-click to extract it.    </p>\n<ul class=\" \"><li class=\" \">    <p>rename the extracted folder to <tt class=\" \">android-sdk</tt>, if you wish to keep it in accordance with the <i class=\" \">Software Locations</i> section above    </p>\n</li><li class=\" \">    <p>drag and drop the folder into the your home directory, to complete the installation    </p>\n</li></ul>    <p>    <img src=\"images/download/attachments/29004851/Install_Android_SDK_Tools.png\" alt=\"images/download/attachments/29004851/Install_Android_SDK_Tools.png\" class=\"confluence-embedded-image\">\n        </img></p>\n    </div>\n    </div>\n    <div class=\"section section-3 \" id=\"src-29004851_InstallingtheAndroidSDK-Windows\">\n        <h3 class=\"heading \"><span>Windows</span></h3>\n    <p>Note that the typical filesystem location of this software can be found in the <a class=\"document-link \" href=\"#!/guide/Software_Locations_and_Environment_Variables-section-src-29004844_SoftwareLocationsandEnvironmentVariables-WindowsSoftwareLocations\">Windows Software Locations</a> section of these guides.    </p>\n    <div class=\"section section-4 \" id=\"src-29004851_InstallingtheAndroidSDK-InstallingAndroidSDKToolsonWindows\">\n        <h4 class=\"heading \"><span>Installing Android SDK Tools on Windows</span></h4>\n    <p>Once you have downloaded the Android SDK Tools Installer, double-click to run it.    </p>\n<ul class=\" \"><li class=\" \">    <p>proceed to the <i class=\" \">Java SE Development Kit</i> stage and verify that <i class=\" \">Java SE Development Kit (JDK) version 1.6</i> has been found    </p>\n</li></ul>    <p>    <img src=\"images/download/attachments/29004851/android-sdk-tools-install-01.png\" alt=\"images/download/attachments/29004851/android-sdk-tools-install-01.png\" class=\"confluence-embedded-image\" width=\"500\">\n        </img></p>\n<ul class=\" \"><li class=\" \">    <p>at the <i class=\" \">Choose Install Location</i> step, verify that the <i class=\" \">Destination Folder</i> is the same as your <i class=\" \">Android SDK</i> <strong class=\" \">HOME</strong> folder, and correct if not. This path will be required when configuring Studio    </p>\n</li><li class=\" \">    <p>ensure that there is sufficient space for the installation    </p>\n</li></ul>    <p>    <img src=\"images/download/attachments/29004851/android-sdk-tools-install-02.png\" alt=\"images/download/attachments/29004851/android-sdk-tools-install-02.png\" class=\"confluence-embedded-image\" width=\"500\">\n        </img></p>\n<ul class=\" \"><li class=\" \">    <p>complete the installation    </p>\n</li></ul>    <p>Refer to the <a class=\"document-link \" href=\"#!/guide/Software_Locations_and_Environment_Variables-section-src-29004844_SoftwareLocationsandEnvironmentVariables-WindowsSoftwareLocations\">Windows Software Locations</a> section, and add the path of the <strong class=\" \">Android SDK Tools</strong> directory to your system&apos;s <tt class=\" \">PATH</tt>.    </p>\n    <p>Then proceed to the <a class=\"document-link \" href=\"#!/guide/Installing_the_Android_SDK-section-src-29004851_InstallingtheAndroidSDK-InstallingAndroidPackageswithAndroidSDKManager\">Installing Android Packages with Android SDK Manager</a> section.    </p>\n    </div>\n    </div>\n    </div>\n    <div class=\"section section-2 \" id=\"src-29004851_InstallingtheAndroidSDK-InstallingAndroidPackageswithAndroidSDKManager\">\n        <h2 class=\"heading \"><span>Installing Android Packages with Android SDK Manager</span></h2>\n    <p>The <i class=\" \">Android SDK Tools</i> package that has been installed contains the <i class=\" \">Android SDK Manager</i> that is used to install the rest of the Android SDK packages.    </p>\n    <p>Launching the <i class=\" \">Android SDK Manager</i> differs depending on the platform.    </p>\n<ul class=\" \"><li class=\" \">    <p>on macOS, launch its executable directly, at <tt class=\" \">~/android-sdk/tools/android</tt>    </p>\n</li><li class=\" \">    <p>on Windows, login under your usual user account, right-click the <i class=\" \">SDK Manager</i> from the Windows Start Menu and select <i class=\" \">Run as administrator</i>. Enter the Administrator password, if you are prompted for it    </p>\n</li></ul>    <p>In the Android SDK Manager, you will see different versions of the following items listed:    </p>\n<ul class=\" \"><li class=\" \">    <p><strong class=\" \">Android SDK Tools</strong> (mandatory) - includes the <i class=\" \">Android SDK Manager</i> and <i class=\" \">Android Virtual Device Manager</i> (<tt class=\" \">android</tt> executable)    </p>\n</li><li class=\" \">    <p><strong class=\" \">Android SDK Platform Tools</strong> (mandatory) - includes Android Debug Bridge, (<tt class=\" \">adb</tt> executable)    </p>\n</li><li class=\" \">    <p><strong class=\" \">SDK Platform</strong> - provides the libraries for building for a specific version of the Android OS that uses the standard Google APIs.    </p>\n</li><li class=\" \">    <p><strong class=\" \">Google APIs by Google Inc</strong> - provides the libraries for building for a specific version of Android that uses the <i class=\" \">enhanced</i> Google APIs (includes maps support).    </p>\n</li><li class=\" \">    <p><strong class=\" \">System Image</strong> - For Android API versions 14 and above, the emulator system images are packaged separately from the SDK Platform package. Three versions of the system images are provided &#x2013; ARM, Intel x86, and MIPS. The ARM system image is supplied by default in earlier SDK Platform packages, and corresponds to the hardware in most phones.    </p>\n</li></ul>    <p>Set the filter options at the bottom and select the required packages for installation.    </p>\n<ul class=\" \"><li class=\" \">    <p>Click <i class=\" \">Install x packages</i> button.    </p>\n</li></ul><ul class=\" \"><li class=\" \">    <p>Select <i class=\" \">Accept All</i> and click <i class=\" \">Install</i>.    </p>\n</li></ul><ul class=\" \"><li class=\" \">    <p>When the download completes, click <i class=\" \">Yes</i> to restart <tt class=\" \">adb</tt> and complete the installation.    </p>\n</li></ul>    <p>Refer to the <a class=\"document-link \" href=\"#!/guide/Titanium_Compatibility_Matrix-section-src-29004837_safe-id-VGl0YW5pdW1Db21wYXRpYmlsaXR5TWF0cml4LUFuZHJvaWRTREsvVGFyZ2V0QW5kcm9pZFBsYXRmb3Jt\">Titanium Compatibility Matrix</a> for the latest list of required packages.    </p>\n    <div class=\"section section-3 \" id=\"src-29004851_InstallingtheAndroidSDK-Installingx86EmulatorPackages\">\n        <h3 class=\"heading \"><span>Installing x86 Emulator Packages</span></h3>\n    <p>Some versions of the Android API are available with Intel x86 emulators. Look for the &quot;Intel x86 Atom System Image&quot; in the <i class=\" \">Android SDK Manager</i>.    </p>\n    <p>The x86 emulator may run faster than the standard ARM emulator, but may show minor differences with the ARM emulator. Extra software is required to take advantage of the x86 emulator &#x2013; see <a class=\"external-link external-link\" href=\"http://developer.android.com/tools/devices/emulator.html#accel-vm\" target=\"_blank\">Configuring Virtual Machine Acceleration</a> in the Android Tools documentation.    </p>\n    </div>\n    </div>\n    <div class=\"section section-2 \" id=\"src-29004851_InstallingtheAndroidSDK-UpdatingAndroidPackages\">\n        <h2 class=\"heading \"><span>Updating Android Packages</span></h2>\n    <p>    </p>\n    <div class=\"confbox admonition admonition-info aui-message hint shadowed information-macro\">\n            <p>Important to note!    </p>\n    </div>\n        <p>Every time you update your Android packages, you will need to delete any AVDs that have been replaced by new revisions, otherwise they won&#x2019;t be used. To do this, use the <i class=\" \">Android SDK Manager</i> <strong class=\" \">Tools &gt; Manage AVDs</strong> menu item to launch the <i class=\" \">Android Virtual Device Manager</i>.    </p>\n    <p>    <img src=\"images/download/attachments/29004851/android-avd-manager-01.png\" alt=\"images/download/attachments/29004851/android-avd-manager-01.png\" class=\"confluence-embedded-image\" width=\"500\">\n        </img></p>\n    <p>Unless you have modified any AVD&#x2019;s hardware configuration, it&#x2019;s easier to simply clear all existing AVDs altogether. Thus, select each one in turn and click the delete button to do this.    </p>\n    <p>    <img src=\"images/download/attachments/29004851/android-avd-manager-02.png\" alt=\"images/download/attachments/29004851/android-avd-manager-02.png\" class=\"confluence-embedded-image\" width=\"500\">\n        </img></p>\n    </div>\n    <div class=\"section section-2 \" id=\"src-29004851_InstallingtheAndroidSDK-ConfiguringStudio\">\n        <h2 class=\"heading \"><span>Configuring Studio</span></h2>\n    <p>To use the Android SDK with Studio, the path to the SDK must be set in the <strong class=\" \">Preferences</strong> dialog.    </p>\n<ol class=\" \"><li class=\" \">    <p>Open the Preferences dialog:    </p>\n<ol class=\" \"><li class=\" \">    <p>On macOS, from the menu bar, select <strong class=\" \">Appcelerator Studio</strong> &gt; <strong class=\" \">Preferences</strong>.    </p>\n</li><li class=\" \">    <p>On Windows, from the menu bar, select <strong class=\" \">Window &gt; Preferences</strong>.    </p>\n</li></ol></li><li class=\" \">    <p>In the<strong class=\" \"> Preferences</strong> dialog, navigate to<strong class=\" \"> Studio &gt; Platforms &gt; Android SDK</strong>.    </p>\n</li><li class=\" \">    <p>Set your Android SDK path. Enter the path to your Android SDK in the <strong class=\" \">Android SDK Home</strong> textbox or click the <strong class=\" \">Configure</strong> button to navigate to the SDK directory.    </p>\n</li><li class=\" \">    <p>Select your default Android SDK.  Select a <strong class=\" \">Google APIs</strong> item from the <strong class=\" \">Default Android SDK</strong> drop-down menu.    </p>\n</li></ol>    </div>\n    <div class=\"section section-2 \" id=\"src-29004851_InstallingtheAndroidSDK-ConfiguringtheCLI\">\n        <h2 class=\"heading \"><span>Configuring the CLI</span></h2>\n    <p>To use the Android SDK with the Titanium CLI, the path to the SDK must be set in the Titanium CLI configuration settings.  Run the following command and replace <tt class=\" \">/Users/appc/sdk/android-sdk/</tt> with the path to your Android SDK:    </p>\n    <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\">\n<div class=\"line\"><code class=\"plain\">titanium config android.sdk /Users/appc/sdk/android-sdk/</code></div>\n</div>\n    </div>\n    </div>\n        </div><a id=\"editButton\" href=\"https://wiki.appcelerator.org/pages/editpage.action?pageId=29004851\"><span>Edit</span></a>\n    \n        \n    </div>\n</body>\n</html>\n","title":"Installing the Android SDK"});