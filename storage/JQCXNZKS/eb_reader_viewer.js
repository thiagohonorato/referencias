function globalErrorMessage(code)
{
    var msg;
    if (code == 'SESSION_TIMEDOUT') {
        msg = g_msg_session_timedout;
    }
    else if (code == 'NOT_PAID_FOR') {
        msg = g_msg_not_paid_for;
    }
    else if (code == 'TOO_MANY_PAGES_REQUESTED') {
        msg = g_msg_too_many_pages_viewed;
    }
    else if (code == 'TOO_MANY_PREVIEWED') {
        msg = g_msg_too_many_previewed;
    }
    else if (code == 'PREVIEW_CHANNEL_TOO_MANY_PREVIEWED') {
        msg = g_msg_preview_channel_too_many_previewed;
    }
    else if (code == 'PAGE_VIEW_EXHAUSTED') {
        msg = g_msg_page_view_exhausted;
    }
    else if (code == 'GENERAL_PAGE_ERROR') {
        msg = g_msg_general_page_error ;
    }
    else if (code == 'INVALID_PAGE_NUM') {
        msg = g_msg_invalid_page_number ;
    }    
    else {
        msg = g_msg_retrieve_page_error + code + ']';
    }
    return (msg);

}


var StickyNote = Class.create();

StickyNote.prototype = 
{
    initialize: function(p_parent, p_note_id, p_note_content, p_note_color, p_rect, p_note_title,p_annot_callback,p_toggle_callback) 
    { 
		this._min_width = 60;
		this._min_height = 50;
		this._annot_callback = p_annot_callback;
		this._show_submit = p_annot_callback && p_note_title;
		this._toggle_callback = p_toggle_callback;
    	this._link_annotation = p_note_title && 
    		(p_note_content.startsWith("http://")||p_note_content.startsWith("https://")) && p_annot_callback;
        this._existing_stickynote = p_annot_callback && p_annot_callback.changeCallback;

    	this._createNote (p_parent, p_note_id, p_note_color, p_rect);
        this._initContent (p_note_content, p_note_color, p_note_title);
        this._note_x = p_rect.left;
        this._note_y = p_rect.top;
        this._note_color = p_note_color;        
        this._resize = false;
        
        this._initDrag();       
        this._registerEvents();
    },  
    setContent: function (p_note_content) 
    {
        if (this._text_area) {
            this._text_area.value = p_note_content;
            if (this._link_annotation){
            	this._text_area.focus();
            }else{
            	this._text_area.select();            	
            }
            
        }
        else {
       		p_note_content = p_note_content.replace(/\n/g, '<br/>\n');
            this._content.innerHTML = p_note_content;
        }
    },
    isVisible: function ()
    {
        return (this._note.visible());
    },  
    hideNote: function ()
    {
        if (this._toggle_callback){
        	this._toggle_callback();
        }
        this._note.hide();
    },    
    _registerEvents: function() 
    {
        this._pin.observe("click", this.hideNote.bindAsEventListener(this));
        this._resizer.observe("mousedown", this._resizeStart.bindAsEventListener(this));
        document.observe("mousemove", this._resizeMove.bindAsEventListener(this));
        document.observe("mouseup", this._resizeStop.bindAsEventListener(this));
        if (this._existing_stickynote){
            this._tintBlueButton.observe("click", this._changeTint.bindAsEventListener(this,'blue'));        	
            this._tintYellowButton.observe("click", this._changeTint.bindAsEventListener(this,'yellow'));        	
            this._tintPinkButton.observe("click", this._changeTint.bindAsEventListener(this,'pink'));        	
        	this._note.observe("mouseover", this._changeRectangleWidth.bindAsEventListener(this,true));
        	this._note.observe("mouseout", this._changeRectangleWidth.bindAsEventListener(this,false));
        	this._content.observe("click", this._editNote.bindAsEventListener(this));
        }
    },
    
    
    _changeRectangleWidth: function(p_event,p_show){
    	var l_annot_id = this._note.readAttribute('id').substring(7);
    	var l_rect = $('rect_' + l_annot_id);
    	if (l_rect){
    		if (p_show){
    			l_rect.addClassName('showme');
    		} else {
    			l_rect.removeClassName('showme');    		
    		}
    	}
    },
    
    _editNote: function(){
    	if (this._content.down("textarea")){
    		return;
    	}
    	var l_content = this._content.innerHTML.replace(/<br\/>/g, '');
    	l_content=l_content.replace(/<br>/g, '');
    	this._original_note_content = l_content;
    	this._editing = true;
    	this._setTextArea();
        this._text_area.style.height = (this._content.getHeight()-4) + 'px';        	
        this._content.style.overflow='hidden';
    	this.setContent(l_content);
    	this._setSubmitButton();
    },

    _undoEdit: function(){
		this._content.innerHTML = this._original_note_content.replace(/\n/g, '<br/>\n');
    	this._note.removeChild(this._actionbar);
    },
    
    _changeTint: function(p_event, p_color){
    	if (this._note_color == p_color){
    		return;
    	}
		this._note.removeClassName('note_bgcolor_'+ this._note_color);
		this._note.removeClassName('sticky_border_'+ this._note_color);
		this._toolbar.removeClassName('sticky_border_'+ this._note_color);
		this._note.addClassName('note_bgcolor_'+ p_color);
		this._note.addClassName('sticky_border_'+ p_color);
		this._toolbar.addClassName('sticky_border_'+ p_color);
    	// get the id from sticky_[id]
    	var l_annot_id = this._note.readAttribute('id').substring(7);
    	this._annot_callback.changeCallback('tint',p_color);
    	var l_rect = $('rect_' + l_annot_id);
    	if (l_rect){
    		l_rect.removeClassName('note_rectangle_'+ this._note_color);
    		l_rect.addClassName('note_rectangle_'+ p_color);
    	}
		this._note_color = p_color;    	
    },

    _initDrag: function () 
    {
        var l_offset = this._parent.positionedOffset() ;

        this._bound_x1 = l_offset.left;
        this._bound_y1 = l_offset.top;
        this._bound_x2 = this._bound_x1 + this._parent.getWidth();
        this._bound_y2 = this._bound_y1 + this._parent.getHeight();
        this._drag_snap = this._checkDraggingBounds.bind(this);
        var l_options = {handle: this._note.down('div.toolbar'), snap: this._drag_snap};
        if (this._existing_stickynote){
        	l_options.endeffect = function(){this._annot_callback.changeCallback('position');}.bind(this);
        }
        new Draggable (this._note, l_options);
    },      
    _checkDraggingBounds: function (x, y) {
        var w = this._note.getWidth();
        var h = this._note.getHeight();

        if (x+w > this._bound_x2) x = this._bound_x2 - w - 1;
        if (y+h > this._bound_y2) y = this._bound_y2 - h -1;
        if (x < this._bound_x1) x = this._bound_x1 + 1;
        if (y < this._bound_y1) y = this._bound_y1 + 1;

        this._note_x = x;
        this._note_y = y;
        
        return ([x, y]);
    },
    _createNote: function (p_parent, p_note_id, p_note_color, p_rect)
    {
        this._parent = $(p_parent);
        this._note = new Element("div",{'class':'sticky'});
        this._note.setStyle({left:p_rect.left+'px',top:p_rect.top+'px'});
        this._content = new Element("div",{'class':'content'});
        this._resizer = new Element("img",{'class':'resizer','src':'/images/reader/resizer.png'});

        this._toolbar = new Element("div",{'class':'toolbar'});
        
        this._note.id = p_note_id;
        if (p_note_color) {
        	if (p_note_color == 'copy_notebox'){
        		this._note.addClassName(p_note_color);
        	} else {
        		this._note.addClassName('note_bgcolor_' + p_note_color);
        		this._note.addClassName('sticky_border_' + p_note_color);        		
        	}        		
        }

        this._note.appendChild(this._toolbar);
        this._note.appendChild(this._content);
        this._note.appendChild(this._resizer);
        if (this._show_submit){
        	this._setSubmitButton();
        }
        
        this._parent.appendChild (this._note);
        if (p_rect.width){
        	this._content.style.width = (p_rect.width < this._min_width?this._min_width:p_rect.width) + 'px';
        	this._content.style.height = (p_rect.height < this._min_height?this._min_height:p_rect.height) + 'px';
        }
        
        this._note.style.width = (this._content.getWidth()) + 'px';
    },
    
    submitNote: function(){
    	if (this._link_annotation){
    		var l_link = this._text_area.value.strip();
    		// simple validation for url, must starts with either http or https and contains no space
    		if (!(l_link.startsWith('http://')||l_link.startsWith('https://'))){
    			l_link = 'http://' + l_link;
    		}
			l_link = l_link.replace(' ', '');
       		this._annot_callback(l_link);
       		return;
    	}
    	if (this._editing){
        	this._note.removeChild(this._actionbar);
    		this._annot_callback.changeCallback('text',this._text_area.value);
    		this._content.innerHTML = this._text_area.value.replace(/\n/g, '<br/>\n');
            this._content.style.overflow='auto';
    		
    	} else if (this._annot_callback){
        	this._note.removeChild(this._actionbar);
    		this._annot_callback(this._text_area.value);
    	}    	
    },
    _initContent: function (p_note_content, p_note_color, p_note_title)
    {
    	var l_close_icon = navigator.platform.indexOf("Mac") > -1 ? 'mac_close_icon.png' : 'win_close_icon.gif';

        var l_toolbar_html = '<img class="pin" src="/images/reader/' + l_close_icon + '" /> &nbsp; ';
        if (p_note_content) {
            // If selected, put text in a text area
            if (p_note_title) {
            	this._note_changed = false;
            	if (this._link_annotation){
            		this._content.innerHTML='<form name="copyForm" style="height:100%;width:100%" action="" method="GET" onsubmit="return false;"><input style="width:100%" id="copy_area" type="text"></form>';
                   	this._text_area = this._content.down('input');
                   	this._content.addClassName('link_annotation');
                    this._note.style.width = (this._content.getWidth()) + 'px';
            	}else{
            		this._setTextArea();
            	}
                if (p_note_color) {
                	if (p_note_color == 'copy_notebox'){
                		this._text_area.addClassName(p_note_color);
                    	this._actionbar = new Element("div",{'class':'actionbar'});
                    	this._actionbar.style.height='11px';
                    	this._note.appendChild(this._actionbar);
                	} else {
                		this._text_area.addClassName('note_bgcolor_' + p_note_color);
                		this._text_area.addClassName('sticky_border_' + p_note_color);        		
                	}        		
                }
                this._content.style.overflow='hidden';
                l_toolbar_html = l_toolbar_html + p_note_title;
            }
            this.setContent(p_note_content);
            if (this._text_area){
            	this._original_note_content = this._text_area.value.strip();
                this._text_area.style.height = (this._content.getHeight()-4) + 'px';        	
            }
        }
        this._toolbar.innerHTML = l_toolbar_html;
        if (this._existing_stickynote){
        	var l_tints = ['yellow','bule','pink'];
        	this._tintbar = new Element('div',{'class':'tintbar'});
        	this._tintYellowButton = new Element('img',{'class':'tintbutton',src:'/images/reader/YellowBox.gif'});
        	this._tintBlueButton = new Element('img',{'class':'tintbutton',src:'/images/reader/BlueBox.gif'});
        	this._tintPinkButton = new Element('img',{'class':'tintbutton',src:'/images/reader/PinkBox.gif'});
        	this._tintbar.appendChild(this._tintYellowButton);
        	this._tintbar.appendChild(this._tintBlueButton);
        	this._tintbar.appendChild(this._tintPinkButton);
        	this._toolbar.appendChild(this._tintbar);
        }
        if (p_note_color){
        	this._toolbar.addClassName('sticky_border_' + p_note_color);
        }
        this._pin = this._note.down('img.pin');
    }, 
    
    _setTextArea: function(){
		this._content.innerHTML='<form name="copyForm" style="height:100%;width:100%" action="/copyText.action" method="GET"><textarea id="copy_area"></textarea></form>';            		
		this._text_area = this._content.down('textarea');     			
    },
    
    _setSubmitButton: function(){
    	this._actionbar = new Element("div",{'class':'actionbar'});
    	this._ok_button = new Element("a",{'class':'submit_note'}).update("&nbsp;OK&nbsp;");
    	this._cancel_button = new Element("a",{'class':'submit_note'}).update(g_label_cancel);
    	this._actionbar.appendChild(this._cancel_button);
    	this._actionbar.appendChild(this._ok_button);
    	this._note.appendChild(this._actionbar);
    	this._ok_button.observe("click",this.submitNote.bindAsEventListener(this));    	
    	this._cancel_button.observe("click",this._cancelEdit.bindAsEventListener(this));    	
    },
    
    _cancelEdit: function(){
    	if (this._existing_stickynote){
    		this._undoEdit();
    	}else{
    		this.hideNote();
    	}
    },
    
    hasNoteChanged: function(){
    	var l_current_content = this._text_area.value.strip();
    	return this._original_note_content !== l_current_content;
    },
    
    _resizeStart: function (p_event)
    {
        Event.stop(p_event);
        this._resize = true;
        this._mouse_x = Event.pointerX(p_event);
        this._mouse_y = Event.pointerY(p_event);  
        this._content_width =  this._content.getWidth() ;
        this._content_height =  this._content.getHeight() ;
    },
    
    
    _resizeMove: function (p_event)
    {
        if (this._resize) {
            Event.stop(p_event);

            var w = this._content_width + (Event.pointerX(p_event) - this._mouse_x);
            var h = this._content_height + (Event.pointerY(p_event) - this._mouse_y);

            if (w < this._min_width) w = this._min_width;
            if (h < this._min_height) h = this._min_height;
    
            if (this._note_x+w > this._bound_x2) w = this._bound_x2 - this._note_x - 1;
            if (this._note_y+h > this._bound_y2) h = this._bound_y2 - this._note_y -1;

            this._content.setStyle ({width:w+'px', height: h+'px'});
            this._note.style.width=this._content.getWidth() +'px';
            if (this._text_area){
                this._text_area.style.height = (this._content.getHeight()-4) + 'px';        	
            }
        }
    },
    _resizeStop: function (p_event)
    {
        if (this._resize) {
            Event.stop(p_event);
            this._resize = false;
            if (this._existing_stickynote){
            	this._annot_callback.changeCallback('size');            	
            }
        }
    },
    _clickNote: function (p_event)
    {
        // Stop propagating the event so we don't show the warning message
        Event.stop(p_event);
    },
    
    getPosition: function(){
    	return this._note.positionedOffset();
    },    
    getDimensions: function(){
    	return this._content.getDimensions();
    }    
};


