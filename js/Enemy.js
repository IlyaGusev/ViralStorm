function Enemy(x, y, width, height, orientation){
    this.orientation = orientation;
    this.height = height;
    this.width = width;
    this.x=x;
    this.y=y;

}
Enemy.prototype = {
    draw : function(ctx){
        ctx.fillStyle = "black";
        if (this.orientation == 0)
            ctx.fillRect(this.x, this.y, this.height, this.width);
        if (this.orientation == 1)
            ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.orientation == 2)
            ctx.fillRect(this.x, this.y, this.height, this.width);
        if (this.orientation == 3)
            ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    render: function(ctx){
        ctx.fillStyle = "black";
        if (this.orientation == 0){
            this.y+=3;
            ctx.fillRect(this.x, this.y, this.height, this.width);
        }
        if (this.orientation == 1){
            this.x-=3;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.orientation == 2){
            this.y-=3;
            ctx.fillRect(this.x, this.y, this.height, this.width);
        }
        if (this.orientation == 3){
            this.x+=3;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
};