var s_tc_Scopus=new TagContainer('Scopus');

function TagContainer(n){var t=this,w=t.w=window;t.d=w.document;t._c='s_t';if(!w.s_c_il){w.s_c_il=[];w.s_c_in=0}t._il=w.s_c_il;t._in=w.s_c_in;t._il[t._in]=t;w.s_c_in++;t.tcn=t.l=0;t.stc=function(n){
var t=this,l=t.w.s_c_il,i,x;t.tcn=n;if(l)for(i=0;i<l.length;i++){x=l[i];if(x&&x._c=='s_l'&&x.tagContainerName==n)t.l=x}};t.stc(n);t.xd=function(s){var t=this,x=0;if(
t.d.implementation&&t.d.implementation.createDocument)x=(new DOMParser).parseFromString(s,'text/xml');else if(t.w.ActiveXObject){x=new ActiveXObject('Microsoft.XMLDOM');x.async='false';x.loadXML(s)}
return x};t.xe=function(x,t){var a,b=[],i,j;for(i=0;i<2;i++){if(i>0)t=t.toLowerCase();a=x.getElementsByTagName(t);if(a)for(j=0;j<a.length;j++)b[b.length]=a[j]}return b};t.xt=function(x){var t=this,b=
"",l,i;l=x.childNodes;if(l)for(i=0;i<l.length;i++)b+=t.xt(l[i]);if(x.data)b+=x.data;return b};t.cp=function(x){var t=this,tn=Math.floor((new Date).getTime()/1000),ts=x.s,te=x.e,tp=1,l=t.d.location,h=
l.hostname,hm=x.h,hp=1,p=l.pathname,pm=x.p,pp=1,q=l.search,qm=x.q,qp=1,qi,qv,c=t.d.cookie,cm=x.c,cp=1,ci,cv,i;if(ts)tp=(tn>=ts&&(!te||tn<=te));if(hm){hp=0;if(h){i=0;while(!hp&&i<hm.length){if(
h.indexOf(hm[i])>=0)hp=1;i++}}}if(pm){pp=0;if(p){i=0;while(!pp&&i<pm.length){if(p.indexOf(pm[i])>=0)pp=1;i++}}}if(qm){qp=0;if(q){if(q.substring(0,1)=='?')q=q.substring(1);q='&'+q+'&';i=0;while(
!qp&&i<qm.length){qi=q.indexOf('&'+qm[i].k+'=');if(!qm[i].v&&qi<0)qi=q.indexOf('&'+qm[i].k+'&');if(qi>=0)if(qm[i].v){qv=q.substring(qi+qm[i].k.length+2);qi=qv.indexOf('&');if(qi>=0){qv=unescape(
qv.substring(0,qi));if(qv==qm[i].v)qp=1}}else qp=1;i++}}}if(cm){cp=0;if(c){c=';'+c+';';c=c.split('; ').join(';');i=0;while(!cp&&i<cm.length){ci=c.indexOf(';'+cm[i].k+'=');if(!cm[i].v&&ci<0)ci=
c.indexOf(';'+cm[i].k+';');if(ci>=0)if(cm[i].v){cv=c.substring(ci+cm[i].k.length+2);ci=cv.indexOf(';');if(ci>=0){cv=unescape(cv.substring(0,ci));if(cv==cm[i].v)cp=1}}else cp=1;i++}}}return(
tp&&hp&&pp&&qp&&cp)};t.cl=[];t.cn=t.cpn=0;t.crt=0;t.bl=[];t.crl=function(cn,cpn){var t=this;if(cn==t.cn&&cpn==t.cpn)t.cr()};t.cr=function(){var t=this,d=t.d,b,c,p,n=1,o,u,x,y,l,i;if(t.cl.length>0){if(
!d.body){if(!t.crt)t.crt=setTimeout(function(){t.crt=0;t.cr()},13)}else{b=d.body;while(n&&t.cn<t.cl.length){c=t.cl[t.cn];if(t.cdwb){u=t.cdwb;t.cdwb=0;u='<div>'+u.replace(/&/g,'&amp;').replace(
/<img /gi,'<IMG ').replace(/<\/img>/gi,'</IMG>').replace(/<script /gi,'<SCRIPT ').replace(/<script>/gi,'<SCRIPT>').replace(/<\/script>/gi,'</SCRIPT>').replace(/<iframe /gi,'<IFRAME ').replace(
/<\/iframe>/gi,'</IFRAME>')+'</div>';x=t.xd(u);l=t.xe(x,'IMG');for(i=0;i<l.length;i++){u=l[i].getAttribute('src');if(u)c.p.splice(t.cpn,0,{t:'i',u:u})}l=t.xe(x,'SCRIPT');for(i=0;i<l.length;i++){u=l[i]
.getAttribute('src');if(u)c.p.splice(t.cpn,0,{t:'s',u:u});else{u=t.xt(l[i]);if(u)c.p.splice(t.cpn,0,{t:'c',c:u})}}l=t.xe(x,'IFRAME');for(i=0;i<l.length;i++){u=l[i].getAttribute('src');if(u)c.p.splice(
t.cpn,0,{t:'f',u:u})}}if((t.cpn>0||!c.x||t.cp(c.x))&&c.p&&t.cpn<c.p.length){p=c.p[t.cpn];if(p.t=='b'&&p.u){u=p.u;o=new Image;t.bl[t.bl.length]=o;o.onload=function(){var i;for(i=0;i<t.bl.length;i++)if(
t.bl[i]&&t.bl[i].src==u){t.bl.splice(i,1);return}};o.src=u}if((p.t=='s'&&p.u)||(p.t=='c'&&p.c)){n=0;t.cpn++;u=p.u;o=d.createElement('script');o.type='text/javascript';o.setAttribute('async','async')
x='s_c_il['+t._in+']';y=x+'.crl('+t.cn+','+t.cpn+')';if(p.t=='s'){o.n=new Function(y);o.t=0;o.i=setInterval(function(){if(o.readyState=='loaded')o.t++;if(o.readyState=='complete'||o.t>2){o.c();o.n()}}
,50);o.c=function(){if(o.i){clearInterval(o.i);o.i=0}};o.onreadystatechange=function(){if(o.readyState=='complete'){o.c();o.n()}};o.onload=function(){o.c();o.n()};o.src=u}else o.text=x+'.cdw='+x+
'.d.write;'+x+'.cdwb="";'+x+'.d.write=function(m){'+x+'.cdwb+=m};'+"\n"+p.c+"\n"+x+'.d.write='+x+'.cdw;'+y;x=b;l=d.getElementsByTagName('HEAD');if(l&&l[0])x=l[0];if(x.firstChild)x.insertBefore(o,
x.firstChild);else x.appendChild(o)}if(p.t=='f'&&p.u){u=p.u;o=d.createElement('IFRAME');o.setAttribute('style','display:none');o.setAttribute('width','0');o.setAttribute('height','0');o.setAttribute(
'src',u);b.appendChild(o)}if(n)t.cpn++}else{t.cn++;t.cpn=0}}if(n&&t.l){for(x in t.l.wl)if(!Object.prototype[x]){u=t.w[x];x=t.l.wl[x];if(u&&x)for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!=
'function'||(''+x[i]).indexOf('s_c_il')<0)u[i]=x[i]}}for(i=0;i<t.l.wq.length;i++){c=t.l.wq[i];u=c.f;if(u)if(c.o)x=t.w[c.o];else x=t.w;if(x[u]&&typeof(x[u])=='function'&&(''+x[u]).indexOf('s_c_il')<0){
if(c.a)x[u].apply(x,c.a);else x[u].apply(x)}}}}}};}

