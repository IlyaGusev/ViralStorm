"use strict";

function Metronome (period, delay) {
    this.period = period;
    this.time = 0;
    this.delay = delay || 0;
    this.tick = false;
    this.start = false;
}

Metronome.prototype.update = function (dt) {
    this.time += dt;
    if (!this.start && (this.time >= this.delay))
    {
        this.start = true;
        this.tick = true;
        this.time -= this.delay;
    }
    if (this.start && (this.time >= this.period)) {
        this.time -= this.period;
        this.tick = true;
    }
};

Metronome.prototype.getTick = function ()
{
    var b = this.tick;
    this.tick = false;
    return b;
}