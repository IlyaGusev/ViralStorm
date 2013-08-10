"use strict";

function Cell(x, y){
    this.pos = [x, y];
    this.hp = this.maxHp = 50;
    this.armor = this.maxArmor = 0;
    this.buildings = [];
    this.buildings.push (new Building("r3"));
    this.sprite = new Sprite('img/cell.png', [0, 0], [120,120]);
}
Cell.prototype = {
    draw : function(ctx){
        this.sprite.render(ctx, this.pos);
        for (var i= 0, il=this.buildings.length; i<il; i++)  {
            this.buildings[i].sprite.render(ctx, this.pos);
        }
    }
};

