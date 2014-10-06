

var DocAnnotsInfo = Class.create();

DocAnnotsInfo.prototype = 
{
 	initialize: function(doc_id, common_id, info_panel_id, support_undo, skip_folder, onRemoveAnnot) 
  	{  	
  		this.doc_id = doc_id;
  		this.common_id = common_id;
  		this.info_panel = $(info_panel_id);
  		this.support_undo = support_undo;
  		this.skip_folder = skip_folder;
  		this.msg_box = null;
  		this.onRemoveAnnot = (onRemoveAnnot != undefined) ? onRemoveAnnot : null;  		
	},
 	
 	showAnnotations: function ()
	{
		var url = 'bookshelfAnnots.action?commonID=' + this.common_id;
		if (this.skip_folder) {
			url = url + "&folders=skip";
		}
		new Ajax.Request(url, { method:'get', onSuccess: this._processShowAnnots.bind(this) } );	
		return (false);
	},
	
    showInfoPanel: function ()
    {
        this.info_panel.show();
    },    
	hideInfoPanel: function ()
	{
		this.info_panel.hide();
	},
		
	_processShowAnnots: function (transport)
	{
		this.info_panel.innerHTML = transport.responseText;
		this.info_panel.show();
		
		this._initRemoveAnnotIcons();
		if (! this.skip_folder) {
			this._initFolderPopups();
		}
	},	

	_initRemoveAnnotIcons: function () 
	{
		var item_list, i, item;

		item_list = this.info_panel.select('img.remove_annot');

		for (i=0; i< item_list.length; i++) {
			item  = item_list[i];
			new RemoveAnnotIcon(item, -1, this.support_undo, this.onRemoveAnnot); 
		}	
	},

	_initFolderPopups: function () 
	{
		var item_list, i, item, annot_id, annot_url;

		item_list = this.info_panel.select('a.annot_link');
		for (i=0; i< item_list.length; i++) {
			item  = item_list[i];
			annot_id = item.id;
			if (annot_id.indexOf('target_') == 0) {
				annot_id = annot_id.substring(7);
                annot_url = 'annotFolder.action?docID=' + this.common_id + '&annotID=' + annot_id + '&annotType=highlight_yellow';
				new AjaxHoverPopup('win_'+annot_id, 'target_' + annot_id, 'folder_detail_body', annot_url);
			}
		}	
	},
	
	addAnnotation: function(p_annot){
		var l_annots_container=new Element('div',{'id':'new_annotations','style':'display:none'});
		l_annots_container.innerHTML = p_annot;
		var l_annots = l_annots_container.childElements();
		for (var j = 0; j < l_annots.length; j++ ){
			var l_annot_container=new Element('div',{'id':'new_annotation','style':'display:none'});
			l_annot_container.appendChild(l_annots[j]);
			var l_physical_page = parseInt(l_annot_container.down('.hidden_physical_page').innerHTML);
			var l_remove_annot = l_annot_container.down('img.remove_annot');
			var l_pages = $('doc_annots_panel').select('.hidden_physical_page');
			var l_insert_position = $('message_box');
			// find the right position to insert the new annotation
			for (var index = 0; index < l_pages.length; ++index) {
				var item = l_pages[index];
				if (parseInt(item.innerHTML) > l_physical_page){
					l_insert_position = item.up();
					break;
				}
			}		
			$('doc_annots_panel').appendChild(l_annot_container);
			var l_annot=l_annot_container.down();
			Element.insert(l_insert_position,{before:l_annot});
			new Effect.Shake(l_annot);
			new RemoveAnnotIcon(l_remove_annot, -1, this.support_undo, this.onRemoveAnnot);			
			Element.remove(l_annot_container);
		}		
	},
	
	changeAnnotation: function(p_change_info){
		var l_annot_label = $('target_'+ p_change_info.annotID);
		var l_annot_div = l_annot_label.up();
		if (p_change_info.tint){
			l_annot_div.down('.annot_type').writeAttribute('src','/images/bookshelf/bookmark_' + p_change_info.tint +'.png');
		} else if (p_change_info.text){
			l_annot_label.update(p_change_info.text);
		}
		new Effect.Shake(l_annot_div);
	}
	
 };

	
