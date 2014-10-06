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

var TocPopup = Class.create();

TocPopup.prototype = 
{
  	initialize: function(doc_id, toc_url, show_hits, search_action, p_async) 
  	{
   		this.doc_id = doc_id;
  		this.element = $('doc_' + doc_id);
  		
   		this.toc_url = toc_url;
   		this.show_hits = show_hits;
   		this.toc_win = null;
  		this.biblio_win = null;
   		this.toc_visible = false;
   		if (p_async !== undefined){
   			this._async = p_async;
   		}else{
   			this._async = true;
   		}
   		
   		if (search_action) {
   			this.search_action = search_action;
   		}
   		else {
   			this.search_action = 'docSearch.action';
   		}
	
	    this.eventClick = this.toggleToc.bindAsEventListener(this);
	    this.registerEvents();
	},

	destroy: function() 
	{
	    Event.stopObserving(this.element, "click", this.eventClick);
	    if (this.toc_win != null)
	    {
	    	Element.remove(this.toc_win);
	    	this.toc_win = null;
	    }
	},

	registerEvents: function() 
	{
	    Event.observe(this.element, "click", this.eventClick);
  	},

	newSearch: function (query, show)
	{
		if (this.toc_win != null)
	    {
	    	Element.remove(this.toc_win);
	    	this.toc_win = null;
	    }
	    this.show_hits = show;
	    this.toggleTocHelper(query);	    
	},
	
	toggleTocHelper: function(query) 
	{  	
		if (this.toc_win == null)
		{
			this.toc_win = new Element("div"); 
			this.toc_win.className = "popup_win";	

			this.toc_win.innerHTML = '<div class="toc_body"><p>'+ g_msg_retrieve_toc + '</p></div>';
			this.toc_win.toggleLink = this;
  	 		this.toc_visible = true;
			this._showTOCWin();
  			var url = this.search_action + '?' + query;		
    	 	new Ajax.Request(url, { method:'get', asynchronous: this._async, onSuccess: this._parseTOC.bind(this) } );					
		}
		else if (this.toc_visible == false)
		{
  	 		this.toc_visible = true;
			this._showTOCWin();
		}
		else
		{
   			this.toc_visible = false;
			this._hideTOCWin();
		}
	},
	
	toggleToc: function(event) 
	{
	  	Event.stop(event);
	  	this.toggleTocHelper(this.toc_url);
	},
	
  	_showTOCWin : function ()
  	{
  		if (this.toc_win == null) return;

		var biblio_div = $('biblio_' + this.doc_id);
		var desc_div = $('doc_desc_' + this.doc_id);
		
		if (biblio_div != undefined && biblio_div != null) {
			this.biblio_win = biblio_div.down('table');
			biblio_div.removeChild(this.biblio_win);		
			
			biblio_div.appendChild (this.toc_win);
			desc_div.appendChild(this.biblio_win);
		}
		else {
			desc_div.appendChild(this.toc_win);
		}
		this.element.innerHTML = g_msg_hide_toc;		
	},

	_hideTOCWin: function ()
	{
  		if (this.toc_win == null) return;
  		
		var desc_div = $('doc_desc_' + this.doc_id);
  		if (this.biblio_win != null)
		{
			var biblio_div = $('biblio_' + this.doc_id);
			desc_div.removeChild(this.biblio_win);

			biblio_div.removeChild(this.toc_win);
			biblio_div.appendChild (this.biblio_win);
			
			this.biblio_win = null;			
		}		
		else {
			desc_div.removeChild(this.toc_win);			
		}	
		this.element.innerHTML = g_msg_show_toc;
	},
		
  	_makeTOCHTML: function (toc_content)
  	{	
		var i, title, indent, first_hit, first_page, hits, score, title_class, has_child, chapter_num;
		
		var content = new Array();
		var index = 0;
		
		var child_offset = this.show_hits ? 89 : 19;
		content[index++] = '<div class="toc_main">';
		
		if (this.show_hits)
		{
			content[index++] = '<div class="toc_header">';
			content[index++] = '<div class="toc_hits "><b>' + g_label_rank + '</b></div>';
            content[index++] = '<div class="toc_hits toc_chapter"><img src="/images/search/sign_trans.gif"><b>&nbsp;' + g_label_chapter + '</b></div>';
			content[index++] = '</div>';
		}
		
		
		var doc_id = toc_content.docID;
		var indent_margin, child_level,current_chapter;
		var doc_url;
		chapter_num = toc_content.chapters.length;
		this.init_open =  chapter_num <= 10;

		for (i=0; i< chapter_num; i++)
		{
			current_chapter =toc_content.chapters[i]; 
			title = current_chapter.title;
			indent = current_chapter.indent;
			first_hit = current_chapter.firstHit;
			first_page = current_chapter.firstPage;
			hits = current_chapter.hits;
			score = current_chapter.score;

			if (indent >=0 && title.length > 0)
			{
				title_class =  (score > 70) ? "recommend" : "";

				has_child = i < chapter_num -1 && (current_chapter.indent < toc_content.chapters[i+1].indent);

				if (i > 0)
				{
					child_level = toc_content.chapters[i-1].indent - current_chapter.indent;
					while (child_level-- > 0) {
						content[index++] = '</div></div>';
					}
				}		
				content[index++] = '<div class="toc_header">';

				if (this.show_hits)
				{
					content[index++] = '<div class="toc_hits ">';
					content[index++] =  '<img width="' + Math.round(score * 0.6) + '" alt="Rank: ' + score + '" title="Rank: ' + score + '" height="8" src="/images/search/1x1drkgry.gif">';					
					content[index++] = '</div>';
				}
				indent_margin = 12*indent + 1;
				content[index++] = '<div class="child_op" >'; 
				content[index++] =  '<img width="' + indent_margin + '" height="9" src="/images/search/sign_trans.gif">';				
				if (has_child) {
					content[index++] = '<img src="/images/search/sign_' + (this.init_open  ? 'minus' : 'plus' )+ '.png" onclick="toggleChapterChild(this)">';
				}
				else {
					content[index++] = '<img src="/images/search/sign_trans.gif">';
				}
				if (this.show_hits) {
					if (first_hit > 0) {
						doc_url = 'javascript:openTocDoc(\'' + doc_id + '\',' + first_hit+ '); return false;';
						content[index++] = '<A target="_parent" HREF="' + doc_url + '" onclick="'+ doc_url + '">';
						content[index++] = '<img alt="' + g_msg_first_hit + '" title="' + g_msg_first_hit + '" src="/images/search/first_hit_on.png">';
						content[index++] = '</a>';
					}
					else {
						content[index++] = '<img width="14" height="9" src="/images/search/sign_trans.gif">';					
					}
				}
				content[index++] = '</div>';
				
				doc_url = 'javascript:openTocDoc(\'' + doc_id + '\',' + first_page+ '); return false;';
				content[index++] = '<div class="toc_title" style="margin-left: ' + (child_offset+ indent_margin ) + 'px">';
				content[index++] = '<A class="' + title_class + '" target="_parent" title="' + g_msg_first_page + '" HREF="' + doc_url + '" onclick="'+ doc_url + '">';

				content[index++] = title + '</a>';
				content[index++] = '</div>';

				if (has_child)
				{
					if (this.init_open)
					{
						content[index++] = '<div class="toc_child" >';
					}
					else 
					{
						content[index++] = '<div  class="toc_child" style="display: none">';
					}
				}
				else {
					content[index++] = '</div>';
				}
			}
		}
		while (indent-- > 0) {
			content[index++] = '</div></div>';
		}
		content[index++] = '</div>';
		return content.join("");
  	},

	_parseTOC: function (transport)
	{
		var toc_text = transport.responseText;
		var toc_content = null;
		var html = "";
		var docID = null;

		if (toc_text == null || toc_text.length == 0)
		{
			html = "Sorry, no table of contents available";
		}
		else
		{
			// guard against ajax hack
			if (toc_text.substr(0,9) == 'while(1);') {
				toc_text = toc_text.substring(10);
			}
			toc_content = eval('(' + toc_text + ')');
			docID = toc_content.docID;
		}
		
		if (toc_content != null && toc_content.status == false)
		{
			html = toc_content.message;
		}
		else if (toc_content != null)
		{
			html = this._makeTOCHTML(toc_content);
		}
		this.toc_win.down('div.toc_body').innerHTML = html;
		colorTOC(this.toc_win.down('div.toc_main'), '', this.init_open);
		
	}
}

