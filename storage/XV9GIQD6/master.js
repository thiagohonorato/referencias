var j$ = jQuery.noConflict();
var tid;
var cartCookieRequested=false;
var xhr;


/*--------jQuery Plugins---------*/

//jQuery Throttle/Debounce
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

//Declare Global
var Xplore = Xplore || {};

//Xplore Configuration
Xplore.config = {
	THROTTLE_DELAY: 1000,
	DEBOUNCE_THRESHOLD: 1000,
};



function acmPopup(){
	var w=600;
	var h=400;
	var doi = j$(this).attr("data-doi") ;
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	var acmUrl = "http://dx.doi.org/" + doi;
	window.open( acmUrl,  'Rightslink', 'location=no,toolbar=no,directories=no,status=no, menubar=no,scrollbars=yes,resizable=yes,top='+top+'px,left='+left+'px,width='+w+'px,height='+h+'px');
	return false;
}

function initEasyXdm()
{
	xhr = new easyXDM.Rpc({
		//protocol: 0 ,
	    //local: "/assets/img/logo.xplore.gif",
	    // local: XPLORE_SSL_HOST+'/assets/easyxdm/name.html',
	    // hash: "true",	   
	    swf: XPLORE_SSL_HOST+"/assets/easyxdm/easyxdm.swf",
	    // swfContainer: "flashContainer",
	    //swfNoThrottle:"true",
	    container: "iframeContainer",	   
	    props:{
	 		style: { width: "20px", height: "20px", background: "white", allowTransparency: "true",marginwidth: "0", marginheight: "0", frameborder: "0",margin: "0",  border: "0px" }
	    
	    },
	    //remote: XPLORE_SSL_HOST+'/assets/easyxdm/cors/'
	    remote: XPLORE_SSL_HOST+"/assets/easyxdm/cors/",
	    //remoteHelper: XPLORE_SSL_HOST+'/assets/easyxdm/name.html'    
	    onReady: function() 
	    {    
	    	//alert('activityFrameLoaded: onReady'+XPLORE_SSL_HOST);  // this gets called  
	    }
	    
	    }, {
	    	remote: {
	             request: {}
	       }
	});
}
j$(document).ready(function() {
	j$('.acmPopUp').bind('click',acmPopup);

	jQuery.validator.addMethod(
		    "multiemails",
		     function(value, element) {
		         if (this.optional(element)) // return true on optional element
		             return true;
		         var emails = value.split(/[;,]+/); // split element by , and ;
		         valid = true;
		         for (i=0;i<emails.length;i++) {
		        	 value = emails[i];

		             valid = valid &&
		                     jQuery.validator.methods.email.call(this, j$.trim(value), element);
		         }
		         return valid;
		     },

		   jQuery.validator.messages.multiemails
	);
	
	  j$.fn.doOnce = function(func) { 
	    this.length && func.apply(this); 
	    return this; 
	  };
	  
	// Create the tooltips only on document load
		initEasyXdm();
	   j$.fn.qtip.defaults.style.classes = 'ui-tooltip-plain ui-tooltip-shadow ui-tooltip-rounded';
	   j$('.qtooltip').qtip(
	   {
		    content: j$(this).id, // Give it some content, in this case a simple string
			position: {
				my: 'middle left',
				at: 'middle right'
			}      
	   });
	   j$('.qtooltip-left').qtip(
			   {
				    content: j$(this).id, // Give it some content, in this case a simple string
					position: {
						my: 'middle right',
						at: 'middle left'
					}      
			   });	
	   j$('.qtooltip-bottom').qtip(
			   {
				    content: j$(this).id, // Give it some content, in this case a simple string
				    position: {  
					    corner: {
					         target: 'middleTop',
					         tooltip: 'middleBottom'
					      }
				   		}
			   });	 
	   //j$('#mdCloseButton').focus();

	if(!jQuery.fn.placeholder.input) j$("label.overlabel").overlabel();
	j$('#LayoutWrapper').delegate('#singleSignOnClose','click',function(event) {
		event.preventDefault();
	     j$(this).closest('#singleSignOnFlyout').hide();
	   });	
	   	j$('#LayoutWrapper').delegate('#singleSignOnClose','keypress',function(event) {
		 if (event.keyCode == 13){
	     j$(this).closest('#singleSignOnFlyout').hide();
		 j$("#singleSignOnLink").focus();
		 }
	   });
	j$("#singleSignOnLink").click(function(){
		loadSSOJs();
		j$("#modalWindowSignInError281").hide();
		j$("#loadingImg").hide();
		j$("#singleSignOnFlyout").slideDown(0);
		j$("#singleSignOnLink2").focus();
		return false;
	});	
  j$('#AuthTools .SubMenu a').width(j$('#SignOutFlyOutLink').width()-20 > 90 ? j$('#SignOutFlyOutLink').width()-20 : 90);
	

  j$.support.touchEvents = (function(){
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  })();

  
  j$('div.select-all-checkboxes').doOnce(function(){
	    this.allCheckboxes();
  });

  j$('#UtilityNav').doOnce(function(){
	    this.dropdown({
	      hclass : 'Hover',
	      el : '.DHTMLMenu > *'
	    });
	  }); 
  j$('#ToolBar').doOnce(function(){
    this.dropdown({
      hclass : 'Hover',
      el : '.DHTMLMenu > *'
    });
  });
  j$('#toolbarSearchbar').doOnce(function(){
	    this.dropdown({
	      hclass : 'hover',
	      el : '.DHTMLMenu > *'
	    });
	  });
  j$('#popup-search-preferences').actionSearchToolBar({
		      layout : 'custom',
			  actionId : 'action-preferences',
		      hrefUrl : '/xpl/mwUserPreferences.jsp'
		    });
  j$('#popup-search-preferences-mysettings').delegate(j$(this),'click', function(){
	  j$('#popup-search-preferences').trigger('click');
  });
  
  j$('#search-tips-popup').doOnce(function(){			 
		    this.actionSearchToolBar({
			      layout : 'horizontal',
				  actionId : 'search-tips',
			      hrefUrl : '/xpl/cmsSearchTips.jsp'
			    });

	});
  
  
  // By Topic flyout menu
  var $by_topic_flyout = j$('#byTopicFlyout');
  var $browse_content = j$('#browse-content');
  j$('#byTopicLink').on('click', function(e){
    $by_topic_flyout.show();
    $browse_content.addClass('open');
    e.preventDefault();
  });
  j$('#byTopicClose').on('click',function(e) {
    $by_topic_flyout.hide();
    $browse_content.removeClass('open');
    e.preventDefault();
  });
	if  (IBP_WS_ENABLED_FLAG)
	{
		setCurrentCartCount();
	}

});

