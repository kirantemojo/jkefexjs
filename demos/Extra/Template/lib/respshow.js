var resp_show = function(next,prev,wrapper,innerWrapper,element,autoPlay){
	var wrapperWidth = ($(element).outerWidth())*($(element).length);
	function resized()
	{
		width = $(window).innerWidth();
		$(wrapper).outerWidth($(window).innerWidth() - 86);
		$(innerWrapper).outerWidth(wrapperWidth);
	}
	resized();	
	$(window).resize(function()
	{
		resized();
	});
	$(next).click(function(){
		$(wrapper).animate({scrollLeft:"+="+$(innerWrapper).outerWidth()/($(element).length)+"px"},'slow');
		if(autoPlay && $(wrapper).prop('scrollLeft')+$(element).outerWidth() == wrapperWidth)
		{
			$(wrapper).animate({scrollLeft:'0px'});
		}
	});
	$(prev).click(function(){
		$(wrapper).animate({scrollLeft:"-="+$(innerWrapper).outerWidth()/($(element).length)+"px"},'slow');
		if(autoplay && $(wrapper).prop('scrollLeft')+$(element).outerWidth() == ($(element).outerWidth()))
		{
			$(wrapper).animate({scrollLeft:'0px'});
		}
	});
};