"use strict"

function Bullet (x, y, rotation, type) {
    this.pos = [x, y];
    this.rotation = rotation || 0;
    this.alive = true;
    switch (type) {
        case 1:
            this.damage = 5;
            this.speed = 250;
            this.sprite = new Sprite ('img/bullet1.png', [0,0], [9, 9], 15, [0, 1]);
    }
}

Bullet.prototype.draw = function(ctx, dt){
    this.sprite.update(dt);
    this.sprite.render(ctx, this.pos, this.rotation);
}

Bullet.prototype.update = function (mouse, dt) {
    var cp = mainscreen.cell.pos;
    if (Math.sqrt((this.pos[0]-cp[0])*(this.pos[0]-cp[0])+(this.pos[1]-cp[1])*(this.pos[1]-cp[1]))<=
        mainscreen.cell.sprite.size[0]/2+this.sprite.size[1]/2) {
        if (mainscreen.cell.armor == 0)
            mainscreen.cell.hp -= this.damage;
        else mainscreen.cell.armor -= this.damage * 1.5;
            this.alive = false;
    } else {
        this.pos[0] += -this.speed*Math.sin((this.rotation).degree())*(dt/1000);
        this.pos[1] += this.speed*Math.cos((this.rotation).degree())*(dt/1000);
    }
}