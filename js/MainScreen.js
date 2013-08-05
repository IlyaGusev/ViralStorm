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
    this.cell = new Cell(this.width/2-50, this.height/2-50, 100, 100);
    this.cell.draw(this.ctx);
    this.enemies.push(new Enemy(30, 30, 24, 29));
    requestAnimationFrame(function(){
	self.loop();
    });
    if (!this.pause && !this.shop){
        this.update (this.curTime - this.lastTime);
        this.render ();
    }
}

MainScreen.prototype.update = function(difftime){

}

MainScreen.prototype.render = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.cell.draw(this.ctx);
    this.enemies[0].draw(this.ctx);
}
