
/*
  common_id = commonId
  qv = true/false --from QV or not
*/


var downloadWindow;

function openDocDownload (common_id, qv) {	
	var url = "docDownload.action?commonId=" + common_id;
	
	if (!ebrary.isLoggedin()){
		//alert(g_warning_bookshelf_login_required);
		var link = document.createElement('a');
		var keyString = "s_download";
		if(qv) {
			keyString = "q_download";
		} 
		
		var authModelWidth = 600;
		var authModelHeight = 500;
		if (ebrary.authType ==='sso' || ebrary.authType==='rpa') {
			authModelWidth = 600;
			authModelHeight = 300;
		}
		
    	link.setAttribute('href', 'showLoginDialog.action?key='+keyString);        	
    	ebrary.openTinyPopup(link, authModelWidth, authModelHeight);
	} else {	
		if (qv) {
		//	alert($('current_page_label').innerHTML);
			url += "&type=qv";
			url += "&page=" +$('current_page_label').innerHTML.strip();		
		}
		
	    downloadWindow = window.open(url,'popUpDocWindow','height=520,width=700,left=10,top=10,resizable=yes,scrollbars=yes');
	    downloadWindow.focus();
	}
	return false;
	
};


function finalDownload(commonId) {
	if(downloadWindow != null){
		downloadWindow.close();
	}
	if (typeof _gaq != "undefined") {	
	  _gaq.push(['_trackEvent', 'Download','FULL-ACS' , 'Full ACS download doc-id:'+commonId]);
	}
	var url = "docDownload.action?commonId=" + commonId + "&action=final_download"; 
	// window.open(url,'popfinalDownload');
    window.frames['final_download_frame'].document.location.href = url;	
}