var InfotoolsMenu = Class.create();
InfotoolsMenu.prototype = {
  	initialize: function(p_button_id, p_cloak, p_callback){
		this._button = $(p_button_id);
		this._cloak = p_cloak;
		this._callback = p_callback;
		this._menu = $("menuh");
        this._sub_menu = null;
		this._setupInfotools();
	},

	_setupInfotools: function(){
		this._button.parentNode.appendChild (this._menu);
		this._registerEvents();
		this._menu.hide();		
	},	

	_registerEvents: function() {
        this._button.observe("click", this._toggleMenu.bindAsEventListener(this));
        this._cloak.observe('contextmenu', this._showContextMenu.bindAsEventListener(this));
        var l_links = this._menu.select(".action-hidden");
        l_links.each(function(s){
        	s.next().observe("click",this._doAction.bindAsEventListener(this,s.getAttribute("name"),s.getAttribute("value"),s.getAttribute("allowedit")));
        },this);

        var i, l_subs, l_li;
        
        var l_subs = this._menu.select("li");
        for (i=0; i<l_subs.length; i++) {
            l_li = l_subs[i];
            if (l_li.hasClassName('item') || l_li.hasClassName('bar') ) {
                l_li.observe("mouseover",this._openSubMenu.bindAsEventListener(this, l_li));                
                l_li.observe("mouseout",this._closeSubMenu.bindAsEventListener(this, l_li));                
            }
        }
    },
    
    _showContextMenu: function(p_event){
    	if (!this._menu.visible()){
    		this._menu.show();
    	}
    	
    	var l_scrollOffsetTop = document.viewport.getScrollOffsets().top;
    	var l_viewportHeight = document.viewport.getHeight();
    	if ((l_scrollOffsetTop + l_viewportHeight) < (p_event.pointerY() + this._menu.getHeight()))
    	{
    		this._menu_top = p_event.pointerY() - this._menu.getHeight() +5;
    	} else {
    		this._menu_top = p_event.pointerY()-5;
    	}
		this._menu_left = p_event.pointerX()-5;
        this._menu.style.top = this._menu_top + 'px';
        this._menu.style.left = this._menu_left + 'px';    
        this._menu_bottom = this._menu_top + this._menu.getHeight();
        this._menu_right = this._menu_left + this._menu.getWidth();

        this._sub_right = 0;
        this._sub_top = 0;
        this._sub_buttom = 0;
        p_event.stop();
    	
    },
    
    _doAction: function(p_event,p_value,p_link,p_allowedit){
        Event.stop (p_event);
    	this._callback(p_value, p_link, p_allowedit);
    	return false;
    },
	
    hideMenu: function(){
    	// fix for PRGDCP-815
    	this._menu.select("ul li ul").each(function(p_item){
            if (p_item.hasClassName('hover')){
                p_item.removeClassName('hover');
    		}
    	});
    	this._menu.hide();
        this._sub_menu = null;
    },
    
    _openSubMenu: function (p_event, p_menu) 
    {
         var l_subs = p_menu.select("ul");
         if (l_subs.length > 0) {
            var l_menu = l_subs[0];

            if (this._sub_menu != null) {
                this._sub_menu.removeClassName('hover');
            }
            this._sub_menu = l_menu;

            l_menu.addClassName('hover');
            var l_offset = l_menu.cumulativeOffset() ;
            
            this._sub_left = l_offset.left;
            this._sub_top = l_offset.top;
            this._sub_right = l_offset.left + l_menu.getWidth();
            this._sub_buttom = l_offset.top + l_menu.getHeight();
         }
   },
    
    _closeSubMenu: function (p_event, p_menu) 
    {    
         var x = p_event.pointerX();
         var y = p_event.pointerY();
         
         if (x < this._menu_left+2 || x > this._menu_right-2 || y < this._menu_top+3 || y > this._menu_bottom-3) {
             if (this._sub_menu == null) {
                this.hideMenu();
            }
            else if (x < this._menu_left+2 || x > this._sub_right-2 || y < this._sub_top+3 || y > this._sub_buttom-3) {
                this.hideMenu();
            }
         }

         // Fix for PRGDCP-833.  If there is a submenu, check the cursor location before hiding it
         if (this._sub_menu != null) {
             if (x < this._sub_left+3 || x > this._sub_right || y < this._sub_top || y > this._sub_buttom) {        
                this._sub_menu.removeClassName('hover');
                this._sub_menu = null;
             }
         }
    },
 
    _toggleMenu: function (p_event) {
        Event.stop (p_event);
        if (! this._menu.visible()) {
            var l_offset = this._button.cumulativeOffset() ;

            this._menu_top = l_offset.top + this._button.getHeight() + 1;
            this._menu_left = l_offset.left;
            this._menu_bottom = this._menu_top + this._menu.getHeight();
            this._menu_right = this._menu_left + this._menu.getWidth();

            this._sub_right = 0;
            this._sub_top = 0;
            this._sub_buttom = 0;

            this._menu.style.top = this._menu_top + 'px';
            this._menu.style.left = this._menu_left + 'px';

            this._menu.show();
        }
        else {
            this.hideMenu();
        }       
    }
};

