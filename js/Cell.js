"use strict";

function Cell(x, y){
    this.pos = [x, y];
    this.height = height;
    this.width = width;
    this.hp = this.maxHp = 50;
    this.armor = this.maxArmor = 0;
    this.maxHp;
    this.maxArmor;
    this.buildings = [];
    this.sprite = new Sprite('img/cell.png', [0, 0], [102,100]);
    this.buildings.push(new Sprite('img/cell.png', [306, 0], [102,100]));
    this.buildings.push(new Sprite('img/cell.png', [612, 0], [102,100]));
    this.buildings.push(new Sprite('img/cell.png', [918, 0], [102,100]));
    this.buildings.push(new Sprite('img/cell.png', [1224, 0], [102,100]));
}
Cell.prototype = {
    draw : function(ctx){
        this.sprite.render(ctx, pos);
        for (var i=0; i<4; i++)  {
            this.buildings[i].render(ctx, pos);
        }
    }
};

