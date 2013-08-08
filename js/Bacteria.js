"use strict"

function Bacteria(x, y, rotation, type){
    this.pos = [x, y];
    this.rotation = rotation || 0;
    this.type = type ||0;

    this.alive = true;
    this.inBattle = true;
    this.spriteInMove=new Sprite('img/bacteria1.png', [0,0], [26,40], 15, [0, 1, 2, 3, 4, 3, 2, 1]);
    this.spriteInBattle = new Sprite('img/bacteria1.png', [0,0], [26,40], 5, [5, 6, 7, 6]);
}

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