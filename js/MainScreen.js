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
    this.score = 0;

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
    if (browser()=='Firefox') document.getElementById('main-screen').style.cursor = "auto";

    this.new_wave();
};

MainScreen.prototype.new_wave = function () {
    document.getElementById("new-wave").style.display = "block";
    document.getElementById("new-wave").innerHTML = "<br><br><br><br><br>"+"Wave " + (this.wave_num+1);
    var self = this;
    window.setTimeout(function() {self.new_wave_hide()}, 2000);
};

MainScreen.prototype.new_wave_hide = function () {
    document.getElementById("new-wave").style.display = "none";
    this.wave.gates = [];
    this.wave.time = 0;
    this.wave.finished = false;
    this.shop = false;
    this.enemies.splice(0, this.enemies.length);
    for (var i = 0; i < waves[this.wave_num].length; ++i)
        this.wave.gates.push ([waves[this.wave_num][i][0],new Metronome(waves[this.wave_num][i][1], waves[this.wave_num][i][2])]);

    this.lastTime = Date.now();
    this.pause = false;
    this.shop = false;
    this.gameover = false;
    this.cell.hp = this.cell.maxHp;
    this.cell.armor = this.cell.maxArmor;

    this.loop();	
};

MainScreen.prototype.loop = function(){
    if (!this.pause && !this.shop && !this.gameover){
        var self = this;
        requestAnimationFrame(function(){self.loop();});

        this.curTime = Date.now();
        this.update (this.curTime - this.lastTime);
        this.render (this.curTime - this.lastTime);
        this.lastTime = this.curTime;
    }
    if (this.shop)
        show_shop();
    if (this.gameover)
        this.game_over();
};

MainScreen.prototype.render = function(difftime){
    this.clear();
    this.cell.draw(this.ctx);
    for (var i = 0, il=this.enemies.length; i<il; i++){
        this.enemies[i].draw(this.ctx, difftime);
    }
    this.draw_status();
};

MainScreen.prototype.update = function(difftime){
    this.wave.update (difftime);
    if (this.wave.finished){
        this.shop = true;
    }
    else{
        if (this.cell.hp<this.cell.maxHp)
            this.cell.hp+=this.cell.regenHp*(17/1000);
        if (this.cell.armor<this.cell.maxArmor)
            this.cell.armor+=this.cell.regenArmor*(17/1000);
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
};

MainScreen.prototype.game_over = function () {
    document.getElementById('game-over-screen').style.display = 'block';
    var el = document.getElementById('main-screen');
    if (el!=null)
        el.parentNode.removeChild(el);
    mainscreen = null;

    var self = this;
    window.setTimeout(self.to_menu, 2000);
};

MainScreen.prototype.to_menu = function () {

    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
};

MainScreen.prototype.draw_status = function(){
    this.ctx.strokeRect(10, 10, 200, 20);
    this.ctx.fillStyle = "rgba(255,0,0,0.7)";
    this.ctx.fillRect(10, 10, (this.cell.hp)/this.cell.maxHp*200, 20);
    this.ctx.font = "14px Garamond";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(Math.floor(this.cell.hp)+"/"+Math.floor(this.cell.maxHp), 90, 25);

    this.ctx.strokeRect(10, 35, 200, 20);
    if (this.maxArmor!=0){
        this.ctx.fillStyle = "rgba(255,255,0,0.7)";
        this.ctx.fillRect(10, 35, (this.cell.armor)/this.cell.maxArmor*200, 20);
        this.ctx.font = "14px Garamond";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(Math.floor(this.cell.armor)+"/"+Math.floor(this.cell.maxArmor), 90, 50);
    }

    this.ctx.font = "18px Garamond";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Time elapsed: "+Math.floor((this.wave.duration-this.wave.time)/1000),670, 820);
    this.ctx.fillText("Score: "+this.score, 705, 40);
};

MainScreen.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
};
