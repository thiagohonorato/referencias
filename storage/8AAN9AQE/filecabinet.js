/**********************************************
/*              Filecabinet Modal
/**********************************************/
var fcModal = {
	el: {
		pdfNode: '.open-pdf',
		htmlNode: '.open-html'
	},
	config: {
		cookiePrefix: 'fc-',
		depletedTitle: 'No Downloads Left',
		depletedMsgStandard: 'Your file cabinet has no standard downloads remaining.',
		depletedMsgJournal: 'Your file cabinet has no journal or conference downloads remaining.',
		badDataTitle: 'An error has occurred',
		badDataMsg: 'The system is currently unable to download this document to your file cabinet. Please try again later or <a href="/xpl/techform.jsp">contact technical support</a>.',
		expiredTitle: 'Subscription Expired',
		expiredMsg: 'Your institution\'s subscription has expired and you cannot download new documents.',
		ajaxErrorMsg: 'An internal error occured processing the request.  Please try again.  If this problem continues, please contact IEEE Customer Support',
		ajaxExpiredMsg: 'Your session has timed out.  Please login again before sending email.',
		isGettingStatus: false,
		isSendingEmail: false
	},
	fcTipOptions: {
		position: {
			my: 'left top',
			at: 'right center',
			adjust: {
				resize: true,
				y: -10
			}
		},
		style: {
			width: 'auto',
			classes: 'qtip-mediumIeee',
			tip: {
				corner: 'left top',
				mimic: 'left center',
				offset: 5,
				width: 16,
				height: 9
			},
			border: {
				width: 2
			},
		},
		show: false,
		hide: {
			event: 'unfocus',
			leave: false,
			fixed: true
		},
		events: {
			hide: function(e, api) {
				api.destroy();
				//console.log('qtip destroyed');
			}
		}
	},
	init: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		var self = this;

		jQuery(this.el.pdfNode).add(this.el.htmlNode).click(function() {
			var cf = fcModal.config,
				ajax_load = "<span id='fc-modal-spinner'><img src='" + ASSETS_RELATIVE_PATH + "/img/processing_information.gif' alt='Loading Data...'/></span>",
				node = this;

			if (cf.isGettingStatus) { console.log('still running'); return; }
					
			j$(node).append(ajax_load);

			cf.isGettingStatus = true;
			jQuery.when(self.getFileCabinetInfo(this.id)).then(function(data) {
				cf.isGettingStatus = false;
				j$('#fc-modal-spinner').remove();	
				if(data.error){
					var goToStamp = "/stamp/stamp.jsp?tp=&arnumber=" +
					j$(node).attr('id');
					window.location = goToStamp;
					return false;
				}
				else {
				if (self.isIgnoreSet(data.userId, data.licenseId) && !self.isDepleted(data) && !self.isExpired(data)) {
					var htmlNode = self.el.htmlNode.slice(1),
						urlAttr = jQuery(node).hasClass(htmlNode) ? '&icp=true' : '';
					//console.log('modal ignored and everything is good... go to pdf'+data.confirmationUrl + urlAttr);
					window.location = data.confirmationUrl + urlAttr;
				} else {
					if (self.isIgnoreSet(data.userId, data.licenseId)) {
						self.removeIgnore(data.userId, data.licenseId);
						//console.log('deleting cookie');
					}
					//console.log('rendering qtip');
					self.updateOverlayCount(data);
					self.renderQtip(node, data);
				}
			}
			});
		});

	},
	bindEmailFormEvents: function(node) {
		var $this = jQuery(node),
			$contactform = $this.find('#filecabinet-contact'),
			$inputMessage = $contactform.find('#message'),
			$emailButton = $contactform.find('#fc-email-button'),
			$charCount = $contactform.find('.character-count span');

		$inputMessage.on('keyup keydown blur', function() {
			var maxlength = j$(this).attr('maxlength');
			var val = j$(this).val().trim();

			$charCount.html(+maxlength - val.length);

		});

		$emailButton.click(function(e) {			
			var cf = fcModal.config,
				$name = $contactform.find('#name'),
				$email = $contactform.find('#email'),
				$message = $contactform.find('#message'),
				$qtipcontent = $j('#qtip-1-content'),
				arnumber = jQuery(this).parents('.qtip').qtip().elements.target.attr('id'),
				validArnumber = isNaN(parseInt(arnumber)) ? '' : parseInt(arnumber),
				cabinetType = (validArnumber !== '') ? '': j$(this).parents('.qtip').qtip().elements.target.parents('.cabinet').find('.title').html(),
				validEmail = fcModal.validateEmail($email.val()),
				failedValidation = false,
				errorNode = '<div class="error" style="color: red; text-align: left !important;" ></div>',
				requestData = {};

			if (cf.isSendingEmail){return;}				

			$contactform.find('.success').remove();
			$contactform.find('.error').remove();
			$qtipcontent.find('.error').remove();

			if (!$name.val().length) {
				$name.after(jQuery(errorNode).clone().html('Name is required.'));
				failedValidation = true;
			}
			if (validEmail == false) {
				$email.after(jQuery(errorNode).clone().html('A valid email is required.'));
				failedValidation = true;
			}

			if (failedValidation) {
				return;
			}

			requestData = {
				arnumber: validArnumber,
				name: $name.val(),
				email: $email.val(),
				fctype : cabinetType,
				message: $message.val()
			};			

			cf.isSendingEmail = true;

			j$.ajax({
				url: "/xpl/sendFileCabinetNoDownloadsEmail",
				data: requestData,
				type: 'post',
				success: function(responseData, status, jqxhr) {
					e.preventDefault();					
					$contactform.after('<br><div class="success" style="color: red;text-align: left !important;" >Message sent successfully!</div><br>');
					$contactform.hide();
					jQuery(this).unbind(e);		
					cf.isSendingEmail = false;			
					return;
				},
				error: function(jqxhr, status, errorMsg) {
					
					var $content = jQuery(errorNode).clone(),
						fc = fcModal.config;
					if (errorMsg === 'Unauthorized'){
						$content.html(fc.ajaxExpiredMsg);
					} else {
						$content.html(fc.ajaxErrorMsg);
					}
					$contactform.after($content);
					cf.isSendingEmail = false;			
				}
			});


		});
	},
	validateEmail: function(email) {
		var emailReg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

		return emailReg.test(email);
	},
	getFileCabinetInfo: function(arnumber) {
		var url = '/xpl/getFileCabinetJSONData.jsp?',
			data = {
				'arnumber': arnumber
			};
		return jQuery.getJSON(url, data);
	},
	updateOverlayCount: function(data){
		var fcType = '#cabinet-'+data.fileCabinetType;
		j$('.filecabinet-display '+ fcType+' .dl-remaining .count').html(data.docsRemainingInCabinet);
		j$('.filecabinet-display '+ fcType+' .dl-filed .count').html(data.docsFiledInCabinet);
		j$('.filecabinet-display '+ fcType+' .dl-filed-total .count').html(data.latestDocsFiledInCabinet);
		
	},
	renderQtip: function(node, data) {
		var $node = jQuery(node),
			self = this,
			cf = this.config,
			arnumber = $node.attr('id') || '';

		var fcOptions = {
			valid: {
				content: {
					text: j$('.fc-container').html()
				},
				events: {
					render: function(event, api) {
						var $this = j$(this),
							$fcMain = $this.find('.fc-main'),
							$fcOptions = $this.find('.fc-options'),
							$fcButton = $this.find('.add-to-fc'),
							$fcSuccess = $this.find('.fc-success'),
							$fcConfirmation = $this.find('.fc-confirmation'),
							$fcInput = $fcConfirmation.find('input[type=checkbox]'),
							$docCountNode = $this.find('#doc-count'),
							$subtractor = $this.find('.subtractor');
						$docCountNode.html(data.docsRemainingInCabinet);
						//targetURL = $fcOptions.find('a').attr('href');

						j$('.add-to-fc').on('click', jQuery.debounce(Xplore.config.DEBOUNCE_THRESHOLD, true, function() {
							//determine if handler is html link											
							var htmlNode = self.el.htmlNode.slice(1);
							var urlAttr = jQuery(this).parents('.qtip').qtip().elements.target.hasClass(htmlNode) ? '&icp=true' : '';

							//check if ignore is set
							if (jQuery(this).parents('.qtip').find('.fc-confirmation input:checked').length) {
								self.setIgnore(data.userId, data.licenseId);
							}

							//console.log('going to pdf');
							window.location = data.confirmationUrl + urlAttr;

							return false;
						}));

						j$(this).find('.fc-close').click(function(e) {
							e.preventDefault();
							j$(this).parents('.qtip').hide();
						});
					}
				}
			},
			expired: {
				content: {
					text: jQuery('.fc-zero').html()
				},
				events: {
					render: function(event, api) {
						var $this = jQuery(this),
							fc = fcModal.config,
							$title = $this.find('#fc-title-span'),
							$message = $this.find('#fc-message-span'),
							display = {},
							$options = $this.find('.fc-options'),
							$notifyAdminButton = $this.find('.add-to-contact'),
							$closeButton = $this.find('.fc-close'),
							$contactform = $this.find('#filecabinet-contact');

						if (jQuery.isEmptyObject(data)) {
							display.title = fc.badDataTitle;
							display.message = fc.badDataMsg;

						} else if (self.isDepleted(data)) {
							display.title = fc.depletedTitle;

							if (data.fileCabinetType == 'STANDARD') {
								display.message = fc.depletedMsgStandard;
							} else {
								display.message = fc.depletedMsgJournal;
							}

						} else if (self.isExpired(data)) {
							display.title = fc.expiredTitle;
							display.message = fc.expiredMsg;
						}

						$title.html(display.title);
						$message.html(display.message);

						$notifyAdminButton.click(function() {
							$options.hide();
							$contactform.fadeIn("slow");
							fcModal.bindEmailFormEvents($this);
						});

						$closeButton.click(function(e) {
							e.preventDefault();
							jQuery(this).parents('.qtip').hide();
						});

						jQuery(this).find('#add-to-purchase').click(function(e) {
							var abstractLink = "/xpl/articleDetails.jsp?tp=&arnumber=" +
								arnumber + "&fromPage=noDownLoadsLeft";
							window.location = abstractLink;
							return;
						});
						jQuery(this).find('#add-to-purchase-abstract').click(function(e) {
							e.preventDefault();
							e.stopPropagation();
							jQuery(this).parents('.qtip').hide();
							var $article_page_hdr = j$('#article-page-hdr');
							var $hdr_btn_set = $article_page_hdr.find('div.button-set');
							var $full_txt_menu = j$('#full-txt-menu-wrap');
							hdr_btn_set_off = Math.floor($hdr_btn_set.offset().top);
							hdr_btn_set_h = $hdr_btn_set.innerHeight();
							$full_txt_menu.css('top', hdr_btn_set_off + hdr_btn_set_h);
							$article_page_hdr.toggleClass('menu-open');
							if ($article_page_hdr.hasClass('menu-open')) {
								j$(document).one('click', function() {
									$article_page_hdr.removeClass('menu-open');
								});
							}
							$full_txt_menu.click(function(e) {
								e.stopPropagation();
							});

						});

					}
				}
			}
		},
			fcData = {};

		//determine what type of UI to display
		if (!(self.isDepleted(data)) && !(self.isExpired(data))) {
			fcData = jQuery.extend({}, fcOptions['valid']);
		} else {
			fcData = jQuery.extend({}, fcOptions['expired']);
		}

		//generate qtip
		$node.qtip(jQuery.extend(true, fcData, self.fcTipOptions));
		$node.qtip().show();

	},
	isExpired: function(data) {
		return data.isReadOnly == 'true';
	},
	isDepleted: function(data) {
		return !(data.docsRemainingInCabinet > 0);
	},
	setIgnore: function(userID, licenseID) {
		var config = {
			path: "/",
			expires: 1,
		};

		jQuery.cookie(this.config.cookiePrefix + userID + licenseID, true, config);
		//console.log('ignore is set');
		return this;
	},
	removeIgnore: function(userID, licenseID) {
		jQuery.removeCookie(this.config.cookiePrefix + userID + licenseID);
	},
	isIgnoreSet: function(userID, licenseID) {
		var cookie = jQuery.cookie(this.config.cookiePrefix + userID + licenseID);

		return !(cookie == undefined);
	},
	qtipExists: function($node) {
		return $node.data('hasqtip');
	}
};


