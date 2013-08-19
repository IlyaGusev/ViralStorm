function Weapon(name, dmg, unlocked, delay, range){
    this.name = name;
    this.damage = dmg;
    this.unlocked = unlocked || true;
    this.delay = delay || 0;
    this.range = range || 0;

    this.shot = false;

    this.sprite = null;
    this.spriteShot = null;
    this.chooseSprite();
}

Weapon.prototype = {
    chooseSprite: function(){
        switch (this.name){
            case "standard":
                this.sprite = new Sprite('img/cursor.png', [0,0], [26,26], 1, [0]);
                this.spriteShot = new Sprite('img/cursor.png', [0,0], [26,26], 20, [0, 1, 2, 1], 'horizontal', true);
                break;
            case "explosion":
                break;
            case "bullets":
                break;
            default:
                break;
        }
    },

    draw: function(ctx, dt, mouse){
        switch (this.name){
            case "standard":
                this.sprite.update(dt);
                this.sprite.render(ctx, mouse.pos);
                break;
            case "explosion":
                ctx.beginPath();
                ctx.arc(mouse.pos[0], mouse.pos[1], this.range, 0, 2*Math.PI);
                ctx.closePath();
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(mouse.pos[0], mouse.pos[1], (this.reload/this.delay)*this.range, 0, 2*Math.PI);
                ctx.closePath();
                ctx.fill();
                break;
            case "bullets":
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.moveTo(mouse.pos[0]-5, mouse.pos[1]);
                ctx.lineTo(mouse.pos[0]+5, mouse.pos[1]);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.moveTo(mouse.pos[0], mouse.pos[1]-5);
                ctx.lineTo(mouse.pos[0], mouse.pos[1]+5);
                ctx.closePath();
                ctx.stroke();
                break;
            default:
                break;
        }
    },

    update: function(dt, mouse){
        switch (this.name){
            case "standard":
                if (mouse.pressed){
                    for (var i= 0, il=mainscreen.enemies.length; i<il; i++){
                        var enemy = mainscreen.enemies[i];
                        if (testPointInRect(mouse.pos, enemy.pos, enemy.sprite.size, enemy.rotation)){
                            mainscreen.enemies[i].hp -=this.damage;
                        }
                    }
                    mouse.pressed = false;
                }
                break;
            case "explosion":
                if (this.reload<this.delay)
                    this.reload+=dt;
                else
                    this.reload = this.delay;
                if (mouse.pressed && this.reload == this.delay){
                    for (var i= 0, il=mainscreen.enemies.length; i<il; i++){
                        var enemy = mainscreen.enemies[i];
                        if (testRectAndCircleIntersection(enemy.pos, enemy.sprite.size, enemy.rotation, mouse.pos, this.range) ||
                            testCircleContainsRect(enemy.pos, enemy.sprite.size, enemy.rotation, mouse.pos, this.range)){
                            mainscreen.enemies[i].hp -=this.damage;
                        }
                    }
                    this.reload = 0;
                }
                break;
            case "bullets":
                if (this.reload<this.delay)
                    this.reload+=dt;
                else
                    this.reload = this.delay;
                if (mouse.pressed && this.reload == this.delay){
                    mainscreen.bullets.push (new Bullet (mouse.pos[0], mouse.pos[1], 0, 2, this.damage));
                    mainscreen.bullets.push (new Bullet (mouse.pos[0], mouse.pos[1], 90, 2, this.damage));
                    mainscreen.bullets.push (new Bullet (mouse.pos[0], mouse.pos[1], 180, 2, this.damage));
                    mainscreen.bullets.push (new Bullet (mouse.pos[0], mouse.pos[1], 270, 2, this.damage));
                    this.reload = 0;
                }
            default:
                break;
        }
    }
}
