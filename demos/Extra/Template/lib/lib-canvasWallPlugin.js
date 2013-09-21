var moduleCanvasWallPlugin = function(){
	this.drawX = "";
	this.drawY = "";
};

moduleCanvasWallPlugin.prototype.createCanvas = function(){
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext('2d');
};

moduleCanvasWallPlugin.prototype.createPattern = function(direction, src){
	if(ctx)
	{
		var img = new Image();
		img.onload = function(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			var pattern = ctx.createPattern(img,direction);
			ctx.fillStyle = pattern;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		};
		img.src = src;
	}
}

moduleCanvasWallPlugin.prototype.init = function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

moduleCanvasWallPlugin.prototype.drawthis = function(){
	if((this.drawX) && (this.drawY))
	{
	ctx.beginPath();
	ctx.arc(this.drawX, this.drawY, 10, this.drawX * Math.PI, this.drawY * Math.PI, false);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.closePath();					 		
	}
};

moduleCanvasWallPlugin.prototype.stopWorker = function(){
	w.terminate();
};

moduleCanvasWallPlugin.prototype.update = function(){
	canvas.addEventListener('mousemove',function(e){
			jKefex.canvasWallPlugin.drawX = e.offsetX;
			jKefex.canvasWallPlugin.drawY = e.offsetY;
			jKefex.canvasWallPlugin.drawthis();
	},false);
	canvas.addEventListener('dblclick',jKefex.canvasWallPlugin.stopWorker,false);
};

moduleCanvasWallPlugin.prototype.worker = function(){
	w = new Worker('js/worker.js');
	w.postMessage({'p': x,'q': y});
	w.onmessage = function(e)
	{	
		ctx.beginPath();
		ctx.arc(x, y, 20, e.data.p * Math.PI, e.data.q * Math.PI, false);
		ctx.strokeStyle = "white";
		ctx.fillStyle = "rgba(0,0,100,0.5)";
		ctx.stroke();
		ctx.closePath();
	};
};

moduleCanvasWallPlugin.prototype.requestanimframe = function(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
								  window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

	if(!window.requestAnimationFrame)
	{
		window.requestAnimationFrame = function(drawset){
			id = window.setTimeout( drawset, 1000/60 );
			return id;
		};
	}

	if(!window.cancelAnimationFrame)
	{
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}

	(function animloop(){
			myReq = requestAnimationFrame(animloop);
			drawset();
	})();
};

moduleCanvasWallPlugin.prototype.removeevents = function(){
	canvas.removeEventListener('mousemove',function(e){
			jKefex.canvasWallPlugin.drawX = e.offsetX;
			jKefex.canvasWallPlugin.drawY = e.offsetY;
			jKefex.canvasWallPlugin.drawthis();
	},false);
	canvas.removeEventListener('dblclick',jKefex.canvasWallPlugin.stopWorker,false);
};