"use strict"

function Bullet (x, y, rotation, type, damage) {
    this.pos = [x, y];
    this.rotation = rotation || 0;
    this.alive = true;
    this.type= type;
    switch (type) {
        case 1:
            this.damage = damage || 5;
            this.speed = 250;
            this.sprite = new Sprite ('img/bullet1.png', [0,0], [9, 9], 15, [0, 1]);
            break;
        case 2:
            this.damage = damage || 52;
            this.speed = 300;
            this.sprite = new Sprite ('img/bullet1.png', [0,0], [9, 9], 15, [0, 1]);
            break;
        default:
            break;
    }
}

Bullet.prototype = {
    draw: function(ctx, dt){
        this.sprite.update(dt);
        this.sprite.render(ctx, this.pos, this.rotation);
    },

    deal_damage: function(enemy_index){
        switch (this.type) {
            case 1:
                if (mainscreen.cell.armor <= 0){
                    mainscreen.cell.armor = 0;
                    mainscreen.cell.hp -= this.damage;
                }
                else {
                    if (mainscreen.cell.armor<this.damage*1.5){
                        mainscreen.cell.hp -= (this.damage-(mainscreen.cell.armor/1.5));
                        mainscreen.cell.armor = 0;
                    }
                    else
                        mainscreen.cell.armor-=this.damage*1.5;
                }
                break;
            case 2:
                mainscreen.enemies[enemy_index].hp-=this.damage;
                break;
            default:
                break;
        }

    },

    update: function (dt) {
        switch (this.type) {
            case 1:
                var cp = mainscreen.cell.pos;
                if (Math.sqrt((this.pos[0]-cp[0])*(this.pos[0]-cp[0])+(this.pos[1]-cp[1])*(this.pos[1]-cp[1]))<=
                    mainscreen.cell.sprite.size[0]/2+this.sprite.size[1]/2) {
                    this.deal_damage(null);
                    this.alive = false;
                } else {
                    this.pos[0] += -this.speed*Math.sin((this.rotation).degree())*(dt/1000);
                    this.pos[1] += this.speed*Math.cos((this.rotation).degree())*(dt/1000);
                }
                break;
            case 2:
                if (this.pos[0]<0 || this.pos[0]>mainscreen.width || this.pos[1]<0 || this.pos[1]>mainscreen.height){
                    this.alive = false;
                    break;
                }
                else{
                    this.pos[0] += -this.speed*Math.sin((this.rotation).degree())*(dt/1000);
                    this.pos[1] += this.speed*Math.cos((this.rotation).degree())*(dt/1000);
                }
                for (var i= 0, il=mainscreen.enemies.length; i<il; i++){
                    var enemy = mainscreen.enemies[i];
                    if (testRectAndCircleIntersection(enemy.pos, enemy.sprite.size, enemy.rotation, this.pos, this.sprite.size[0]/2))
                    {
                        this.deal_damage(i);
                        this.alive = false;
                        break;
                    }
                }
                break;
            default:
                break;
        }
    }
}