var RemoveAnnotIcon = Class.create();

RemoveAnnotIcon.prototype = 
{
  	initialize: function(handle, folder_id, support_undo, onRemoveAnnot) 
  	{
  		this.handle = $(handle);
		this.annot_item = this.handle.up('div');
		this.support_undo = support_undo;
 		this.onRemoveAnnot = (onRemoveAnnot != undefined) ? onRemoveAnnot : null;
        
		if ( this.annot_item.hasClassName('shelf_document') ) {
            this.annot_item_type = 'doc';
            // doc_annots.jsp, used in AJAX reader to show which folder is this document part of.
			folder_id = this.handle.id;
			if (folder_id != undefined && folder_id.indexOf('doc_folder_') == 0) {
				folder_id = folder_id.substring(11);
			}
        }
		else if ( this.annot_item.hasClassName('shelf_doc_info') ) {
            // my_bookshelf.jsp
            this.annot_item_type = 'doc';
			this.annot_item = this.handle.up('div.shelf_document');
		}
		else {
            // after removing last annotation
            this.annot_item_type = 'annot';
            this.doc_item = this.annot_item.up('div.shelf_document');
		}
        
        if (this.annot_item_type == 'doc') {
            this.message = (folder_id > 0) ? g_info_remove_doc_folder : g_info_remove_bookshelf_doc;            
        }
        else {
            this.message = (folder_id > 0) ? g_info_remove_annot_folder : g_info_remove_bookshelf_annot;            
        }
        
		this.annot_item_id = this.annot_item.id;
  		this.folder_id = folder_id;

		this.handle.alt = this.message;
		this.handle.title = this.message;
 			
	    this.eventMouseOver = this.doMouseOver.bindAsEventListener(this);
	    this.eventMouseOut = this.doMouseOut.bindAsEventListener(this);
	    this.eventClick = this.doClick.bindAsEventListener(this);
	    this.registerEvents();
	},

	destroy: function() {
	    Event.stopObserving(this.handle, "mouseover", this.eventMouseOver);
	    Event.stopObserving(this.handle, "mouseout", this.eventMouseOut);
	    Event.stopObserving(this.handle, "click", this.eventClick);
	},

	registerEvents: function() 
	{
 	    Event.observe(this.handle, "mouseover", this.eventMouseOver);
 	    Event.observe(this.handle, "mouseout", this.eventMouseOut);
 	    Event.observe(this.handle, "click", this.eventClick);
  	},

	doMouseOver: function (event)
	{	
		this.annot_item.setStyle ({backgroundColor: '#DDDDFF'});
	},

	doMouseOut: function (event)
	{
		this.annot_item.setStyle ({backgroundColor: 'transparent' });
	},

	doClick: function (event)
	{
		if (this.folder_id > 0) {
			this._removeFromFolder();
			if ($('bookshelf_docs') && $('bookshelf_docs').childElements().length == 0){
				if ($('biblioexport')){
					$('biblioexport').hide();
				}
			}
		}
		else if (this.folder_id == 0 || this.folder_id == -1) {
			this._removeFromBookshelf();
		}
		else {
			alert ('Unexpected folder, id = ' + this.folder_id);
		}
	},

    _getNumChilds: function (doc_item)
	{
        var item_list = doc_item.select('div.shelf_annot');
        return (item_list.length);
	},
	
	_removeFromFolder: function() 
	{
        var url = 'editAnnotFolder.json?cmd=remove_folder&folderID=' + this.folder_id + '&selectedItem=' + this.annot_item_id;
		new Ajax.Request(url, { method:'get', onSuccess: this._parseRemoveResponse.bind(this) } );	
        if (this.annot_item_type == 'annot') {
            var len = this._getNumChilds(this.doc_item);
            // check for "more_annots", only remove the document from folder
            // if no "more_annnots", fix of PRGDCP-1192
            if (len == 1 && !this.doc_item.down("div.more_annots")) {
                this.annot_item = this.doc_item;
            }
            else if (len <= 3) {
                // add break here to avoid funny floating problem
                var br = document.createElement("br");
                this.annot_item.parentNode.appendChild(br);
            }
        }
		if (this.annot_item != null) {
			this.annot_item.parentNode.removeChild (this.annot_item);
			this.annot_item = null;
		}
	},

	_removeFromBookshelf: function() 
	{
		if (confirm (this.message + '?')) {
            var url = 'editAnnot.json?cmd=remove_item&selectedItem=' + this.annot_item_id;
			new Ajax.Request(url, { method:'get', onSuccess: this._parseRemoveResponse.bind(this) } );
			// fix for PRGDCP-1345, add check for doc_item because this function is shared by my_bookshelf
			// and notes panel. Only my_bookshelf has doc_item
            if (this.annot_item_type == 'annot' && this.doc_item) {
                var len = this._getNumChilds(this.doc_item);
                if (len <= 3) {
                    // add break here to avoid funny floating problem
                    var br = document.createElement("br");
                    this.annot_item.parentNode.appendChild(br);
                }
            }
			if (this.annot_item != null) {
				this.annot_item.parentNode.removeChild (this.annot_item);
				this.annot_item = null;
			}
		}
	},
	
	_parseRemoveResponse: function (transport)
	{
		var resp = eval('(' + transport.responseText + ')');
		var cmd = resp.cmd;
		var docID = resp.docID;
		var annotID = resp.annotID;
		var msg;

		if (cmd == 'remove_folder') {
			msg = (annotID > 0) ? g_msg_remove_annot_folder : g_msg_remove_doc_folder;
			
			if (this.support_undo) {		
                var undoURL = 'editAnnotFolder.json?cmd=add_folder&refresh=true&folderID=' + this.folder_id + '&selectedItem=';
				if (annotID > 0) {
					undoURL = undoURL + 'annot_' + docID + '_' + annotID;
				}
				else {
					undoURL = undoURL + 'doc_' + docID;
				}
				msg = msg + ' <a href="'+undoURL + '">' + g_label_undo_remove_folder + '</a>';
			}		
		}
		else if (cmd == 'remove_item') {
			msg = (annotID > 0) ? g_msg_remove_bookshelf_annot : g_msg_remove_bookshelf_doc;
			if (annotID > 0 && this.onRemoveAnnot != null) {
				this.onRemoveAnnot(annotID);
			}
		}
		else {
			msg = g_msg_server_error;
		}
		var msg_box = $('message_box');
		if (msg_box != undefined && msg_box != null) {
			msg_box.innerHTML = msg;
			msg_box.show().setStyle({opacity: 1.0}); 
			msg_box.fade({duration: 10});
		}
	}
};


