var jKefex = {
	"Trignomentry":{
		"positionelem":function(obj1){
					var upPos = 
					{
						"setX" : ($(window).width() - $(obj1).outerWidth())/2,
						"setY" : ($(window).width() - $(obj1).outerHeight())/2
					};
		},
		"cancelAnimation":function(){
					return (function(){
					cancelAnimationFrame(myReq);
				})();
		},
		"asinfunc":function(obj1){
				var start = Math.PI*2/100;
				function set()
				{
					$(obj1).css({'top':100*Math.asin(Math.sin(start))+"px",'left':100*Math.acos(Math.cos(start))+"px"});
					start += 0.06;
				}
				
				(function() {
				var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
											  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
											  window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
											  
				if(!window.requestAnimationFrame)
				{
					window.requestAnimationFrame = function(set){
						id = window.setTimeout( set, 1000/60 );
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
						set();
				})();
				
				})();
		},
		"acosfunc":function(obj1){
				var start = Math.PI*2/100;
			function set()
			{
				$(obj1).css({'left':100*Math.atan(Math.tan(start))+"px"});
				start += 0.06;
			}
			
			(function() {
				var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
											  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
											  window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
											  
				if(!window.requestAnimationFrame)
				{
					window.requestAnimationFrame = function(set){
						id = window.setTimeout( set, 1000/60 );
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
						set();
				})();
			})();
		
		},
		"sinfunc":function(obj1){
			var start = Math.PI*2/100;
			function set()
			{
				$(obj1).css({'top':100*Math.sin(start)+"px",'left':100*Math.cos(start)+"px"});
				start += 0.06;
			}

			(function() {
				var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
											  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
											  window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
											  
				if(!window.requestAnimationFrame)
				{
					window.requestAnimationFrame = function(set){
						id = window.setTimeout( set, 1000/60 );
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
						set();
				})();
			})();
		},
		"sin2func":function(obj1){
			var start = Math.PI*2/100;
			function set()
			{
				$(obj1).css({'top':100*Math.sin(start)+"px",'left':100*Math.sin(start)+"px"});
				start += 0.06;
			}
			(function() {
				var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
											  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
											  window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
											  
				if(!window.requestAnimationFrame)
				{
					window.requestAnimationFrame = function(set){
						id = window.setTimeout( set, 1000/60 );
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
						set();
				})();
			})();
		},
		"tanfunc":function(obj1){
			var start = Math.PI*2/100;
			function set()
			{
				$(obj1).css({'left':50*Math.tan(start)+"px"});
				start += 0.06;
			}
			
			(function() {
				var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
											  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
											  window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
											  
				if(!window.requestAnimationFrame)
				{
					window.requestAnimationFrame = function(set){
						id = window.setTimeout( set, 1000/60 );
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
						set();
				})();
			})();
		
		}
	}
};