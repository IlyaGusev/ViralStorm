"use strict";

function Enemy(x, y, rotation){
    this.pos = [x,y];
    this.rotation = rotation || 0;
}
Enemy.prototype = {
    constructor: Enemy
};
