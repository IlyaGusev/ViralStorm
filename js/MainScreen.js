"use strict";
function MainScreen(width, height){
    this.width = width;
    this.height = height;
    this.ctx;
    this.cell;
    this.enemies = [];

    this.wait();
}
MainScreen.prototype = {
    wait : function(){
        var self = this;
        window.onload = function() {
            self.init();
        };
    },
    init : function(){
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.height = this.height;
        canvas.width = this.width;
        this.ctx = canvas.getContext('2d');

        this.cell = new Cell(this.width/2-55, this.height/2-75, 110, 150);
        this.cell.draw(this.ctx);

        this.render();
        this.lastTime = new Date();
        this.lastOrientation = 4;
    },
    render : function(){
        var self = this;
        requestAnimationFrame(function(){
            self.render();
        });
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.cell.draw(this.ctx);
        for (var i = 0; i < this.enemies.length; ++i) {
            if (!(this.enemies[i].x+40>this.cell.x && this.enemies[i].x<this.cell.x+110 &&
                this.enemies[i].y+40>this.cell.y && this.enemies[i].y<this.cell.y+150))
                this.enemies[i].render(this.ctx);
            else{
                this.enemies.splice(i, 1);
                --i;
            }
        }

        var curTime = new Date();
        if ((curTime - this.lastTime) > 300){
            var n = Math.floor(Math.random()*4);
            while(n == this.lastOrientation)
                n = Math.floor(Math.random()*4);
            this.lastOrientation=n;
            var positions = [{x:this.width/2-5, y:0}, {x:this.width-40, y:this.height/2-5}];
                positions.push({x:this.width/2-5, y:this.height-40});
                positions.push({x:0, y:this.height/2-5});
            var enemy = new Enemy(positions[n].x, positions[n].y, 40, 10, n);
            enemy.draw(this.ctx);
            this.enemies.push(enemy);
            this.lastTime = new Date();
        }
    }
};


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