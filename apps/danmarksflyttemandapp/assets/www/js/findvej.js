function initMaps() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onError Callback receives a PositionError object
function onError(error) {
    navigator.notification.alert('code: '    + error.code    + '\n' +
                                'message: ' + error.message);
}

// onSuccess Geolocation
function onSuccess(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var mapUrl = "http://maps.google.com/maps?";
    mapUrl += "saddr=" + lat + "," + lng + "&";
    mapUrl += "daddr=55.689403,12.521281";

    document.getElementById('mapurl').setAttribute('href', mapUrl);
}
