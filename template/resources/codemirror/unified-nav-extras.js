
var AppcDocsSite = {
	title: document.title.substring(0, document.title.indexOf('-') - 1),
	requestId: 0,
	previousTerm: null,
	currentResults: [],
	currentIndex: 0,
	prev: 0,
	next: 0,
	cancelDismiss: false,
	timer: 0,
	KEYUP_DELAY_MS: 250,
	DISMISS_DELAY_MS: 500,

	/*
	 * Construct the products menu
	 * Docs.otherProducts is generated by JSDuck
	 */
	makeProductMenu: function  () {
		var items = [];
		Docs.otherProducts.forEach(function (product) {
			if (product.text === AppcDocsSite.title) {
				return;
			}
			items.push('<a href="' + product.href + '">' + product.text + '</a>');
		});
		return '<div id="appc-docs-products-menu">' + items.join('\n') + '</div>';
	},

	/*
	 * Display or hide the product menu
	 */
	displayMenu: function () {
		var menu = document.getElementById('appc-docs-products-menu');
		if (menu.style.display === 'block') {
			menu.style.display = 'none';
		} else {
			menu.style.display = 'block';
		}
	},

	/*
	 * Hides the results dropdown
	 */
	hideResults: function () {
		var searchField = document.getElementById('appc-docs-search-results');
		searchField.style.display = 'none';
		searchField.innerHTML = null;
	},

	/*
	 * Dismiss the results dropdown if the search field loses focus
	 * Wait a while in case prev/next buttons were pressed
	 */
	dismissResults: function () {
		AppcDocsSite.cancelDismiss = false;
		setTimeout(function () {
			if (!AppcDocsSite.cancelDismiss) {
				AppcDocsSite.hideResults();
			}
		}, AppcDocsSite.DISMISS_DELAY_MS);
	},

	/*
	 * Clear results
	 */
	clearResults: function () {
		document.getElementById('appc-docs-search-form').value = '';
		AppcDocsSite.prev = 0;
		AppcDocsSite.next = 0;
		AppcDocsSite.previousTerm = '';
		AppcDocsSite.currentResults = [];
		AppcDocsSite.currentIndex = 0;
		AppcDocsSite.dismissResults();
	},

	/*
	 * Paginate and display the results
	 */
	displayResults: function (results, startIndex) {
		AppcDocsSite.cancelDismiss = true;
		document.getElementById('appc-docs-search-form').focus();
		if (startIndex === undefined) {
			startIndex = 0;
		}
		AppcDocsSite.currentIndex = startIndex;

		var i = 0,
			items = [],
			searchField = document.getElementById('appc-docs-search-results'),
			limit = results.length - startIndex,
			last = '';

		AppcDocsSite.hideResults();

		if (limit > 10) {
			limit = 10;
		} else if (limit <= 0) {
			return;
		}
		searchField.style.display = 'block';

		for (i = startIndex; i < startIndex + limit; i++) {
			var listItem = '';
			listItem += '<a href="' + results[i].url + '" onClick="AppcDocsSite.hideResults()">';
			listItem += '<div class="appc-docs-results-name">';
			listItem += '<b class="' + results[i].icon + '"></b>';
			listItem += results[i].name + '</div>';
			listItem += '<div class="appc-docs-results-fullname">' + results[i].fullName + '</div>';
			listItem += '</a>';
			items.push(listItem);
		}
		if (results.length > 10) {
			var endValue = (startIndex + 10 > results.length) ? results.length : startIndex + 10;
			AppcDocsSite.next = (startIndex + 10 > results.length) ? startIndex : startIndex + 10,
			AppcDocsSite.prev = (startIndex - 10 < 0) ? 0 : startIndex - 10;
			AppcDocsSite.currentResults = results;
			last += '<div id="appc-docs-results-last">';
			last += '<b id="appc-docs-results-prev" class="icon-collapse-left" onClick="AppcDocsSite.displayResults(AppcDocsSite.currentResults, AppcDocsSite.prev)">&#60;</b>';
			last += '<span id="appc-docs-results-stats">' + (startIndex + 1) + ' - ' + endValue + ' / ' + results.length + '</span>';
			last += '<b id="appc-docs-results-next" class="icon-expand-right" onClick="AppcDocsSite.displayResults(AppcDocsSite.currentResults, AppcDocsSite.next)">&#62;</b>';
		}
		searchField.insertAdjacentHTML('afterbegin', items.join('\n') + last);
	},

	/*
	 * Redisplay results when search field regains focus
	 */
	redisplayResults: function () {
		AppcDocsSite.displayResults(AppcDocsSite.currentResults, AppcDocsSite.currentIndex);
	},

	/*
	 * Search SOLR then rank results
	 */
	search: function () {

		var term = document.getElementById('appc-docs-search-form').value;
		// skip search when query hasn't changed.
		if (term === AppcDocsSite.previousTerm) {
			return;
		} else if (term === '' || term.length === 0) {
			AppcDocsSite.hideResults();
			AppcDocsSite.currentResults = [];
			AppcDocsSite.currentIndex = 0;
			return;
		}
		AppcDocsSite.previousTerm = term;

		var url = window.location.href,
			type = 'platform',
			suffix = '*',
			match = term.match(/\"/g);

		// Switch to correct product
		if (url.match(/titanium/g)) {
			type = 'titanium';
		}
		else if (url.match(/cloud/g)) {
			type = 'cloud';
		}
		else if (url.match(/arrowdb/g)) {
			type = 'arrowdb';
		}

		// Do a wildcard search unless we are doing so already
		if (match && match.length % 2 == 1) {
			suffix = '*"';
		}
		else if (term.match(/\*$/)) {
			suffix = "";
		}
		else if (match && match.length % 2 == 0 && term.match(/\"$/)) {
			suffix = "";
		}
		else if (term.match(/ $/)) {
			suffix = "";
		}

		// Do the search
		Ext.Ajax.request({
			url: '//docs.appcelerator.com/solrsearch.php',
			method: 'GET',
			params: {
				query:encodeURIComponent(term + suffix),
				type:type
			},
			callback: function(options, success, response) {
				var rv = [],
					keyword_match = [],
					name_match = [];
				if (success && response && response.requestId > AppcDocsSite.requestId) {
					// If successful, retrieve and prepare results
					var results = JSON.parse(response.responseText);
					AppcDocsSite.requestId = response.requestId;
					results.response.docs.forEach(function(doc) {
						Object.keys(doc).forEach(function(k) {
							if (Array.isArray(doc[k])) {
								doc[k] = doc[k][0];
							}
						});
						if ("title" in doc) {
							var elem, re;
							elem = {
								fullName: doc.title,
								name: doc.title,
								url: '#!/guide/' + doc.url,
								icon: 'icon-newspaper',
								meta: {}
							};
							// If result matches title name, store in separate array
							// to be pushed at beginning of results
							re = new RegExp(term, 'gi');
							if (doc.title.match(re)) {
								name_match.push(elem);
							} else {
								rv.push(elem);
							}
						}
						else if ("name" in doc) {
							var api_type = 'class',
								tokens = doc.name.split('.'),
								api_name,
								elem = {},
								re,
								icon = 'platform-icon-link';

							// Determine API type
							if (doc.url.match(/\-method\-/g)) {
								api_type = 'method';
								icon = 'platform-icon-cog';
							}
							else if (doc.url.match(/\-event\-/g)) {
								api_type = 'event';
								icon = 'platform-icon-flash';
							}
							else if (doc.url.match(/\-property\-/g)) {
								api_type = 'property';
								icon = 'platform-icon-menu';
							}

							api_name = tokens[tokens.length - 1];
							elem = {
								fullName: doc.name,
								name: api_name,
								url: '#!/api/' + doc.url,
								icon: icon,
								meta: {}
							};
							// If result matches API name, store in separate arrays
							// to be pushed at beginning of results
							api_name = api_name.toLowerCase();
							doc.name = doc.name.toLowerCase();
							term = term.toLowerCase();
							re = new RegExp(term.replace(/\./g, '\\.'), 'gi');
							if (api_name === term || doc.name === term) {
								name_match.unshift(elem);
							}
							else if (api_name.indexOf(term) == 0 || doc.name.indexOf(term) == 0) {
								name_match.push(elem);
							}
							else if (doc.name.match(re)) {
								keyword_match.push(elem);
							} else {
								rv.push(elem);
							}
						}
					});

					// Place API name matches ahead of others
					rv = name_match.concat(keyword_match.concat(rv));
					AppcDocsSite.displayResults(rv);
				}
			}
		});
	},

	/*
	 * Delay search operation
	 */
	delayedSearch: function () {
	    if (AppcDocsSite.timer)
	        window.clearTimeout(AppcDocsSite.timer);
	    AppcDocsSite.timer = window.setTimeout(function() {
	        AppcDocsSite.search();
	    }, AppcDocsSite.KEYUP_DELAY_MS);
	},

	/*
	 * Add products drop-down and search field
	 */
	doLoad: function() {
		var title = document.getElementById('appc-unified-header-sitename'),
			rightside = document.getElementById('appc-unified-header-nav').getElementsByClassName('pull-right'),
			dropdown = null,
			searchForm = null;

		title.innerHTML = 'Documentation';
		title.className = title.className + ' active';
		title.insertAdjacentHTML('afterend', '<div id="appc-docs-products"><span style="cursor:pointer">' + AppcDocsSite.title + '</span> <b class="caret"></b></span>' + AppcDocsSite.makeProductMenu() + '</div>');
		dropdown = document.getElementById('appc-docs-products');
		dropdown.onclick = AppcDocsSite.displayMenu;

		rightside[0].insertAdjacentHTML('afterbegin', '<span><div id="appc-docs-search"><i class="platform-icon-search"></i><input type="text" id="appc-docs-search-form" placeholder="Search Docs"></input><i id="appc-docs-search-cancel" class="platform-icon-cancel"></i></div><div id="appc-docs-search-results"/></span>');
		searchForm = document.getElementById('appc-docs-search-form');
		searchForm.onkeyup = AppcDocsSite.delayedSearch;
		searchForm.onblur = AppcDocsSite.dismissResults;
		searchForm.onfocus = AppcDocsSite.redisplayResults;
		searchCancel = document.getElementById('appc-docs-search-cancel');
		searchCancel.onclick = AppcDocsSite.clearResults;

	}
};

$(document).ready(AppcDocsSite.doLoad);
