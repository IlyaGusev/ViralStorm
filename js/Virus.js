"use strict"

function Virus(x, y, rotation, type){
    Virus.superclass.constructor.call(this, x, y, rotation);
    this.type = type ||0;
    this.sprite=new Sprite('img/virus1.png', [0,0], [26,29], 10, [0, 1, 2, 1]);
}
inherit(Virus, Enemy);

Virus.prototype = {
    draw : function(ctx, dt){
        this.sprite.update(dt);
        this.sprite.render(ctx, this.pos, this.rotation);
    }
};