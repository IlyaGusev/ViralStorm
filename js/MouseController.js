//From https://github.com/vladkens/Planets
"use strict";

function MouseController(element) {
    this.element = null;
    this.pos     = [0,0];
    this.pressed = false;
    this.sprite = new Sprite('img/cursor.png', [0,0], [26,26], 1, [0]);
    this.spriteShot = new Sprite('img/cursor.png', [0,0], [26,26], 20, [0, 1, 2, 1], 'horizontal', true);
    this.shot = false;

    if (typeof element !== 'undefined') {
        this.watch(element);
    }
};

MouseController.prototype = {
    watch: function(element) {
        var self = this;
        this.element = element;
        this.element.addEventListener('mousemove', function(e) {
            self.move(e);
        }, true);
        this.element.addEventListener('mousedown', function(e) {
            self.down(e);
        }, true);
        this.element.addEventListener('mouseup', function(e) {
            self.up(e);
        }, true);
    },
    move: function(e) {
        this.pos = [e.offsetX || e.layerX, e.offsetY || e.layerY];
    },
    down: function(e) {
        this.move(e);
        this.pressed = true;
    },
    up: function(e) {
        this.move(e);
        this.pressed = false;
    },
    draw: function(ctx, dt){
        if (this.pressed){
            this.shot = true;
            this.pressed = false;
        }
        if (this.shot){
            this.spriteShot.update(dt);
            this.spriteShot.render(ctx, this.pos);
            if (this.spriteShot.done){
                this.shot=false;
                this.spriteShot.reset();
            }
        }
        else{
            this.sprite.update(dt);
            this.sprite.render(ctx, this.pos);
        }
    }
};