function getCookie(name) {
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null; 
}

jQuery.fn.on2=function(eventType,filter,data,handler) {
	var elements=jQuery(this);
	if(filter) elements=elements.find(filter);
	elements.on(eventType,null,data,handler);

	if(filter) {
		jQuery(this).on(eventType,filter,data,function(e) {
			if(!jQuery(e.currentTarget).is(elements)) handler(e);
		});
	}
}

function searchPage() {
	var t=jQuery("#scTabs a");
	var i=t.index(t.filter(".active"));
	switch(i) {
	case 0:
		s.pageName="Search - document";
		var docSearchForm=jQuery("form[name=BasicValidatedSearchForm]");
		docSearchForm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});
		docSearchForm.on("submit",s_eventHandlers.documentSearchSubmit);
		break;
	case 1:
		s.pageName="Search - author";
		var authSearchForm=jQuery("form[name=AuthorLookupValidatedSearchForm]");
		authSearchForm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});
		authSearchForm.on("submit",s_eventHandlers.authorSearchSubmit);
		break;
	case 2:
		s.pageName="Search - affiliation";
		var affSearchForm=jQuery("form[name=AffiliationLookupSearchSubmitForm]");
		affSearchForm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});
		affSearchForm.on("submit",s_eventHandlers.affiliationSearchSubmit);
		break;
	case 3:
		s.pageName="Search - advanced";
		var advSearchForm=jQuery("form[name=AdvancedValidatedSearchForm]");
		advSearchForm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});
		advSearchForm.on("submit",s_eventHandlers.advancedSearchSubmit);
		break;
	}

	s.prop4="search";
	s.channel="search";

	jQuery("a.icon.save").on("click",function(e){
		s.getPreviousValue("C","gpv_e38","");
		s_eventHandlers.saveQueryClick(e);
	});
	jQuery("a.icon.edit").on("click",s_eventHandlers.editQueryClick);
}

function homePageHandler() {
	if (jQuery("#scTabs").length) {
		searchPage();
	}
	else if (jQuery("#nonip_container").length) {
		s.pageName="Home";
		s.prop4="home";
		s.channel="home";
	}
	else {
		// do nothing
	}
}

