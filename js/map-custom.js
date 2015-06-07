function initialize() {
    var mapMarker1 = new google.maps.LatLng(48.765675, 14.967340)
    var mapMarker2 = new google.maps.LatLng(48.780628, 16.610140)
    var mapOptions = {
        center: {
            lat: 49.921552,
            lng: 12.637676
        },
        zoom: 7
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var marker1 = new google.maps.Marker({
        position: mapMarker1,
        map: map,
        title: 'Hello World!'
    });    
    var marker2 = new google.maps.Marker({
        position: mapMarker2,
        map: map,
        title: 'Hello World!'
    });
}
google.maps.event.addDomListener(window, 'load', initialize);