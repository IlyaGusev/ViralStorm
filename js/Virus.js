"use strict";

function Virus (x, y, rotation, type) {
    this.pos = [x, y];
    this.rotation = rotation || 0;
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
            this.speed = 200;
            this.maxHp = this.hp = 30;
            this.damage = 1500;
            this.abilities = {kamikadze: true};
            this.sprite=new Sprite('img/virus2.png', [0,0], [26,30], 15, [0, 1, 2, 1]);
            break;
    }
}

Virus.prototype.draw = function(ctx, dt){
	this.sprite.update(dt);
	this.sprite.render(ctx, this.pos, this.rotation);
}

Virus.prototype.update = function (mouse, dt) {
    var cp =mainscreen.cell.pos;
    if (Math.sqrt((this.pos[0]-cp[0])*(this.pos[0]-cp[0])+(this.pos[1]-cp[1])*(this.pos[1]-cp[1]))<=
        mainscreen.cell.sprite.size[0]/2+this.sprite.size[1]/2) {
        if (mainscreen.cell.armor == 0)
            mainscreen.cell.hp -= this.damage * (dt/1000);
        else mainscreen.cell.armor -= this.damage * (dt/1000)* 1.5;
        if ('kamikadze' in this.abilities){
            this.alive = false;
        }
    } else {
        this.pos[0] += -this.speed*Math.sin((this.rotation).degree())*(dt/1000);
        this.pos[1] += this.speed*Math.cos((this.rotation).degree())*(dt/1000);
    }
    //Mouse clicks handling. Geometry on http://zhukovsd.blogspot.ru/2010/04/blog-post.html
    if (mouse.pressed){
        var height =this.sprite.size[1];
        var width = this.sprite.size[0];
        var diagonal = Math.sqrt(height*height+width*width);
        var x = mouse.pos[0];
        var y = mouse.pos[1];
        if (Math.sqrt((x-this.pos[0])*(x-this.pos[0])+(y-this.pos[1])*(y-this.pos[1]))<(diagonal/2)){
            var alpha = Math.acos(height/diagonal);
            var beta = (this.rotation).degree();
            var pi = (180).degree();
            var ulPos = [this.pos[0] - (diagonal/2) * Math.cos(alpha+beta),
                         this.pos[1] - (diagonal/2) * Math.sin(alpha+beta)];
            var dlPos = [this.pos[0] - (diagonal/2) * Math.cos(-alpha+beta),
                         this.pos[1] - (diagonal/2) * Math.sin(-alpha+beta)];
            var drPos = [this.pos[0] - (diagonal/2) * Math.cos(alpha+beta-pi),
                         this.pos[1] - (diagonal/2) * Math.sin(alpha+beta-pi)];
            var urPos = [this.pos[0] - (diagonal/2) * Math.cos(-alpha+beta-pi),
                         this.pos[1] - (diagonal/2) * Math.sin(-alpha+beta-pi)];

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
                if (down[1] >=y &&
                    left[0] <=x &&
                    up[1]   <=y &&
                    right[0]>=x){
                        this.alive = false;
                        mouse.pressed = false;
                    }
            }
            else if ((x-down[0])*k2+down[1]>=y &&
                (x-left[0])*k1+left[1]>=y &&
                (x-left[0])*k2+left[1]<=y &&
                (x-up[0])*k1+up[1]<=y){
                    this.alive = false;
                    mouse.pressed = false;
                }
        }
    }
}
