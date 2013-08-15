function Building(type, level)
{
    this.type = type;
    this.level = level;
    this.maxLevel = 3;
    this.estimatePrice();
    this.chooseSprite();
}

Building.prototype.level_up = function(){
    if (this.level<this.maxLevel){
        this.level++;
        this.estimatePrice();
        this.chooseSprite();
        return true;
    }
    else return false;
};

Building.prototype.chooseSprite = function(){
    switch (this.type+this.level) {
        case "r1":
            this.sprite = new Sprite ('img/cell.png', [120, 0], [120, 120]);
            break;
        case "r2":
            this.sprite = new Sprite ('img/cell.png', [240, 0], [120, 120]);
            break;
        case "r3":
            this.sprite = new Sprite ('img/cell.png', [360, 0], [120, 120]);
            break;
        case "m1":
            this.sprite = new Sprite ('img/cell.png', [480, 0], [120, 120]);
            break;
        case "m2":
            this.sprite = new Sprite ('img/cell.png', [600, 0], [120, 120]);
            break;
        case "m3":
            this.sprite = new Sprite ('img/cell.png', [720, 0], [120, 120]);
            break;
        case "g1":
            this.sprite = new Sprite ('img/cell.png', [840, 0], [120, 120]);
            break;
        case "g2":
            this.sprite = new Sprite ('img/cell.png', [960, 0], [120, 120]);
            break;
        case "g3":
            this.sprite = new Sprite ('img/cell.png', [1080, 0], [120, 120]);
            break;
        case "b1":
            this.sprite = new Sprite ('img/cell.png', [1200, 0], [120, 120]);
            break;
        case "b2":
            this.sprite = new Sprite ('img/cell.png', [1320, 0], [120, 120]);
            break;
        case "b3":
            this.sprite = new Sprite ('img/cell.png', [1440, 0], [120, 120]);
            break;
        default:
            this.sprite = null;
    }
};

Building.prototype.estimatePrice = function(){
    switch (this.type+this.level) {
        case "r0":
            this.price = 500;
            break;
        case "r1":
            this.price = 1000;
            break;
        case "r2":
            this.price = 1500;
            break;
        case "m0":
            this.price = 500;
            break;
        case "m1":
            this.price = 1000;
            break;
        case "m2":
            this.price = 1500;
            break;
        case "g0":
            this.price = 500;
            break;
        case "g1":
            this.price = 1000;
            break;
        case "g2":
            this.price = 1500;
            break;
        case "b0":
            this.price = 500;
            break;
        case "b1":
            this.price = 1000;
            break;
        case "b2":
            this.price = 1500;
            break;
    }
};