(function(j$){
  j$.fn.dropdown = function(options) {
    defaults = {
      hclass : 'hover',
      el : 'li'
    };
    var options = j$.extend(defaults, options);
    return this.each(function() {
      var $this = j$(this);
      var $top_level = $this.find(options.el).siblings().andSelf();
      $top_level.each(function() {
        j$(this).data('open', false);	
      });
      var showMenu = function() {
        $top_level.each(function() {
          if (j$(this).data('open') == true) {
            j$(this).removeClass(options.hclass).data('open', false);
          }
        });
        j$(this).addClass(options.hclass).data('open', true);
      };
      var hideMenu = function() {
        if (j$(this).data('open') == true) {
          j$(this).removeClass(options.hclass).data('open', false);        
        }
      };
      if (j$.fn.hoverIntent) {
        var config = {    
          over: showMenu, 
          timeout: 500, 
          out: hideMenu 
        };
        $top_level.hoverIntent(config);
      } else {
        $top_level.hover(showMenu, hideMenu);
      }
      
      /*
       * Not sure why we need the code below (originally provided by DP  but having it is causing the flyout not work on ipad and iphone
      if (j$.support.touchEvents) {
    	alert("removed");
    	
        var is_closed = true;
        //$top_level.unbind('mouseenter').unbind('mouseleave');
        $top_level.find('> a').on('touchstart', function(e) {
          e.stopPropagation();
          if (!j$(this).parent().hasClass(options.hclass)) {
            e.preventDefault();
            $top_level.removeClass(options.hclass);
            j$(this).parent().addClass(options.hclass);
            if (is_closed) {
              j$(document).one('touchstart', function() {
                $top_level.removeClass(options.hclass);
                is_closed = true;      
              });
            }
            is_closed = false;           
          } 
        });
      }*/
    });
  };
})(jQuery);


(function(j$){
  j$.fn.tabify = function(options) { 
    defaults = {
      target_el : 'div.section'
    };
    var options = j$.extend(defaults, options);
    return this.each(function() {
      var $this = j$(this);
      var $tabs_nav = $this.find('div.nav-tabs');
      var $tabs = $tabs_nav.find('li');
      var $tab_secs = $this.find(options.target_el);
      $tabs.eq(0).addClass('active');
      $tab_secs.hide();
      $tab_secs.eq(0).show();
      $tabs_nav.delegate('a', 'click', function(e) {
        e.preventDefault();
        var $this_lnk = j$(this);    
        var this_href = $this_lnk.attr('href');
        $tab_secs.hide();
        j$(this_href).show();
        $tabs.removeClass('active');
        $this_lnk.closest('li').addClass('active');
      });
    });
  };
})(jQuery);


