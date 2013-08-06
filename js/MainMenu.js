"use strict";

var bStart = document.getElementById('start');
var bAuthors = document.getElementById('authors');
var bHelp = document.getElementById('help');
var bAuthorsOK = document.getElementById('authors-OK');
var bHelpOK = document.getElementById('help-OK');

var show_authors = function() {
	document.getElementById ("authors-screen").style.display = 'block';
}

var hide_authors = function() {
	document.getElementById ("authors-screen").style.display = 'none';
}

var show_help = function() {
	document.getElementById ("help-screen").style.display = 'block';
}

var hide_help = function() {
	document.getElementById ("help-screen").style.display = 'none';
}

var hide_menu = function() {
    document.getElementById ("start-screen").style.display = 'none';
}

var mainscreen;
var start_click = function(){
    resources.load("img/virus1.png");
    resources.load("img/bacteria1.png");
    resources.load(["img/cell/cell_base.png",
        "img/cell/goldji1.png",
        "img/cell/goldji2.png",
        "img/cell/goldji3.png",
        "img/cell/mitohondria1.png",
        "img/cell/mitohondria2.png",
        "img/cell/mitohondria3.png",
        "img/cell/ribosome1.png",
        "img/cell/ribosome2.png",
        "img/cell/ribosome3.png",
        "img/cell/border1.png",
        "img/cell/border2.png",
        "img/cell/border3.png"]);
    resources.onReady(start);
}
var start = function(){
    mainscreen = new MainScreen(840, 840);
}

if (bStart.addEventListener)
    bStart.addEventListener ("click", hide_menu, false);
else if (bStart.attachEvent)
    bStart.attachEvent ("onclick", start_click);

if (bStart.addEventListener)
	bStart.addEventListener ("click", start_click, false);
else if (bStart.attachEvent)
	bStart.attachEvent ("onclick", start_click);

if (bAuthors.addEventListener) 
	bAuthors.addEventListener ("click", show_authors, false);
else if (bAuthors.attachEvent)
	bAuthors.attachEvent ("onclick", show_authors);

if (bHelp.addEventListener)
	bHelp.addEventListener ("click", show_help, false);
else if (bHelp.attachEvent)
	bHelp.attachEvent ("onclick", show_help);

if (bHelpOK.addEventListener)
	bHelpOK.addEventListener ("click", hide_help, false);
else if (bHelpOK.attachEvent)
	bHelpOK.attachEvent ("onclick", hide_help);

if (bAuthorsOK.addEventListener)
	bAuthorsOK.addEventListener ("click", hide_authors, false);
else if (bAuthorsOK.attachEvent)
	bAuthorsOK.attachEvent ("onclick", hide_authors);


