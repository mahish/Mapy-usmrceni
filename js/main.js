$(document).ready(function() {

	window.sliderAge = document.getElementById('filter-age');

	noUiSlider.create(sliderAge, {
		start: [ 20, 43 ],
		step: 1,
		// snap: true,
		// margin: 20,
		connect: true,
		// direction: 'rtl',
		// orientation: 'horizontal',
		// behaviour: 'tap-drag',
		range: {
			'min': 15,
			'max': 50
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
		document.getElementById('age-min').innerHTML = document.getElementById('age-min').innerHTML.replace(/\d{2}/, filterInput['ageFrom']);
		document.getElementById('age-max').innerHTML = document.getElementById('age-max').innerHTML.replace(/\d{2}/, filterInput['ageTo']);
		draw(map, mapsDataJSON, filterInput, oms)
	})

	$('#filters select').on('change', function() {
		var filterName = $(this).attr('id');
		filterInput[filterName] = $(this).children('option:selected').val();

	})
	$('#filters input').on('change', function() {
		var filterName = $(this).attr('name');
		filterInput[filterName] = $(this).attr('value');
	})
	$('#controls input').on('change', function() {
		var filterName = $(this).attr('value');
		filterInput['periodFrom'] = $(this).attr('value').split(',')[0];
		filterInput['periodTo'] = $(this).attr('value').split(',')[1];
		draw(map, mapsDataJSON, filterInput, oms)
	})

	$('#toApp').click(function() {
		$('header.intro').addClass('hide');

		setTimeout(function () {
			$('header.intro').addClass('hidden').removeClass('hide');
		}, 2000);

	});

	// open header
	$('header.intro').click(function(){
		$(this).removeClass('hidden');
	});

	// Assign class active to selected period
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
	// if ($('#filters').hasClass('hidden')) {
		$('#filters > header').click(function(){
			$('#filters').toggleClass('hidden');
			$('body').toggleClass('active-filters');
			console.log("Open filter.");
		});
	// } else if ($('body').hasClass('active-filters')) {
		// close filters
		$('#roll-up-filters').click(function(){
			$('#filters').toggleClass('hidden');
			$('body').toggleClass('active-filters');
			console.log("Close filter.");
		});
	// }



});