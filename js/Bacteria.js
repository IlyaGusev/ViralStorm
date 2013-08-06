"use strict"

function Bacteria(x, y, rotation, type){
    Bacteria.superclass.constructor.call(this, x, y, rotation);
    this.type = type ||0;
    this.inBattle = true;
    this.spriteInMove=new Sprite('img/bacteria1.png', [0,0], [26,40], 15, [0, 1, 2, 3, 4, 3, 2, 1]);
    this.spriteInBattle = new Sprite('img/bacteria1.png', [0,0], [26,40], 5, [5, 6, 7, 6]);
}
inherit(Bacteria, Enemy);

Bacteria.prototype = {
    draw : function(ctx, dt){
        if (this.inBattle){
            this.spriteInBattle.update(dt);
            this.spriteInBattle.render(ctx, this.pos, this.rotation);
        }
        else{
            this.spriteInMove.update(dt);
            this.spriteInMove.render(ctx, this.pos, this.rotation);
        }
    }
};