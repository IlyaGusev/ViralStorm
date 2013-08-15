//From http://habrahabr.ru/post/184666/
"use strict";

function Sprite(url, pos, size, speed, frames, dir, once) {
    this.url = url;
    this.pos = pos;
    this.size = size;
    this.speed = speed || 0;
    this.frames = frames || 0;
    this.dir = dir || 'horizontal';
    this.once = once || false;
    this.done = false;

    this._index = 0;
}

Sprite.prototype = {
    update: function(dt) {
        this._index += this.speed*dt/1000;
    },

    render: function(ctx, pos, rotation) {
        if (pos===undefined)
            pos=[0,0];
        if (rotation===undefined)
            rotation=0;

        var frame;
        if(this.speed > 0) {
            var max = this.frames.length;
            var idx = Math.floor(this._index);
            frame = this.frames[idx % max];

            if(this.once && idx >= max) {
                this.done = true;
                return;
            }
        }
        else {
            frame = 0;
        }

        var x = this.pos[0];
        var y = this.pos[1];

        if(this.dir == 'vertical')
            y += frame * this.size[1];
        else
            x += frame * this.size[0];

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(rotation.degree());
        ctx.drawImage(resources.get(this.url),
            x, y,
            this.size[0], this.size[1],
            -this.size[0]/2, -this.size[1]/2,
            this.size[0], this.size[1]);
        ctx.restore();
    },

    reset: function(){
        this.done=false;
        this._index=0;
    }
}