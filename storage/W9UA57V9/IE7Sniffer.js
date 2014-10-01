 
jQuery(function(){	
var ie7notice = (function(){
	var 
	cookieIE7 = 'ie7detect',
	cookieObj = document.cookie.split(';'),
	cookieExists = function(cookieObj){
		for(var i=0;i < cookieObj.length;i++) {
			var c = cookieObj[i];
			while (c.charAt(0)==' '){
			c = c.substring(1,c.length);
			}
		
			if(c.indexOf(cookieIE7) == 0){
				return true;
			}
		
		}
		return false;
	
	},
	init = function() {
				if(!cookieExists(cookieObj)) {
					var $btag = jQuery('body');
					var content = "<div id='ie-container'><div id='ie-display'>" +
							"<p style='color:#666;'>" +
							"<img id='ie-ico-exclamation' src='/assets/img/ie6/ico.exclamation.gif' alt='Notice:' " +
							"name='ie-ico-exclamation'><strong>You are using an unsupported browser.</strong><br>" +
							"You may continue to search/browse IEEE Xplore, but new features may not work properly. "+
							"Please update your browser to a more current version from one of the " +
							"options below:</p><div id='browser-options'><a href='http://bit.ly/ie6-chrome'><img src='" + ASSETS_RELATIVE_PATH + "/img/ie6/chrome.gif' alt='Google Chrome' title='Google Chrome' /></a><a href='http://bit.ly/ie6-firefox'><img src='" + ASSETS_RELATIVE_PATH + "/img/ie6/ff.gif' alt='Mozilla Firefox' title='Mozilla Firefox' /></a><a href='http://bit.ly/ie6-ie'><img src='" + ASSETS_RELATIVE_PATH + "/img/ie6/ie.gif' alt='Microsoft Internet Explorer' title='Microsoft Internet Explorer' /></a><a href='http://bit.ly/ie6-opera '><img src='" + ASSETS_RELATIVE_PATH + "/img/ie6/opera.gif' alt='Opera'title='Opera' /></a><a href='http://bit.ly/ie6-safari'><img src='" + ASSETS_RELATIVE_PATH + "/img/ie6/safari.gif' alt='Apple Safari' title='Apple Safari' /></a></div><a id='close-ie' href='#'>Close</a></div></div>";
					$btag.prepend(content);

					var $ieContainer = jQuery('#ie-container');
					var $closeBtn = jQuery('#close-ie');

					$closeBtn.click(function() {
						$ieContainer.slideUp(250);
						document.cookie = 'ie7detect=true ; path=/;';
					});

				}
			};
	
	return {
	
	init: init
	
	}

})();
	var ie = (function() {

		var undef, v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');

		while(
		div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

		return v > 4 ? v : undef;

	}());


	if(ie < 8) {
		ie7notice.init();
	}
});
