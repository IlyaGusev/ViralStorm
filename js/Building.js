Building = function (type)
{
    this.type = type;
    switch (type) {
        case "r1":
            this.sprite = new Sprite ('img/cell.png', [120, 0], [120, 120]);
            break;
        case "r2":
            this.sprite = new Sprite ('img/cell.png', [240, 0], [120, 120]);
            break;
        case "r3":
            this.sprite = new Sprite ('img/cell.png', [360, 0], [120, 120]);
            break;
        //etc.
    }
}