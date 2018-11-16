;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/groupPickerUtil.js' */
define("jira/field/group-picker-util",["jira/ajs/list/item-descriptor","jira/ajs/list/group-descriptor","jquery"],function(ItemDescriptor,GroupDescriptor,jQuery){var formatResponse=function(data,showLabels){var ret=[];var template=showLabels?JIRA.Templates.GroupPickerUtil.formatResponseWithLabels:JIRA.Templates.GroupPickerUtil.formatResponse;jQuery(data).each(function(i,suggestions){var groupDescriptor=new GroupDescriptor({weight:i,label:suggestions.header});jQuery(suggestions.groups).each(function(){groupDescriptor.addItem(new ItemDescriptor({value:this.name,label:this.name,title:this.name,html:template(this),highlighted:true}))});ret.push(groupDescriptor)});return ret};return{formatResponseWithLabels:function(data){return formatResponse(data,true)},formatResponse:function(data,showLabels){return formatResponse(data,showLabels)}}});AJS.namespace("JIRA.GroupPickerUtil",null,require("jira/field/group-picker-util"));;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/templates/groupPickerUtil.soy' */
// This file was automatically generated from groupPickerUtil.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.GroupPickerUtil.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.GroupPickerUtil == 'undefined') { JIRA.Templates.GroupPickerUtil = {}; }


JIRA.Templates.GroupPickerUtil.formatResponseWithLabels = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.GroupPickerUtil.formatResponse(soy.$$augmentMap(opt_data, {showLabels: true}));
};
if (goog.DEBUG) {
  JIRA.Templates.GroupPickerUtil.formatResponseWithLabels.soyTemplateName = 'JIRA.Templates.GroupPickerUtil.formatResponseWithLabels';
}


JIRA.Templates.GroupPickerUtil.formatResponse = function(opt_data, opt_ignored) {
  var output = '<div class="group-suggestion-item"><span class="group-suggestion-item__name">' + soy.$$filterNoAutoescape(opt_data.html) + '</span>';
  if (opt_data.showLabels) {
    output += '<span class="group-suggestion-item__labels group-labels-lozenges">';
    var labelList13 = opt_data.labels;
    var labelListLen13 = labelList13.length;
    for (var labelIndex13 = 0; labelIndex13 < labelListLen13; labelIndex13++) {
      var labelData13 = labelList13[labelIndex13];
      output += JIRA.Templates.groupLabelLozenge({label: labelData13}) + ' ';
    }
    output += '</span>';
  }
  output += '</div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.GroupPickerUtil.formatResponse.soyTemplateName = 'JIRA.Templates.GroupPickerUtil.formatResponse';
}
;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/initMultiGroupPickers.js' */
define("jira/field/init-multi-group-pickers",["jquery","jira/ajs/select/multi-select","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/field/group-picker-util"],function(jQuery,MultiSelect,Reasons,Types,Events,GroupPickerUtil){function initMultiGroupPickers(ctx){ctx.find(".js-default-multi-group-picker").each(function(){var $el=jQuery(this);var showLabels=$el.data("show-labels")===true;var userName=$el.data("user-name");new MultiSelect({element:this,itemAttrDisplayed:"label",showDropdownButton:false,ajaxOptions:{data:function(query){return{userName:userName,query:query,exclude:$el.val()}},url:contextPath+"/rest/api/2/groups/picker",query:true,formatResponse:showLabels?GroupPickerUtil.formatResponseWithLabels:GroupPickerUtil.formatResponse}})})}Events.bind(Types.NEW_CONTENT_ADDED,function(e,context,reason){if(reason!==Reasons.panelRefreshed){initMultiGroupPickers(context)}})});;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/initSingleGroupPickers.js' */
define("jira/field/init-single-group-pickers",["jira/ajs/select/single-select","jquery","jira/ajs/list/item-descriptor","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/field/group-picker-util"],function(SingleSelect,jQuery,ItemDescriptor,Reasons,Types,Events,GroupPickerUtil){function initSingleGroupPickers(ctx){ctx.find(".js-default-single-group-picker").each(function(){var $el=jQuery(this);var $emptyValue=$el.find("option[data-empty]");var showLabels=$el.data("show-labels")===true;var userName=$el.data("user-name");new SingleSelect({element:this,itemAttrDisplayed:"label",revertOnInvalid:true,ajaxOptions:{data:function(query){return{userName:userName,query:query,exclude:$el.val()}},url:contextPath+"/rest/api/2/groups/picker",query:true,formatResponse:function(data){var formattedData=GroupPickerUtil.formatResponse(data,showLabels);if($emptyValue.length&&$el.val()!==""){formattedData.unshift(new ItemDescriptor({value:"",label:$emptyValue.text(),highlighted:true}))}return formattedData}}})})}Events.bind(Types.NEW_CONTENT_ADDED,function(e,context,reason){if(reason!==Reasons.panelRefreshed){initSingleGroupPickers(context)}})});;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/init/init-group-pickers-webresource.js' */
require("jira/field/init-multi-group-pickers");require("jira/field/init-single-group-pickers");;