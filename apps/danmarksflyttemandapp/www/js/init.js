/* Script written by Rami@alphastagestudios.com
    All Copyrights preserved.
*/

// include touch on desktop browsers only
if (!((window.DocumentTouch && document instanceof DocumentTouch) || 'ontouchstart' in window)) {
  var script = document.createElement("script");
  script.src = "plugins/af.desktopBrowsers.js";
  var tag = $("head").append(script);
  $.os.android = true; //let's make it run like an android device
  $.os.desktop = true;
}


$.ui.autoLaunch = false; //By default, it is set to true and you're app will run right away.  We set it to false to show a splashscreen

function openPDF() {
    var url = 'http://www.danmarksflyttemand.dk/forsikring/documents/Danmarksflyttemandvilk%C3%A5rogbetingelser.pdf',
        googleUrl = 'http://docs.google.com/viewer?url=';
    window.open(
        googleUrl + url,
        '_blank',
        'location=no');
};

$().ready(function() {
    $.ui.useOSThemes=false;
    $.ui.blockPageScroll();
    $.ui.showBackbutton=false;
    $.ui.openLinksNewTab = false;

    window.setTimeout(function () {
        $.ui.launch();
    }, 1500);//We wait 1.5 seconds to call $.ui.launch after content loaded fires
});

function loadPage(page, insertIntoId) {
    var req = new XMLHttpRequest();
    req.open("GET", page, false);
    req.send(null);
    var page = req.responseText;
    $(insertIntoId).html(page);
};

function initIndexPage() {
    $.ui.toggleHeaderMenu(false);
    $.ui.toggleNavMenu(false);

    $('#index').one('unloadpanel', function() {
        $.ui.toggleHeaderMenu(true);
        $.ui.toggleNavMenu(true);
    });
};

var fireOnce = false;

//This function will get executed when $.ui.launch has completed
$.ui.ready(function () {
    if (!fireOnce) {
        new FastClick(document.body);

        loadPage('tilbudform.html', '#indhenttilbud');
        loadPage('kontaktform.html', '#kontaktform');
        loadPage('prisliste.html', '#kasseprisliste');

        $('#betingelserlink').bind('click', function(evt) {
            evt.preventDefault();
            openPDF();
        });

        initIndexPage();
        initGeolocation();
        initMaps();
        initFormHandler();

        fireOnce = true;
    }
    else {
        delete fireOnce;
    }
});

/* This code is used for native apps */
var onDeviceReady = function () {
    window.setTimeout(function () {
        $.ui.launch();
    }, 1500);//We wait 1.5 seconds to call $.ui.launch after PhoneGap reports deviceready
};
document.addEventListener("deviceready", onDeviceReady, false);
