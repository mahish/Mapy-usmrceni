var overlay;
okresy.prototype = new google.maps.OverlayView();

function initialize() {

    //to be replaced with reference to json file
    var mapyData = [{
        "cislo_osoby": 275,
        "vek_h": "21",
        "statni_prislusnost": "neurčeno",
        "gps_bydliste": "49.265214,14.923915",
        "gps_incidentu": "50.00476,12.48303",
        "smer_prechodu": "neurčeno",
        "umrti": "příčinou úmrtí byla střelba usmrcené osoby případně jejího",
        "obdobi_incidentu": "1948 - 1950",
        "rok": 1949
    }];

    var mapOptions = {
        center: {
            lat: 49.921552,
            lng: 12.637676
        },
        zoom: 7
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var swBound = new google.maps.LatLng(48.5, 12.08);
    var neBound = new google.maps.LatLng(51.11, 18.874);
    var bounds = new google.maps.LatLngBounds(swBound, neBound);

    // The photograph is courtesy of the U.S. Geological Survey.
    var srcImage = 'data/data_mapy/';
    srcImage += 'mercator.svg';

    // The custom okresy object contains the USGS image,
    // the bounds of the image, and a reference to the map.
    overlay = new okresy(bounds, srcImage, map);

    $.each(mapyData, function(key, data) {
        var myLat = data.gps_incidentu.split(",")[0];
        var myLng = data.gps_incidentu.split(",")[1];

        var latLng = new google.maps.LatLng(myLat, myLng);
        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
            position: latLng,
            title: data.cislo_osoby.toString()
        });
        marker.setMap(map);
    });

}


/** @constructor */
function okresy(bounds, image, map) {

    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
okresy.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
};

okresy.prototype.draw = function() {

    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
okresy.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};

google.maps.event.addDomListener(window, 'load', initialize);