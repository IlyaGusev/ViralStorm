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

    this.cell = new Cell(this.width/2-50, this.height/2-50, 100, 100);
    this.enemies.push(new Virus(30, 30, 0));
    this.enemies.push(new Bacteria(80, 30, 0));

    this.loop();
}

MainScreen.prototype.loop = function(){
    var self = this;
    requestAnimationFrame(function(){
	    self.loop();
    });
    this.curTime = Date.now();
    if (!this.pause && !this.shop){
        this.update (this.curTime - this.lastTime);
        this.render (this.curTime - this.lastTime);
    }
    this.lastTime = this.curTime;
}

MainScreen.prototype.update = function(difftime){
}

MainScreen.prototype.render = function(difftime){
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.cell.draw(this.ctx);
    for (var i = 0, il=this.enemies.length; i<il; i++){
        this.enemies[i].draw(this.ctx, difftime);
    }
}
