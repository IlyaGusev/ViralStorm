"use strict";

function Cell(x, y, width, height){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
}
Cell.prototype = {
    draw : function(ctx){
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};