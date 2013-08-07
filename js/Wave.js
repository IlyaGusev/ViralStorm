"use strict";

function Wave ()
{
    this.gates = []; //Array of pairs  <type, Metronome>
    this.duration = 20000;
    this.time = 0;
    this.finished = false;
}

Wave.prototype.update = function (dt) {
    this.time += dt;
    if (this.time < this.duration) {
        for (var i = 0; i < this.gates.length; ++i) {
            this.gates[i][1].update(dt);
            if (this.gates[i][1].getTick()) {
                var position = Math.floor(Math.random()*4);
                if (this.gates[i][0][0] == 'v')
                    mainscreen.enemies.push(new Virus(position, 0, this.gates[i][0].substr(2)));
                /*if (this.gates[i][0][0] == 'b')
                    mainscreen.enemies.push(new Bacteria(this.gates[i][0].substr(2)));  */
            }
        }
    } else this.finished = true;
}
