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
    this.sprite = new Image();
    this.sprite.src='img/cell/cell_base.png';
    for (var i=0; i<4; i++)  {
        this.buildings.push(new Image());
    }
    this.buildings[0].src = 'img/cell/border3.png';
    this.buildings[1].src = 'img/cell/goldji3.png';
    this.buildings[2].src = 'img/cell/mitohondria3.png';
    this.buildings[3].src = 'img/cell/ribosome3.png';
}
Cell.prototype = {
    draw : function(ctx){
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        for (var i=0; i<4; i++)  {
            ctx.drawImage(this.buildings[i], this.x, this.y, this.width, this.height);
        }
    }
};