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
			'min': [  0, 5 ],	//  0 as undefined, step by 5
			'10%': [  5, 1 ],	//  5 years old, step by 1 year
			'20%': [ 17, 1 ],	// 20 years old, step by 1 year
			'80%': [ 38, 1 ],	// 30 years old, step by 1 year
			'max': [ 90, 1 ]	// 90 years old, step by 1 year
		}
	});

	// Age Slider
	sliderAge.noUiSlider.on('change', function() {
		filterInput['ageFrom'] = parseFloat(sliderAge.noUiSlider.get()[0]).toFixed(2);
		filterInput['ageTo'] = parseFloat(sliderAge.noUiSlider.get()[1]).toFixed(2);
		draw(map, mapsDataJSON, filterInput, oms);
	})

	sliderAge.noUiSlider.on('update', function() {

		var agemin = document.getElementById('age-min');
		var agemax = document.getElementById('age-max');

		filterInput['ageFrom'] = parseInt(sliderAge.noUiSlider.get()[0]);
		filterInput['ageTo'] = parseInt(sliderAge.noUiSlider.get()[1]);

		if ( filterInput['ageFrom'] == 0 ) {
			agemin.innerHTML = agemin.innerHTML.replace(/.{1,}/, 'neurčeno');
		} else {
			agemin.innerHTML = agemin.innerHTML.replace(/.{1,}/, 'od ' + filterInput['ageFrom'] + ' let');
		}

		if ( filterInput['ageTo'] == 0 ) {
			agemax.innerHTML = agemax.innerHTML.replace(/.{1,}/, 'neurčeno');
		} else {
			agemax.innerHTML = agemax.innerHTML.replace(/.{1,}/, 'do ' + filterInput['ageTo'] + ' let');
		}
	})

	// Other filters
	$('#filters select').on('change', function() {
		var filterName = $(this).attr('id');
		filterInput[filterName] = $(this).children('option:selected').val()  == "false" ? false : $(this).children('option:selected').val();
		draw(map, mapsDataJSON, filterInput, oms);
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
	})

	$('#periods input').on('change', function() {
		var filterName = $(this).attr('value');
		filterInput['periodFrom'] = parseInt($(this).attr('value').split(',')[0]);
		filterInput['periodTo'] = parseInt($(this).attr('value').split(',')[1]);
		draw(map, mapsDataJSON, filterInput, oms);
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
	$('.infobox').on('click', function(){
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

});