var DocumentPager = Class.create();

DocumentPager.prototype = 
{
    initialize: function(p_page_viewer, p_last_page, p_text_only) 
    {
        this._page_viewer = p_page_viewer;
        this._current_page = -1;
        this._last_page = p_last_page;
        this._has_search_results = false;
        this._search_pages = new Array();

        this._page_label = $('current_page_label');

        this._page_prev = $('page_prev');
        this._page_next = $('page_next');
        this._search_prev = $('search_prev');
        this._search_next = $('search_next');       

        this._page_box = $('page_box');

        this._registerEvents();
        this._refreshPager();
    },

    updatePager: function(p_page, p_page_label) 
    {
        this._current_page = p_page;
        this._page_box.value = p_page_label;
        this._page_label.innerHTML = p_page;
        this._refreshPager();
    },

    refetchSearchPages : function (p_common_id, p_search_term) 
    {
        if (p_search_term) {
            var l_url = 'docSearch.action?cmd=pages&docID=' + p_common_id + '&p00=' + encodeURIComponent(p_search_term);
            new Ajax.Request(l_url, { method:'get', onSuccess: this._processSearchPages.bind(this) } ); 
            g_search_term = p_search_term;
        }
        else {
            this._has_search_results = false;
            this._refreshPager();
        }

    },  

    _registerEvents: function() 
    {
        this._page_prev.observe("click", this.pagePrev.bindAsEventListener(this));
        this._page_next.observe("click", this.pageNext.bindAsEventListener(this));

        this._search_prev.observe("click", this.searchPrev.bindAsEventListener(this));
        this._search_next.observe("click", this.searchNext.bindAsEventListener(this));

        var f = this._page_box.up('form');
        f.observe("submit", this._doPageBoxSubmit.bindAsEventListener(this));
    },

    _processSearchPages: function (t)
    {
        var l_content = t.responseText;

        if (l_content == null || l_content == '') return;
        if (l_content.substr(0,9) == 'while(1);') {
            l_content = l_content.substring(10);
        }
        var l_result = eval('(' + l_content + ')');

        this._search_pages = l_result.pages;

        if (this._search_pages.length == 0) {
            this._has_search_results = false;
            if (typeof(g_text_view_mode) == "undefined"){
            	alert (g_msg_page_match_search);
            }
        }
        else {
            this._has_search_results = true;
        }        
        this._refreshPager();
        // google analytics code
        if (typeof _gaq != "undefined") {	
          _gaq.push(['_trackPageview', '/QV_Navigate/searchInBook/user_searches_using_search_feature']);	
          _gaq.push(['_trackEvent', 'QV_Navigate', 'searchInBook' , 'User searches using search feature in QV']);  
        }
    },      

    _doPageBoxSubmit: function (e) 
    {
        if (e) Event.stop(e);       
        var p = this._page_box.value;
        this._page_viewer.displayLogicalPage(p);
        // google analytics code
        if (typeof _gaq != "undefined") {	
        	_gaq.push(['_trackPageview', '/QV_Navigate/pageJump/jump_to_page_number_using_page_number_box']);
        	_gaq.push(['_trackEvent', 'QV_Navigate', 'pageJump' , 'Jump to page number using page number box']);   
        }
        return (false);
    },

    pagePrev: function(e) 
    {
        if (e) Event.stop(e);

        if (this._current_page > 1) {
            this._page_viewer.displayPage (this._current_page - 1);
        }
        // google analytics code
        if (typeof _gaq != "undefined") {	
           _gaq.push(['_trackPageview', '/QV_Navigate/pagePrev/page_flip_to_next_page']);
           _gaq.push(['_trackEvent', 'QV_Navigate', 'pagePrev' , 'Page flip to previous page in QV']);
        }
         return (false);
    },

    pageNext : function(e) 
    {
        if (e) Event.stop(e);

        if (this._current_page < this._last_page) {
            this._page_viewer.displayPage (this._current_page + 1);
        }
        // google analytics code
        if (typeof _gaq != "undefined") {	
           _gaq.push(['_trackPageview', '/QV_Navigate/pageNext/page_flip_to_next_page']);	
           _gaq.push(['_trackEvent', 'QV_Navigate', 'pageNext' , 'Page flip to next page in QV']);
        }
        return (false);
    },

    searchPrev: function(e) 
    {
        if (e) Event.stop(e);

        if (! this._has_search_results) return (false);

        var i=0;
        while (i < this._search_pages.length && this._search_pages[i] < this._current_page) {
            i++;
        }

        if (i > 0 && this._search_pages[i-1] < this._current_page) {
            this._page_viewer.displayPage (this._search_pages[i-1]);
        }
        // google analytics code
        if (typeof _gaq != "undefined") {	
          _gaq.push(['_trackPageview', '/QV_Navigate/searchPrev/page_flip_to_previous_page_with_the_search_term']);	
          _gaq.push(['_trackEvent', 'QV_Navigate', 'searchPrev' , 'Page flip to previous page with the search term in QV']);
       } 
        return (false);
    },

    searchNext : function(e) 
    {
        if (e) Event.stop(e);

        if (! this._has_search_results) return (false);
        var i=0;
        while ((i < this._search_pages.length) && (this._search_pages[i] <= this._current_page)) {
            i++;
        }

        if (i < this._search_pages.length && this._search_pages[i] > this._current_page) {
            this._page_viewer.displayPage (this._search_pages[i]);
        }        
     // google analytics code
        if (typeof _gaq != "undefined") {
           _gaq.push(['_trackPageview', '/QV_Navigate/searchNext/page_flip_to_next_page_with_the_search_term']);	
           _gaq.push(['_trackEvent', 'QV_Navigate', 'searchNext' , 'Page flip to next page with the search term in QV']);
        }
        return (false);

    },

    _refreshPager: function () 
    {
        // check to see whether the prev/next button should be enabled

        if (this._page_prev.disabled) {
            if (this._current_page > 1) {
            	this._toggleNavButton(this._page_prev, "page_prev", false);
            }
        }
        else if (this._current_page <= 1) {
        	this._toggleNavButton(this._page_prev, "page_prev", true);
        }

        if (this._page_next.disabled) {
            if (this._current_page < this._last_page) {
            	this._toggleNavButton(this._page_next, "page_next", false);
            }
        }
        else if (this._current_page >= this._last_page) {
        	this._toggleNavButton(this._page_next, "page_next", true);
        }       
        
        // check to see whether the prev/next search button should be enabled
        var l_has_next_search = false;
        var l_has_prev_search = false;

        if (this._has_search_results) {
            var i=0;
            while (i < this._search_pages.length && this._search_pages[i] < this._current_page) {
                i++;
            }
            l_has_prev_search = (i > 0);
            if (i < this._search_pages.length && this._search_pages[i] == this._current_page) {
                i++;
            }
            l_has_next_search = (i < this._search_pages.length);
        }

        if (this._search_prev.disabled) {
            if (l_has_prev_search) {
            	this._toggleNavButton(this._search_prev, "search_prev", false);
            }
        }
        else if (! l_has_prev_search) {
        	this._toggleNavButton(this._search_prev, "search_prev", true);
        }

        if (this._search_next.disabled) {
            if (l_has_next_search) {
            	this._toggleNavButton(this._search_next, "search_next", false);
            }
        }
        else if (! l_has_next_search) {
        	this._toggleNavButton(this._search_next, "search_next", true);
        }                          
    },
    
    _toggleNavButton: function (navButton, imgName, status){
    	// we assume the first child of the button is the img element
    	navButton.down().writeAttribute("src", "/images/reader/" + imgName + (status ? "_dim" : "") + ".png");
    	navButton.disabled = status;
    }
};

