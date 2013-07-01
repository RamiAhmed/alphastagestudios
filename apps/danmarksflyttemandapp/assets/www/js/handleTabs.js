
var tabLinks = new Array();
var pageLinks = new Array();
var contentSections = new Array();

var innerTabs = new Array();
var innerContentSections = new Array();

function initTabs() {
    console.log("initTabs");
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

        if (i == 0) {
            tabLinks[id].parentNode.className = 'active';
        }

        i++;
    }

    for (var id in pageLinks) {
        pageLinks[id].onclick = showTab;
    }

    var i = 0;
    for (var id in contentSections) {
        if (i != 0) {
            contentSections[id].className = 'tabContent hide';
        }

        i++;
    }
}

function showTab() {
    if (this.nodeName == "A") {
        var selectedId = getHash(this.getAttribute('href'));

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

        if (selectedId == "index") {
            document.getElementById('nav_bar').className = 'hide';
        }
        else {
            document.getElementById('nav_bar').className = 'active';
        }

        initInnerTabs(selectedId);

        if (selectedId == "kontakt") {
            reloadGoogleMap();
        }

        return false;
    }
    else {
        return true;
    }
}

function initInnerTabs(selectedId) {
    if (Object.size(innerTabs) > 0) {
        for (var id in innerContentSections) {
            innerContentSections[id].className = 'innerTabContent hide';
            innerTabs[id].parentNode.className = '';
        }

        innerTabs = new Array();
        innerContentSections = new Array();
    }

    var innerTabContainer = document.getElementById(selectedId + '-tabs');
    if (selectedId == "" || innerTabContainer == null) {
        return;
    }

    var innerTabListItems = innerTabContainer.childNodes;
    for (var i = 0; i < innerTabListItems.length; i++) {
        if (innerTabListItems[i].nodeName == "LI") {
            var innerTabLink = getFirstChildWithTagName(innerTabListItems[i], 'A');
            var id = getHash(innerTabLink.getAttribute('href'));
            innerTabs[id] = innerTabLink;
            innerContentSections[id] = document.getElementById(id);
        }
    }

    var i = 0;
    for (var id in innerTabs) {
        innerTabs[id].onclick = showInnerTab;

        if (i == 0) {
            innerTabs[id].parentNode.className = 'selected';
        }

        i++;
    }

    var i = 0;
    for (var id in innerContentSections) {
        if (i != 0) {
            innerContentSections[id].className = 'innerTabContent hide';
        }
        else {
            innerContentSections[id].className = 'innerTabContent';
        }

        i++;
    }
}

function showInnerTab() {
    if (this.nodeName == "A") {
        var selectedId = getHash(this.getAttribute('href'));

        for (var id in innerContentSections) {
            if (id == selectedId) {
                innerTabs[id].parentNode.className = 'selected';
                innerContentSections[id].className = 'innerTabContent';
            }
            else {
                innerTabs[id].parentNode.className = '';
                innerContentSections[id].className = 'innerTabContent hide';
            }
        }

        if (selectedId == "vej") {
            reloadGoogleMap();
        }

        return false;
    }

    return true;
}

function reloadGoogleMap() {
    if (map === null || map === undefined) {
        console.log("map is %s", map);
    }
    else {
        var currCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currCenter);
        map.setZoom(12);
        console.log("reloaded map");
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
