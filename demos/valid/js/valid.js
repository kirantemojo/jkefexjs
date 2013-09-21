var modvalidation = function(){
	$.fn.jKefexValidation = function(options){
		var settings = {};
		var err = [];
		if(options)
		{	
			$.extend(settings,options);
			$(this).click(function(e){
				err = [];
				for(var i = 0;i < (settings.inputid.length);i++)
				{	
					if(($(settings.inputid[i]).val() === ''))
					{	
						err[i] = ($(settings.inputid[i]).data('error'));
					}
				}
				if(err.length)
				{
					$(settings.containment).html('');
					$.each(err,function(i,val){
						if(val)
						{
							$(settings.containment).append('<li>'+ val +'</li>');
						}
					});
				}
				else
				{	
					$(settings.containment).html('Successfully Submitted');
					if(settings.onSuccess)
					{
						settings.onSuccess();
					}
				}
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
	};
};