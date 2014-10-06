/*
 * ============================================================================
 *
 *  COPYRIGHT NOTICE:
 *
 *  Copyright (c) 2004 - ebrary,inc. All Rights Reserved.
 *
 *  This work is subject to U.S. and international copyright laws and
 *  treaties.  No part of this work may be used, practiced, performed,
 *  copied, distributed, revised, modified, translated, transformed,
 *  condensed, expanded, collected, compiled, linked, recast, abridged,
 *  or adapted without the prior written consent of ebrary.  Any use
 *  or exploitation of this work without authorization could subject
 *  the perpetrator to criminal and civil liability.
 *
 *  SECURITY NOTICE:
 *
 *  This code may only be viewed by employees of ebrary inc., or people
 *  who have signed an appropriate non-disclosure agreement with ebrary,
 *  inc. If you have any questions about your access to this code,
 *  please contact ebrary inc.
 *
 * ============================================================================
 */

function openHelp(topic) {
    var url = 'help.action';
    if (topic) {
        url += '?topic='+topic;
    }
    var supportWindow = window.open(url, 'helpDesk', 'toolbar=yes,location=no,scrollbars=yes,status=yes,resizable=yes,width=835,height=600');
    supportWindow.focus();
    return (false);
}
/**
 * Exports bibliographic information of the specified document or documents in specified folder
 * to RefWorks
 * @param placeHolder the element to hold the form
 * @param targetID the id of document or folder
 * @param isFolder specified whether the id is a document id or folder id.
 * @param pageNum the page number
 * @return always return false
 */
function exportToRefworks(placeHolder, targetID, isFolder, pageNum){
	var url = 'biblioExport.action?refworks=1&' + (isFolder?'folderID=':'docID=') + targetID;
	if (pageNum){
		url += "&ppg=" + pageNum;
	}
	
	new Ajax.Request(url, {
		method: "get",
		asynchronous: false,
		onSuccess:function(response){
		var myForm = new Element('form',
				{'name':'ExportRWForm',
				 'method':'POST',
				 'target':'RefWorksMain',
				 'action':'http://www.refworks.com/express/ExpressImport.asp?vendor=ebrary&filter=RefWorks%20Tagged%20Format&encoding=65001'});
		var biblioInfo = new Element('TEXTAREA',{'name':'ImportData'});		
		biblioInfo.value = response.responseText;
		myForm.appendChild(biblioInfo);
		placeHolder.appendChild(myForm);
		myForm.hide();				
		myForm.submit();
		placeHolder.removeChild(myForm);
		} 			
	});
	return false;
}
 
function addToBookshelf(p_link, p_docid){	
	if (!ebrary.isLoggedin()){
		//alert(g_warning_bookshelf_login_required);
		var link = document.createElement('a');
		var authModelWidth = 600;
		var authModelHeight = 500;
		if (ebrary.authType ==='sso' || ebrary.authType==='rpa') {
			authModelWidth = 600;
			authModelHeight = 300;
		}
		
    	link.setAttribute('href', 'showLoginDialog.action?key=add_to_bookshelf');        	
    	ebrary.openTinyPopup(link, authModelWidth, authModelHeight);    	
	}
	else {
		var url = 'addToBookshelf.action?commonID=' + p_docid;		
		new Ajax.Request(url, { method:'get', 
			onSuccess: function(transport){
				 // google tracking
				if (typeof _gaq != "undefined") {	
					_gaq.push(['_trackEvent', 'Bookshelf','addToBookshelf' , 'Document added to bookshelf from Search : doc-id:' + p_docid]);
				}
				p_link.hide();
				alert(g_doc_added_to_bookshelf);
		} } );		
	}
}