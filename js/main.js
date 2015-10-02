$(document).ready(function() {

	window.sliderAge = document.getElementById('filter-age');

	noUiSlider.create(sliderAge, {
		start: [ 0, 100 ],
		step: 1,
		// snap: true,
		// margin: 20,
		connect: true,
		// direction: 'rtl',
		// orientation: 'horizontal',
		// behaviour: 'tap-drag',
		range: {
			'min': 0,
			'max': 100
		}
	});

	sliderAge.noUiSlider.on('change', function() {
		filterInput['ageFrom'] = sliderAge.noUiSlider.get()[0];
		filterInput['ageTo'] = sliderAge.noUiSlider.get()[1];
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