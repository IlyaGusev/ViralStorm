function Weapon(name, dmg, range){
    this.name = name;
    this.range = range;
    this.damage = dmg;
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
            default:
                break;
        }
    },

    draw: function(ctx, dt, mouse){
        switch (this.name){
            case "standard":
                if (mouse.pressed){
                    this.shot = true;
                    mouse.pressed = false;
                }
                if (this.shot){
                    this.shot=false;
                }
                
                this.sprite.update(dt);
                this.sprite.render(ctx, mouse.pos);
                break;
            default:
                break;
        }
    },

    update: function(mouse){
        switch (this.name){
            case "standard":
                if (mouse.pressed){
                    for (var i= 0, il=mainscreen.enemies.length; i<il; i++)
                        if (testPointInRect(mouse.pos, mainscreen.enemies[i].pos,
                                                       mainscreen.enemies[i].sprite.size,
                                                       mainscreen.enemies[i].rotation))
                        {
                            mainscreen.enemies[i].hp -=this.damage;
                        }
                }
                break;
            default:
                break;
        }
    }
}
