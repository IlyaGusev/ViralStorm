"use strict";

function GameObject (position, sprite)
{
    this.position = position;
    this.sprite = sprite;
}

GameObject.prototype.update = abstractMethod;
GameObject.prototype.render = abstractMethod;
GameObject.prototype.calculateCollide = abstractMethod;
