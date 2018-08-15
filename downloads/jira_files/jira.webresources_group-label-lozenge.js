;
/* module-key = 'jira.webresources:group-label-lozenge', location = '/includes/jira/admin/group-browser/group-label-lozenge.js' */
define("jira/admin/group-browser/group-label-lozenge",["jquery","jira/skate"],function($,skate){skate("group-label-lozenge",{type:skate.type.CLASSNAME,attached:function(element){$(element).tooltip({gravity:"w",html:true})}})});;
;
/* module-key = 'jira.webresources:group-label-lozenge', location = '/includes/jira/admin/group-browser/group-label-lozenge.soy' */
// This file was automatically generated from group-label-lozenge.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }


JIRA.Templates.groupLabelLozenge = function(opt_data, opt_ignored) {
  return '' + aui.lozenges.lozenge({text: opt_data.label.text, title: opt_data.label.title, isSubtle: true, extraClasses: 'group-label-lozenge'});
};
if (goog.DEBUG) {
  JIRA.Templates.groupLabelLozenge.soyTemplateName = 'JIRA.Templates.groupLabelLozenge';
}
;