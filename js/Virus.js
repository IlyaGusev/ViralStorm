"use strict";

function Virus (position, sprite, type) {
    Enemy.apply (this, arguments);
    console.log ("new Virus (" + type + ") in "+ position);
    switch (type)
    {
        case '1':
            this.speed = 10;
            this.maxHp = this.hp = 50;
            this.damage = 5;
            this.abilities = [];
            break;
        case '2':
            this.speed = 15;
            this.maxHp = this.hp = 30;
            this.damage = 50;
            this.abilities = ["KAMIKADZE"];
            break;
    }
}