(function (j$) {
  j$.fn.carousel = function (options) {
    defaults = {
      speed    : 500,
      indicate : false,
      autoplay : false,
      delay    : 10000
    };
    var options = j$.extend(defaults, options);
    return this.each(function () {
      var $this = j$(this);
      var $wrapper = $this.find('div.wrapper');
      var $slider = $wrapper.find('div.slider');
      var $items = $slider.find('div.item');
      var $single = $items.eq(0);
      var single_width = $single.outerWidth();
      var visible = Math.ceil($wrapper.innerWidth() / single_width);
      var current_page = 1;
      var pages = Math.ceil($items.length / visible);
      var $indicators;
      if ($items.length <= visible) {
        return false;
      }

      // add empty items to last page if needed
      if ($items.length % visible) {
        var empty_items = visible - ($items.length % visible);
        for (i = 0; i < empty_items; i++) {
          $slider.append('<div class="item empty" />');
        }
        $items = $slider.find('div.item'); // update
      }

      // clone last page and insert at beginning, clone first page and insert at end
      $items.filter(':first').before($items.slice(-visible).clone()
        .addClass('clone'));
      $items.filter(':last').after($items.slice(0, visible).clone()
        .addClass('clone'));
      $items = $slider.find('div.item'); // update

      // reposition to original first page
      $wrapper.scrollLeft(single_width * visible);
      function gotoPage(page) {
        var dir = page < current_page ? -1 : 1;
          var pages_move = Math.abs(current_page - page);
          var distance = single_width * dir * visible * pages_move;

        $wrapper.filter(':not(:animated)').animate({
          scrollLeft:'+=' + distance
        }, options.speed, function () {

          // if at the end or beginning (one of the cloned pages), repositioned to the original page it was cloned from for infinite effect
          if (page == 0) {
            $wrapper.scrollLeft(single_width * visible * pages);
            page = pages;
          } else if (page > pages) {
            $wrapper.scrollLeft(single_width * visible);
            page = 1;
          }

          current_page = page;

          if (options.indicate) {
            updateIndicators(page);
          }
        });
      }

      var controls = j$('<div class="controls" />');
      var btn_prev = j$('<span class="button prev" />')
        .on('click',function () {
          gotoPage(current_page - 1);
        }).appendTo(controls);
      var btn_next = j$('<span class="button next" />')
        .on('click',function () {
          gotoPage(current_page + 1);
        }).appendTo(controls);
      controls.appendTo($this);
      if (options.indicate) {
        $indicators = j$('<div class="indicators" />');
        for (i = 1; i <= pages; i++) {
          j$('<span>' + i + '</span>').on('click', function () {
            var this_ref = j$(this).data('ref');
            gotoPage(this_ref);
          })
            .data('ref', i)
            .appendTo($indicators);
        }
        $indicators.find('span').eq(0).addClass('active');
        $indicators.appendTo($this);
      }

      function updateIndicators(ref) {
        $indicators.find('span.active').removeClass('active');
        $indicators.find('span').eq(ref - 1).addClass('active');
      }

      if (options.autoplay) {
        j$(window).load(function () {
          var play = true;
          $this.hover(
            function () {
              play = false;
            },
            function () {
              play = true;
            }
          );
          setInterval(function () {
            if (play) {
              btn_next.trigger('click');
            }
          }, options.delay);
        });
      }

    });
  };
})(jQuery);

(function(j$){
	  j$.fn.allCheckboxes = function(options) { 
	    defaults = {
	      parent_el : '#results-blk'
	    };
	    var options = j$.extend(defaults, options);
	    return this.each(function() {
	      var $this = j$(this);
	      var $check = j$(this).find(':checkbox.all');
	      var checked = false;
	      $check.prop('checked', false);
	      $this.show();
	      $targets = $check.parents(options.parent_el).find(':checkbox').not($check);
	      $check.on('click', function(){
	        $targets.prop('checked', this.checked);
	        if ($check.prop('checked')) {         
	          checked = true;
	        }
	      }); 
	      $targets.on('click', function(){
	        if (checked) {
	          $check.prop('checked', false);
	          checked = false;
	        }
	      });    
	    });
	  };
	})(jQuery);


