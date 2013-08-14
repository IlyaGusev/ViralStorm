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
                var rot = Math.floor(Math.random()*36) % 36;
                var pos = [0, 0];
                if (rot>=5 && rot<=13)
                    pos=[840, Math.floor(420-420*Math.tan((90-rot*10).degree()))];
                if (rot>=14 && rot<=22)
                    pos=[Math.floor(420+420*Math.tan((180-rot*10).degree())),840];
                if (rot>=23 && rot<=31)
                    pos=[0, Math.floor(420+420*Math.tan((270-rot*10).degree()))];
                if (rot>=32)
                    pos=[Math.floor(420-420*Math.tan((360-rot*10).degree())), 0];
                if (rot<=4)
                    pos=[Math.floor(420+420*Math.tan((rot*10).degree())), 0];

                var enemy;
                if (this.gates[i][0][0] == 'v')
                    enemy = new Virus(pos[0], pos[1], rot*10, this.gates[i][0].substr(2));
                if (this.gates[i][0][0] == 'b')
                    enemy = new Bacteria(pos[0], pos[1], rot*10, this.gates[i][0].substr(2));
                mainscreen.enemies.push(enemy);
            }
        }
    } else this.finished = true;
};
