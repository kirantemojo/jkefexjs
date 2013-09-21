var jkefex= function(){
};

jkefex.prototype.init = function(VID_STATE,AUD_STATE,successfn,errorfn){
	navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia ||
	navigator.webkitGetUserMedia || navigator.msGetUserMedia);
	if(!navigator.getUserMedia)
	{
		alert("Your Browser Does not Support HTML 5 Navigator");
	}
	else
	{
		navigator.getUserMedia({video:VID_STATE,audio:AUD_STATE},successfn,errorfn);
	}
};

jkefex.prototype.stop = function(stream,stopelem){
	document.querySelector(stopelem).addEventListener("click",
		function(){
			console.log(stream);
		},false);
};