/* JQUERY REPLACEMENT for Sign On Flyout written in Prototype below. This version is more stable with IE (MCS) */
function loadSSOJs()
{
	if(IBP_WS_ENABLED_FLAG)
	{
		var JS_LOCATION=IBP_WS_ASSETS+'/ieee-mashup/js';
		var scripts = ['/common/jquery.json-2.2.min.js', '/common/jquery.cookie.js','/auth/ieee-auth-constants.js','/auth/ieee-auth-include.js','/common/postmessage.js'];
		for(var i = 0; i < scripts.length; i++) {
		  j$.getScript(JS_LOCATION+scripts[i], function() {
		    //alert('script loaded');
		  });
		}
	}
}



function changeTypeToPassword(prefix,id)
{
	
    j$("#"+prefix+"password-txt-span").hide();
    j$("#"+prefix+"password-hidden-span").show();	
   
    j$("#"+id).focus();

}
function changeTypeToText(prefix,id)
{
	var pwd_val=j$.trim(j$("#"+id).val());

	if(pwd_val.length<=0)
	{
	    j$("#"+prefix+"password-txt-span").show();
	    j$("#"+prefix+"password-hidden-span").hide();	
	}
}
j$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return decodeURIComponent(results[1].replace(/\+/g, " ")) || 0};

j$.extend({URLEncode:function(c){var o='';var x=0;c=c.toString();var r=/(^[a-zA-Z0-9_.]*)/;
	  while(x<c.length){var m=r.exec(c.substr(x));
	    if(m!=null && m.length>1 && m[1]!=''){o+=m[1];x+=m[1].length;
	    }else{if(c[x]==' ')o+='+';else{var d=c.charCodeAt(x);var h=d.toString(16);
	    o+='%'+(h.length<2?'0':'')+h.toUpperCase();}x++;}}return o;},
	URLDecode:function(s){var o=s;var binVal,t;var r=/(%[^%]{2})/;
	  while((m=r.exec(o))!=null && m.length>1 && m[1]!=''){b=parseInt(m[1].substr(1),16);
	  t=String.fromCharCode(b);o=o.replace(m[1],t);}return o;}
	});
