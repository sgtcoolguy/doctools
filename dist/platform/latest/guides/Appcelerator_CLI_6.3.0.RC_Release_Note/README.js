Ext.data.JsonP['Appcelerator_CLI_6.3.0.RC_Release_Note']({"guide":"<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n        \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n    <title>Appcelerator CLI 6.3.0.RC - 17 October 2017</title>\n\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n    <meta content=\"Scroll EclipseHelp Exporter\" name=\"generator\">\n\n    <link type=\"text/css\" rel=\"stylesheet\">\n    <link type=\"text/css\" rel=\"stylesheet\">\n    <link type=\"text/css\" rel=\"stylesheet\" media=\"print\">\n</link></link></link></meta></meta></head>\n<body>\n    <div class=\"container\">\n        <div class=\"header\"/>\n\n        <div id=\"src-51252607\" class=\"content\">\n                        <h1>Appcelerator CLI 6.3.0.RC - 17 October 2017</h1>\n    <p>Appcelerator CLI 6.3.0.RC is a minor release that includes new features, improvements, and bug fixes.    </p>\n    <div class=\"section section-2 \" id=\"src-51252607_AppceleratorCLI6.3.0.RCReleaseNote-Componentversions\">\n        <h2 class=\"heading \"><span>Component versions</span></h2>\n    <p>The following components are shipped with CLI 6.3.0.RC:    </p>\n    <div class=\"tablewrap\">\n        <table class=\"confluenceTable\">\n        <thead class=\" \"/><tfoot class=\" \"/><tbody class=\" \">    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Alloy    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>    <span style=\"color: #032f62;\">\n1.10.5    </span>\n    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Arrow Builder    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>    <span style=\"color: #032f62;\">\n2.0.2    </span>\n    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Arrow Cloud CLI    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>    <span style=\"color: #032f62;\">\n2.0.7    </span>\n    </p>\n            </td>\n        </tr>\n    <tr>\n            <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>Titanium CLI    </p>\n            </td>\n                <td class=\"confluenceTd\" rowspan=\"1\" colspan=\"1\">\n        <p>    <span style=\"color: #032f62;\">\n5.0.14    </span>\n    </p>\n            </td>\n        </tr>\n</tbody>        </table>\n            </div>\n    </div>\n    <div class=\"section section-2 \" id=\"src-51252607_AppceleratorCLI6.3.0.RCReleaseNote-Newfeatures\">\n        <h2 class=\"heading \"><span>New features</span></h2>\n<ul class=\" \"><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-1069\" target=\"_blank\">CLI-1069</a> - Install hyperloop module directly through CLI command    </p>\n<ul class=\" \"><li class=\" \">    <p>Added support to install Hyperloop module    </p>\n</li></ul></li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-1250\" target=\"_blank\">CLI-1250</a> - Add support for allowing a proxy pac file to be specified in configuration    </p>\n<ul class=\" \"><li class=\" \">    <p class=\"gh-header-title\">Added support for proxy pac file support    </p>\n</li></ul></li></ul>    </div>\n    <div class=\"section section-2 \" id=\"src-51252607_AppceleratorCLI6.3.0.RCReleaseNote-Improvements\">\n        <h2 class=\"heading \"><span>Improvements</span></h2>\n<ul class=\" \"><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-717\" target=\"_blank\">CLI-717</a> - Improve feedback when creating a module    </p>\n<ul class=\" \"><li class=\" \">    <p>Updated the ti create command to update the logging.txt file when building a module    </p>\n</li></ul></li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-1180\" target=\"_blank\">CLI-1180</a> - CLI rebuild check should determine if a rebuild is needed from the modules version property in node    </p>\n<ul class=\" \"><li class=\" \">    <p>Updated the CLI rebuild service to prevent unnecessary module rebuilds    </p>\n</li></ul></li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-1215\" target=\"_blank\">CLI-1215</a> - appc-install improve subprocess npm rebuild    </p>\n<ul class=\" \"><li class=\" \">    <p>Improved <tt class=\" \">appc-install</tt> process to help prevent buffer overflow    </p>\n</li></ul></li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-1232\" target=\"_blank\">CLI-1232</a> - Update descriptions in appc cloud -help (ACS CLI)    </p>\n<ul class=\" \"><li class=\" \">    <p>Renamed some of the descriptions in the ACS CLI help to refer to new naming (API Runtime)    </p>\n</li></ul></li></ul>    </div>\n    <div class=\"section section-2 \" id=\"src-51252607_AppceleratorCLI6.3.0.RCReleaseNote-Fixedissues\">\n        <h2 class=\"heading \"><span>Fixed issues</span></h2>\n<ul class=\" \"><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-861\" target=\"_blank\">CLI-861</a> - The &quot;--output&quot; flag does not work with &quot;appc use&quot; command    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-931\" target=\"_blank\">CLI-931</a> - Alloy/Titanium via Unified CLI exits with code 0 while child process exits with 1    </p>\n</li><li class=\" \">    <p><a class=\"external-link external-link\" href=\"https://jira.appcelerator.org/browse/CLI-1176\" target=\"_blank\">CLI-1176</a> - appc -v with no cores installed throws TypeError    </p>\n</li></ul>    </div>\n        </div><a id=\"editButton\" href=\"https://wiki.appcelerator.org/pages/editpage.action?pageId=51252607\"><span>Edit</span></a>\n    \n        \n    </div>\n</body>\n</html>\n","title":"Appcelerator CLI 6.3.0.RC Release Note"});