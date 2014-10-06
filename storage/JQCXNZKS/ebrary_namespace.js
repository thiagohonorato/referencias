var ebrary={};
var messageText="";
ebrary.delimiter = ";;;";
ebrary.authType = "";
ebrary.createCookie = function(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
};

ebrary.readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};

ebrary.eraseCookie= function(name) {
    createCookie(name,"",-1);
};

ebrary.keepLive = function(){
    new PeriodicalExecuter(function(pe) {
        new Ajax.Request('keepLive.action');},600);
};

ebrary.isLoggedin=function(){
    var loggedin = false;
    var link = 'loginCheck.json';
    if (window.location.protocol === "https:"){
        link = 'loginCheckSecure.json';
    }
    
    new Ajax.Request(link,{ method:'get',
        asynchronous: false,
        onSuccess:function(transport){
        var data = eval("(" + transport.responseText + ")");
        ebrary.authType = data.authType;
        if (!data.result){
            loggedin = false;
            return;
        }else{
            loggedin = true;
        }
    }});
    return loggedin;
};

ebrary.ignoreBrowserWarning = function(){
    ebrary.createCookie("IGNORE_BROWSER", "true");
};

ebrary.openTinyPopup = function (link, width, height) 
{
    var url = link.href;    
       
    var iframe = '<iframe id="popup_frame_id" width="' + width + '" height="' + height + '" frameBorder="0" scrolling="no" src="'+ link + '" /></iframe>';
   // issue: PRGDCP-3346, disabled animation in show tinybox cos the delay in load of the iframe in some browsers is causing Tinybox ts function to 
	// go to infinite loop rather than setting the height and display of tinycontent div to block. This in turn causes the page loading 
	// image to continue to show rather than the content. If u see view source u can see the content of the page and tinycontent div's display set to none.
	// YES, We could set the display to block when the page loads but when we submit the page (like save/update of profile) we would get the animated loading
	// back and may not always set the height of the page just to show "OK" message.
    TINY.box.show(iframe, 0, width+20, height+20);
    return (false);
};


ebrary.hideTinyPopup = function (isrefresh, link) 
{	
	if (isrefresh) {	// if the page has to refresh before hiding the tiny pop-up 
		if (isrefresh == 'true') {				
			 if (typeof link !== 'undefined' && link !== 'undefined' && link.length !=0 ) {  // if the page has to be redirected to an other page rather reloading the original parent page				 
				 link = link.indexOf("?") != -1 ? link + "&"  : link + "?";	
				 parent.location.href = link + "date=" + new Date();
			 } else {
		         parent.location.reload();	
			 }    
		}
	}		
	
//	window.close();			
	window.parent.TINY.box.hide(); 
	return (false);
};

ebrary.checkAndOpenTinyPop = function (keyType, actLink, width, height) {	
	if (!ebrary.isLoggedin()){
		authModelWidth = 600;
		authModelHeight = 500;
		
		if (typeof ebrary.authType === 'undefined') {
			//return true;
			 parent.location.href = 'login.action';		
			 return;
		}
		
		if (ebrary.authType ==='ebraryAuth' && keyType==='to_proceed') {
			return true;
		} 
		if (ebrary.authType ==='sso' || ebrary.authType==='rpa') {
			authModelWidth = 600;
			authModelHeight = 300;
		}
		var url = "showLoginDialog.action?";
		if (window.location.protocol === "https:"){
			url = "showLoginDialog.action?happySecure=1&";
		} 
		
		var link = document.createElement('a');         	     	
    	link.setAttribute('href', url +'testHeader=1&key='+keyType);        	
    	ebrary.openTinyPopup(link, authModelWidth, authModelHeight);			
	} else {	
	   if (typeof width !== 'undefined') {		 
		   ebrary.openTinyPopup(actLink, width, height);
	   } else {		  
		   parent.location.href = actLink;   //bookshelf
	   }	  
	}		
	 return (false);	
};




