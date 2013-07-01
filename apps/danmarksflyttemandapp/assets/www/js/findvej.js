var userPosition = null,
    directionsDisplay,
    directionsService,
    map,
    officeLocation = new google.maps.LatLng(55.689403, 12.521281);;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true});


}

function onSuccess(position) {
    userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
}

function onError(error) {
    console.log("code: " + error.code);
    console.log("message: " + error.message);
}

$(document).on("pageinit", "#kontakt", function() {
    $('#map_canvas').css({'height': $(window).height(), 'width': '99%'});
    initializeMaps();
});

function initializeMaps() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    var myOptions = {
        zoom:12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: officeLocation
    }

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);

    var userPosMarker = new google.maps.Marker({
        position: userPosition,
        map: map,
        title: "Din Placering"
    });

    if (userPosition != '') {
        calculateRoute();
    }
    else {
        $("mapresults").hide();
    }
}

function calculateRoute() {

    var request = {
        origin: userPosition,
        destination: officeLocation,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    }

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setPanel(document.getElementById("map_panel"));

            $("#mapresults").show();
        }
        else {
            $("#mapresults").hide();
        }
    });
}
