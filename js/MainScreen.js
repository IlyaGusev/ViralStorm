"use strict";

function MainScreen(width, height){
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.ctx = null;
    this.mouse = null;
    this.wave_num = 0;

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
    canvas.id = 'main-screen';
    canvas.height = this.height;
    canvas.width = this.width;
    this.ctx = canvas.getContext('2d');
    this.mouse = new MouseController(canvas);

    this.new_wave();
};

MainScreen.prototype.new_wave = function () {
    document.getElementById("new-wave").style.display = "block";
    document.getElementById("new-wave").innerHTML = "Wave " + (this.wave_num+1);
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
    this.pause = false;
    this.shop = false;
    this.gameover = false;
    this.hp = this.maxHp;
    this.armor = this.maxArmor;

    this.loop();	
}

MainScreen.prototype.loop = function(){
    if (!this.pause && !this.shop && !this.gameover){
        var self = this;
        requestAnimationFrame(function(){self.loop();});

        this.curTime = Date.now();
        this.render (this.curTime - this.lastTime);
        this.update (this.curTime - this.lastTime);
        this.lastTime = this.curTime;
    }
    if (this.shop)
        show_shop();
    if (this.gameover)
        this.game_over();
}

MainScreen.prototype.render = function(difftime){
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.draw_status();
    this.cell.draw(this.ctx);
    for (var i = 0, il=this.enemies.length; i<il; i++){
        this.enemies[i].draw(this.ctx, difftime);
    }
}

MainScreen.prototype.update = function(difftime){
    this.wave.update (difftime);
    if (this.wave.finished && this.enemies.length == 0){
        this.shop = true;
    }
    for (var i = 0; i < this.enemies.length; ++i) {
        this.enemies[i].update(this.mouse, difftime);
        if (!this.enemies[i].alive) {
            this.enemies[i] = null;
            this.enemies.splice(i, 1);
            --i;
        }
    }
    if (this.cell.hp <= 0)
        this.gameover = true;
}

MainScreen.prototype.game_over = function () {
    document.getElementById('game-over-screen').style.display = 'block';
    var el = document.getElementById('main-screen');
    if (el!=null)
        el.parentNode.removeChild(el);
    mainscreen = null;

    var self = this;
    window.setTimeout(self.to_menu, 2000);
}

MainScreen.prototype.to_menu = function () {

    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

MainScreen.prototype.draw_status = function(){
    this.ctx.strokeRect(750, 0, 90, 60);
    this.ctx.font = "12px Garamond";
    this.ctx.fillText("HP: "+Math.floor(this.cell.hp),755, 20);
    this.ctx.fillText("AR: "+Math.floor(this.cell.armor),755, 35);
    this.ctx.fillText("TE: "+Math.floor((this.wave.duration-this.wave.time)/1000),755, 50);
}
MainScreen.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
}
