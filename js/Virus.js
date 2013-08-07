"use strict";

function Virus (x, y, rotation, type) {
    Virus.superclass.constructor.call (this, x, y, rotation);
    this.type = type;
    this.alive = true;
    console.log ("new Virus (" + type + ") in "+ this.pos);
    switch (type)
    {
        case '1':
            this.speed = 150;
            this.maxHp = this.hp = 50;
            this.damage = 5;
            this.abilities = {};
            this.sprite = {size: [26, 29]};
            break;
        case '2':
            this.speed = 100;
            this.maxHp = this.hp = 30;
            this.damage = 20;
            this.abilities = {kamikadze: true};
            this.sprite = {size: [26, 29]};
            break;
    }
}
inherit (Virus, Enemy);

Virus.prototype.update = function (dt) {
    //console.log ("ud");
    if (this.sprite.size[0] + mainscreen.cell.sprite.size[0] <= 2 * Math.abs (this.pos[0] - mainscreen.cell.pos[0]) &&
        this.sprite.size[1] + mainscreen.cell.sprite.size[1] <= 2 * Math.abs (this.pos[1] - mainscreen.cell.pos[1])) {
        console.log ("I'M ATTACKIN'!");
        if (mainscreen.cell.armor == 0)
            mainscreen.cell.hp -= this.damage * (dt/1000);
        else mainscreen.cell.armor -= this.damage * (dt/1000)* 1.5;
        if ('kamikadze' in this.abilities) this.alive = false;
    } else {
        //console.log ("I'm at " + this.pos);
        switch (this.rotation) {
            case   0: this.pos[1] += this.speed*(dt/1000); break;
            case  90: this.pos[0] -= this.speed*(dt/1000); break;
            case 180: this.pos[1] -= this.speed*(dt/1000); break;
            case 270: this.pos[0] += this.speed*(dt/1000); break;
        }
    }
}