var ReaderResizer = Class.create();

ReaderResizer.prototype = 
{
    initialize: function() 
    {
        this._toolbar = $('toolbar_panel');
        this._viewer_panel = $('page_viewer_panel');
        this._image_panel = $('page_image_panel');
        
        this._info_panel = $('info_panel');
        this._notes_panel = $('notes_panel');
        this._biblio_panel = $('biblio_panel');

        this._separator = $('separator_panel');
        this._open_info_panel = $('open_info_panel');
        this._close_info_panel = $('close_info_panel');

        this._adjust_size_button = $('resize_window');
        this._max_width = Math.round(screen.width * 0.9);

        Event.observe(this._adjust_size_button, 'click', this.adjustReaderWindow.bindAsEventListener(this));
        Event.observe(window, 'resize', this.resizeReaderWindow.bindAsEventListener(this));
        Event.observe(this._close_info_panel, 'click', this._closeInfoPanel.bindAsEventListener(this));
        Event.observe(this._open_info_panel, 'click', this._openInfoPanel.bindAsEventListener(this));

        this._info_panel.show();
        this._separator.hide();

        var w = this._toolbar.getWidth() - this._viewer_panel.getWidth();

        if (w > 2) {
            this._info_panel.style.width= (w-2) + 'px';
        }
        this.resizeReaderWindow();
    },
    
    _getWindowSize : function () 
    {
        var height = 0;
        var width = 0;

        if( typeof( window.innerHeight ) == 'number' ) {
            height = window.innerHeight;
            width = window.innerWidth;
        } 
        else if( document.documentElement && document.documentElement.clientHeight ) {
            height = document.documentElement.clientHeight;
            width = document.documentElement.clientWidth;
        } 
        else if( document.body && document.body.clientHeight ) {
            height = document.body.clientHeight;
            width = document.body.clientWidth;
        }
        return ({"height": height, "width": width});
    },

    resizeReaderWindow: function () 
    {
        var t = this._toolbar.cumulativeOffset().top + this._toolbar.getHeight();   
        // add offset to center the page image

        var h = this._image_panel.getHeight() + 16;
        var l = this._toolbar.cumulativeOffset().left;
        var l_win_dim = this._getWindowSize();

        // Calculate the height of the page
        // If page height is less the window height, then extend the page

        var l_max_height = l_win_dim.height - t;
        if (h < l_max_height) {
            h = l_max_height;
        }

        // adjust height

        this._viewer_panel.style.top= t + "px";
        this._viewer_panel.style.height= h + "px";
        this._viewer_panel.style.left = l + "px";

        // Calculate the width of the page
        // Assuming the outer wrap already take into consideration of scrollbar

        var l_toolbar_width = $('wrap').getWidth();

        if (l_toolbar_width > l_win_dim.width) {
            l_toolbar_width = l_win_dim.width - 5;
        }

        if (l_toolbar_width < 650) {
            l_toolbar_width = 650;
        }

        // If scrollbar width is more then the page width, hide the info panel

        // and adjust the page width later.

//        if (l_toolbar_width < (this._viewer_panel.getWidth() + 10)) {
//            this._info_panel.hide();
//            this._separator.show();
//        }

        this._toolbar.style.width = l_toolbar_width - 2 + "px";
    	// fix RealTimeDisplay issue because reader_top doesn't exist in RealTimeDisplay
        if ($('reader_top')){
        	$('reader_top').style.width = this._toolbar.getWidth() + "px";
        }
        
        if (this._info_panel.visible()) {
            l = l + this._viewer_panel.getWidth();

            this._info_panel.style.top= t + "px";
            this._info_panel.style.height= h - 1 + "px";
            this._info_panel.style.left= l + "px";
            var info_pannel_width = l_toolbar_width - this._viewer_panel.getWidth();
            var adjust_width = 0;
            if (info_pannel_width < 200){
            	adjust_width = 200 - info_pannel_width;
            	info_pannel_width = 200;
            }
            this._info_panel.style.width= info_pannel_width -1 + "px";
            if (adjust_width > 0){
            	this._toolbar.style.width = this._toolbar.getWidth() -2 + adjust_width + "px";
            	// fix RealTimeDisplay issue because reader_top doesn't exist in RealTimeDisplay
                if ($('reader_top')){
                	$('reader_top').style.width = this._toolbar.getWidth() + "px";
                }
            }	
            

            // adjust biblio and notes height

            var l_biblio_height = 5;
            if (h > 600) {
               l_biblio_height = 250;
            }
            else if (h > 400) {
                l_biblio_height = h - 350;
            }
            this._notes_panel.style.height = (h - l_biblio_height - 20) + 'px';
            this._biblio_panel.style.height = l_biblio_height + 'px';
        }
        else {
            this._viewer_panel.style.width= (l_toolbar_width - this._separator.getWidth()-2) + "px";
            l = l + this._viewer_panel.getWidth();

            this._separator.style.top= t + "px";
            this._separator.style.height= h - 1 + "px";
            this._separator.style.left= l + "px";
        }           
    },

    adjustReaderWindow: function (e) 
    {
        if (e) Event.stop(e);

        var w = this._image_panel.getWidth() + 17;
        var h = this._image_panel.getHeight() + this._toolbar.cumulativeOffset().top + this._toolbar.getHeight() + 54;

        if (w < 500) w = 500;

        var l_toolbar_width = w + 300;
        if (l_toolbar_width > this._max_width) {
            l_toolbar_width = this._max_width;
        }
        this._viewer_panel.style.width= w + 'px';

        this._info_panel.show();
        this._separator.hide();

        var l_win_dim = this._getWindowSize();
        if (l_toolbar_width > l_win_dim.width) {
            window.resizeTo(l_toolbar_width,h);
        }
        this.resizeReaderWindow();
    },

    _openInfoPanel: function (e) 
    {
        if (e) Event.stop(e);

        this._info_panel.show();
        this._separator.hide();

        var w = this._toolbar.getWidth();
        this._info_panel.style.width= '350px';
        w = w - this._info_panel.getWidth();

        this._viewer_panel.style.width= (w-2) + 'px';
        this.resizeReaderWindow();  
    },

    _closeInfoPanel: function (e) 
    {
        if (e) Event.stop(e);

        this._info_panel.hide();
        this._separator.show();

//        var w = this._toolbar.getWidth();
//        w = w - this._separator.getWidth();
//        this._viewer_panel.style.width= (w-3) + 'px';
        this.resizeReaderWindow();  
    }
};