this.s_eventHandlers=new function() {	
	var tlActionSubmitForm=function() {
		var f=s_eventHandlers.form;
		var i=document.createElement("input");
		i.setAttribute("type","hidden");
		i.setAttribute("name",s_eventHandlers.clickTarget.getAttribute("name"));
		i.setAttribute("value",s_eventHandlers.clickTarget.getAttribute("value"));
		f.appendChild(i);
		f.submit();
	}

	this.documentSearchSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;

		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}
		
		var srchflds=[];
		var dtRng=jQuery("#limitto input[name=dateType]:checked");
		var dtRngOpt=[];
		var docTyp="";
		
		if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
			jQuery("select[id^=field] option:selected").each(function(i,e) {
				srchflds.push(e.value);
			});
			
			dtRng.closest("li").find("select option:selected").each(function(i,e) {
				dtRngOpt.push(e.value);
			});
			
			docTyp=jQuery("#documenttype option:selected").val();
		}
		else {
			jQuery("#searchTable span[id^=field] [id$=SelectBoxItText]").each(function(i,e) {
				srchflds.push(e.getAttribute("data-val"));
			});
			
			dtRng.closest("li").find("[id$=SelectBoxItText]").each(function(i,e) {
				dtRngOpt.push(e.getAttribute("data-val"));
			});
			
			docTyp=jQuery("#documenttypeSelectBoxItText").attr("data-val");
		}

		var chckSubj=[];
		jQuery("div.subjectArea input:checked").each(function(i,e) {
			chckSubj.push(e.getAttribute("value"));
		});

		s.list3=srchflds.join(';');
		s.eVar19=srchflds.length;
		s.eVar20=docTyp;
		s.eVar21=dtRng.attr("value")+":"+dtRngOpt.join('-');
		s.eVar22=chckSubj.join(';');
		s.events="event3";
		s.getPreviousValue('Explicit','gpv_e23','event9');

		s.linkTrackVars="events,list3,eVar19,eVar20,eVar21,eVar22";
		s.linkTrackEvents="event3";

		s_eventHandlers.form=this;
		s.tl(true,'o','documentSearchSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}

	this.authorSearchSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;

		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}

		var chckSubj=[];
		jQuery("div.subjectArea input:checked").each(function(i,e) {
			chckSubj.push(e.getAttribute("value"));
		});

		s.eVar22=chckSubj.join(';');
		s.events="event4";
		s.getPreviousValue('Explicit','gpv_e23','event9');

		s.linkTrackVars="events,eVar22";
		s.linkTrackEvents="event4";

		s_eventHandlers.form=this;
		s.tl(true,'o','authorSearchSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}

	this.affiliationSearchSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;

		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}

		s.events="event5";
		s.getPreviousValue('Explicit','gpv_e23','event9');

		s.linkTrackVars="events";
		s.linkTrackEvents="event5";

		s_eventHandlers.form=this;
		s.tl(true,'o','affiliationSearchSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}

	this.advancedSearchSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;

		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}

		s.events="event6";
		s.getPreviousValue('Explicit','gpv_e23','event9');

		s.linkTrackVars="events";
		s.linkTrackEvents="event6";

		s_eventHandlers.form=this;
		s.tl(true,'o','advancedSearchSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}

	this.refineResultsSearchSubmit=function(e) {
		if(e.isDefaultPrevented() || !s_eventHandlers.clickTarget) return true;
		var getNav=function() {
			var su=[];
			jQuery("#navigators ul[id].refineResults:has(input:checked)").each(function(i,e) {
				su.push(e.getAttribute("id").replace(/^cluster_/i,''));
			});
			return su.join(';');
		}

		switch(s_eventHandlers.clickTarget.name) {
		case "limitTo":
			s.eVar39="Limit To";
			s.list1=getNav();
			s.linkTrackVars="events,eVar39,list1";
			break;
		case "exclude":
			s.eVar39="Exclude";
			s.list1=getNav();
			s.linkTrackVars="events,eVar39,list1";
			break;
		case "searchWithinResults":
			s.eVar39="Search Within Results";
			s.linkTrackVars="events,eVar39";
			break;
		default: return true;
		}

		s.getPreviousValue('Explicit','gpv_e23','event9');
		s.events="event7";
		s.linkTrackEvents="event7";

		s_eventHandlers.form=this;
		s.tl(true,'o','refineResultsSearchSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}

	// Export Start

	var getFormatDesc=function(key) {
		var formatMap={Mendeley:'Mendeley',REFWORKS:'RefWorks',
			RIS:'RIS Format',CSV:'CSV',BIB:'BibTeX',TEXT:'Text',
			0:'HTML',1:'Text',2:'RTF',3:'MS Word',
			emailFormat:'HTML',textFormat:'Text'};
		var desc=formatMap[key];
		if (typeof desc== 'undefined') desc='undefined';
		return desc;
	}
	
	this.exportClickHandlers=function(e) {
		jQuery(document).on("click","#directExport,#export_results,#referenceDirectExport,#export_references",s_eventHandlers.exportClick);
		jQuery(document).on("click","#mendeleyBottom a.medSave",s_eventHandlers.exportMendeleyReadership);
		jQuery(document).on("click","#docResultList a.createBibliography",s_eventHandlers.docBibClick);
		jQuery(document).on("click","#docResultList a.email",s_eventHandlers.docEmailClick);
		jQuery(document).on("click","#docResultList a.print",s_eventHandlers.docPrintClick);
		return true;	
	}

	this.exportClick=function(e) {
		s.eVar58=s.pageName;
		s.events="event21";
		s.linkTrackVars="events,eVar58";
		s.linkTrackEvents="event21";
		s.tl(true,'o','exportClick'); // pass true so no delay
		return true;
	}

	this.exportAction=function(format, info, count) {
		s.eVar59=getFormatDesc(format);
		s.eVar60=info ? info : null;
		s.eVar62=count;
		var display=jQuery("#bubble-chunkExport").css("display");
		if (typeof display == "undefined" || display == "none") s.events="event14";
		else s.events="event22";
		s.linkTrackVars="events,eVar59,eVar60,eVar62";
		s.linkTrackEvents=s.events;
		s.tl(this,'o','exportAction');
		return true;
	}

	this.exportMendeleyReadership=function(e) {
		s.eVar58=s.pageName;
		s.eVar59="Mendeley";
		s.eVar62=1;
		s.events="event21,event14"; // click and complete
		s.linkTrackVars="events,eVar58,eVar59,eVar62";
		s.linkTrackEvents=s.events;
		s.tl(true,'o','exportMendeleyReadership'); // pass true so no delay
		return true;
	}

	this.outputTypeClick=function(e) {
		e.data={delay:false};
		var value=jQuery("input[name=outputType]:checked").val();
		switch(value) {
		case "print":
			s_eventHandlers.docPrintClick(e);
			break;
		case "email":
			s_eventHandlers.docEmailClick(e);
			break;
		case "quikbib":
			s_eventHandlers.docBibClick(e);
			break;
		}
		return true;
	}

	this.docPrintClick=function(e) {
		s.eVar58=s.pageName;
		s.events="event25";
		s.linkTrackVars="events,eVar58";
		s.linkTrackEvents="event25";
		var param1=e.data && e.data.delay == false ? true : e.currentTarget;
		s.tl(param1,'o','docPrintClick');
		return true;
	}

	this.docPrintSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;
		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}

		var output=jQuery("form[name=printForm] select[name=view]").val();
		s.eVar60=output ? output : "CiteOnly";
		var count=resOutput.citationCount;
		if (count > 200) count=200;
		s.eVar62=count;
		s.events="event17";
		s.linkTrackVars="events,eVar60,eVar62";
		s.linkTrackEvents="event17";
		
		s_eventHandlers.form=this;
		s.tl(true,'o','docPrintSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}

	this.docEmailClick=function(e) {
		s.eVar58=s.pageName;
		s.events="event24";
		s.linkTrackVars="events,eVar58";
		s.linkTrackEvents="event24";
		var param1=e.data && e.data.delay == false ? true : e.currentTarget;
		s.tl(param1,'o','docEmailClick');
		return true;
	}

	this.docEmailSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;
		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}

		var mailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var addr=jQuery("#to").val();
		if (addr && mailRegex.test(addr)) {
			var format=jQuery('input[name=emailFormat]').filter(':checked').attr('id');
			s.eVar59=getFormatDesc(format);
			var output=jQuery("form[name=emailForm] select[name=view]").val();
			s.eVar60=output ? output : "CiteOnly";
			var count=resOutput.citationCount;
			if (count > 200) count=200;
			s.eVar62=count;
			s.events="event16";
			s.linkTrackVars="events,eVar59,eVar60,eVar62";
			s.linkTrackEvents="event16";
			s_eventHandlers.form=this;
			s.tl(true,'o','docEmailSubmit',null,tlActionSubmitForm);
			e.preventDefault();
		}
		return true;
	}

	this.docBibClick=function(e) {
		s.eVar58=s.pageName;
		s.events="event23";
		s.linkTrackVars="events,eVar58";
		s.linkTrackEvents="event23";
		var param1=e.data && e.data.delay == false ? true : e.currentTarget;
		s.tl(param1,'o','docBibClick');
		return true;
	}

	this.docBibSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;
		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}

		var format=jQuery("#outputFormat").val();
		s.eVar59=getFormatDesc(format);
		s.eVar61=jQuery("#bibliographyStyle").val();
		var count=resOutput.citationCount;
		if (count > 2000) count=2000;
		s.eVar62=count;
		s.events="event15";
		s.linkTrackVars="events,eVar59,eVar61,eVar62";
		s.linkTrackEvents="event15";

		s_eventHandlers.form=this;
		s.tl(true,'o','docBibSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}

	// Export End

	this.moreOptionsClick=function(e) {
		// event captured in my list handler
		if (jQuery(e.currentTarget).is(".addToMyList")) return true;

		s.eVar30=this.className;
		s.events="event8";
		s.linkTrackVars="events,eVar30";

		if (jQuery(e.currentTarget).is(".createBibliography")) {
			s.eVar58=s.pageName;
			s.events=s.events+",event23";
			s.linkTrackVars=s.linkTrackVars+",eVar58";
		}
		else if (jQuery(e.currentTarget).is(".email")) {
			s.eVar58=s.pageName;
			s.events=s.events+",event24";
			s.linkTrackVars=s.linkTrackVars+",eVar58";
		}
		else if (jQuery(e.currentTarget).is(".print, .iconPrintSmall")) {
			s.eVar58=s.pageName;
			s.events=s.events+",event25";
			s.linkTrackVars=s.linkTrackVars+",eVar58";
		}

		s.linkTrackEvents=s.events;
		s.tl(e.currentTarget,'o','moreOptionsClick');
		return true;
	}

	this.alertClick=function(e) {
		s.eVar27=s.pageName;
		s.events="event26";
		s.linkTrackVars="events,eVar27";
		s.linkTrackEvents="event26";
		s.tl(e.currentTarget,'o','alertClick');
		return true;
	}

	this.alertSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;
		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}

		s.events="event12";
		s.eVar26=jQuery(this).find("input[name=ATP]").val();
		s.eVar42=jQuery(this).find("input[name=mode]").val();
		s.linkTrackVars="events,eVar26,eVar42";
		s.linkTrackEvents="event12";
		
		s_eventHandlers.form=this;
		s.tl(true,'o','alertSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}
	
	this.editQueryClick=function(e) {
		s.getPreviousValue("U","gpv_e38","");
	}

	this.saveQueryClick=function(e) {
		s.eVar38=s.getPreviousValue("C","gpv_e38","")||"C";
		s.events="event13";
		s.eVar37=s.pageName;
		s.linkTrackVars="events,eVar37,eVar38";
		s.linkTrackEvents="event13";
		s.tl(e.currentTarget,'o','saveQueryClick');
		return true;
	}

	this.setFeedClick=function(e) {
		s.events="event11";
		s.eVar35=s.pageName;
		s.linkTrackVars="events,eVar35";
		s.linkTrackEvents="event11";
		s.tl(e.currentTarget,'o','setFeedClick');
		return true;
	}

	this.myListAddClick=function(e) {
		s.events="event10";
		s.eVar36=s.pageName;
		s.linkTrackVars="events,eVar36";

		if (jQuery(e.currentTarget).parents("#moreOptions").length > 0) {
			s.eVar30=this.className;
			s.events=s.events+",event8";
			s.linkTrackVars=s.linkTrackVars+",eVar30";
		}
	
		s.linkTrackEvents=s.events;
		s.tl(e.currentTarget,'o','myListAddClick');
		return true;		
	}

	this.saveListClick=function(e) {
		s.events="event36";
		s.eVar31=s.pageName;
		s.linkTrackVars="events,eVar31";
		s.linkTrackEvents="event36";
		s.tl(e.currentTarget,'o','saveListClick');
		return true;
	}

	this.saveListSubmit=function(e) {
		if(e.isDefaultPrevented()) return true;
		// default clickTarget to form submit button
		if (typeof s_eventHandlers.clickTarget == "undefined") {
			s_eventHandlers.clickTarget = jQuery(this).find("input[type=submit]")[0];
		}

		s.events="event35";
		s.linkTrackVars="events";
		s.linkTrackEvents="event35";
		
		s_eventHandlers.form=this;
		s.tl(true,'o','saveListSubmit',null,tlActionSubmitForm);
		e.preventDefault();
		return true;
	}

// Outward Linking

this.outwardLinking = new function() {
var getOutwardPageName=function(key) {
	var descMap={1:'Library link',2:'Database link',4:'Full-text link',5:'Doc delivery link',6:'Full-text link',
			7:'Library link',8:'Other link',9:'Web service link',11:'Customer link',12:'Customer link',
			16:'MDL link',17:'Other link',19:'Other link',41:'PubMed link',42:'Journal metrics link',
			43:'Journal metrics link',44:'Journal metrics link',45:'Web link',46:'Patent link',
			47:'Customer link'};
	var desc=descMap[key];
	if (typeof desc=='undefined') desc='Outward link - undefined';
	return desc;
}
		
var getOutwardEvents = function(pageName) {
	if (pageName == "Full-text link") return "event18,event19";
	else return "event18";
}

var getTempS = function(url) {
	if (url.indexOf('http') == -1) {
		url = location.protocol + "//" + location.host + url;
	}
	var part=url.split('?');

	var s_temp=jQuery.extend({},s_pseudo);
	s_temp.pageURL=url;
	s_temp.prop18=part[0];
	//s_temp.eVar52=part[1];
	s_temp.prop19=s.pageName; //previous page
	if (s.eVar14) s_temp.eVar14=s.eVar14; //issn
	if (s.eVar28) s_temp.eVar28=s.eVar28; //isbn
	return s_temp;
}
		
this.outwardClick = function(e) {
	var href=e.currentTarget.href;
	var locationID=getURLParameter(href,"locationID");
	var categoryID=getURLParameter(href,"categoryID");
	var issn=getURLParameter(href,"issn");

	var s_temp=getTempS(href);	
	s_temp.pageName=getOutwardPageName(categoryID);
	s_temp.prop4="outward link";
	s_temp.channel="outward link";
	s_temp.events=getOutwardEvents(s_temp.pageName);
	s_temp.eVar53=categoryID;
	s_temp.eVar54=locationID;
	if (issn) s_temp.eVar14=issn.replace(/-/g,"");
	s_temp.t();
}

this.citedByPatentClick = function(e) {
	var locationID="2";
	var categoryID="46";
	var s_temp=getTempS("/redirect/linking.url");
	s_temp.pageName=getOutwardPageName(categoryID);
	s_temp.prop4="outward link";
	s_temp.channel="outward link";
	s_temp.events=getOutwardEvents(s_temp.pageName);
	s_temp.eVar53=categoryID;
	s_temp.eVar54=locationID;
	s_temp.t();
}

var downloadPageView = function(href,count) {
	var s_temp=getTempS(href);
	s_temp.pageName="DDM";
	s_temp.prop4="ddm";
	s_temp.channel="ddm";
	s_temp.events="event20";
	s_temp.eVar56=count;           
	s_temp.t();
}

this.resultsDownloadClick = function() {
	var count=getselcount(SearchResultsForm);
	var max=g_MAX_DOWNLOAD_DOC_COUNT;
	if (count > max) {count=max;}

	var url=jQuery(this).attr("data-url");
	downloadPageView(url,count);
}
		
this.recordDownloadClick = function() {
	var fx=jQuery(this).attr("onclick");
	var url=fx.slice(fx.indexOf("'")+1,fx.lastIndexOf("'"));
	downloadPageView(url,1);
}

} // outwardLinking

} // s_eventHandlers

