: << 'comment'
The following (old) pages need to have a stub page on the Docs site that redirect to the pages below:
http://docs.appcelerator.com/platform/latest/#!/guide/Appcelerator_Studio_Release_Notes
http://docs.appcelerator.com/platform/latest/#!/guide/Appcelerator_Studio
http://docs.appcelerator.com/platform/latest/#!/guide/Appcelerator_Studio_Getting_Started

Redirect targets:
http://docs.appcelerator.com/platform/latest/#!/guide/Axway_Appcelerator_Studio_Release_Notes
http://docs.appcelerator.com/platform/latest/#!/guide/Axway_Appcelerator_Studio
http://docs.appcelerator.com/platform/latest/#!/guide/Axway_Appcelerator_Studio_Getting_Started

Functions:
1. Take a list of pages and set up redirects
2. Create the stub pages
3. Populate the stub pages with redirects
4. Copy the stub pages into the ../doctools/htmlguides directory right after the Confluence content has been downloaded

comment

OLD_PAGES=(
  Appcelerator_Studio_Release_Notes
  Appcelerator_Studio
  Appcelerator_Studio_Getting_Started
 )
 NEW_NAMES=(
  "Axway Appcelerator Studio Release Notes"
  "Axway Appcelerator Studio"
  "Axway Appcelerator Studio Getting Started"
 )
 TARGETS=(
  Axway_Appcelerator_Studio_Release_Notes
  Axway_Appcelerator_Studio
  Axway_Appcelerator_Studio_Getting_Started
 )

 if [ ! -d $TI_ROOT/doctools/temp_studio_pages ]; then
   cd $TI_ROOT/doctools
   mkdir temp_studio_pages
 fi

cd $TI_ROOT/doctools/temp_studio_pages

## content to be pushed into the stub pages:
: << 'comment'
<!DOCTYPE html>
<html>
<head>
  <title>${NEW_NAMES[i]} - Appcelerator Docs</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="chrome=1">
  <meta name="fragment" content="!">
  <meta name="viewport" content="width=1024">

  <script type='text/javascript'>
(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))window.location=b})(navigator.userAgent||navigator.vendor||window.opera,'?mobile');

</script>

  <link rel="shortcut icon" type="image/ico" href="favicon.ico" />
  <link rel="stylesheet" href="resources/css/app-6a9395ab1ab9cc657f511022c846b1ee.css" type="text/css" />

  <!-- Keep this outside of BEGIN/END CSS comments, otherwise rake task <fails class=""></fails> -->
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

  <!-- Unified nav additions -->
  <script type="text/javascript" src="//platform.appcelerator.com/unified-nav.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

  <script type="text/javascript" src="extjs/ext-all.js"></script>
  <script type="text/javascript" src="data-c819e56d2cbbc6c5f0e8b18d756940d5.js"></script>

  <script type="text/javascript" src="app-1b6efd235bd3b5dbd6a27eba7a65f6e6.js"></script>

  <link rel='stylesheet' href='resources/css/my.css' type='text/css'><link rel='stylesheet' href='resources/css/common.css' type='text/css'>

</head>
<body id="ext-body">


<p>
<div id="redirectBox">This page will be redirected to <a href="#!/guide/${TARGETS[i]" rel="nofollow">${NEW_NAMES[i]}</a> in 5 seconds.</div>

<script type="text/javascript">//<![CDATA[

	function Redirect() {
		window.location="#!/guide/${TARGETS[i]";
	}
	setTimeout('Redirect()', 5000);

//]]>
</script></p>



<div id='footer-content' style='display: none'/>
  <script type="text/javascript">Docs.otherProducts = [ {text: 'Appcelerator Platform',href: '../../platform/latest/'}, {text: 'ArrowDB',href: '../../arrowdb/latest/'} ] </script>

<script src="//munchkin.marketo.net/munchkin.js"></script>
<script>try { mktoMunchkin("636-NHJ-871"); } catch (err) {}</script>
<script>
var _qoptions={qacct:"p-4aHbaizUurMCQ"},
	_gaq=[['_setAccount','UA-5155164-11'],['_setDomainName','none'],['_setAllowLinker',true],['_setAllowAnchor',true],['_setAllowHash',false],['_addIgnoredOrganic',document.location.host],['_initData'],['_trackPageview']];

(function(d) {
function load(u){var s=d.getElementsByTagName('script')[0],sc=d.createElement('script');sc.async=true;sc.src=u;s.parentNode.insertBefore(sc,s);}

load('//www.google-analytics.com/ga.js');
load('//api.appcelerator.net/p/beacon.js');
load('//api.appcelerator.net/p/analytics.js');
load('//edge.quantserve.com/quant.js');

function cc(l,n,s){if(!l||!n||!s||l==''||n==''||s==''){return'-'}var i,i2,i3,c='1';i=l.indexOf(n);i3=n.indexOf('=')+1;if(i>-1){i2=l.indexOf(s,i);if(i2<0){i2=l.length}c=l.substring((i+i3),i2)}return c};
window._gaToMarketo=function(){var gaCookie=cc(document.cookie,'__utmz=',';');return {cf_campaign:cc(gaCookie,'utmccn=','|'),cf_source:cc(gaCookie,'utmsrc=','|'),cf_medium:cc(gaCookie,'utmcmd=','|'),cf_content:cc(gaCookie,'utmcct=','|'),cf_keyword:cc(gaCookie,'utmctr=','|'),cf_visits:cc(document.cookie,'__utma=',';').split('.')[5]}};
})(document);
</script>
<noscript><img src="http://pixel.quantserve.com/pixel/p-4aHbaizUurMCQ.gif" style="border:0;display:none;" height="1" width="1" alt="Quantcast"/></noscript>

  <script type="text/javascript">
  (function(){
    var protocol = (document.location.protocol === "https:") ? "https:" : "http:";
    document.write("<link href='"+protocol+"//fonts.googleapis.com/css?family=Exo' rel='stylesheet' type='text/css' />");
  })();
  </script>

</body>
</html>
comment

#content="cheese"
content="
<!DOCTYPE html>
<html>
<body>
<h1>cheese</h1>
</body>
</html>
"

## ** Figure out if I can create a template file (for the html content) and push it into this script replacing key areas with items in the arrays

 for ((i = 0; i < ${#OLD_PAGES[@]}; i++))
   do
     echo "Creating ${OLD_PAGES[i]}.html which targets ${TARGETS[i]}"
     rm ${OLD_PAGES[i]}.html
     touch ${OLD_PAGES[i]}.html
     echo $content > ${OLD_PAGES[i]}.html
   done