var AjaxHoverPopup = Class.create();

AjaxHoverPopup.prototype = 
{
  	initialize: function(win_id, element, class_name, source_url) 
  	{
   		this.win_id = win_id;
  		this.name = 'popup';
  		this.element = $(element);
   		this.source_url = source_url;
   		this.class_name = class_name;
   		this.popup_win = null;
   		this.show_all = false;
 			
	    this.eventMouseOver = this.doMouseOver.bindAsEventListener(this);
	    this.eventMouseOut = this.doMouseOut.bindAsEventListener(this);
	    this.registerEvents();
	},

	destroy: function() {
	    Event.stopObserving(this.element, "mouseover", this.eventMouseOver);
	    Event.stopObserving(this.element, "mouseout", this.eventMouseOut);
	    if (this.popup_win != null) {
	    	Element.remove(this.popup_win);
	    	this.popup_win = null;
	    }
	},

	registerEvents: function() 
	{
 	    Event.observe(this.element, "mouseover", this.eventMouseOver);
 	    Event.observe(this.element, "mouseout", this.eventMouseOut);
  	},

	doMouseOver: function (event)
	{
		if (this.popup_win == null) {
			this.popup_win = this._createPopup();
		}
		if (this.popup_win != null && ! this.popup_win.visible()) {
  	 	 	new Ajax.Request(this.source_url , { method:'get', onSuccess: this._showContent.bind(this) } );			
			this._showPopup (event);
		}
	},

	doMouseOut: function (event)
	{
		    
		if ( this.popup_win != null && this.popup_win.visible()) {
  			this._hidePopup(event);
		}
	},
	
	_createPopup: function() 
	{
 		var popup_win = new Element("div"); 
		popup_win.id = this.win_id;
		document.body.appendChild(popup_win);
		popup_win.className = 'popup_win';	
		Element.hide(popup_win);
		return (popup_win);
	},
				
	_showPopup: function(event) 
	{
	  	Event.stop(event);
	    var x = Event.pointerX(event)+ 24;
	  	var y = Event.pointerY(event)+ 12;
	  	var order = this.show_all ? 80 : 90;
	  	Element.setStyle(this.popup_win, { position:'absolute', top:y + "px", left:x + "px", zIndex:order } );
	  	Element.show(this.popup_win);
	},
  
  	_hidePopup: function(event)
  	{
  		if (this.popup_win != null)	{
  			Element.hide(this.popup_win);
	  	}
	},
		
	_showContent: function (transport)
	{
		var content = transport.responseText;
		this.popup_win.innerHTML = '<div class="'+ this.class_name + '">' + content + '</div>';
	}
};

