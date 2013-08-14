"use strict";

var mainscreen;
(function() {
    var bStart = document.getElementById('start');
    var bAuthors = document.getElementById('authors');
    var bHelp = document.getElementById('help');
    var bAuthorsOK = document.getElementById('authors-OK');
    var bHelpOK = document.getElementById('help-OK');

    function show_authors () {
        document.getElementById ("authors-screen").style.display = 'block';
    }

    function hide_authors() {
        document.getElementById ("authors-screen").style.display = 'none';
    }

    function show_help() {
        document.getElementById ("help-screen").style.display = 'block';
    }

    function hide_help() {
        document.getElementById ("help-screen").style.display = 'none';
    }

    function start_click(){
        resources.load("img/virus1.png");
        resources.load("img/virus2.png");
        resources.load("img/bacteria1.png");
        resources.load("img/cell.png");
        resources.load("img/bullet1.png");
        resources.onReady(start);
        if (resources.isReady())
            start();
    }

    function start(){
        document.getElementById ("start-screen").style.display = 'none';
        mainscreen = new MainScreen(840, 840);
    }

    addClickEvent(bStart, start_click);
    addClickEvent(bAuthors, show_authors);
    addClickEvent(bHelp, show_help);
    addClickEvent(bHelpOK, hide_help);
    addClickEvent(bAuthorsOK, hide_authors);
})();
