$(document).ready(function() {

	// ScrollTo - https://github.com/flesler/jquery.scrollTo
	$('#toApp').click(function(){
		$.scrollTo( '#controls', 380, { easing:'swing' });
		return false;
	});

	// Assign class active to selected period
	$('.radio.option').click(function(){
		if ($(this).is(':checked')) {
			$(this).parent('label').siblings().removeClass('active');
			$(this).parent('label').addClass('active');
		}
	});

});