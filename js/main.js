$(document).ready(function() {

	// Filter age
	window.sliderAge = document.getElementById('filter-age');

	noUiSlider.create(sliderAge, {
		start: [ 5, 90 ],
		step: 1,
		// snap: true,
		// margin: 20,
		connect: true,
		// direction: 'rtl',
		// orientation: 'horizontal',
		// behaviour: 'tap-drag',
		range: {
			'min': 5,
			'max': 90
		},
		format: {
			to: function(value) {
				return value.toString().replace('.00', '');
			},
			from: function(value) {
				return value.toString().replace('.00', '');
			}
		}
	});

	sliderAge.noUiSlider.on('change', function() {
		filterInput['ageFrom'] = sliderAge.noUiSlider.get()[0];
		filterInput['ageTo'] = sliderAge.noUiSlider.get()[1];
		draw(map, mapsDataJSON, filterInput, oms);
	})

	sliderAge.noUiSlider.on('update', function() {
		filterInput['ageFrom'] = sliderAge.noUiSlider.get()[0];
		filterInput['ageTo'] = sliderAge.noUiSlider.get()[1];
		document.getElementById('age-min').innerHTML = document.getElementById('age-min').innerHTML.replace(/\d{1,}/, filterInput['ageFrom']);
		document.getElementById('age-max').innerHTML = document.getElementById('age-max').innerHTML.replace(/\d{1,}/, filterInput['ageTo']);
	})

	// Other filters
	$('#filters select').on('change', function() {
		var filterName = $(this).attr('id');
		filterInput[filterName] = $(this).children('option:selected').val()  == "false" ? false : $(this).children('option:selected').val();
		draw(map, mapsDataJSON, filterInput, oms);
	})
	$('#filters input').on('change', function() {
		var filterName = $(this).attr('name');
		filterInput[filterName] = $(this).attr('value') == "false" ? false : $(this).attr('value');
		draw(map, mapsDataJSON, filterInput, oms);
	})
	$('#controls input').on('change', function() {
		var filterName = $(this).attr('value');
		filterInput['periodFrom'] = parseInt($(this).attr('value').split(',')[0]);
		filterInput['periodTo'] = parseInt($(this).attr('value').split(',')[1]);
		draw(map, mapsDataJSON, filterInput, oms)
	})

	// scroll to
	$('#toApp').click(function() {
		$('header.intro').addClass('hide');

		setTimeout(function () {
			$('header.intro').addClass('hidden').removeClass('hide');
		}, 2000);

	});


	// Reset zoom
	var resetView = document.getElementById('reset-view');
	google.maps.event.addDomListener(resetView, 'click', function() {
		event.preventDefault();

		map.setCenter(new google.maps.LatLng(49.35, 14.5));
		map.setZoom(7);
	});

	// open header
	$('header.intro').click(function(){
		$(this).removeClass('hidden');
	});

	// Assign class .active to selected period
	$('.radio.option').click(function(){
		if ($(this).is(':checked')) {
			$(this).parent('label').siblings().removeClass('active');
			$(this).parent('label').addClass('active');
		}
	});

	// close infobox & clear active marker
	$('.infobox').click(function(){
		$('body').removeClass('active-marker');
	});

	// open filters
	$('#filters > header').click(function(){
		$('#filters').toggleClass('hidden');
		$('body').toggleClass('active-filters');
		console.log("Open filter.");
	});

	$('#roll-up-filters').click(function(){
		$('#filters').toggleClass('hidden');
		$('body').toggleClass('active-filters');
		console.log("Close filter.");
	});

});