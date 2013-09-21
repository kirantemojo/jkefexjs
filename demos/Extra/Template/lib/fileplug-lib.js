var fileplugin = function(){
	$.fn.fildelegate = function(superelem,targetelem)
	{
		$(superelem).delegate(targetelem,'change',function(){   
			var files = this.files;
			var memory =(((files.item(0).size)/1024)/1024);
			var typ = files.item(0).type;
				if( memory <= 1)
				{
					if(typ.match('image/*'))
					{
						/*
						var read = new FileReader();
						read.onload = function()
						{
							return function(e)
							{
								$('#container').css({'background':'url('+e.target.result+') no-repeat center #ccc', 'background-size':'100% 100%'});
							};			
						}(files.item(0));
						read.readAsDataURL(files.item(0));
						*/
						var source = window.URL.createObjectURL(files.item(0));
						$('#container').css({'background':'url('+source+') no-repeat center #ccc', 'background-size':'100% 100%'});
					}
				}
		});   
	}	
};