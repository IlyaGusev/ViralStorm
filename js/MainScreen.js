"use strict";
function MainScreen(width, height){
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.init();
    this.pause = false;
    this.shop = false;
}


MainScreen.prototype.init = function(){
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.height = this.height;
    canvas.width = this.width;
    this.ctx = canvas.getContext('2d');

    this.lastTime = Date.now();
    loop();
}

MainScreen.prototype.loop = function(){
    this.curTime = Date.now();
    if (!pause && !shop)
    {
        update (curTime - lastTime);
        render ();
        window.requestAnimationFramerame (loop);
    }
}