function redirectToWayf()
{
	var url;
	url=j$.urlParam("url");
	
	if(url=="0")
	{
		if(window.parent==null)
    		url=window.location.href;
		else
			url=window.parent.location.href;
	}
	
	if(url.indexOf("guesthome.jsp")>=0)
		url="/Xplore/home.jsp";
	
	url=j$.URLEncode(url);
	
	if(window.parent==null)
		window.location.href="/servlet/wayf.jsp?url="+url;
	else
		window.parent.location.href="/servlet/wayf.jsp?url="+url;
}
function attemptMergeCart()
{
	 if(!cartCookieRequested && IS_INDIVIDUAL_USER)
	 {
       var cartCount=0;
  	   abortTimer();
  	   
  	   //alert("About to make ajax call to merge cart");
  	   
	   var html=j$.ajax({
			url: "/xpl/mwGetIeeeUserInfo.jsp",
         method: "POST",
         cache: false,
         timeout: 28000,
         async: false,
         data: {
         }
		}).responseText;
	   
	   //alert("ajax call complete");
	   
	   cartCookie=j$.cookie('ieeeUserInfoCookie');
	   //alert("cartCookie after merge: "+cartCookie);
	   
	   if(cartCookie!=null && cartCookie.length > 0)
	   {
	     cartCookieObj=j$.parseJSON(cartCookie);
	     //alert(cartCookieObj.cartItemQty);
		 if(cartCookieObj.cartItemQty)
		 {
			 cartCount=cartCookieObj.cartItemQty;
		 }
		 j$('#cartCount').html('Cart&nbsp;('+cartCount+')');
		 // refresh mini cart here
		 if (isFunction("mc_forceRefreshMiniCart")== true)
		   mc_forceRefreshMiniCart();
	   }
	   else
    	 j$('#cartCount').html('Cart&nbsp;(0)');
		   
       cartCookieRequested=true;
       
	 }else
	 {
		 j$('#cartCount').html('Cart&nbsp;(0)');
	 }
}
function abortTimer() { // to be called when you want to stop the timer
	  clearInterval(tid);
}
function  cartBoxCheck(){

    var  pcart = j$( '.mc-product-cart' );
    if (pcart)
    {
         if  (pcart.find( '.mc-header' ).length){
              
              if  (!pcart.hasClass( 'box' )){
                   pcart.addClass( 'box box-style-4' );
              }
         } else {
              pcart.removeClass( 'box box-style-4' );
         }
    }
    


}
function stopCrossSiteScripting(terms) {
  	terms = terms.replace("<script>",""); 
    terms = terms.replace("<script",""); 
    terms = terms.replace("</script",""); 
    terms = terms.replace("/script>",""); 
    terms = terms.replace("fromCharCode",""); 
    terms = terms.replace("http",""); 
    terms = terms.replace("https",""); 
    terms = terms.replace("iframe",""); 
    return terms;
}	
function setCurrentCartCount() {
	var cartCount=0;
	cartBoxCheck();
	if(j$ !=null && j$.cookie !=null)
	{
	 cartCookie=j$.cookie('ieeeUserInfoCookie');
	 if(cartCookie)
	 {
		
		 if(cartCookie.indexOf("userInfoId")==-1)
			 attemptMergeCart();
		 
		 var cartCookieObj=j$.parseJSON(cartCookie);
		 if(cartCookieObj.cartItemQty)
		 {
			 cartCount=cartCookieObj.cartItemQty;
			 
			
		 }
		 j$('#cartCount').html('Cart('+cartCount+')');		 
	 }
	 else
	 {
		 attemptMergeCart();		 
	 }
	}
	
}
function toggleAddToCart(){
	setCurrentCartCount();
	//check if mini cart javascript functions are avaiable and if not show button (When the user clicks on button, they will be prompted that the add to cart is currently not available)
	//if mini cart javascript functions are available continue with logic 
	if (isFunction("isPartNumberExists")== false || isFunction('mc_addItems')== false ) {
		j$("#addToCartSpan").show();
		j$("#addedToCartSpan").hide();
		return;
	}
	cartBoxCheck();
  j$("#purchase-options input[type=radio]").each(function () {
    productType = j$(this).next('label').text().trim();
  	partNumber=j$(this).val();
  	if(partNumber){		
  		if( isPartNumberExists(partNumber) == true){
        addedToCartText(productType);
        return;
   		}	
  	}else{
  		j$("#addToCartSpan").show();
  		j$("#addedToCartSpanBundle").hide();
  	}
  });
  j$("#purchase-options input[type=checkbox]").each(function () {
    partNumber=j$(this).val();
    //alert( "isPartNumberExists(partNumber)" +isPartNumberExists(partNumber));
    if(partNumber){   
      if( isPartNumberExists(partNumber) == true){
      j$("#addToCartSpan").hide();
      j$("#addedToCartSpan").show();
      j$("#addedToCartSpan").css('display', 'inline-block');
      } 
    }else{
      j$("#addToCartSpan").show();
      j$("#addedToCartSpan").hide();
    }
  });
	repaintWrapper();
	j$('#mc-signin-link').unbind('click');
	j$('#article-sidebar').delegate('#mc-signin-link','click',showSignIn);
}

function addedToCartText(productType){
  j$("#addedToCartSpanBundle").show(1000, function(){
    if(productType === 'Bundle'){
      j$("#addedToCartSpanBundle").text('Bundled item is added to cart. To purchase individual item, remove bundle from cart.');
    }else{
      j$("#addedToCartSpanBundle").text('Individual item is added to cart. To purchase bundle, remove individual item from cart.');
    }
  });
  j$("#addToCartSpan").find('#add-to-cart-button').attr({
    src: ASSETS_RELATIVE_PATH +'/v2/img/btn.add-to-cart-g.png',
    disabled: "disabled"
  });
}

function errorInitMiniCart()
{
	alert("Error Initializing Mini Cart");
}
function repaintWrapper() //evaluates if cart should be fixed scroll or not
{
	
	if (j$('.mc-header').length) {   
    	j$('#flt-container').ibpFloatVertical({"bottomCollisionId":"FooterWrapper"});         	
	} else {
	   j$('#flt-container').unbind('cartScroll').attr('style','');
	}
}

//Print button functionality
j$('li.tl-print').on('click', function() {
  if (!j$(this).hasClass('disabled')) {
    window.print();
  }
});

