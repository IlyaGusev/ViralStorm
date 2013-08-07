"use strict";

function Enemy(x, y, rotation){
    this.pos = [];
    this.pos[0] = x || 0;
    this.pos[1] = y || 0;
    this.rotation = rotation || 0;
}

Enemy.prototype = {
    constructor: Enemy
};
