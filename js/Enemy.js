"use strict";

function Enemy(x, y, rotation, type){
    this.type= type||0;
    this.x=x;
    this.y=y;
    this.rotation = rotation || 0;
    this.sprite=new Sprite('img/virus1.png', [0,0], [26,29], 10, [0,1]);
}
Enemy.prototype = {
    draw : function(ctx, dt){
        this.sprite.update(dt);
        this.sprite.render(ctx, [this.x, this.y], this.rotation);
    }
};