( function( j$ ) {
	 
    // plugin definition
    j$.fn.overlabel = function( options ) {
        // build main options before element iteration
        var opts =j$.extend( {}, j$.fn.overlabel.defaults, options );
 
        var selection = this.filter( 'label[for]' ).map( function() {
        	
            var label = j$( this );
 
            label.css('display', 'inline');
            var id = label.attr( 'for' );
            var field = label.siblings( "#"+id );
            if ( !field ) return;
 
            // build element specific options
            var o = j$.meta ? j$.extend( {}, opts, label.data() ) : opts;
            label.addClass( o.label_class );
 
            var hide_label = function() { label.css( o.hide_css ); };
            var show_label = function() { this.value || label.css( o.show_css ); };
            
            j$( field )
                 .parent().addClass( o.wrapper_class ).end()
                 .focus( hide_label ).blur( show_label ).each( hide_label ).each( show_label );
 
            return this;
 
        } );
 
        return opts.filter ? selection : selection.end();
    };
 
    // publicly accessible defaults
    j$.fn.overlabel.defaults = {
 
        label_class:   'overlabel-apply',
        wrapper_class: 'overlabel-wrapper',
        hide_css:      { 'text-indent': '-10000px' },
        show_css:      { 'text-indent': '0px', 'cursor': 'text' },
        filter:        false
 
    };
 
} )( jQuery );


/** Begin Search Attributes Toolbar actions (Preferences, Searchtips) **/
(function(j$){
	  j$.fn.actionSearchToolBar = function(options) { 
	    defaults = {
	      layout : 'horizontal'
	    };
	    var options = j$.extend(defaults, options);
	    return this.each(function() {
	      var $this = j$(this); 
	      var $win = j$(window);
	      var doc_h = j$(document).height();  
	      var $mask = j$('<div id="modal-mask" />');
	      $this.on('click', function(e) {       
	        e.preventDefault();     
	        if ($this.parent().hasClass('disabled')) { return false; }
	        $this.focus(); // webkit does not do this by default
	        var $pop_el = j$('#toolbar-pop-container');
	        var close = function() {
	          j$('#modal-mask').remove();
	          $pop_el.empty();
	        };
	        
	        if (j$('#modal-mask').length) { // only true if you are here via return key
	          close();
	          return false;
	        }
	        var $div_tool = $this.parents('div.tools');
	        if (!$pop_el.length) { // first time here
	          var $pop_el = j$('<div id="toolbar-pop-container" />').insertAfter($div_tool.parents('#toolbarSearchbar'));
	          j$(document).on('click', 'span.close-popup', function() {
	            close();
	          });
	          j$(document).on('click', 'span.submit-popup', function(e) {
	        	  validatePopup($pop_el);
		     });
	        }
	        if (options.layout == 'vertical') {
	          $pop_el.css({'marginTop': $this.parent().position().top});
	        } else 
	        if (options.layout == 'horizontal') {
	          $pop_el.css({'marginLeft': $this.position().center});
	        }
	        else {
	          $pop_el.css({'marginLeft': $this.position().absolute});
	        } 
	        $pop_el.load(options.hrefUrl);
	        $mask.on('click', function() {
	          close();
	        })
	        .css({'width': $win.width(), 'height': doc_h})
	        .appendTo(j$('body'));        
	      });
	    });
	  };

		  
	})(jQuery);



function submitSearchToolBarPopup(popup,event) { 
	  event.preventDefault();
	  event.stopPropagation();
	    var ajax_form = j$('#toolbar-pop-container form');
		var formAction = j$(ajax_form).attr('action');
		var ajaxrequest =  j$.ajax({
			dataType : 'json',
			method:'get',	
			data : ajax_form.serialize(),
			url : formAction,
			success:function(data) {successSearchToolBarPopup(data,popup);},
			error:failureSearchToolBarPopup
		});
}

function successSearchToolBarPopup(data,popup){
	  j$('#modal-mask').remove();
	  popup.empty();
		$j(data).each(function(key,value){
			j$("#global-alert-message").toggleClass('global-alert-no-message global-alert-message');
			j$("#global-alert-message").text(value.message);
			j$("#global-alert-message").fadeOut(7000, function() {
				j$("#global-alert-message").text("");
				j$("#global-alert-message").toggleClass('global-alert-message global-alert-no-message');
				j$("#global-alert-message").css("display","");
			});
		});
}

function failureSearchToolBarPopup(xhr, ajaxOptions, thrownError){
	
}

function validatePopup(){
// validate the email in the preferences form when it is submitted
j$("#search_preferences_form").validate({
	rules: {
		email_address: {
			email: true
		},
	},
	messages: {			
		email_address: "Please enter a valid email address"
	},
	submitHandler: function(form,event) {
		var $pop_el = j$('#toolbar-pop-container');
		submitSearchToolBarPopup($pop_el,event);
		}
	});
}
/** End Search Attributes Toolbar actions (Preferences, Searchtips) **/
/** Begin Abstract Page Toolbar actions **/