var ImgButtonMenu = Class.create();

ImgButtonMenu.prototype = 
{
    initialize: function(p_button_id, p_select_button_id, p_menu_option, p_callback) { 
        this._button = $(p_button_id);
        this._keep_selection = p_menu_option.keepSelected;
        this._image_folder = p_menu_option.imgFolder;
        this._select_button = $(p_select_button_id);
        
        var l_menu_id = p_button_id + '_menu';
        this._menu_labels = p_menu_option.labels;
        this._button.down().writeAttribute('src',this._image_folder + this._menu_labels[p_menu_option.defaultValue]);

        this._menu = this._createMenu (l_menu_id, p_menu_option.labels, p_menu_option.defaultValue);
        this._button.parentNode.appendChild(this._select_button);
        this._button.parentNode.appendChild (this._menu);
        this._callback = p_callback;
        this._current_type = p_menu_option.defaultValue;
       
        this._registerEvents();
        this.toggleButtons(true);
    },    
    
    _registerEvents: function() {
        this._select_button.observe("click", this._toggleMenu.bindAsEventListener(this));
        var l_items = this._menu.select('li');
        var i;
        for (i=0; i<l_items.length; i++) {
            l_items[i].observe("click", this._selectItem.bindAsEventListener(this));
            l_items[i].observe("mouseover", this._toggleHover.bindAsEventListener(this));
            l_items[i].observe("mouseout", this._toggleHover.bindAsEventListener(this));
        }
        this._button.observe("click",this._doAnnotation.bindAsEventListener(this));
   },
    
    _doAnnotation: function() {
        if (this._callback != undefined) {
            this._callback(this._current_type);
        }       
     // google analytics code
        if (typeof _gaq != "undefined") {	
        	_gaq.push(['_trackEvent', 'Reader_Feature', 'annotate' , 'User added notes-annotation']); 
        }
    },	
    
    _createMenu: function (p_menu_id, p_menu_names, p_default_value) {
        var l_menu = new Element('div',{'class':'button_menu img_button_menu'});
        l_menu.id = p_menu_id;
        var list = new Element('ul');
        l_menu.appendChild (list);
        
        var l_name, l_item,l_img;
        for (l_name in p_menu_names) {            
            l_img = 'url(' + this._image_folder + p_menu_names[l_name] + ')';            
            l_item = new Element('li',{'style':'background-image:' + l_img});
            l_item.menu_value = l_name;
            
            if (this._keep_selection && l_name == p_default_value) {
                l_item.addClassName('selected');
            }
            list.appendChild(l_item);
        }
        l_menu.hide();
        return (l_menu);
    },
    
    _toggleHover: function(p_event) {
        var t = p_event.element();
        if (t.hasClassName('hover')) {
            t.removeClassName('hover');

            var x = Event.pointerX (p_event);
            var y = Event.pointerY (p_event);
            
            if (x < this._menu_left+2 || x > this._menu_right-2 || y < this._menu_top+2 || y > this._menu_bottom-2) {
                this._menu.hide();
            }            
        }
        else {
            t.addClassName('hover');
        }
    },
    
    _selectItem: function (p_event) {
        Event.stop (p_event);
        var l_selected = Event.element(p_event);
        var l_items = this._menu.select('li');
        var i, l_item;
        for (i=0; i<l_items.length; i++) {
            l_item = l_items[i];
            if (this._keep_selection) {
                if (l_item == l_selected) {
                    l_item.addClassName('selected');
                }
                else if (l_item.hasClassName('selected')) {
                    l_item.removeClassName('selected');
                }
            }
        }
        this._button.down().writeAttribute('src',this._image_folder + this._menu_labels[l_selected.menu_value]);
        this._current_type = l_selected.menu_value;
        if (this._callback != undefined) {
            this._callback(l_selected.menu_value);
        }  
        this._menu.hide();
     // google analytics code
        if (typeof _gaq != "undefined") {	
        	_gaq.push(['_trackEvent', 'Reader_Feature', 'annotate' , 'User added notes-annotation']); 
        }
    },
    
    _toggleMenu: function (p_event) {
        Event.stop (p_event);
        if (! this._menu.visible()) {
            var l_offset = this._button.cumulativeOffset() ;

            this._menu_top = l_offset.top + this._button.getHeight() + 1;
            this._menu_left = l_offset.left;
            this._menu_bottom = this._menu_top + this._menu.getHeight();
            this._menu_right = this._menu_left + this._menu.getWidth();
            
            this._menu.style.top = this._menu_top + 'px';
            this._menu.style.left = this._menu_left + 'px';

            this._menu.show();
        }
        else {
            this._menu.hide();
        }       
    },
    
    hideMenu: function() {
        this._menu.hide();
    },
    
    /**
     * Enable/disable buttons 
     */
    toggleButtons: function(p_enable) {
        this._button.disabled = !p_enable;
        this._select_button.disabled = !p_enable;
    }   
};

