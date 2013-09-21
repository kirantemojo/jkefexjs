var cssfilter = function(filterid){

	$('input[type=range]#'+filterid).change(function(){
				$('#picture').css({'-webkit-filter':filterid +'('+$(this).val()+')'});
			});

	if(filterid === "blur")
	{
		$('input[type=range]#'+filterid).change(function(){
			$('#picture').css({'-webkit-filter':filterid +'('+$(this).val()+'px)'});
		});
	}

	if(filterid === "opacity")
	{
		$('input[type=range]#'+filterid).change(function(){
			$('#picture').css({'-webkit-filter':filterid +'('+($(this).val())+')'});
		});
	}

	if(filterid === "hue-rotate")
	{
		$('input[type=range]#'+filterid).change(function(){
			$('#picture').css({'-webkit-filter':filterid +'('+10*($(this).val())+'deg)'});
		});
	}
	
	if(filterid === "drop-shadow")
	{
		$('input[type=range]#'+filterid).change(function(){
			$('#picture').css({'-webkit-filter':filterid +'('+10*($(this).val())+'px '+10*($(this).val())+'px '+10*($(this).val()) +'px grey)'});
		});
	}
};	