"use strict";

function GameObject (pos, sprite)
{
    this.position = pos;
    this.sprite = sprite;
}

GameObject.prototype.update = abstractMethod;
GameObject.prototype.render = abstractMethod;
GameObject.prototype.calculateCollide = abstractMethod;
