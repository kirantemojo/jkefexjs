try
{
	$(function(){
		alertify.alert(" For Better Performance and Support i recommend to use Chrome and Presently, This Site is under Active Updates and For Extended Support in features & Compatibility for other Browsers it takes time....!!");
		$('h6[rel=#mies1]').click(function(){
			$('#mies1 #ifrm1').html('<iframe width="520" height="310" src="http://www.youtube-nocookie.com/embed/-Z5BB4Se5e0" frameborder="0" allowfullscreen></iframe>');
		});
		$('h6[rel=#mies2]').click(function(){
			$('#mies2 #ifrm2').html('<iframe width="520" height="310" src="http://www.youtube-nocookie.com/embed/oCyyHaYCoiI" frameborder="0" allowfullscreen></iframe>');
		});
		$('.4u').on('click','h6[rel=#mies3]',function(){
			$('#mies3 h4').hide();
			flashembed('flash1','flash/KefexLoader.swf');
		});
		$('.4u').on('click','h6[rel=#mies4]',function(){
			$('#mies4 h4').hide();
			flashembed('flash2','flash/AppLoader.swf');
		});
		$('.simple_overlay').on('click','.close',function(){
			$('#mies2 h4').show();
			$('#flash1,#flash2,#ifrm1,#ifrm2').html('');
		});
		$('h6[rel]').overlay();
		$('#ajaxload #contentpage').html('Loading');
		$('#portfolio').on('click','a[rel=ajaxoverlay]',function(e){
			e.preventDefault();
			$('#ajaxload').fadeIn('slow');
			var href = $(this).attr('href');
			if(href)
			{
				$('#ajaxload #contentpage').slideDown('slow').html('<h1>Loading...</h1>');
				$.get(href,function(data){
					$('#ajaxload #contentpage').html(data).fadeIn('slow');
				},"html");
			}
		});
		$('#ajaxload').on('click','.close',function(){
			$('#ajaxload #contentpage').html('').slideUp('slow');
			$('#ajaxload').fadeOut('slow');
		});
		$(document).keyup(function(e){
			if(e.keyCode == 27)
			{
				if(!webAudioStop)
				{
					source.stop(0);
					buffer = null;
				}
				else if(jKefex.navagatorUserMedia.closeStream)
				{
					jKefex.navagatorUserMedia.closeStream();
				}
				$('#ajaxload #contentpage').html('').slideUp('slow');
				$('#ajaxload').fadeOut('slow');
			}
			e.preventDefault();
			e.stopPropagation();
		});
							
	});
}
catch(e)
{
	console.log(e);
}