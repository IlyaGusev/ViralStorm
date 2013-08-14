"use strict";

var shopscreen = document.getElementById ('shop');
function show_shop () {
    shopscreen.style.display = "block";
    document.getElementById("status").innerHTML = "<p>Score: "+mainscreen.score+"</p>";
    mainscreen.clear();
}

(function() {
    var bNextwave = document.getElementById ('next-wave');
    var bRibosome = document.getElementById ('bRibosome');
    var bGoldji = document.getElementById ('bGoldji');
    var bMitohondria = document.getElementById ('bMitohondria');
    var bBorder = document.getElementById ('bBorder');

    function close_shop () {
        shopscreen.style.display = "none";
        mainscreen.wave_num++;
        mainscreen.new_wave ();
    }

    function buy_connect(){
        var bBuy = document.getElementById ('buy');
        addClickEvent(bBuy, buy);
    }

    function set_description(title, body){
        document.getElementById("description").innerHTML = "<h3>"+title+"</h3>"+
            "<p>"+body+"</p>"+
            "<button id = 'buy'>Buy</button>"
    }

    function get_level(type){
        for (var i= 0, il= mainscreen.cell.buildings.length; i<il; i++){
            if (mainscreen.cell.buildings[i].type==type){
                if (mainscreen.cell.buildings[i].level==mainscreen.cell.buildings[i].maxLevel)
                    return "MAX";
                else
                    return mainscreen.cell.buildings[i].level;
            }
        }
        return 0;
    }

    function get_price(type){
        for (var i= 0, il= mainscreen.cell.buildings.length; i<il; i++){
            if (mainscreen.cell.buildings[i].type==type){
                    return mainscreen.cell.buildings[i].price;
            }
        }
        return 0;
    }

    var current_button;
    function ribosome_description(){
        set_description("Ribosome",
            "Increase HP regeneration by 1 per second<br>Current level: "+get_level("r")+"<br>Price: "+get_price("r")
        );
        buy_connect();
        current_button='1';
    }

    function goldji_description(){
        set_description("Goldji",
            "Increase Armor regeneration by 1 per second<br>Current level: "+get_level("g")+"<br>Price: "+get_price("g")
        );
        buy_connect();
        current_button='2';
    }

    function mitohondria_description(){
        set_description("Mitohondria",
            "Increase max HP by 20<br>Current level: "+get_level("m")+"<br>Price: "+get_price("m")
        );
        buy_connect();
        current_button='3';
    }

   function border_description(){
        set_description("Border",
            "Increase max Armor by 20<br>Current level: "+get_level("b")+"<br>Price: "+get_price("b")
        );
        buy_connect();
        current_button='4';
    }

    addClickEvent(bRibosome, ribosome_description);
    addClickEvent(bGoldji, goldji_description);
    addClickEvent(bMitohondria, mitohondria_description);
    addClickEvent(bBorder, border_description);
    addClickEvent(bNextwave, close_shop);

    function buy_building(type, property, amount){
        for (var i= 0, il= mainscreen.cell.buildings.length; i<il; i++)
            if (mainscreen.cell.buildings[i].type==type) {
                var price = mainscreen.cell.buildings[i].price;
                if (mainscreen.score>=price)
                if (mainscreen.cell.buildings[i].level_up()){
                    mainscreen.score-=price;
                    mainscreen.cell[property]+=amount;
                    return true;
                }
                else return false;
            }
        return false;
    }

    function update_status(){
        document.getElementById("status").innerHTML = "<p>Score: "+mainscreen.score+"</p>";
    }

    function buy(){
        switch (current_button){
            case '1':
                buy_building("r", "regenHp", 1);
                update_status();
                ribosome_description();
                break;
            case '2':
                buy_building("g", "regenArmor", 1);
                update_status();
                goldji_description();
                break;
            case '3':
                buy_building("m", "maxHp", 20);
                update_status();
                mitohondria_description();
                break;
            case '4':
                buy_building("b", "maxArmor", 20);
                update_status();
                border_description();
                break;
        }
    }
})();