/**********************************************
/*              Global Overlay
/**********************************************/
var fcGlobal = {
	el: {
		cabinetDisplay: '.filecabinet-display',
		cabinetNode: '.cabinet',
		cabinetButton: '#ToolBarWrapper #filecabinet-button',
		downloadCountNode: '.downloaded .count',
		filedCountNode: '.filed .count',
	},
	config: {
		getCabinetSnapPosition: function() {
			var $button = jQuery(fcGlobal.el.cabinetButton);
			return $button.offset().top + $button.height();
		},
		textExpired: "Subscription expired.  New documents cannot be added.",
		textDepleted: "Your file cabinet has no downloads remaining.",
		textInfo: "Member Digital Library users may carry over up to 10 " +
				"unused monthly downloads to the next month. The carried-over " +
				"downloads do not accumulate each month, thus the maximum downloads " +
				"available in any given month is 35 (25 monthly " +
				"downloads + 10 carried over downloads)."
					
	},
	init: function() {
		if (jQuery(this.el.cabinetButton).length > 0) {
			this.setStickyNav();
			this.bindEvents();
			this.setFileCabinetMethods();
		}
	},
	bindEvents: function() {
		var $cabinet = jQuery(this.el.cabinetDisplay),
			$cabinetButton = jQuery(this.el.cabinetButton),
			self = this;

		// close cabinet on click of 'X' icon
		$cabinet.find('.cabinet-close').click(function() {
			self.hideDisplay();
			return false;
		});

		//determine if nav should stick on scroll
		jQuery(window).scroll(function() {
			self.setStickyNav();
		});

		//set open/close behavior on file-cabinet button
		$cabinetButton.click(function(e) {
			e.preventDefault();			
			if (typeof event !== "undefined"){ event.returnValue = false; }
			var $this = jQuery(this),
				$cabinet = jQuery(self.el.cabinetDisplay);

			if ($cabinet.is(':visible')) {
				$this.removeClass('Hover');
				self.hideDisplay();
			} else {
				$this.addClass('Hover');
				self.showDisplay();
			}	
		});



		jQuery('.filecabinet-display #notify-admin').click(function() {
			var $this = jQuery(this);

			$this.qtip(jQuery.extend(true, {
				content: jQuery('#filecabinet-contact').clone().wrap('<div/>').parent().html(),
				events: {
					render: function(event, api) {
						jQuery(this).find('#filecabinet-contact').show();
						fcModal.bindEmailFormEvents(this);
					}
				}
			}, fcModal.fcTipOptions));

			$this.qtip().show();
		});
		
		jQuery('.qtip-learn-more').on('mouseenter focus', function() {
			var $this = jQuery(this);			

			$this.qtip({
				content: fcGlobal.config.textInfo,
				position: {
					my: 'left top',
					at: 'right center',
					adjust: {
						resize: true,
						y: -10
					}
				},
				style: {
					width: 'auto',
					classes: 'qtip-mediumIeee',					
					border: {
						width: 2
					},
					tip: {
						corner: 'left top',
						mimic: 'left center',
						offset: 5,
						width: 16,
						height: 9
					},
				}				
			});

			$this.qtip().show();
		});
	},
	setStickyNav: function() {
		var
		self = this,
			el = this.el,
			cf = this.config,
			$cabinet = jQuery(el.cabinetDisplay),
			posOffset = jQuery(el.cabinetDisplay).offset().top,
			windowpos = jQuery(window).scrollTop();

		if ((windowpos >= posOffset) && (windowpos > cf.getCabinetSnapPosition())) {
			$cabinet.css({
				'position': 'fixed',
				'top': '0'
			});
		} else {
			$cabinet.css({
				'position': 'absolute',
				'top': cf.getCabinetSnapPosition() + 'px'
			});
		}
	},
	showDisplay: function() {
		jQuery(this.el.cabinetDisplay).slideDown(250);
	},
	hideDisplay: function() {
		jQuery(this.el.cabinetDisplay).slideUp(250);
	},
	FileCabinet: function(id) {
		this.id = id;
		this.downloadCount = 0;
		this.filedCount = 0;
	},
	setFileCabinetMethods: function() {

		fcGlobal.FileCabinet.prototype.getDownloadCount = function() {
			return this.downloadCount;
		};

		fcGlobal.FileCabinet.prototype.setDownloadCount = function(count) {
			this._setCount('download', count);
			return this;
		};

		fcGlobal.FileCabinet.prototype.setFiledCount = function(count) {
			this._setCount('filed', count);
			return this;
		};

		fcGlobal.FileCabinet.prototype._setCount = function(type, count) {
			var el = fcGlobal.el,
				thisNode = {
					'download': 'downloadCount',
					'filed': 'filedCount'
				},
				countNode = {
					'download': el.downloadCountNode,
					'filed': el.filedCountNode
				};

			this[thisNode[type]] = count;
			jQuery(el.cabinetDisplay)
				.find('#' + this.id)
				.find(countNode[type])
				.html(count);
		};

		fcGlobal.FileCabinet.prototype.isCabinetExpired = function() {
			return jQuery('#' + this.id).hasClass('expired');
		};

		fcGlobal.FileCabinet.prototype.isDepleted = function() {
			return this.getDownloadCount === 0;
		};

		fcGlobal.FileCabinet.prototype.toggleCountState = function() {
			var $cabinet = jQuery('#' + this.id);
		};

		fcGlobal.FileCabinet.prototype.showNotification = function(type) {
			var cf = fcGlobal.config,
				$cabinet = jQuery('#' + this.id),
				msg = type === 'depleted' ? cf.textDepleted : type === 'expired' ? cf.textExpired : '',
				$element = jQuery("<div class='notification'></div>");

			$element.html(msg);

			if ($cabinet.find('.notification')) {
				$cabinet.find('.notification').remove();
			}

			$cabinet.append($element);
		};


	}
};



jQuery(function() {
	fcModal.init();
	fcGlobal.init();
}); //doc ready
