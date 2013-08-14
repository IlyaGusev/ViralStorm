"use strict";

function Virus (x, y, rotation, type) {
    this.pos = [x, y];
    this.rotation = rotation || 0;
    this.type = type;

    this.alive = true;
    switch (type)
    {
        case '1':
            this.speed = 100;
            this.maxHp = this.hp = 50;
            this.damage = 5;
            this.score = 100;
            this.abilities = {};
            this.sprite=new Sprite('img/virus1.png', [0,0], [26,30], 15, [0, 1, 2, 1]);
            break;
        case '2':
            this.speed = 150;
            this.maxHp = this.hp = 1;
            this.damage = 1500;
            this.score = 200;
            this.abilities = {kamikadze: true};
            this.sprite=new Sprite('img/virus2.png', [0,0], [26,30], 15, [0, 1, 2, 1]);
            this.deathDelay = 14;
            break;
    }
}

Virus.prototype.draw = function(ctx, dt){
	this.sprite.update(dt);
	this.sprite.render(ctx, this.pos, this.rotation);
};

Virus.prototype.deal_damage = function(dt){
    if (mainscreen.cell.armor <= 0){
        mainscreen.cell.armor = 0;
        mainscreen.cell.hp -= this.damage * (dt/1000);
    }
    else {
        if (mainscreen.cell.armor<this.damage * (dt/1000)* 1.5){
            mainscreen.cell.hp -= (this.damage * (dt/1000)-(mainscreen.cell.armor/1.5));
            mainscreen.cell.armor = 0;
        }
        else
            mainscreen.cell.armor-=this.damage * (dt/1000)* 1.5;
    }
};

Virus.prototype.update = function (mouse, dt) {
    var cp =mainscreen.cell.pos;
    if (Math.sqrt((this.pos[0]-cp[0])*(this.pos[0]-cp[0])+(this.pos[1]-cp[1])*(this.pos[1]-cp[1]))<=
        mainscreen.cell.sprite.size[0]/2+this.sprite.size[1]/2) {
        if ('kamikadze' in this.abilities){
            if (this.deathDelay==14){
                this.sprite=new Sprite('img/virus2.png', [0,0], [26,30], 16, [3, 4, 5, 6]);
                --this.deathDelay;
            }
            else{
                --this.deathDelay;
                if (this.deathDelay==0){
                    this.deal_damage(dt);
                    this.alive = false;
                }
            }
        }
        else{
            this.deal_damage(dt);
        }
    } else {
        this.pos[0] += -this.speed*Math.sin((this.rotation).degree())*(dt/1000);
        this.pos[1] += this.speed*Math.cos((this.rotation).degree())*(dt/1000);
    }
    if (mouse.pressed){
        if (testPointInRect(mouse.pos, this.pos, this.sprite.size, this.rotation)) {
            this.hp -=26;
            mouse.pressed = false;
        }
    }
    if (this.hp<=0){
        this.alive = false;
        mainscreen.score += this.score;
    }
};