var ButtonMenu = Class.create();

ButtonMenu.prototype = 
{
    initialize: function(p_button_id, p_menu_option, p_callback) 
    { 
        this._button = $(p_button_id);
        this._keep_selection = p_menu_option.keepSelected;

        var l_menu_id = p_button_id + '_menu';
        this._menu_labels = p_menu_option.labels;

        this._menu = this._createMenu (l_menu_id, p_menu_option.labels, p_menu_option.defaultValue);

        this._button.parentNode.appendChild (this._menu);

        this._callback = p_callback;
        this._registerEvents();
    },  

    _registerEvents: function() 
    {
        this._button.observe("click", this._toggleMenu.bindAsEventListener(this));

        var l_items = this._menu.select('li');
        var i;

        for (i=0; i<l_items.length; i++) {
            l_items[i].observe("click", this._selectItem.bindAsEventListener(this));
            l_items[i].observe("mouseover", this._toggleHover.bindAsEventListener(this));
            l_items[i].observe("mouseout", this._toggleHover.bindAsEventListener(this));
        }
    },

    _createMenu: function (p_menu_id, p_menu_names, p_default_value)
    {
        var l_menu = new Element ("div");
        l_menu.id = p_menu_id;
        l_menu.addClassName('button_menu');

        var list = new Element ("ul");
        l_menu.appendChild (list);
       
        var l_name, l_item;

        for (l_name in p_menu_names) {
            l_item = new Element("li");
            l_item.innerHTML = p_menu_names[l_name];
            l_item.menu_value = l_name;           

            if (this._keep_selection && l_name == p_default_value) {
                l_item.addClassName('selected');
            }
            list.appendChild(l_item);
        }
        l_menu.hide();
        return (l_menu);

    },

    _toggleHover: function(p_event) 
    {
        var t = p_event.element();

        if (t.hasClassName('hover')) {
            t.removeClassName('hover');
            
            var x = Event.pointerX (p_event);
            var y = Event.pointerY (p_event);
            
            if (x < this._menu_left+2 || x > this._menu_right-2 || y < this._menu_top+2 || y > this._menu_bottom-2) {
                this._menu.hide();
            }
        }
        else {
            t.addClassName('hover');
        }

    },

    _selectItem: function (p_event) 
    {
        Event.stop (p_event);

        var l_selected = p_event.element();
        var l_items = this._menu.select('li');

        var i, l_item;
        for (i=0; i<l_items.length; i++) {
            l_item = l_items[i];
            if (this._keep_selection) {
                if (l_item == l_selected) {
                    l_item.addClassName('selected');
                }
                else if (l_item.hasClassName('selected')) {
                    l_item.removeClassName('selected');
                }
            }
        }

        if (this._callback != undefined) {
            this._callback(l_selected.menu_value, l_selected.innerHTML);
        }  
        this._menu.hide();

    },

    _toggleMenu: function (p_event) 
    {
        Event.stop (p_event);

        if (! this._menu.visible()) {
            var l_offset = this._button.cumulativeOffset() ;

            this._menu_top = l_offset.top + this._button.getHeight() + 1;
            this._menu_left = l_offset.left;
            this._menu_bottom = this._menu_top + this._menu.getHeight();
            this._menu_right = this._menu_left + this._menu.getWidth();
            
            this._menu.style.top = this._menu_top + 'px';
            this._menu.style.left = this._menu_left + 'px';
            this._menu.show();
        }
        else {
            this._menu.hide();
        }       

    },   
    
    hideMenu: function()
    {
        this._menu.hide();
    }
};

