Ext.data.JsonP['Appcelerator_CLI_Troubleshooting']({"guide":"<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n        \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n    <title>Appcelerator CLI Troubleshooting</title>\n\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n    <meta content=\"Scroll EclipseHelp Exporter\" name=\"generator\">\n\n    <link type=\"text/css\" rel=\"stylesheet\">\n    <link type=\"text/css\" rel=\"stylesheet\">\n    <link type=\"text/css\" rel=\"stylesheet\" media=\"print\">\n</link></link></link></meta></meta></head>\n<body>\n    <div class=\"container\">\n        <div class=\"header\"/>\n\n        <div id=\"src-43299941\" class=\"content\">\n                        <h1>Appcelerator CLI Troubleshooting</h1>\n    <p>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Appcelerator_CLI_Troubleshooting-section-src-43299941_AppceleratorCLITroubleshooting-Overview\">Overview</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Appcelerator_CLI_Troubleshooting-section-src-43299941_AppceleratorCLITroubleshooting-Submittingabug\">Submitting a bug</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Appcelerator_CLI_Troubleshooting-section-src-43299941_AppceleratorCLITroubleshooting-Errors\">Errors</a>    </p>\n<ul class=\"toc-indentation \"><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Appcelerator_CLI_Troubleshooting-section-src-43299941_AppceleratorCLITroubleshooting-PleaseRe-TryThisInstallAgain\">Please Re-Try This Install Again</a>    </p>\n</li><li class=\" \">    <p><a class=\"document-link \" href=\"#!/guide/Appcelerator_CLI_Troubleshooting-section-src-43299941_AppceleratorCLITroubleshooting-Applicationdeploymentfailed\">Application deployment failed</a>    </p>\n</li></ul></li></ul>    <div class=\"section section-2 \" id=\"src-43299941_AppceleratorCLITroubleshooting-Overview\">\n        <h2 class=\"heading \"><span>Overview</span></h2>\n    <p>When running into issues with the Appcelerator CLI, there are some simple steps to figure out additional information    </p>\n    </div>\n    <div class=\"section section-2 \" id=\"src-43299941_AppceleratorCLITroubleshooting-Submittingabug\">\n        <h2 class=\"heading \"><span>Submitting a bug</span></h2>\n    <p>Refer to <a class=\"external-link external-link\" href=\"https://docs.axway.com/bundle/Appcelerator_Studio_allOS_en/page/reporting_bugs_or_requesting_features.html\" target=\"_blank\">Reporting Bugs or Requesting Features</a> for more information. Check JIRA first as the issue may already have been reported with a fix or workaround. When submitting a bug, it is often helpful to provide a stack trace. You can do so by running the CLI with an extra parameter of DEBUG=* before the regular command and a trace flag after the regular command. For example (replace &lt;command. with the actual command):    </p>\n    <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                    <div class=\"title\">OS X/Linux</div>\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\" data-title=\"OS X/Linux\">\n<div class=\"line\"><code class=\"plain\">DEBUG=* appc &lt;</code><code class=\"functions\">command</code><code class=\"plain\">&gt; -l trace</code></div>\n</div>\n    </div>\n    <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                    <div class=\"title\">Windows</div>\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\" data-title=\"Windows\">\n<div class=\"line\"><code class=\"plain\">cmd </code><code class=\"plain\">/C</code><code class=\"plain\"> </code><code class=\"string\">&quot;set DEBUG=* &amp;&amp; appc &lt;command&gt; -l trace&quot;</code></div>\n</div>\n    </div>\n    <p>Another useful piece of information is which version of Node you are running and which <strong class=\" \">versions</strong> of the Appc CLI you are using. Here are some useful commands to get the Appc CLI versions:    </p>\n    <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\">\n<div class=\"line\"><code class=\"plain\">npm </code><code class=\"functions\">ls</code><code class=\"plain\"> -g appcelerator </code><code class=\"comments\"># shows you the version of Appc CLI from NPM that is currently installed</code></div>\n<div class=\"line\"><code class=\"plain\">$ npm </code><code class=\"functions\">ls</code><code class=\"plain\"> -g appcelerator</code></div>\n<div class=\"line\"><code class=\"plain\">/usr/local/lib</code></div>\n<div class=\"line\"><code class=\"plain\">&#x2514;&#x2500;&#x2500; appcelerator@0.3.44 </code></div>\n<div class=\"line\"><code class=\"plain\">&#xA0;</code></div>\n<div class=\"line\"><code class=\"plain\">appc use </code><code class=\"comments\"># shows you the version of Appc CLI from Registry that is currently selected and installed</code></div>\n<div class=\"line\"><code class=\"plain\">$ appc use</code></div>\n<div class=\"line\"><code class=\"plain\">The following versions are available:</code></div>\n<div class=\"line\">&#xA0;</div>\n<div class=\"line\"><code class=\"plain\">0.2.242    Installed (Active)                       </code></div>\n<div class=\"line\"><code class=\"plain\">0.2.241    Installed                                </code></div>\n<div class=\"line\"><code class=\"plain\">0.2.230    Installed                                </code></div>\n<div class=\"line\"><code class=\"plain\">0.2.229    Not Installed                            </code></div>\n<div class=\"line\"><code class=\"plain\">0.2.228    Not Installed                   </code></div>\n</div>\n    </div>\n    </div>\n    <div class=\"section section-2 \" id=\"src-43299941_AppceleratorCLITroubleshooting-Errors\">\n        <h2 class=\"heading \"><span>Errors</span></h2>\n    <div class=\"section section-3 \" id=\"src-43299941_AppceleratorCLITroubleshooting-PleaseRe-TryThisInstallAgain\">\n        <h3 class=\"heading \"><span>Please Re-Try This Install Again</span></h3>\n    <p>This error manifests items in several different ways, such as:    </p>\n<ul class=\" \"><li class=\" \">    <p>Invalid file download checksum. This could be a result of the file being modified in transit or it could be because the download was interrupted or had an error....Please re-try this install again.    </p>\n</li><li class=\" \">    <p>Server responded with unexpected error: SSL authorization failed. URL: <a class=\"external-link external-link\" href=\"http://appc-registry-server-distribution.s3.amazonaws.com/\" target=\"_blank\">appc-registry-server-distribution.s3.amazonaws.com</a> does not have a valid fingerprint which can be used to verify the SSL certificate...Please re-try your install again. If you continue to have this problem, please contact Appcelerator Support at support@appcelerator.com.    </p>\n</li></ul>    <p>This is often best solved by two options: reinstalling the appcelerator command line via NPM or logging out with -D:    </p>\n    <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                    <div class=\"title\">Reinstall</div>\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\" data-title=\"Reinstall\">\n<div class=\"line\"><code class=\"plain\">[</code><code class=\"functions\">sudo</code><code class=\"plain\">] npm </code><code class=\"functions\">install</code><code class=\"plain\"> -g appcelerator</code></div>\n<div class=\"line\"><code class=\"plain\">appc use latest</code></div>\n</div>\n    </div>\n    <div class=\"confbox programlisting defaultnew syntaxhighlighter scroll-html-formatted-code\">\n                    <div class=\"title\">Log out -D</div>\n                <div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"defaultnew syntaxhighlighter scroll-html-formatted-code\" data-title=\"Log out -D\">\n<div class=\"line\"><code class=\"plain\">appc </code><code class=\"functions\">logout</code><code class=\"plain\"> -D</code></div>\n<div class=\"line\"><code class=\"plain\">appc login </code><code class=\"comments\"># reauthenticate again with access code</code></div>\n</div>\n    </div>\n    </div>\n    <div class=\"section section-3 \" id=\"src-43299941_AppceleratorCLITroubleshooting-Applicationdeploymentfailed\">\n        <h3 class=\"heading \"><span>Application deployment failed</span></h3>\n<ul class=\" \"><li class=\" \">    <p>Application deployment failed. Error was: Error: Error loading connector/appc.arrowdb. RequestSSLError: SSL authorization failed. URL: <a class=\"external-link external-link\" href=\"http://api.cloud.appcelerator.com/\" target=\"_blank\">api.cloud.appcelerator.com</a> does not have a valid fingerprint which can be used to verify the SSL <a class=\"external-link external-link\" href=\"http://certificate.at/\" target=\"_blank\">certificate.</a>    </p>\n</li></ul>    </div>\n    </div>\n        </div><a id=\"editButton\" href=\"https://wiki.appcelerator.org/pages/editpage.action?pageId=43299941\"><span>Edit</span></a>\n    \n        \n    </div>\n</body>\n</html>\n","title":"Appcelerator CLI Troubleshooting"});