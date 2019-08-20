<?php

$rnVersion = isset($_GET['version']) ? trim($_GET['version']) : TITANIUM_MOBILE_LATEST_VERSION;

//Start by verifying the requested release notes exist
$rnFile = realpath( dirname(__FILE__)) . '/' . $rnVersion . '.html';

if (file_exists($rnFile) && is_readable($rnFile)) {
	$rnInnerHTML = file_get_contents($rnFile);
} else {
	header("Location: " . DOCS_SITE_URL . "/404.html");
	exit;
}

?>

<!doctype html>
<html dir="ltr" lang="en-US">
	<head>
		<link href="../../css/normalize.css" rel="stylesheet" type="text/css" />
		<link href="../../css/nav.css" rel="stylesheet" type="text/css" />
		<link href="//fonts.googleapis.com/css?family=Open+Sans:400,700,800,700italic|PT+Sans:400,700|Droid+Sans+Mono" rel="stylesheet" type="text/css" />
        <script src="//platform.appcelerator.com/unified-nav.js"></script>
		<link rel="stylesheet" href="../../css/docs.css" type="text/css" media="screen" charset="utf-8">
	</head>
	<body>
		<div id="page-container">
			<div class="squeeze">
				<p class="rn-title">Release Notes</p>
				<?php echo $rnInnerHTML; ?>
			</div>
		</div> 
	</body>
</html>
