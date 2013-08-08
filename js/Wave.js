"use strict";

function Wave (){
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
                var rot = Math.floor(Math.random()*4) % 4;
                var pos;
                switch (rot) {
                    case 0: pos = [420, 0]; break;
                    case 1: pos = [840, 420]; break;
                    case 2: pos = [420, 840]; break;
                    case 3: pos = [0, 420]; break;
                }
                if (this.gates[i][0][0] == 'v')
                    mainscreen.enemies.push(new Virus(pos[0], pos[1], rot*90, this.gates[i][0].substr(2)));
                /*if (this.gates[i][0][0] == 'b')
                 mainscreen.enemies.push(new Bacteria(pos[0], pos[1], rot*90, this.gates[i][0].substr(2)));  */
                var enemy = mainscreen.enemies[mainscreen.enemies.length - 1];
                switch (rot) {
                    case 0: enemy.pos[1] -= 0.5*enemy.sprite.size[1]; break;
                    case 1: enemy.pos[0] += 0.5*enemy.sprite.size[1]; break;
                    case 2: enemy.pos[1] += 0.5*enemy.sprite.size[1]; break;
                    case 3: enemy.pos[0] -= 0.5*enemy.sprite.size[1]; break;
                }
            }
        }
    } else this.finished = true;
}
