
var tabLinks = new Array();
var pageLinks = new Array();
var contentSections = new Array();

var bShowNavBar = false;

function initTabs() {
    //navigator.notification.alert("initTabs");
    var tabListItems = document.getElementById('tabs').childNodes;
    for (var i = 0; i < tabListItems.length; i++) {
        if (tabListItems[i].nodeName == "LI") {
            var tabLink = getFirstChildWithTagName(tabListItems[i], 'A');
            var id = getHash(tabLink.getAttribute('href'));
            tabLinks[id] = tabLink;
            contentSections[id] = document.getElementById(id);
        }
    }

    var pageLinkItems = document.getElementsByClassName('tablink');
    for (var j = 0; j < pageLinkItems.length; j++) {
        if (pageLinkItems[j].nodeName == "A") {
            var pageLink = pageLinkItems[j];
            var id = getHash(pageLink.getAttribute('href'));
            pageLinks[id] = pageLink;
        }
    }

    var i = 0;
    for (var id in tabLinks) {
        tabLinks[id].onclick = showTab;
/*
        if (i == 0) {
            tabLinks[id].parentNode.className = 'active';
        }
*/
        i++;
    }

    for (var id in pageLinks) {
        pageLinks[id].onclick = showTab;
    }

    var i = 0;
    for (var id in contentSections) {
        if (id != "index") {
            contentSections[id].className = 'tabContent hide';
        }

        i++;
    }
}

function showTab() {
    if (this.nodeName == "A") {
        var selectedId = getHash(this.getAttribute('href'));

        if (!bShowNavBar) {
            document.getElementById('nav_bar').className = '';
            document.getElementById('index').className = 'tabContent hide';
            bShowNavBar = true;
        }

        document.getElementById('nav-title').innerHTML = this.innerHTML;

        for (var id in contentSections) {
            if (id == selectedId) {
                tabLinks[id].parentNode.className = 'active';
                contentSections[id].className = 'tabContent';
            }
            else {
                tabLinks[id].parentNode.className = '';
                contentSections[id].className = 'tabContent hide';
            }
        }

        return false;
    }
    else {
        return true;
    }
}

function getFirstChildWithTagName(element, tagName) {
    for (var i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].nodeName == tagName)
            return element.childNodes[i];
    }
}

function getHash(url) {
    var hashPos = url.lastIndexOf('#');
    return url.substring(hashPos + 1);
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }

    return size;
};