var BookshelfManager = Class.create();

BookshelfManager.prototype =
{
  	initialize: function(add_doc_link, add_doc_msg,doc_id)
  	{
		this.doc_id = doc_id;
		this.add_doc_msg = add_doc_msg;
		this.add_doc_link = add_doc_link;
		this.add_doc_link.observe("click", this._addToBookshelf.bind(this));
	},

	_addToBookshelf: function (event) 
	{
		Event.stop(event);
		if (!ebrary.isLoggedin()){
			// alert(g_warning_bookshelf_login_required);
			var link = document.createElement('a');
			var authModelWidth = 600;
			var authModelHeight = 500;
			if (ebrary.authType ==='sso' || ebrary.authType==='rpa') {
				authModelWidth = 600;
				authModelHeight = 300;
			}
			
	    	link.setAttribute('href', 'showLoginDialog.action?key=add_to_bookshelf');        	
	    	ebrary.openTinyPopup(link, authModelWidth, authModelHeight);
		} else {
			var url = 'editAnnot.json?cmd=add_doc&selectedItem=doc_' + this.doc_id;	
			new Ajax.Request(url, { method:'get', onSuccess: this._processAddBookshelf.bind(this) } );	
			
			// google tracking		
			if (typeof _gaq != "undefined") {	
				_gaq.push(['_trackEvent', 'Bookshelf','addToBookshelf' , 'Document added to bookshelf from QV : doc-id:' + this.doc_id]);			
			}
			return (false);
		}
	},
	
	
	_processAddBookshelf: function(transport) 
	{
		var bookshelf_text = transport.responseText;
		var	msg = g_msg_add_doc_failed;		
		if (bookshelf_text != null || bookshelf_text.length > 0)
		{
			// guard against ajax hack
			if (bookshelf_text.substr(0,9) == 'while(1);') {
				bookshelf_text = bookshelf_text.substring(10);
			}
			var bookshelf = eval('(' + bookshelf_text + ')');
			if (bookshelf.status) {
				msg = g_msg_add_doc_success;				
				if (this.add_doc_link){
					this.add_doc_link.hide();
				}
			}
		}
		if (this.add_doc_msg){
			this.add_doc_msg.innerHTML = msg;
		}else{
			alert(msg);
		}			
	}
};

var EmailFolderManager=Class.create();

EmailFolderManager.prototype = {
  	initialize: function(p_ok,p_form){
		this._ok = p_ok;
		this._form = p_form;
		this._registerEvents();
	},
	
	_registerEvents:function(){
		this._ok.observe('click',this._doSendEmail.bindAsEventListener(this));
		this._form.observe('submit',this._doSendEmail.bindAsEventListener(this));
	},
	
	_doSendEmail:function(p_event){
		var emailBody = document.getElementById("email_body");
                if (!emailBody){
                    emailBody = document.getElementById("email_body_div");
                }
		this._form.message.defaultValue = emailBody.innerHTML;
                this._form.message.value = emailBody.innerHTML;
		p_event.stop();
		new Ajax.Request(this._form.readAttribute('action'), { postBody: this._form.serialize(),
			onSuccess: this._processSendEmail.bind(this) } );				
	},
	
	_processSendEmail:function(p_transport){
		var data = eval("(" + p_transport.responseText + ")");
		var l_success = (data.result == 'success');
		alert(data.message);
		if (l_success){
			history.back();
		}
	}	
};