(function(j$){
	  j$.fn.actionBar = function(options) { 
	    defaults = {
	      layout : 'horizontal'
	    };
	    var options = j$.extend(defaults, options);
	    return this.each(function() {
	      var $this = j$(this); 
	      var $win = j$(window);
	      var doc_h = j$(document).height();  
	      var $mask = j$('<div id="modal-mask" />');
	      $this.bind('click', function(e) {       
	        e.preventDefault();     
	        if ($this.parent().hasClass('disabled')) { return false; }
	        $this.focus(); // webkit does not do this by default
	        var $pop_el = j$('#pop-container');
	        var close = function() {
	          j$('#modal-mask').remove();
	          $pop_el.empty();
	        };
	        
	        if (j$('#modal-mask').length) { // only true if you are here via return key
	          close();
	          return false;
	        }
	        
	        if (!$pop_el.length) { // first time here
	          var $pop_el = j$('<div id="pop-container" />').appendTo($this.parents('div.actionbar'));
	          j$(document).on('click', 'span.close-popup', function() {
	            close();
	          });


	        }
	        if (options.layout == 'vertical') {
	          $pop_el.css({'marginTop': $this.parent().position().top});
	        } else {
	          $pop_el.css({'marginLeft': $this.position().left});
	        }  
	        var $hrefUrl = $this.attr('href');
	        var $actionId = options.actionId;
	        $pop_el.loadUrl({
			      hrefURL : $hrefUrl,
			      actionId : $actionId
			    });

	        $mask.on('click', function() {
	          close();
	        })
	        .css({'width': $win.width(), 'height': doc_h})
	        .appendTo(j$('body')); 
	      });
	    });
	  };
	  

	})(jQuery);

 
(function(j$){	  
	  j$.fn.loadUrl = function(options) { 
		    defaults = {
		      hrefURL :'',
		      actionId : '',
		      absUrl : '/xpl/abs_all.jsp?'
		    };
		    var options = j$.extend(defaults, options);
		    var actionID = options.actionId;
	    
		    this.load(options.hrefURL,function(response,status){
		        switch(status)
		        {
		        	case 'success':
		        	   	switch(actionID)
		            	{
			            	case 'action-download-document-citations':
			            		downloadCitationCallback();
			            		break;
			            	case 'action-document-email':
			            		emailDocumentCallback(options.absUrl);
				            	break;
			            	case 'action-email-results':
			            		emailResultsCallback(options.absUrl);
				            	break;
			            	case 'action-download-searchresult-citations':
			            		downloadSearchResultCitationCallback();
				            	break;
		            	}		        	 
		        	  break;
		        	case 'error':
		        	  break;
		        } //end  switch status
		    });
	  };  
	  
	  function downloadSearchResultCitationCallback () {
		  j$('#aria-dynamic-text').html("Download Citations Form loaded");
		  var $chks = $j('.results :checkbox');  
		  var recordId="";
		  if ($chks.filter(':checked').length) {
		   j$.each($chks.filter(':checked'), function(key,value){
			   if (recordId){
				   recordId = recordId + j$(value).attr('id') + ',';
			   } else {
				   recordId = j$(value).attr('id') + ',';
			   }
		   });
		    var n=recordId.lastIndexOf(","); 
		    recordId = recordId.substring(0,n);
		  }
    	  j$('#pop-container #recordIds').val(recordId);
    	  
          if (citFormat){
            var children =j$('input[name=citations-format]');  
            if(children.length > 0){
            	children[citFormat - 1].click();
        	}
    	  }
          if (dlFormat){
              var children =j$('input[name=download-format]');  
              if(children.length > 0){
              	children[dlFormat - 1].click();
          	}
      	  }
	  }
	  
	  function downloadCitationCallback () {
    	  j$('#pop-container #recordIds').val(recordId);
          if (citFormat){
            var children =j$('input[name=citations-format]');  
            if(children.length > 0){
            	children[citFormat - 1].click();
        	}
    	  }
          if (dlFormat){
              var children =j$('input[name=download-format]');  
              if(children.length > 0){
              	children[dlFormat - 1].click();
          	}
      	  }
	  }
	  
	  function emailDocumentCallback (absUrl) {
    	  j$('#pop-container #hidden_input').val(recordId);
    	  j$('#pop-container #abs_link').val(absUrl);
        jQuery('#your_name').focus();
	  }
	  
	  function emailResultsCallback (absUrl) {
		  j$('#aria-dynamic-text').html("Email Selected Atricles Form loaded");
		  var $chks = $j('.results :checkbox');  
		  var recordId="";
		  if ($chks.filter(':checked').length) {
		   j$.each($chks.filter(':checked'), function(key,value){
			   if (recordId){
				   recordId = recordId + j$(value).attr('id') + ';';
			   } else {
				   recordId = j$(value).attr('id') + ';';
			   }
		   });
		    var n=recordId.lastIndexOf(";"); 
		    recordId = recordId.substring(0,n);
		    j$('#pop-container #hidden_input').val(recordId);
		  }
	  }

})(jQuery);




