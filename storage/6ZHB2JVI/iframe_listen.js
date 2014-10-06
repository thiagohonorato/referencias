var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
eventer(messageEvent, function (e) {
	var baseURL = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + location.pathname;
	//if (e.origin == 'http://site.ebrary.com') {}
	if(e.origin.indexOf(location.hostname) != -1  || e.origin.indexOf('ebrary') != -1){
		if(e.data && e.data !== 'undefined'){
			ebrary.hideTinyPopup('true',e.data);
		}else{
			ebrary.hideTinyPopup();
		}
	}
}, false);    