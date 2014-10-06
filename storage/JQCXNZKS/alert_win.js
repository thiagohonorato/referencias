
var AlertWin = Class.create();

AlertWin.prototype = 
{
  	initialize: function(message, win_class, do_fade, show_on_init) 
  	{ 
        this._win_class = (win_class != undefined)  ? win_class : 'alert_win';
        this._do_fade = (do_fade != undefined) ? do_fade : true;
        
		this._alert_win = this._createAlert (message);

        if (show_on_init == undefined || show_on_init) {
            this.showAlert();
        }
	},	
    showAlert: function ()
    {
        this._initWindowDimension();
        var h = document.viewport.getScrollOffsets().top;
        h = h + (this._win_height/4);

        this._moveTo(this._win_width/4, h);
        this._alert_win.show().setStyle({opacity: 1.0}); 
        if (this._do_fade) {
            this._alert_win.fade({duration: 12});
        }
    },
    hideAlert: function (e)
    {
        if (e) Event.stop (e);
        this._alert_win.hide();
    },    
	_initWindowDimension: function ()
	{
		this._win_width = 800;
		this._win_height = 600;
		if( typeof( window.innerWidth ) == 'number' ) {
		    this._win_width = window.innerWidth;
		    this._win_height = window.innerHeight;
	  	} 
	  	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			this._win_width = document.documentElement.clientWidth;
			this._win_height = document.documentElement.clientHeight;
	  	} 
	  	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		    this._win_width = document.body.clientWidth;
		    this._win_height = document.body.clientHeight;
	  	}
	},
    _moveTo: function(x, y) {
	    this._alert_win.setStyle({
	      left: x + 'px',
	      top: y + 'px'
	    });
	},
  	_createAlert: function (message)
  	{
  		var alertWin = $(document.createElement ("div"));
        alertWin.addClassName(this._win_class);
        alertWin.hide();
        
		var html = message + "<br/><br/>\n\n<center><input class='win_close' type='button' name='close' value='OK' /></center>";
		alertWin.innerHTML = html;
  		document.body.appendChild (alertWin);
  		
  		var button = alertWin.down('input.win_close');
        button.observe("click", this.hideAlert.bindAsEventListener(this));
	
		return (alertWin);
  	}
};