function getURLParameter(url, p) {
	var params = url.slice(url.indexOf('?') + 1).split('&');
	
	for (var i=0;i<params.length;i++) {
		var val = params[i].split("=");
		if (val[0] == p) {
			return decodeURIComponent(val[1].replace(/\+/g, " "));
		}
	}
	return null;
}

function getClusterParameter() {
	return getURLParameter(window.location.href,"cluster");
}


var s_account="elsevierscopusprod"
var s=s_gi(s_account)
var SCCodeVersion="H.26.2T.180913"
s.debugTracking=false
s.charSet = "UTF-8"

/* Link and ClickMap tracking */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkInternalFilters="javascript:,www.scopus.com,elsevier.com,scopus.com"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "elsevier"

s.trackingServerSecure = "smetrics.scopus.com"
s.trackingServer = "metrics.scopus.com"

// Check user info
if(WAM.ud) {
	var ud=WAM.ud.split(WAM.sep);
	s.eVar33=ud[0];
	s.eVar34=ud[1];
	s.eVar15=ud[2];
	s.eVar16=ud[3];
}

// Inward partner
if (WAM.part) {
	s.eVar50=WAM.part;
}

// Redefine export function called from web app js
WAM.exportAction=s_eventHandlers.exportAction;

// URL query params 
//s.eVar52=location.search;

