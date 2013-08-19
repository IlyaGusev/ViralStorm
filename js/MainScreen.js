"use strict";

function MainScreen(width, height){
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.bullets = [];
    this.ctx = null;
    this.mouse = null;
    this.weapons = [new Weapon("standard", 26),
                    new Weapon("explosion", 52, false, 1000, 50),
                    new Weapon("bullets", false, 52, 1000)];
    this.currentWeapon = this.weapons[0];
    this.wave_num = 0;

    this.pause = false;
    this.shop = false;
    this.gameover = false;

    this.score = 0;
    this.curTime = 0;
    this.lastTime = 0;
    this.diffTime = 0;

    this.fpsTimeout = 20;
    this.fps = 0;

    this.wave = new Wave();
    this.cell = new Cell (420, 420);
    this.init();
}
MainScreen.prototype = {
    init: function(){
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.id = 'main-screen';
        canvas.height = this.height;
        canvas.width = this.width;
        this.ctx = canvas.getContext('2d');
        this.mouse = new MouseController(canvas);
        this.weapons.push();

        this.new_wave_screen();
    },

    new_wave_screen: function(){
        document.getElementById("new-wave").style.display = "block";
        document.getElementById("new-wave").innerHTML = "<br><br><br><br><br>"+"Wave " + (this.wave_num+1);
        var self = this;
        window.setTimeout(function() {self.new_wave()}, 2000);
    },

    new_wave: function(){
        document.getElementById("new-wave").style.display = "none";

        this.wave = new Wave();
        this.enemies.splice(0, this.enemies.length);
        this.bullets.splice(0, this.bullets.length);
        for (var i = 0; i < waves[this.wave_num].length; ++i)
            this.wave.gates.push ([waves[this.wave_num][i][0],new Metronome(waves[this.wave_num][i][1], waves[this.wave_num][i][2])]);

        this.shop = false;
        this.cell.hp = this.cell.maxHp;
        this.cell.armor = this.cell.maxArmor;
        this.lastTime = Date.now();

        this.loop();
    },

    loop: function(){
        if (!this.pause && !this.shop && !this.gameover){
            var self = this;
            requestAnimationFrame(function(){self.loop();});

            this.curTime = Date.now();
            this.diffTime = this.curTime - this.lastTime;
            this.update();
            this.render();
            this.lastTime = this.curTime;
        }
        if (this.shop)
            show_shop();
        if (this.gameover)
            this.game_over();
    },

    render: function(){
        this.clear();
        this.cell.draw(this.ctx);
        for (var i = 0, il=this.enemies.length; i<il; i++){
            this.enemies[i].draw(this.ctx, this.diffTime);
        }
        for (var i = 0, il=this.bullets.length; i<il; i++){
            this.bullets[i].draw(this.ctx, this.diffTime);
        }
        this.draw_status();
        this.currentWeapon.draw(this.ctx, this.diffTime, this.mouse);
    },

    update: function(){
        this.wave.update (this.diffTime);
        if (this.wave.finished){
            this.shop = true;
        }
        else{
            this.cell.update(this.diffTime);
            this.currentWeapon.update(this.diffTime, this.mouse);
            for (var i = 0; i < this.bullets.length; ++i) {
                this.bullets[i].update(this.diffTime);
                if (!this.bullets[i].alive) {
                    this.bullets[i] = null;
                    this.bullets.splice(i, 1);
                    --i;
                }
            }
            for (var i = 0; i < this.enemies.length; ++i) {
                this.enemies[i].update(this.diffTime);
                if (!this.enemies[i].alive) {
                    this.score+=this.enemies[i].score;
                    this.enemies[i] = null;
                    this.enemies.splice(i, 1);
                    --i;
                }
            }
            if (this.cell.hp <= 0)
                this.gameover = true;
        }
    },

    game_over: function(){
        document.getElementById('game-over-screen').style.display = 'block';
        var el = document.getElementById('main-screen');
        if (el!=null)
            el.parentNode.removeChild(el);
        mainscreen = null;

        var self = this;
        window.setTimeout(self.to_menu, 2000);
    },

    to_menu: function(){
        document.getElementById('game-over-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';
    },

    draw_status: function(){
        this.ctx.strokeRect(10, 10, 200, 20);
        if (this.cell.maxHp!=0){
            this.ctx.fillStyle = "rgba(255,0,0,0.7)";
            this.ctx.fillRect(10, 10, (this.cell.hp)/this.cell.maxHp*200, 20);
            this.ctx.font = "14px Garamond";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(Math.floor(this.cell.hp)+"/"+Math.floor(this.cell.maxHp), 90, 25);
        }

        this.ctx.strokeRect(10, 35, 200, 20);
        if (this.cell.maxArmor!=0){
            this.ctx.fillStyle = "rgba(255,255,0,0.7)";
            this.ctx.fillRect(10, 35, (this.cell.armor)/this.cell.maxArmor*200, 20);
            this.ctx.font = "14px Garamond";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(Math.floor(this.cell.armor)+"/"+Math.floor(this.cell.maxArmor), 90, 50);
        }

        this.ctx.font = "18px Garamond";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Time elapsed: "+Math.floor((this.wave.duration-this.wave.time)/1000),675, 820);
        this.ctx.fillText("Score: "+this.score, 705, 40);
        if (this.fpsTimeout==0){
            this.fps = Math.floor(1000/this.diffTime);
            this.fpsTimeout=20;
        }
        else
            --this.fpsTimeout;
        this.ctx.fillText("FPS: "+this.fps, 10, 820);
    },

    clear: function(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}



