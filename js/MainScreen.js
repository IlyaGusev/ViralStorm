"use strict";
function MainScreen(width, height){
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.pause = false;
    this.shop = false;
    this.gameover = false;
    this.wave = new Wave();
    this.cell = new Cell (420, 420);
    this.init();
}

MainScreen.prototype.init = function () {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.height = this.height;
    canvas.width = this.width;
    this.ctx = canvas.getContext('2d');
    this.wave_num = 0;
    this.new_wave();
};

MainScreen.prototype.new_wave = function () {
    document.getElementById("new-wave").style.display = "block";
    document.getElementById("new-wave").innerHTML = "Wave " + this.wave_num;
    var self = this;
    window.setTimeout(function() {self.new_wave_hide()}, 2000);
}

MainScreen.prototype.new_wave_hide = function () {
    document.getElementById("new-wave").style.display = "none";
    this.wave.gates = [];
    this.wave.time = 0;
    this.wave.finished = false;
    this.shop = false;
    for (var i = 0; i < waves[this.wave_num].length; ++i)
        this.wave.gates.push ([waves[this.wave_num][i][0],new Metronome(waves[this.wave_num][i][1], waves[this.wave_num][i][2])]);
    this.lastTime = Date.now();
    this.loop ();
}

MainScreen.prototype.loop = function(){
    this.curTime = Date.now();
    this.update (this.curTime - this.lastTime);
    this.lastTime = this.curTime;
    if (!this.pause && !this.shop && !this.gameover){
        this.render ();
        var self = this;
        requestAnimationFrame(function(){self.loop();});
    }
    if (this.shop)
    {
        console.log ("SHOP");
        show_shop();
    }
}

MainScreen.prototype.update = function(difftime){
    this.wave.update (difftime);
    if (this.wave.finished) this.shop = true;
    for (var i = 0; i < this.enemies.length; ++i) {
        this.enemies[i].update(difftime);
        if (!this.enemies[i].alive) {this.enemies.splice(i, 1);--i;}
    }
    if (this.cell.hp <= 45) console.log (this.cell.hp);
    //if (this.cell.hp <= 0) console.log ("GAME OVER");
}

MainScreen.prototype.render = function(){

}