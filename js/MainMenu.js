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

var mainscreen;
var start = function(){
    document.getElementById ("start-screen").style.display = 'none';
    mainscreen = new MainScreen(840, 840);
}

if (bStart.addEventListener)
    bStart.addEventListener ("click", start, false);
else if (bStart.attachEvent)
    bStart.attachEvent ("onclick", start);

if (bStart.addEventListener)
	bStart.addEventListener ("click", start, false);
else if (bStart.attachEvent)
	bStart.attachEvent ("onclick", start);

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


