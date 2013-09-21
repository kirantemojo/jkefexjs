var canvaswallplugin2 = function(){
	"createCanvas":function(w,h){
			var canvas = document.querySelector('#canvas');
			ctx2 = canvas.getContext('2d');
			canvas.width = document.width;
			canvas.height = document.height;
		},
	"eventFunc1":function(e){
			var x = e.clientX;
			var y = e.clientY;
			ctx2.restore();
			ctx2.beginPath(e);
			ctx2.moveTo(e.clientX,e.clientY);
			ctx2.lineTo(x-200,y-200);
	},
	"eventFunc2":function(e){
		var x = e.clientX;
			var y = e.clientY;
			ctx2.lineTo(x,y);
			ctx2.closePath();
			ctx2.fillStyle = "rgba(100,100,100,0.2)";
			ctx2.fill();
	},
	"addEvents":function(){
		canvas.addEventListener('mousedown',jKefex.canvasWallPlugin2.eventFunc1,false);
		canvas.addEventListener('mouseup',jKefex.canvasWallPlugin2.eventFunc2,false);
	},
	"removeEvents":function(){
		canvas.removeEventListener('mousedown',jKefex.canvasWallPlugin2.eventFunc1,false);
		canvas.removeEventListener('mouseup',jKefex.canvasWallPlugin2.eventFunc2,false);
	}	
};