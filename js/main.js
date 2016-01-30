$(document).ready(function() {

	// Modernizer
	// SVG / PNG
	if(!Modernizr.svg) {
		$('img[src*="svg"]').attr('src', function () {
			return $(this).attr('src').replace('.svg', '.png');
		});
	}

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

	// Age Slider
	sliderAge.noUiSlider.on('change', function() {
		filterInput['ageFrom'] = parseFloat(sliderAge.noUiSlider.get()[0]);
		filterInput['ageTo'] = parseFloat(sliderAge.noUiSlider.get()[1]);
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
		listFilters();
	})

	//
	$('#filters input').on('change', function() {
		var filterName = $(this).attr('name');
		if (filterName == 'gender' || filterName == 'direction' ) {
			filterInput[$(this).attr('id')] = $(this)[0].checked == true ? false : true;
		} else {
			filterInput[filterName] = $(this).attr('value') == "false" ? false : $(this).attr('value');
		}
		draw(map, mapsDataJSON, filterInput, oms);
		listFilters();
	})

	$('#periods input').on('change', function() {
		var filterName = $(this).attr('value');
		filterInput['periodFrom'] = parseInt($(this).attr('value').split(',')[0]);
		filterInput['periodTo'] = parseInt($(this).attr('value').split(',')[1]);
		draw(map, mapsDataJSON, filterInput, oms);
		listFilters();
	})

	// reset of filters
	$('#reset-filters').on('click', function() {
		// remove active-marker class since the reset filter deselect any active marker
		$('body').removeClass('active-marker');

		// reset visually the period filter
		$('#periods label').removeClass('active');
		$('#periods label:first-of-type').addClass('active');

		//draw(map, mapsDataJSON, {}, oms);
		sliderAge.noUiSlider.set([5, 90]);
		$('#filters input').each(function() {
			$(this).prop('checked', true);
		});
		$('#filters select').each(function() {
			$(this).prop('selectedIndex', 0);
		});
		filterInput = {
			periodFrom: false,
			periodTo: false,
			ageFrom: false,
			ageTo: false,
			genderMale: false,
			genderFemale: false,
			genderNa: false,
			citizenship: false,
			incident: false,
			death: false,
			residence: false,
			directionIn: false,
			directionOut: false
		};
		draw(map, mapsDataJSON, null, oms);
	});


	// Reset zoom & position of the map
	var resetView = document.getElementById('reset-view');
	google.maps.event.addDomListener(resetView, 'click', function(event) {
		event.preventDefault();

		map.setCenter(new google.maps.LatLng(49.35, 14.5));
		map.setZoom(7);
	});


	// scroll to
	$('.toApp').on('click', function() {
		$('header.intro').addClass('hide');

		setTimeout(function () {
			$('header.intro').addClass('hidden').removeClass('hide');
		}, 2000);

	});

	// open header
	$('header.intro').on('click', function(){
		$(this).removeClass('hidden');
	});

	// Assign class .active to selected period
	$('.radio.option').on('click', function(){
		if ($(this).is(':checked')) {
			$(this).parent('label').siblings().removeClass('active');
			$(this).parent('label').addClass('active');
		}
	});

	// close infobox & clear active marker
	$('#infobox').on('click', function(){
		$('body').removeClass('active-marker');
		activeMarkers.pop().setIcon(passiveIcon);
	});

	// open filters
	$('#filters > header').on('click', function(e){
		e.preventDefault();
		$('#filters').toggleClass('hidden');
		$('body').toggleClass('active-filters');
	});

	$('#roll-up-filters').on('click', function(e){
		e.preventDefault();
		$('#filters').toggleClass('hidden');
		$('body').toggleClass('active-filters');
	});

	$('#print-button').on('click', printMaps);

	/**
	* Print dat maps! \o/
	*/
	function printMaps() {
		console.log('Print the map! START');

		map.panBy($(window).width()/2-980/2, ($(window).height()-108)/2-470/2);

		if(activeMarkers){
			var items = $('#print-infobox dd');
			for (var i = items.length - 1; i >= 0; i--) {
				items[i].innerHTML = document.getElementById(items[i].id).innerHTML;
			};
		}

		google.maps.event.addListenerOnce(map, 'idle', function(){
			console.log('this logs after the panTo finishes.');
			var body = $('body'),
			mapContainer = $('#map-canvas'),
			mapContainerParent = mapContainer.parent(),

			printContainer = $('<div>');

			body.prepend(printContainer);
			printContainer
			.addClass('print-container')
			.css('position', 'relative')
			.height(mapContainer.height())
			.append($('#print'))
			.append(mapContainer);

			listFilters();

			// var content = body.children()
			// .not('script')
			// .not(printContainer)
			// .detach();

			window.print();

			// body.prepend(content);
			mapContainerParent.prepend(mapContainer);
			printContainer.remove();

			map.panBy(-($(window).width()/2-980/2), -(($(window).height()-108)/2-470/2));

		});

		console.log('Print the map! END');
	}

	function listFilters() {
		var selectedAge         = sliderAge.noUiSlider.get();
		var selectedCitizenship = $('#filter-citizenship option:checked').text();
		var selectedResidence   = $('#filter-residence option:checked').text();
		var selectedIncident    = $('#filter-incident option:checked').text();
		var selectedDeath       = $('#filter-death option:checked').text();
		var selectedPeriod      = $('#periods input:checked').attr('value');
		var selectedGender      = '';
		$('#filter-gender input:checked').each(function() {
			selectedGender    += $(this).attr('value');
			selectedGender    += ', ';
		});
		var selectedDirection   = '';
		$('#filter-direction input:checked').each(function() {
			selectedDirection += $(this).attr('value');
			selectedDirection += ', ';
		});

		var selected = 'Použité filtrování:';
		selected += '<br>';
		selected += 'Období (od,do): ';
		selected += selectedPeriod;
		selected += '<br>';
		selected += 'Věk (od,do): ';
		selected += selectedAge;
		selected += '<br>';
		selected += 'Pohlaví: ';
		selected += selectedGender;
		selected += '<br>';
		selected += 'Státní příslušnost: ';
		selected += selectedCitizenship;
		selected += '<br>';
		selected += 'Okres bydliště: ';
		selected += selectedResidence;
		selected += '<br>';
		selected += 'Příslušný útvar příhraniční stráže: ';
		selected += selectedIncident;
		selected += '<br>';
		selected += 'Příčina úmrtí: ';
		selected += selectedDeath;
		selected += '<br>';
		selected += 'Směr přechodu: ';
		selected += selectedDirection;

		console.log(selected);

		// var selStr = selected.toString()
		// console.log(selStr);

		$('#list-of-filters').html(selected);
	}

});