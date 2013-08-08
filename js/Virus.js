"use strict";

function Virus (x, y, rotation, type) {
    Virus.superclass.constructor.call (this, x, y, rotation);
    this.type = type;
    this.alive = true;
    switch (type)
    {
        case '1':
            this.speed = 150;
            this.maxHp = this.hp = 50;
            this.damage = 5;
            this.abilities = {};
            this.sprite=new Sprite('img/virus1.png', [0,0], [26,30], 15, [0, 1, 2, 1]);
            break;
        case '2':
            this.speed = 100;
            this.maxHp = this.hp = 30;
            this.damage = 20;
            this.abilities = {kamikadze: true};
            this.sprite=new Sprite('img/virus2.png', [0,0], [26,30], 15, [0, 1, 2, 1]);
            break;
    }
}
inherit (Virus, Enemy);

Virus.prototype.draw = function(ctx, dt){
	this.sprite.update(dt);
	this.sprite.render(ctx, this.pos, this.rotation);
}

Virus.prototype.update = function (mouse, dt) {
    if ((this.sprite.size[0] + mainscreen.cell.sprite.size[0] >= 2 * Math.abs (this.pos[0] - mainscreen.cell.pos[0])) &&
        (this.sprite.size[1] + mainscreen.cell.sprite.size[1] >= 2 * Math.abs (this.pos[1] - mainscreen.cell.pos[1]))) {
        if (mainscreen.cell.armor == 0)
            mainscreen.cell.hp -= this.damage * (dt/1000);
        else mainscreen.cell.armor -= this.damage * (dt/1000)* 1.5;

        if ('kamikadze' in this.abilities){
            this.alive = false;
        }
    } else {
        switch (this.rotation) {
            case   0: this.pos[1] += this.speed*(dt/1000); break;
            case  90: this.pos[0] -= this.speed*(dt/1000); break;
            case 180: this.pos[1] -= this.speed*(dt/1000); break;
            case 270: this.pos[0] += this.speed*(dt/1000); break;
        }
    }
    if (mouse.pressed && !mouse.pressedInThisRound){
        var height =this.sprite.size[1];
        var width = this.sprite.size[0];
        var diagonal = Math.sqrt(height*height+width*width);
        var alpha = Math.acos(height/diagonal);
        var ulPos = [this.pos[0] - (diagonal/2)*Math.cos(alpha+(this.rotation).degree()),
            this.pos[1] - (diagonal/2)*Math.sin(alpha+(this.rotation).degree())];
        var dlPos = [this.pos[0] - (diagonal/2)*Math.cos(-alpha+(this.rotation).degree()),
            this.pos[1] - (diagonal/2)*Math.sin(-alpha+(this.rotation).degree())];
        var drPos = [this.pos[0] - (diagonal/2)*Math.cos(alpha+(this.rotation-180).degree()),
            this.pos[1] - (diagonal/2)*Math.sin(alpha+(this.rotation-180).degree())];
        var urPos = [this.pos[0] - (diagonal/2)*Math.cos(-alpha+(this.rotation-180).degree()),
            this.pos[1] - (diagonal/2)*Math.sin(-alpha+(this.rotation-180).degree())];

        var down = [0, 0];
        var left = [0,0];
        var up = [0, 0];
        var right = [0,0];
        var min=Math.max(ulPos[1], urPos[1], dlPos[1], drPos[1]);
        if (min == ulPos[1]) {
            down = ulPos;
            up = drPos;
            left = urPos;
            right = dlPos;
        }
        else if (min == urPos[1]){
            down = urPos;
            up = dlPos;
            left = drPos;
            right = ulPos;
        }
        else if (min == dlPos[1]) {
            down = dlPos;
            up = urPos;
            left = ulPos;
            right = drPos;
        }
        else if (min == drPos[1]) {
            down = drPos;
            up = ulPos;
            left = dlPos;
            right = urPos;
        }

        var k1 = (right[1]-up[1])/(right[0]-up[0]);
        var k2 = (right[1]-down[1])/(right[0]-down[0]);
        if ((right[0]-down[0]<=0.0001 && right[0]-down[0]>=-0.0001) ||
            right[0]-up[0]  <=0.0001 && right[0]-up[0]  >=-0.0001)
        {
            if (down[1]>=mouse.pos[1] &&
                left[0]<=mouse.pos[0] &&
                up[1]<=mouse.pos[1] &&
                right[0]>=mouse.pos[0]){
                    this.alive = false;
                    mouse.pressed = false;
                }
        }
        else if ((mouse.pos[0]-down[0])*k2+down[1]>=mouse.pos[1] &&
            (mouse.pos[0]-left[0])*k1+left[1]>=mouse.pos[1] &&
            (mouse.pos[0]-left[0])*k2+left[1]<=mouse.pos[1] &&
            (mouse.pos[0]-up[0])*k1+up[1]<=mouse.pos[1]){
                this.alive = false;
                mouse.pressed = false;
            }
    }
}
