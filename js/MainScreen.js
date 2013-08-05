"use strict";
function MainScreen(width, height){
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.pause = false;
    this.shop = false;
	
    this.init();
}


MainScreen.prototype.init = function(){
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.height = this.height;
    canvas.width = this.width;
    this.ctx = canvas.getContext('2d');

    this.lastTime = Date.now();
    this.loop();
}

MainScreen.prototype.loop = function(){
    this.curTime = Date.now();
    var self = this;
    requestAnimationFrame(function(){
	self.loop();
    });
    if (!this.pause && !this.shop){
        this.update (this.curTime - this.lastTime);
        this.render ();
    }
}

MainScreen.prototype.update = function(difftime){
     for (var i = 0; i < 5; ++i);
}

MainScreen.prototype.render = function(){

}
