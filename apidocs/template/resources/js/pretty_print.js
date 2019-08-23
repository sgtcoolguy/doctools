(function(){
	// Add .prettyprint class to all (pre > code) blocks
	var els = document.body.getElementsByTagName("pre");
	for (var i=0, len=els.length; i<len; i++) {
		var pre = els[i];

		if (pre.getElementsByTagName("code").length > 0) {
			pre.className += " prettyprint";
		}
	}

	prettyPrint();
})();
