if (window.location.href.indexOf('?mobile=') > -1) { // if the URL contains a mobile version, add a noindex meta element to the document
  var meta = document.createElement('meta');
  meta.name = 'robots';
  meta.content = 'noindex';
  document.getElementsByTagName('head')[0].appendChild(meta);
}
$(document).ready(function() {
  // Fix for close buttons on tabs. See https://jira.appcelerator.org/browse/TIDOC-3141
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
