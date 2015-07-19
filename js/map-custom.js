var map;
var markers = [];
var markerCluster;
var mapsDataJSON;

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
			url: "img/marker2.png",
			width: 25
		}, {
			height: 25,
			url: "img/marker3.png",
			width: 25
		}, {
			height: 25,
			url: "img/marker4.png",
			width: 25
		}, {
			height: 25,
			url: "img/marker5.png",
			width: 25
		}, {
			height: 25,
			url: "img/marker6.png",
			width: 25
		}]
	};
	//markerCluster = new MarkerClusterer(map, markers, mcOptions);
	console.log('Showing data for: ' + filter + '[' + markers.length + ']');
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
	// Usage:
	getDataJSON().done(function(data) {
		mapsDataJSON = data;
		draw(map, mapsDataJSON, null);
	});


}



google.maps.event.addDomListener(window, 'load', initialize);