function submitPopup(popup) { 
	    var ajax_form = j$('#pop-container form');
		var formAction = j$(ajax_form).attr('action');
		var ajaxrequest =  j$.ajax({
			dataType : 'json',
			method:'get',	
			data : ajax_form.serialize(),
			url : formAction,
			success:function(data) {successPopup(data,popup);},
			error:failurePopup
		});
}

function successPopup(data,popup){

    j$('#modal-mask').remove();
    popup.empty();
	$j(data).each(function(key,value){
		j$("#global-alert-message").toggleClass('global-alert-no-message global-alert-message');
		j$("#global-alert-message").text(value.message);
		j$("#global-alert-message").fadeOut(10000, function() {
			j$("#global-alert-message").text("");
			j$("#global-alert-message").toggleClass('global-alert-message global-alert-no-message');
			j$("#global-alert-message").css("display","");
		});
	});
	
}

function failurePopup(xhr, ajaxOptions, thrownError){
	
}
/** End Abstract Page Toolbar actions **/

/**Contact Administrator Hover**/
j$(function(){
j$('.mw-contAdmin').qtip({
       content: {text:j$('#contAdminWindowContent')
   },
       show: { event: 'click' },
       hide: { fixed: true, event: 'unfocus'},
       position: {my: 'top left', at: 'bottom left', adjust:{x:2,y:2}},
       style: {width: 'auto', classes: 'qtip-lightIeee', tip:false},
       events: {
    render: function(event, api) {
      var $this = j$(this);
      $this.delegate('.mwclose', 'click', function () {
        $this.qtip('hide');
       });
    }
  }
   });
});


var DesktopReporting = (function () {
  var
  el = {
    fields: ".form-group [id^=drp]",
    save: ".js-save-info",
    error: ".error"
  },
  config = {
    getExpiry: function () {
    	var future = new Date();
    	return new Date(future.setDate(future.getDate() + 30));    	 	
        //return new Date((new Date().getFullYear()), (new Date().getMonth()) + 1, 1);
    },
    errorClass: "invalid",
    errorNode: "<span class='error'>This field is required.</span>",
    cookiePath:"/",
    cookieDomain:".ieee.org"
  },
  bindEvents = function () {
    jQuery(el.save).on('click', function (e) {
      e.preventDefault();
      jQuery(el.fields).prev(el.error).remove();
      if (areFieldsValid()) {
        // console.info('everything is good, writing cookies');
        writeCookies();
        if (jQuery.urlParam('pdfRequest')) {     	
	        	var articleUrl = '/stamp/stamp.jsp?tp=&arnumber='+jQuery.urlParam('arnumber');        	
	        	Modal.closeAndRedirectToUrl(articleUrl);      
        	 
        }
        Modal.hide();
        
        
      }
      return false;
    });

    jQuery(el.fields).on('focus', function () {
      var $this = jQuery(this);

      $this
        .removeClass(config.errorClass)
        .prev(el.error).remove();
    });
  },
  areFieldsValid = function () {
    var response = true;
    jQuery(el.fields).each(function (key, field) {
      var $field = jQuery(field);

      if (!$field.val()) {
        $field.addClass(config.errorClass);
        $field.before(config.errorNode);
        response = false;
      }
    });

    return response;
  },
  writeCookies = function () {
    jQuery(el.fields).each(function (key, field) {
      var $this = jQuery(this);
      jQuery.cookie(this.id, $this.val(), {
        expires: config.getExpiry(), path: config.cookiePath, domain: config.cookieDomain
      });
    });
  },
  init = function () {    
    bindEvents();
  };

  return {
    init: init
  };
})();

/**Skip to main content tabbing order accessibility fix**/

j$(function(){	
    j$(".JumpLink a[href^='#']").click(function() {
      j$("#"+j$(this).attr("href").slice(1)+"").focus().attr("tabindex","-1");
    });
});

