
var tabLinks = new Array();
var contentSections = new Array();

function initTabs() {
    var tabListItems = document.getElementById('tabs').childNodes;
    for (var i = 0; i < tabListItems.length; i++) {
        if (tabListItems[i].nodeName == "LI") {
            var tabLink = getFirstChildWithTagName(tabListItems[i], 'A');
            var id = getHash(tabLink.getAttribute('href'));
            tabLinks[id] = tabLink;
            contentSections[id] = document.getElementById(id);
        }
    }

    var i = 0;
    for (var id in tabLinks) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() {
            this.blur();
        };

        if (i == 0) {
            tabLinks[id].parentNode.className = 'active';
        }

        i++;
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
