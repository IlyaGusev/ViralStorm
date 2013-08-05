"use strict";

function Enemy(x, y, width, height){
    this.height = height;
    this.width = width;
    this.x=x;
    this.y=y;
    this.sprite1 = new Image();
    this.sprite2 = new Image();
    this.sprite1.src='img/virus1/virus1_1.png';
    this.sprite2.src='img/virus1/virus1_2.png';
    this.timer = 0;
    this.currentSprite = this.sprite1;
}
Enemy.prototype = {
    draw : function(ctx){
        if (this.timer>10){
            if (this.currentSprite==this.sprite1){
                this.currentSprite = this.sprite2;
            }
            else{
                this.currentSprite = this.sprite1;
            }
            this.timer=0;
        }
        else{
            this.timer++;
        }
        ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
    }
};