function colorTOC(parent_div, row_color, init_open)
{
    var row, child_div;
    var childs = parent_div.childNodes;

    for(var i=0; i < childs.length; i++)
    {
		row = childs[i];
		if ( row.className == "toc_header" )
		{
			row_color = (row_color == '#E6E6FA') ? '#FFFFFF' : '#E6E6FA';
			row.style.backgroundColor = row_color;
			child_div = row.childNodes[row.childNodes.length -1];
			if (child_div.className == 'toc_child' && (init_open || child_div.opened == true))
			{
				row_color = colorTOC (child_div, row_color, init_open);
			}
		}
	}
	return (row_color);
}

	
function toggleChapterChild (sec_image)
{
	var section = $(sec_image).up('DIV.toc_header');
	var chapters = section.down('DIV.toc_child');
	var toc_main = chapters.up('.toc_main');

	if (typeof chapters != 'undefined')
	{
		var src_path = sec_image.src;
		if (src_path.indexOf('sign_minus') >= 0) 
		{
			chapters.hide();
			sec_image.src = '/images/search/sign_plus.png';
			chapters.opened = false;
		}
		else 
		{
			chapters.show();
			sec_image.src = '/images/search/sign_minus.png';
			chapters.opened = true;
		}	
		colorTOC(toc_main, '', false);
	}
}