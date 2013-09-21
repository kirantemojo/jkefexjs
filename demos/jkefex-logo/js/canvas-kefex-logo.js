var moduleCanvasLogo = { };

moduleCanvasLogo.draw = function(i,j,dw,dy,r,elem){
	elem = moduleCanvasLogo.canvasElement;
	var canvas = document.querySelector(elem);
	if(canvas.getContext)
	{
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,200,200);
		ctx.beginPath();
		var x = 100;
		var y = 100;
		var radius_1 = 100;
		var start = 0 * Math.PI;
		var end = r * Math.PI;
		var anticlockwise = false;
		ctx.arc(x,y,radius_1,start,end,anticlockwise);
		ctx.closePath();
		ctx.fillStyle = "rgba(0,0,100,0.2)";
		ctx.fill();

		ctx.lineWidth = 3;
		var radius_2 = 80;
		ctx.beginPath();
		ctx.arc(x,y,radius_2,start,end,anticlockwise);
		ctx.closePath();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "rgba(0,0,100,0.5)";
		ctx.stroke();
		ctx.fill();

		ctx.font = i+"px Verdana, sans-serif";
		ctx.fillStyle = "white";
		ctx.fillText("K",dw,dy);
		ctx.beginPath();
		ctx.moveTo(120,i);
		ctx.lineTo(120,40);
		ctx.lineTo(120,j);
		ctx.closePath();
		ctx.stroke();
		i+=1;
		dw-=1.0;
		dy+=0.75;
		j+=2;
		r+=0.1;
		var loopTimer = setTimeout("moduleCanvasLogo.draw("+i+","+j+","+dw+","+dy+","+r+")",30);
		if((i===90)||(j===170)||(r===2.0))
		{
			clearTimeout(loopTimer);
			ctx.fillStyle = "rgba(50,50,50,0.3)";
			ctx.fillRect(120,40,1300,118);
			ctx.font = "20px Verdana, sans-serif";
			ctx.fillStyle = "white";
			ctx.fillText(" efex",120,140);
			ctx.save();
		}
	}
};