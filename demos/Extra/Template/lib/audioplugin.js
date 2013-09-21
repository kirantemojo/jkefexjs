var audioplugin = function(){
	function(url,text,audbutt,stopbutt,timerstart,timerStop){
		var context;
		var bufferSound = null;
		document.getElementById(audbutt).addEventListener('click',initAudio,false);
		document.getElementById(stopbutt).addEventListener('click',function()
			{
				if(!timerstart && timerStop)
				{
					$(audbutt).on
					jKefex.audioplugin.source.stop(0);
					buffer = null;
					$(text).html("Stopped...");
				}else if(timerstart && !timerStop){
					$(text).html("Music is not yet started & Loaded .... Please wait");
				}
			},false);
		function initAudio()
		{
			window.AudioContext = window.AudioContext||window.webkitAudioContext;
			context = new AudioContext();
			$(text).html('Loading...');
			loadSound(url);
			$(this).hide();
		}
		function loadSound(url)
		{
			var request = new XMLHttpRequest();
			request.open('GET',url,true);
			request.responseType = 'arraybuffer';

			request.onprogress = function(e){
				if(e.lengthComputable)
				{
					var percent = e.loaded/e.total;
					$(text).html('Loading '+Math.round(percent*100)+'% Please Wait...');
				}
			};

			request.onabort = function(){
				request = null;
				console.log('aborted');
			};

			request.onload = function()
			{
				context.decodeAudioData(request.response,function(buffer){
					$(text).html("Playing the Music");
					bufferSound = buffer;
					playSound(bufferSound);
					console.log("Completed");
				});
			};

			request.send();
		};
		function playSound(buffer)
		{	
			if(buffer)
			{
				jKefex.audioplugin.source = context.createBufferSource();
				jKefex.audioplugin.source.buffer = buffer;
				jKefex.audioplugin.source.connect(context.destination);
				console.log(jKefex.audioplugin.source);
				jKefex.audioplugin.source.start(0);
				timerstart = false;
				timerStop = true;
			}	
		}
		return (!timerstart && timerStop);
	}	
};