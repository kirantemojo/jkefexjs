var jQueryUISlideDown = function(){
	$.fn.slidy = function() {
		var set = false;
		$(this).click(function() {
			if (set) {
				$(this).find('.menu').slideUp();
				set = false;
			} else {
				$(this).find('.menu').slideDown();
				set = true;
			}
		});
	}	
};