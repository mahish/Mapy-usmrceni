var map;
var markers = [];
var markerCluster;
var mapsDataJSON;
var activeMarkers = [];

function getDataJSON() {
	return $.getJSON("data/data_json/data.json").then(function(data) {
		return data;
	});
}


// Sets the map on all markers in the array.
function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
	if (typeof(markerCluster) == 'object') {
		markerCluster.clearMarkers();
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setAllMap(null);
	markers = [];
	markerCluster = null;
}

function draw(map, data, filter) {

	clearMarkers();

	$.each(data, function(key, data) {

		var myLat = data.gps_incidentu.split(",")[0];
		var myLng = data.gps_incidentu.split(",")[1];
		var myYear = data.rok;
		// Customize a map marker - define url
		var iconBase = 'img/';

		var latLng = new google.maps.LatLng(myLat, myLng);
		// Creating a marker and putting it on the map
		var marker = new google.maps.Marker({
			position: latLng,
			// Define the icon
			icon: iconBase + 'marker.png',
			title: data.cislo_osoby.toString()
		});

        var activeIcon = {
            url: iconBase + 'active-marker.png',
            // This marker is 25 pixels wide by 25 pixels tall.
            size: new google.maps.Size(25, 25),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0)
            // The anchor for this image is the base of the flagpole at 0,32.
            // 24.8.2015 — our custom marker is ok with automatic center
            // anchor: new google.maps.Point(12, 12)
        };

        var passiveIcon = {
            url: iconBase + 'marker.png',
        };

        google.maps.event.addListener(marker, 'click', function() {
            for (var i = activeMarkers.length - 1; i >= 0; i--) {
                activeMarkers[i].setIcon(passiveIcon);
            };
            document.getElementById('cislo_osoby').innerHTML = data.cislo_osoby.toString();
            document.getElementById('vek_h').innerHTML = data.vek_h.toString();
            document.getElementById('statni_prislusnost').innerHTML = data.statni_prislusnost.toString();
            document.getElementById('gps_bydliste').innerHTML = data.gps_bydliste.toString();
            document.getElementById('gps_incidentu').innerHTML = data.gps_incidentu.toString();
            document.getElementById('smer_prechodu').innerHTML = data.smer_prechodu.toString();
            document.getElementById('umrti').innerHTML = data.umrti.toString();
            document.getElementById('obdobi_incidentu').innerHTML = data.obdobi_incidentu.toString();
            document.getElementById('rok').innerHTML = data.rok.toString();
            this.setIcon(activeIcon);
            activeMarkers.push(this);
        });

		if (filter != null) {
			filter = filter.toString().split(',');
			if (typeof(filter) == 'object' && myYear >= filter[0] && myYear <= filter[1]) {
				//marker.setMap(map);
				markers.push(marker);
			} else if (myYear == filter) {
				//marker.setMap(map);
				markers.push(marker);
			}
		} else {
				//marker.setMap(map);
				markers.push(marker);
			};

		});

var mcOptions = {
	gridSize: 1,
	maxZoom: 30,
	styles: [{
		height: 25,
		url: "img/marker.png",
		width: 25
	}, {
		height: 25,
		url: "img/marker.png",
		width: 25
	}, {
		height: 25,
		url: "img/marker.png",
		width: 25
	}, {
		height: 25,
		url: "img/marker.png",
		width: 25
	}, {
		height: 25,
		url: "img/marker.png",
		width: 25
	}]
};

markerCluster = new MarkerClusterer(map, markers, mcOptions);
	//console.log('Showing data for: ' + filter + '[' + markers.length + ']');

}

function initialize() {

	var mapOptions = {
		center: {
			lat: 49.45,
			lng: 15.30
		},
		zoom: 7
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	if (window.location.protocol != 'file:') {
		getDataJSON().done(function(data) {
			mapsDataJSON = data;
			draw(map, mapsDataJSON, null);
		});
	} else {
		draw(map, mapsDataJSON, null);
	}

}

google.maps.event.addDomListener(window, 'load', initialize);