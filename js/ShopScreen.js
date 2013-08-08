"use strict";
var shopscreen = document.getElementById ('shop');
var b_nextwave = document.getElementById ('next-wave');

function show_shop () {
    shopscreen.style.display = "block";
    hide_status();
}

function close_shop () {
    shopscreen.style.display = "none";
    show_status();
    mainscreen.wave_num++;
    mainscreen.new_wave ();
}

if (b_nextwave.addEventListener)
    b_nextwave.addEventListener ("click", close_shop, false);
else if (b_nextwave.attachEvent)
    b_nextwave.attachEvent ("onclick", close_shop);