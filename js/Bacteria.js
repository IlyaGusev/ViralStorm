"use strict";

function Bacteria(x, y, rotation, type){
    this.pos = [x, y];
    this.rotation = rotation || 0;
    this.type = type ||0;
    this.alive = true;
    this.inBattle = false;
    switch (type)
    {
        case '1':
            this.speed = 50;
            this.maxHp = this.hp = 50;
            this.damage = 5;
            this.score = 200;
            this.cooldown = 1000;
            this.range = 200;
            this.abilities = {};
            this.spriteInMove = new Sprite('img/bacteria1.png', [0,0], [26,40], 15, [0, 1, 2, 3, 4, 3, 2, 1]);
            this.spriteInBattle = new Sprite('img/bacteria1.png', [0,0], [26,40], 5, [5, 6, 7, 6]);
            this.bulletType = 1;
            break;
    }

}

Bacteria.prototype = {
    draw : function(ctx, dt){
        if (this.inBattle){
            this.spriteInBattle.update(dt);
            this.spriteInBattle.render(ctx, this.pos, this.rotation);
        }
        else{
            this.spriteInMove.update(dt);
            this.spriteInMove.render(ctx, this.pos, this.rotation);
        }
    },
    update : function (mouse, dt) {
        var cp = mainscreen.cell.pos;
        if (this.inBattle) {
            this.met.update(dt);
            if (this.met.getTick())
                mainscreen.enemies.push (new Bullet (this.pos[0], this.pos[1], this.rotation, this.bulletType));
        } else {
            if (Math.sqrt((this.pos[0]-cp[0])*(this.pos[0]-cp[0])+(this.pos[1]-cp[1])*(this.pos[1]-cp[1]))<=
                mainscreen.cell.sprite.size[0]/2+this.spriteInMove.size[1]/2+this.range) {
                this.inBattle = true;
                this.met = new Metronome (this.cooldown, this.cooldown/2);
            } else {
                this.pos[0] += -this.speed*Math.sin((this.rotation).degree())*(dt/1000);
                this.pos[1] += this.speed*Math.cos((this.rotation).degree())*(dt/1000);
            }
        }
        if (mouse.pressed){
            if (testPointInRect(mouse.pos, this.pos, this.spriteInMove.size, this.rotation)) {
                this.alive = false;
                mainscreen.score += this.score;
                mouse.pressed = false;
            }
        }
    }
};