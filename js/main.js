$(document).ready(function() {

	$('#toApp').click(function() {
		$('header').addClass('hide');

		setTimeout(function () {
			$('header').addClass('hidden').removeClass('hide');
		}, 2000);

	});

	// open header
	$('header').click(function(){
		$(this).removeClass('hidden');
	});

	// Assign class active to selected period
	$('.radio.option').click(function(){
		if ($(this).is(':checked')) {
			$(this).parent('label').siblings().removeClass('active');
			$(this).parent('label').addClass('active');
		}
	});

	// close modal infobox & clear active marker
	$('.infobox').click(function(){
		$('body').removeClass('active-marker');
	});

	// open filters
	$('#filter').click(function(){
		$(this).toggleClass('hidden');
		$('body').toggleClass('active-filter');
	});

});