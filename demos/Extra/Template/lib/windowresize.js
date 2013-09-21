var windowresize = function () {
  "overflowside":function()
	{
		width = $(window).innerWidth();
		height = $(window).innerHeight();
		$('body').width(( $(document).width() ) - ($(document).width() - (width)));
		$('body').height(( $(document).height() ) - ($(document).height() - (height)));

		$(document).width(( $(document).width() ) - ($(document).width() - (width)));
		$(document).height(( $(document).height() ) - ($(document).height() - (height)));

		window.addEventListener('resize',jKefex.windowresize.resize,false);
	},
	"resize":function()
	{
		width = $(window).innerWidth();
		height = $(window).innerHeight();
		$('body').width(( $(document).width() ) - ($(document).width() - (width)));
		$('body').height(( $(document).height() ) - ($(document).height() - (height)));

		$(document).width(( $(document).width() ) - ($(document).width() - (width)));
		$(document).height(( $(document).height() ) - ($(document).height() - (height)));
	}
};,