ebrary.pdaChangeConfirmation = function(){
	var stl_flag = false;
   	var org_sltFlag = false;	   
	if ($('isSTL_checkbox')) {	
		var stl_flag = $('isSTL_checkbox').checked;
	   	var org_sltFlag = $F('isSTL_original');	  
	}   	
	   	
		if ($('isPDA')) {	
		   	var pda_flag = $F('isPDA');
		   	var org_pdaFlag = $('pdaProfile') ? true : $F('isPDA_original') == 'false';	   
		   	// if both stl and pda
		   	if((pda_flag == 'true' && org_pdaFlag && stl_flag && org_sltFlag == 'false')|| (pda_flag == 'true' && !org_pdaFlag && stl_flag && org_sltFlag == 'false') 
		   			       || (pda_flag == 'true' && org_pdaFlag && stl_flag && org_sltFlag == 'true')) {
		   	   var langText = ['search_profile.confrim.pda_stl'];
			   ebrary.callAjaxLangUpdate(langText);		  
			   return confirm(messageText);		    
		   	} // if only stl
		   	if (pda_flag == 'false' && stl_flag && org_sltFlag == 'false' ) {
		   		var langText = ['search_profile.confrim.stl_only'];
		   		ebrary.callAjaxLangUpdate(langText);		  
				return confirm(messageText);			 
		   	}	// if only pda
		   	if (pda_flag == 'true' && org_pdaFlag && !stl_flag) {
		   		var langText = ['search_profile.confrim.pda_only'];
				ebrary.callAjaxLangUpdate(langText);			  
				return confirm(messageText);			
		  	} 	  
		} else {
			if (stl_flag && org_sltFlag == 'false') {
				var langText = ['search_profile.confrim.stl_only'];
		   		ebrary.callAjaxLangUpdate(langText);		  
				return confirm(messageText);
			}
		}
	
	return true;
	
};

ebrary.storeAcquisitionQuery = function(){	
    var paras = {"query": $F('search_query')};
    var result = true;
    new Ajax.Request("pdaProfile.action?action=storeQuery", {method:'post',asynchronous: false, parameters:paras,
    	onSuccess:function(t){
    		if (t.responseText){
    		//	alert(t.responseText);
    			// issue: PRGDCP-3346, disabled animation in show tinybox cos the delay in load of the iframe in some browsers is causing Tinybox ts function to 
    			// go to infinite loop rather than setting the height and display of tinycontent div to block. This in turn causes the page loading 
    			// image to continue to show rather than the content. If u see view source u can see the content of the page and tinycontent div's display set to none.
    			// YES, We could set the display to block when the page loads but when we submit the page (like save/update of profile) we would get the animated loading
    			// back and may not always set the height of the page just to show "OK" message. 
    			TINY.box.show(t.responseText, 0, 900, 225);
    			result = false;
    		}
    	}});    
    return result;
};

ebrary.waitAndSetFocus = function() {
	if($('simple_search')){
       if(! $('simple_search').present())  $('simple_search').activate();
    }
  };
 
  
ebrary.callAjaxLangUpdate = function(langText, idList) {	
		var url = "ajaxUtilController.action?langText=";
		new Ajax.Request(url+langText.join(ebrary.delimiter), { 
			asynchronous: false,
		    onComplete: function(transport) { 
				//alert(transport.responseText);
				ebrary.ajaxResponseHandle(transport.responseText, idList);								
			}  			
	    });			
};

ebrary.ajaxResponseHandle = function(respText, idList) {
	if (idList && idList != '') {
		var resultLangText = respText.split(ebrary.delimiter);	
		for (var i=0; i < idList.length; i++) {	
			$(idList[i]).update(resultLangText[i]);	
			/*	
			if($(idList[i]).nodeName == 'SPAN' || $(idList[i]).nodeName == 'DIV') {						
				$(idList[i]).update(resultLangText[i]);			
			} else if($(idList[i]).nodeName == 'INPUT') {					
				$(idList[i]).label = resultLangText[i];			
			}   */
		}	
	} else {
		messageText = respText;
	}		
};


ebrary.popup_waitAndSetHeights = function() {
//	alert("ebrary.popup_waitAndSetHeights");
	 var frame_content = $('frame_main_content');
	 if (!frame_content){
		 return;
	 }
	 
	 // the below if can fix PRGDCP-3346 but may not srink the window when a submit is done (Ok - message) 
	// if( parent.document.getElementById("tinycontent").style.display = "none") {parent.document.getElementById("tinycontent").style.display = "block";}
	 var frame_ht =  $('frame_main_content').getStyle('height');
     var frame_height = parseInt(frame_ht.sub("px", ""));		   
     var frame_off_height = document.getElementById("frame_main_content").offsetHeight;     
     var ht = frame_off_height == 0? frame_height: frame_off_height;     ;
 	 parent.document.getElementById("tinybox").style.height = ht + 10 +"px";  	
     parent.document.getElementById("tinycontent").style.height = ht + 5 +"px";
     parent.document.getElementById("popup_frame_id").style.height = ht + 3 +"px";
    
  	 // set focus to OK or Cancel buttons 
  	 if($('ok_button')) {
		$('ok_button').focus();
	  } else if ($('cancel_btn')) {
		$('cancel_btn').focus();
	  }
};

ebrary.addGaEvents = function(action, label , comment){
	// google analytics code    
   	if (typeof _gaq != "undefined") {	
   	   _gaq.push(['_trackEvent', action, label , comment]);    
    }	
}
 
