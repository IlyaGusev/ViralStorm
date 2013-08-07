"use strict";

function Cell(x, y){
    this.pos = [x, y];
    this.hp = this.maxHp = 50;
    this.armor = this.maxArmor = 0;
    this.buildings = [];
    this.sprite = {size: [100, 100]};
}