// outward linking
jQuery(document).on2("click",'a[href*="/redirect/linking.url"]',null,s_eventHandlers.outwardLinking.outwardClick);

// alerts, rss, and add to mylist
jQuery(document).on2("click",'a.icon.saveAsAlert',null,s_eventHandlers.alertClick);
jQuery(document).on2("click",'a.icon.setFeed',null,s_eventHandlers.setFeedClick);
jQuery(document).on2("click",'a.icon.addToMyList',null,s_eventHandlers.myListAddClick);

s.usePlugins=true
function s_doPlugins(s) {

	// Sets hierarchy to be equal to the pageName
	if(s.pageName && s.pageName!=""){
	s.hier1=s.pageName;
	}

	/*Track External Campaign*/
	if(!s.campaign)
		s.campaign=s.getQueryParam('cid');
		s.campaign=s.getValOnce(s.campaign,'s_campaign',0);

	/* Site Section (First Level) */
	if(s.channel) s.channel=s.channel.toLowerCase();
	if(s.channel&&!s.eVar9) s.eVar9="D=ch";
	
	/* Site Section (Second Level) */
	if(s.prop1) s.prop1=s.prop1.toLowerCase();
	if(s.prop1&&!s.eVar10) s.eVar10="D=c1";
	
	/* Site Section (Third Level) */
	if(s.prop2) s.prop2=s.prop2.toLowerCase();
	if(s.prop2&&!s.eVar11) s.eVar11="D=c2";	

	/* Page Type */
	if(s.prop4) s.prop4=s.prop4.toLowerCase();
	if(s.prop4&&!s.eVar13) s.eVar13="D=c4";	
		
		
	/*
	* Populate Time Parting
	*/
	var currentDate = new Date()
	var year = currentDate.getFullYear()
	s.eVar5=s.getTimeParting('h','-5',year)+":"+s.getTimeParting('d','-5',year)+":"+s.getTimeParting('w','-5',year);
	s.prop5="D=v5";

	/*
	* New-Returning Visit
	*/
	s.prop6=s.getNewRepeat();
	s.eVar6="D=c6";
	
	/*
	* Get Visit number for duration of the month
	*/
	s.prop7=s.getVisitNum('m');	
	s.eVar7="D=c7";
	
	/* 
	Days since last visit
	*/
	s.prop8=s.getDaysSinceLastVisit('s_lv');
	s.eVar8="D=c8";	

	/* Page Views - do not touch - used by Previous Page*/
   	 s.events = s.apl(s.events, "event27", ",", 2);

	/*
	JS Version Control
	*/
	s.prop9=SCCodeVersion;
	
	/* Previous page value and getPercentPageViewed */
	s.prop17=s.getPercentPageViewed();
	
	// Page URL excluding Query Strings
	if (s.prop18) {}
	else {
		s.prop18=location.protocol + "//" + location.host + location.pathname;
	}
	
	/*
	Previous Page
	*/
	if(s.prop19) s.events=s.apl(s.events,"event27",",",2);
	s.prop19=s.getPreviousValue(s.pageName,'gpv_p19',''); 
	s.eVar32="D=c19";

	s.plugins="";
}
s.doPlugins=s_doPlugins
	
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
* Author: Elsevier
* Date: 12/13/2013
* Plugin: parseTextToObject v1.0
*
* jQuery plugin to convert text key value pairs into an object
*/
jQuery.fn.parseTextToObject=function(d) {
	var t={};
	jQuery.each(this,function(i,e) {
		var text=jQuery(e).text().split(d);
		//var text=e.textContent.split(d);  won't work ie7-8
		if(text[1]) t[jQuery.trim(text[0])]=jQuery.trim(text[1]);
	});
	return t;
}

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
Utility Functions: apl, p_c, p_gh, split, replace, join
*/ 
//append list
s.apl=new Function("L","v","d","u","var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)L=L?L+d+v:v;return L");

