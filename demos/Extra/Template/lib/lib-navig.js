var moduleNav= function(){
	this.container = "";
	this.stopStream = "":
};

moduleNav.prototype.init = function(id,VID_STATE,AUD_STATE,stopid){
	navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia ||
	navigator.webkitGetUserMedia || navigator.msGetUserMedia);
	butt = document.getElementById(id);
	if(stopid)
	{
		butstop = document.getElementById(stopid);
		butstop.addEventListener("click",this.closeStream,false);
	}
	butt.addEventListener("click",this.navClick,false);
	if(!navigator.getUserMedia)
	{
		$("#"+id).html("Your Browser Does not Support HTML 5 Navigator");
	}
	else
	{
		navigator.getUserMedia({video:VID_STATE,audio:AUD_STATE},this.navSuccess,this.navError);
	}
};

moduleNav.prototype.navSuccess = function(stream){
	this.stopStream = stream;
	vidStream = this.vidStream;
	vidContainer = this.vidContainer;
	vidContainer = document.querySelector(this.container.element);
	window.URL = window.URL ||(window.webkitURL);
	if(window.URL)
	{
		vidStream = window.URL.createObjectURL(stream);
	}
	else
	{
		vidStream = stream;
	}
	vidContainer.autoplay = true;
	vidContainer.src = vidStream;
};

moduleNav.prototype.navError = function(){
	console.log(err);
};

moduleNav.prototype.navClick = function(){

};

moduleNav.prototype.takeSnapShot = function(canvasElem,imgCanvas,width,height){
	navCtx = this.navCtx;
	dataURL = this.dataURL;
	navCtx = $(canvasElem)[0].getContext('2d');
	$(canvasElem)[0].width = width;
	$(canvasElem)[0].height = height;
	console.log(vidContainer);
	navCtx.drawImage(vidContainer,0,0,$(canvasElem)[0].width,$(canvasElem)[0].height);

	dataURL = $(canvasElem)[0].toDataURL();
	$(imgCanvas)[0].src = dataURL;
	console.log(dataURL);
};

moduleNav.prototype.closeStream = function(){
	var len = $.map(this.stopStream, function(n, i) { return i; }).length;
	if(len)
	{
		this.stopStream.stop();
	}
}