var map,
    userPosition,
    officeLocation,
    directionsDisplay,
    directionsService,
    mapPage = '#kontakt';

$(document).on('pageinit', function() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    navigator.notification.alert("device is ready");
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true});
}

function onSuccess(position) {
    userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //navigator.notification.alert("Found user position");

    $('#map_canvas').css({'height': $(window).height()/2, 'width': '99%'});
    initializeMaps();
}

function onError(error) {
    navigator.notification.alert("code: " + error.code);
    navigator.notification.alert("message: " + error.message);
}
/*
$(mapPage).live("pageinit", function() {
    $('#map_canvas').css({'height': $(window).height()/2, 'width': '99%'});
    initializeMaps();
});
*/
function initializeMaps() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

    officeLocation = new google.maps.LatLng(55.689403, 12.521281);

    var myOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: officeLocation
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
    directionsDisplay.setMap(map);

    if (userPosition != '') {
        var userPosMarker = new google.maps.Marker({
            position: userPosition,
            map: map,
            title: "Din Placering"
        });

        calculateRoute();
    }
    else {
        navigator.notification.alert("userPosition is null");
        $("mapresults").hide();
    }
}

function calculateRoute() {
    //navigator.notification.alert("calculateRoute");
    var request = {
        origin: userPosition,
        destination: officeLocation,
        travelMode: google.maps.DirectionsTravelMode["DRIVING"]
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setPanel(document.getElementById("map_panel"));
            directionsDisplay.setDirections(response);

            navigator.notification.alert("Show directions");
            $("#mapresults").show();
        }
        else {
            navigator.notification.alert("Got status NOT OK from google");
            $("#mapresults").hide();
        }
    });
}

$(mapPage).live("pageshow", function() {
    reloadGoogleMap();
});

function reloadGoogleMap() {
    if (map === null || map === undefined) {
        navigator.notification.alert("map is ", map);
    }
    else {
        var currCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currCenter);
        map.setZoom(12);
        //navigator.notification.alert("reloaded map");
    }
}
