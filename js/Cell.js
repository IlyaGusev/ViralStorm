"use strict";

function Cell(x, y, width, height){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.hp;
    this.maxHp;
    this.armor;
    this.maxArmor;
    this.buildings = [];
    this.sprite = new Sprite('img/cell/cell_base.png', [0, 0], [100,100]);
    this.buildings.push(new Sprite('img/cell/border3.png', [0, 0], [100,100]));
    this.buildings.push(new Sprite('img/cell/goldji3.png', [0, 0], [100,100]));
    this.buildings.push(new Sprite('img/cell/mitohondria3.png', [0, 0], [100,100]));
    this.buildings.push(new Sprite('img/cell/ribosome3.png', [0, 0], [100,100]));
}
Cell.prototype = {
    draw : function(ctx){
        this.sprite.render(ctx, [this.x, this.y]);
        for (var i=0; i<4; i++)  {
            this.buildings[i].render(ctx, [this.x, this.y]);
        }
    }
};