// split v1.5
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

// ver. 1.0 - s.join(v,p)| v - Array | p - formatting parameters (front,back,delim,wrap)
s.join=new Function("v","p","var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back:'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0;x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);else str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

// getTimeParting ver. 2.0
s.getTimeParting=new Function("t","z","y","l", "var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=String(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U.substring(2,4);X='090801|101407|111306|121104|131003|140902|150801|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substring(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.getTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.getHours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Available'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){return A}}else{return Z+', '+W}}}");

/*
 * Plugin: getNewRepeat 1.1 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function("d",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();e.setTime(ct+d*24*"
+"60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w('s_nr',ct+'"
+"-New',e);return 'New';}sval=cval.split('-');if(ct-sval[0]<30*60*100"
+"0&&sval[1]=='New'){s.c_w('s_nr',ct+'-New',e);return 'New';}else {s."
+"c_w('s_nr',ct+'-Repeat',e);return 'Repeat';}");

/*
 * Plugin: getPreviousValue v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*                                                                  
   * Plugin: getVisitNum - version 3.0
   */
   s.getVisitNum=new Function("tp","c","c2",""
  +"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
  +"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
  +"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
  +"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
  +"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
  +"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
  +"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
  +"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
  +"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
  +";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
  s.dimo=new Function("m","y",""
  +"var d=new Date(y,m+1,0);return d.getDate();");
  s.endof=new Function("x",""
  +"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
  +"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
  +"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
  +"t;");
 
/*
* Plugin: getPercentPageViewed v1.4
*/
s.handlePPVevents=new Function("",""
+"if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeigh"
+"t,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,"
+"s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s."
+"d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documen"
+"tElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||"
+"(s.wd.document.documentElement.scrollTop||s.wd.document.body.scroll"
+"Top),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('s_pp"
+"v'),a=(c.indexOf(',')>-1)?c.split(',',4):[],id=(a.length>0)?(a[0]):"
+"escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.length>"
+"2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),cn=(pv>0)"
+"?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy)?vh:cy)):'';s.c_w('s_pp"
+"v',cn);");
s.getPercentPageViewed=new Function("pid",""
+"pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l"
+"inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'"
+"),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i="
+"3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape("
+"a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid"
+"=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('"
+"s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL"
+"istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro"
+"ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl"
+"ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo"
+"ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent"
+"s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'"
+")?(a):(a[1]);");

/*
 * Plugin: getTimeToComplete 0.4 - return the time from start to stop
 */
s.getTimeToComplete=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
 
 
  /*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");

/*
 *	Plug-in: crossVisitParticipation v1.7 - stacks values from
 *	specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");


// create clean copy of s for pseudo page views
var s_pseudo=jQuery.extend({},s);


s.setTagContainer("Scopus")
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.26.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLow"
+"erCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.vers"
+"ion+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd["
+"imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!"
+"s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e"
+".getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'"
+"+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,"
+"l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='ht"
+"tps://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l="
+"',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'"
+"+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextDat"
+"a\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(n"
+"fn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){n"
+"k=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLi"
+"ghtData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(s"
+"p=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return "
+"qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe"
+"=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if"
+"(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv|"
+"|fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';if(v.length>25"
+"5){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if("
+"k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){"
+"q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';e"
+"lse if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else"
+" if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';el"
+"se if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextDa"
+"ta'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProf"
+"ileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if"
+"(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return "
+"qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substr"
+"ing(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.li"
+"nkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.tra"
+"ckExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new F"
+"unction('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if"
+"(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,"
+"a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;retu"
+"rn}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.t"
+"agName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.targ"
+"et.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEv"
+"ent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e"
+".altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preven"
+"tDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>"
+"k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.subst"
+"ring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t=''"
+";if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.pr"
+"otocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');"
+"x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s"
+"_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un."
+"indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','r"
+"q',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;"
+"return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object."
+"prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'"
+"='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.oncl"
+"ick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.i"
+"smac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('F"
+"irefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function"
+"(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))ret"
+"urn 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring"
+"(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCas"
+"e();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa"
+"=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.s"
+"ubstring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd"
+".s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r"
+"=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_i"
+"l['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m"
+"=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_"
+"'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m"
+"[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var "
+"s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){"
+"i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'ht"
+"tp:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e"
+"?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','va"
+"r e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i"
+"=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]="
+"o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData"
+"\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il"
+"['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s."
+"dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dl"
+"l.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;"
+"i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e)"
+")fid=0;return fid};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+se"
+"d,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,"
+"q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y"
+"':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach"
+"){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8."
+"2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth"
+";bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeig"
+"ht;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var "
+"e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexO"
+"f(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}i"
+"f(vo){s.vob(vb);s.voa(vo)}s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l"
+";if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!"
+"n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('"
+".s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h)"
+";if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.da"
+"taset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking"
+"){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(o"
+"cb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt("
+"oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('obje"
+"ctID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if"
+"(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles="
+"''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkNam"
+"e=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lig"
+"htProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t"
+".tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]"
+"){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y"
+"[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLower"
+"Case().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape"
+"6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscap"
+"e');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.n"
+"s6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4"
+"%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet"
+",visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfile"
+"s,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';"
+"s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;"
+"s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,jav"
+"aEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingS"
+"erverBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLi"
+"nks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.v"
+"l_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=functi"
+"on(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


s_tc_Scopus.cl=[{x:{p:["/home.url"]},
p:[{t:'c',c:'homePageHandler();'}]},
{p:[{t:'c',c:'var actionPattern=new RegExp(".*\\/[0-9a-zA-Z]*\\.url($|[^0-9a-zA-Z])");\n\nif (! actionPattern.test(window.location.href)) {\n	homePageHandler();	\n}'}]},
{x:{p:["/search/form.url"]},
p:[{t:'c',c:'homePageHandler();'}]},
{x:{p:["/results/"]},
p:[{t:'c',c:'var href = window.location.href;\n\nif (	href.indexOf("/authorNamesList.url") > -1 ||\n	href.indexOf("/coAuthorResults.url") > -1) {\n	s.pageName = "Author results list";\n}\nelse if (href.indexOf("/affiliationResults.url") > -1) {\n	s.pageName = "Affiliation results list";\n}\nelse {\n	if (href.indexOf("listId=myList") > -1) {\n		s.pageName = "My list";\n		jQuery("a.icon.save").on("click",s_eventHandlers.saveListClick);\n	}\n	else if (href.indexOf("/savedList.url") > -1) {\n		s.pageName = "Saved list";\n		jQuery("a.icon.save").on("click",s_eventHandlers.saveListClick);\n	}\n	else {\n		s.pageName = "Document results list";\n		jQuery("a.icon.save").on("click",s_eventHandlers.saveQueryClick);\n		jQuery("a.icon.edit").on("click",s_eventHandlers.editQueryClick);\n		jQuery("#patLinkForHub").on("click",s_eventHandlers.outwardLinking.citedByPatentClick);\n	}\n	jQuery("#moreOptions a[href]").on("click",s_eventHandlers.moreOptionsClick);\n	s_eventHandlers.exportClickHandlers();\n}\n\njQuery(\'a[data-type="pdfLink"]\').on("click",s_eventHandlers.outwardLinking.resultsDownloadClick);\n\nvar refineForm=jQuery("form[name$=ResultsForm]");\nrefineForm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});\nrefineForm.on("submit",s_eventHandlers.refineResultsSearchSubmit);\n\ns.prop4="results";\ns.channel="results";\ns.eVar23=s.getPreviousValue("Implicit","gpv_e23",\'\')||"Implicit";\ns.events=s.apl(s.events, "event9",",",1);\ns.eVar24=s.getQueryParam("s");\ns.eVar25=jQuery.trim(jQuery(".resultsCount:last").text())||"No Results";\ns.eVar40=s.getQueryParam("sort");\n\nvar sdt=s.getQueryParam("sdt");\nif(sdt) {\n	s.eVar23+=" - " + sdt;\n	switch(sdt) {\n		case "sisr":\n			s.prop13=s.getQueryParam("ref");\n			break;\n		case "cl":\n			s.prop13=getClusterParameter();\n			//s.prop13=s.getQueryParam("cluster");\n			break;\n	}\n}\ns.prop12=s.eVar23;'}]},
{x:{p:["/source/browse.url"]},
p:[{t:'c',c:'s.pageName="Source list";\ns.prop4="source list";\ns.channel="source";'}]},
{x:{p:["/source/sourceInfo.url"]},
p:[{t:'c',c:'s.pageName="Source info";\ns.prop4="source info";\ns.channel="source";\n\nvar content=jQuery("div.srcInfoColHeader").parent().parseTextToObject(\':\');\nif(content.ISSN) s.eVar14=content.ISSN.replace(/-/g,"");\nif(content.ISBN) s.eVar28=content.ISBN.replace(/-/g,"");\n\njQuery(\'a[href*="processAlertClick"]\').on("click",s_eventHandlers.alertClick);'}]},
{x:{p:["/record/display.url"]},
p:[{t:'c',c:'s.pageName="Record page";\ns.prop4="record page";\ns.channel="detail";\n\nvar content=jQuery(".formatSourceExtended span").parseTextToObject(\':\');\ns.products=";"+s.getQueryParam("eid");\nif(content.ISSN) s.eVar14=content.ISSN.replace(/-/g,"");\nif(content.ISBN) s.eVar28=content.ISBN.replace(/-/g,"");\n\njQuery(\'a.downloadPdf\').on("click",s_eventHandlers.outwardLinking.recordDownloadClick);\njQuery("#moreOptions a[href]").on("click",s_eventHandlers.moreOptionsClick);\ns_eventHandlers.exportClickHandlers();'}]},
{x:{p:["/authid/detail.url"]},
p:[{t:'c',c:'s.pageName="Author profile";\ns.prop4="author profile";\ns.channel="detail";\n\ns.eVar12=s.getQueryParam("authorId");\n\njQuery(\'a[href*="/alert/form/search.url"]\').on("click",s_eventHandlers.alertClick);\ns_eventHandlers.exportClickHandlers();'}]},
{x:{p:["/affil/profile.url"]},
p:[{t:'c',c:'s.pageName="Affiliation profile";\ns.prop4="affiliation profile";\ns.channel="detail";\n\ns.eVar17=s.getQueryParam("afid");\n\njQuery(\'a[href*="/alert/form/search.url"]\').on("click",s_eventHandlers.alertClick);'}]},
{x:{p:["/term/analyzer.url"]},
p:[{t:'c',c:'s.pageName="Results analyzer";\ns.prop4="results analyzer";\ns.channel="analyzer";'}]},
{x:{p:["/hirsch/author.url"]},
p:[{t:'c',c:'s.pageName="Author evaluator";\ns.prop4="author evaluator";\ns.channel="analyzer";'}]},
{x:{p:["/source/eval.url"]},
p:[{t:'c',c:'s.pageName="Journal analyzer";\ns.prop4="journal analyzer";\ns.channel="analyzer";'}]},
{x:{p:["/cto2/main.url"]},
p:[{t:'c',c:'s.pageName="Citation overview";\ns.prop4="citation overview";\ns.channel="citation overview";'}]},
{x:{p:["/form/MyAlerts.url"]},
p:[{t:'c',c:'s.pageName="Alerts";\ns.prop4="alerts";\ns.channel="alerts";\n\njQuery(\'a[href*="/alert/form/search.url"]\').on("click",s_eventHandlers.alertClick);'}]},
{x:{p:["/list/form/overview.url"]},
p:[{t:'c',c:'s.pageName="Saved lists";\ns.prop4="saved lists";\ns.channel="saved items";'}]},
{x:{p:["/search/save/savedSearch.url"]},
p:[{t:'c',c:'s.pageName="Saved searches";\ns.prop4="saved searches";\ns.channel="saved items";\njQuery("a.icon.edit").on("click",s_eventHandlers.editQueryClick);'}]},
{x:{p:["/myAuthors.url"]},
p:[{t:'c',c:'s.pageName="Grouped authors";\ns.prop4="grouped authors";\ns.channel="saved items";'}]},
{x:{p:["/refworks/rwsettings.url"]},
p:[{t:'c',c:'s.pageName="Refworks settings";\ns.prop4="refworks settings";\ns.channel="refworks settings";'}]},
{x:{p:["/citation/output.url"]},
p:[{t:'c',c:'s.pageName="Output";\ns.prop4="output";\ns.channel="output";\n\nvar frm=jQuery("form[name=printForm]");\nfrm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});\nfrm.on("submit",s_eventHandlers.docPrintSubmit);\n\nfrm=jQuery("form[name=emailForm]");\nfrm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});\nfrm.on("submit",s_eventHandlers.docEmailSubmit);\n\nfrm=jQuery("form[name=QuikbibForm]");\nfrm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});\nfrm.on("submit",s_eventHandlers.docBibSubmit);\n\njQuery("input[name=outputType]").on("change", s_eventHandlers.outputTypeClick);'}]},
{p:[{t:'c',c:'// fired for CARS full page only\nif (document.getElementById("standardCARSTemplatePage")) {\n	\n	if (WAM.cars) {\n		// CARS template name\n		s.pageName=WAM.cars;\n	}\n	else {\n		// default\n		s.pageName="CARS";\n	}\n	s.prop4="cars";\n	s.channel="cars";\n}'}]},
{x:{p:["/search/form/authorFreeLookup.url"]},
p:[{t:'c',c:'s.pageName="Author free lookup";\ns.prop4="search";\ns.channel="search";'}]},
{x:{p:["/list/form/setup.url"]},
p:[{t:'c',c:'s.pageName="Save/update list";\ns.prop4="saved lists";\ns.channel="saved items";\n\n// two forms with same name on page\njQuery("form[name=\'ListForm\'] input[type=\'submit\']").on("click",function(e) {s_eventHandlers.clickTarget=this;});\njQuery("form[name=\'ListForm\']").on("submit",s_eventHandlers.saveListSubmit);'}]},
{x:{p:["/alert/form"]},
p:[{t:'c',c:'var href=window.location.href;\nvar search=(href.indexOf("/search.url") > -1);\nvar doc=(href.indexOf("/document.url") > -1);\nvar author=(href.indexOf("/author.url") > -1);\nif (search || doc || author) {\n	var mode=getURLParameter(href,"mode");\n	if (mode=="C") s.pageName="Set "; else s.pageName="Update ";\n	if (search) {\n		s.pageName=s.pageName+"search alert";\n		var alertForm=jQuery("form[name=SearchAlertValidatedForm]");\n	}\n	if (doc) {\n		s.pageName=s.pageName+"document citation alert";\n		var alertForm=jQuery("form[name=DocumentAlertValidatedForm]");\n	}\n	if (author) {\n		s.pageName=s.pageName+"author citation alert";\n		var alertForm=jQuery("form[name=AuthorAlertValidatedForm]");\n	}\n	s.prop4="alerts";\n	s.channel="alerts";\n\n	alertForm.find("input[type=submit]").on("click",function(e) {s_eventHandlers.clickTarget=this;});\n	alertForm.on("submit",s_eventHandlers.alertSubmit);	\n}'}]}];
s_tc_Scopus.cr();