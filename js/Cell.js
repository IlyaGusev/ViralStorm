"use strict";

function Cell(x, y){
    this.pos = [x, y];
    this.hp = this.maxHp = 20;
    this.regenHp = 0;
    this.regenArmor = 1;
    this.armor = this.maxArmor = 50;
    this.buildings = [new Building("r", 0), new Building("g", 0), new Building("m", 0), new Building("b", 0)];
    this.sprite = new Sprite('img/cell.png', [0, 0], [120,120]);
}
Cell.prototype = {
    draw : function(ctx){
        this.sprite.render(ctx, this.pos);
        for (var i= 0, il=this.buildings.length; i<il; i++)  {
            if (this.buildings[i].sprite!=null)
                this.buildings[i].sprite.render(ctx, this.pos);
        }
    }
};