var SelectBox = Class.create();
SelectBox.prototype =
{
    initialize: function(p_parent, p_callback,p_cloak)
    { 
        this._parent = p_parent;
        this._callback = p_callback;
        this._selecting= false;
        this._box = null;    
        this._cloak = p_cloak;
        this._setBoundary();
        this._registerEvents();
    },  

    setBoundaryRequest: function(){
    	this._reset_boundary = true;    	
    },
    
    _setBoundary: function(){
        var l_offset = this._parent.cumulativeOffset() ;
        this._bound_x1 = l_offset.left;
        this._bound_y1 = l_offset.top;       

        this._bound_x2 = this._bound_x1 + this._parent.getWidth();
        this._bound_y2 = this._bound_y1 + this._parent.getHeight();
    	
    },

    _registerEvents: function() 
    {
        document.observe("mousemove", this._selectMove.bindAsEventListener(this));
        document.observe("mouseup", this._selectStop.bindAsEventListener(this));
		//this._cloak.observe('mouseup', this._selectStop.bindAsEventListener(this));
		//this._cloak.observe('mousemove', this._selectMove.bindAsEventListener(this));
    },

    selectStart: function (p_event)
    {
        Event.stop(p_event);
        if (this._reset_boundary){
        	this._setBoundary();
        	this._reset_boundary = false;
        }
        this._selecting = true;
        if (p_event.type == 'touchstart'){
        	this._mouse_x = p_event.touches[0].pageX - this._bound_x1;
        	this._mouse_y = p_event.touches[0].pageY - this._bound_y1;  
        }else{
        	this._mouse_x = Event.pointerX(p_event) - this._bound_x1;
        	this._mouse_y = Event.pointerY(p_event) - this._bound_y1;  
        }
        this._createBox(this._mouse_x, this._mouse_y);
    },

    _createBox: function (x, y)
    {
        if (this._box == null) {       
            this._box = new Element("div",{'class':'hilite_box left_to_right'});                
            this._parent.appendChild (this._box);
        } 
        else {
            this._box.show();
        }
        
        this._box.style.left = x + this._parent.parentNode.scrollLeft + 'px';
        this._box.style.top = y + this._parent.parentNode.scrollTop + 'px';
        this._box.setStyle ({width:'5px', height: '5px'});
    },    

    _normalizePos: function (x, y) 
    {
        // make sure x, y is within page boundary  
        if (x < this._bound_x1) {
            x = this._bound_x1 + 1;
        }
        else if (x > this._bound_x2) {
            x = this._bound_x2 - 1;
        }
     
        if (y < this._bound_y1) {
            y = this._bound_y1 + 1;
        }
        else if (y > this._bound_y2) {
            y = this._bound_y2 - 1;
        }

        // normalize x, y to the page
        x = (x - this._bound_x1);
        y = (y - this._bound_y1);   
        
        return ([x, y]);
    },

    _drawBox: function (x1, y1, x2, y2) 
    {
        var l_right_to_left = (x1 < x2 && y1 > y2) || (x1 > x2 && y1 < y2) ;
        
        if (l_right_to_left) {
            if (! this._box.hasClassName('right_to_left')) {
                this._box.removeClassName('left_to_right');
                this._box.addClassName('right_to_left');
            }
        }
        else {
            if (! this._box.hasClassName('left_to_right')) {
                this._box.removeClassName('right_to_left');
                this._box.addClassName('left_to_right');
             }
        }

        var w, h;
        if (x1 < x2) {
            w = x2 - x1;        
        }
        else {
            w = x1 - x2;        
            x1 = x2;
        }

        if (y1 < y2) {
            h = y2 - y1;        
        }
        else {
            h = y1 - y2;        
            y1 = y2;
        }
        this._box.style.left = x1 + this._parent.parentNode.scrollLeft + 'px';
        this._box.style.top = y1 + this._parent.parentNode.scrollTop + 'px';
        this._box.setStyle ({width:w+'px', height: h+'px'});
     },    

    _selectMove: function (p_event)
    {
    	var isTouch = (p_event.type == 'touchmove');
        if (this._selecting) {
            Event.stop(p_event);

            var p = this._normalizePos(isTouch?p_event.changedTouches[0].pageX:Event.pointerX(p_event), 
            	isTouch?p_event.changedTouches[0].pageY:Event.pointerY(p_event));
            this._drawBox (this._mouse_x, this._mouse_y, p[0], p[1]);
        }

    },

    _selectStop: function (p_event)
    {
        if (this._selecting) {
            Event.stop(p_event);
           	var isTouch = (p_event.type == 'touchend');


            this._selecting = false;
            var p = this._normalizePos(isTouch?p_event.changedTouches[0].pageX:Event.pointerX(p_event), 
            	isTouch?p_event.changedTouches[0].pageY:Event.pointerY(p_event));
            this.hideMe();
            if (this._callback) {
                this._callback (this._mouse_x+this._parent.parentNode.scrollLeft, 
                		this._mouse_y+this._parent.parentNode.scrollTop, 
                		p[0]+this._parent.parentNode.scrollLeft, 
                		p[1]+this._parent.parentNode.scrollTop);
            }
        }
    },
    
    hideMe: function(){
    	this._box.hide();
    	this._box = null;
    }
    
};


