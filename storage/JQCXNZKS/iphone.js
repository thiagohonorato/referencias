var GestureClass = Class.create
({
    // Fired when a new instance of this object is made
    initialize: function (target,pageViewer) {
		this.targetElement = target;
		this.viewer = pageViewer;
        // listen for start/stop events
        this.targetElement.observe('touchstart', this.viewer.startSelectQuads.bindAsEventListener(this.viewer));
		this.targetElement.observe('touchstart', this.start.bind (this));
		this.targetElement.observe('touchend', this.end.bind (this));
		this.targetElement.observe('touchmove', this.move.bind (this));
        

        // touch storage
        this.gestures = [];
    },

    start: function (e) {
        // currently only support one finger on the viewport
        //if (e.touches.length == 1) {
    	if (this.gestures.length > 0){
    		return;
    	}
            var touch = e.touches[0];
            // store the touch for later
            this.gestures[0] = Object.clone(touch);
            this.gestures[0].date = new Date();
            var l_select_box = this.viewer.getSelectBox();
        	this.selectMove = l_select_box._selectMove.bind(l_select_box);
        	this.selectEnd = l_select_box._selectStop.bind(l_select_box);
        //}
    },
    
    move: function (e){
    	e.preventDefault();
        if (e.touches.length == 1) {
         	this.selectMove(e);
        }
    },
    
    getTarget: function (){
    	return this.targetElement;
    },
    
    end: function (e) {

        // still only one finger
        // if (e.changedTouches.length == 1) {

            // get the most recent touch
            var end = e.changedTouches[0];
            end.date = new Date();

            // get the position that we started at
            var start = this.gestures[0];

            // and the duration of our swipe? number of milliseconds the gesture took
            var duration = end.date.getTime() - start.date.getTime();

            // calculate offsets
            var horizontalMovement = start.clientX - end.clientX;
            var verticalMovement = start.clientY - end.clientY;
            var movement = Math.abs(horizontalMovement) > Math.abs(verticalMovement)?horizontalMovement:verticalMovement;
            // big enough to count as a swipe? and quick enough
            var width = this.targetElement.getWidth();
            if (Math.abs(movement) >= (100) && duration <= 500) {
				this.viewer.getSelectBox().hideMe();
                // this object is passed to the new event under the 'memo' property
                var gesture = {
                    start: start,
                    end: end,
                    gesture: 'swipe',
                    direction: (movement >0 ? 'left' : 'right'),
                    fingers: '' + e.changedTouches.length
                };

                // Fire the gesture, listen with document.observe('gesture:swipe', <function>);
                this.targetElement.fire('gesture:swipe', gesture);
            }else{
            	if (e.changedTouches.length == 1) {
       	    	 	this.selectEnd(e);
            	}
            }
            this.gestures = [];
        //}
    }
});
// var Gestures = new GestureClass(); 