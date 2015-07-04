$(document).ready(function() {

	// ScrollTo - https://github.com/flesler/jquery.scrollTo
	$('#toApp').click(function(){
		$.scrollTo( '#controls', 380, { easing:'swing' });
		return false;
	});

});