// Fix for close buttons on tabs. See https://jira.appcelerator.org/browse/TIDOC-3141
$(document).ready(function() {
  $('div.r a.icon-cancel-1.close').each(function() {
      $(this).text('x');
      $(this).css('text-align','center');
  });
  $('body').on('click', function() {
    $('div.r a.icon-cancel-1.close').each(function() {
        $(this).text('x');
        $(this).css('text-align','center');
    });
  });
});
