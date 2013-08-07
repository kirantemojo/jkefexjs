try
{
	"use strict";
	var jKefex = {
	"navagatorUserMedia":{
			"container":{},
			"stopStream":{},
			"init":function(id,VID_STATE,AUD_STATE,stopid){
					navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia ||
					navigator.webkitGetUserMedia || navigator.msGetUserMedia);
					butt = document.getElementById(id);
					if(stopid)
					{
						butstop = document.getElementById(stopid);
						butstop.addEventListener("click",jKefex.navagatorUserMedia.closeStream,false);
					}
					butt.addEventListener("click",jKefex.navagatorUserMedia.navClick,false);
					if(!navigator.getUserMedia)
					{
						$("#"+id).html("Your Browser Does not Support HTML 5 Navigator");
					}
					else
					{
						navigator.getUserMedia({video:VID_STATE,audio:AUD_STATE},jKefex.navagatorUserMedia.navSuccess,jKefex.navagatorUserMedia.navError);
					}
			},
			"navSuccess":function(stream){
				this.stopStream = stream;
				vidStream = this.vidStream;
				vidContainer = this.vidContainer;
				vidContainer = document.querySelector(jKefex.navagatorUserMedia.container.element);
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
			},
			"navError":function(err){
				console.log(err);
			},
			"navClick":function()
			{
				
			},
			"takeSnapShot":function(canvasElem,imgCanvas,width,height){
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
			},
			"closeStream" : function(){
				if(this.stopStream)
				{
					//console.log(stopStream);
					stopStream.stop();
				}
			}
		},
	"canvasKefexLogo":{
			"canvasElement":{},
			"draw":function(i,j,dw,dy,r,elem)
			{
				elem = jKefex.canvasKefexLogo.canvasElement;
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
					var loopTimer = setTimeout("jKefex.canvasKefexLogo.draw("+i+","+j+","+dw+","+dy+","+r+")",30);
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
			}
	},
	"canvasWallPlugin":{
			"drawX" : {},
			"drawY"	: {},
			"createCanvas":function(){
				canvas = document.getElementById("myCanvas");
				ctx = canvas.getContext('2d');
			},
			"init":function(){
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			},
			"createPattern":function(direction, src){
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
			},
			"drawthis":function()
					 {
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
					},
			"stopWorker" : function(){
							w.terminate();
					},
			"update":function(){
					canvas.addEventListener('mousemove',function(e){
							jKefex.canvasWallPlugin.drawX = e.offsetX;
							jKefex.canvasWallPlugin.drawY = e.offsetY;
							jKefex.canvasWallPlugin.drawthis();
					},false);
					canvas.addEventListener('dblclick',jKefex.canvasWallPlugin.stopWorker,false);
				},
			"worker":function()
					{
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
					},
			"requestanimframe":function(drawset) {
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
				
				},
			"removeevents":function(){
				canvas.removeEventListener('mousemove',function(e){
							jKefex.canvasWallPlugin.drawX = e.offsetX;
							jKefex.canvasWallPlugin.drawY = e.offsetY;
							jKefex.canvasWallPlugin.drawthis();
					},false);
				canvas.removeEventListener('dblclick',jKefex.canvasWallPlugin.stopWorker,false);
			}
	},
	"canvasWallPlugin2" : {
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
	},
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
	},
	"formDataUpload":function (uri) {
	var input = document.getElementById("images"), 
		formdata = false;

	function showUploadedItem (source) {
  		var list = document.getElementById("image-list"),
	  		li   = document.createElement("li"),
	  		img  = document.createElement("img");
  		img.src = source;
  		li.appendChild(img);
		list.appendChild(li);
	}   

	if (window.FormData) {
  		formdata = new FormData();
  		document.getElementById("btn").style.display = "none";
	}
	
 	input.addEventListener("change", function (evt) {
 		document.getElementById("response").innerHTML = "Uploading . . ."
 		var i = 0, len = this.files.length, img, reader, file;
		if(len <= 3)
		{
			for ( ; i < len; i++ ) {
				file = this.files[i];
		
				if (!!file.type.match(/image.*/)) {
					if ( window.FileReader ) {
						reader = new FileReader();
						reader.onloadend = function (e) { 
							showUploadedItem(e.target.result, file.fileName);
						};
						reader.readAsDataURL(file);
					}
					if (formdata) {
						formdata.append("images[]", file);
					}
				}	
			}
			if (formdata) {
				$.ajax({
					url: uri,
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
					success: function (res) {
						document.getElementById("response").innerHTML = res; 
					}
				});
			}
		}
		else
		{
			alert('Please Select only 3 Files');
		}
	}, false);
},
	"formdatacore":function(uri){
		
		var input = document.querySelector('input');
		input.addEventListener("change", function (evt) {
			
			var data = new FormData();
			for(var i = 0;i < input.files.length; ++i)
			{
				if(input.files[i].type.match(/image.*/))
				{
					file = input.files[i];
					data.append("images[]",file);
					console.log(file);
				}
				else
				{
					alert('Please upload Only Images');
				}
			}
			var xhr;
			if(window.XMLHttpRequest)
			{
				xhr = new XMLHttpRequest();
			}
			xhr.upload.addEventListener("progress",function(evt){
				if(event.lengthComputable)
				{
					var percent = (evt.loaded)/(evt.total);
					var progress = document.getElementById('upload_progress');
					while(progress.hasChildNodes())
					{
						progress.removeChild(progress.firstChild);
					}
					progress.appendChild(document.createTextNode(Math.round(percent*100)+"%"));
					console.log("completed");
				}
			},false);
			xhr.upload.addEventListener("load",function(){
				document.getElementById('upload_progress').textContent = "Completed";
				console.log("completed");
			},false);
			xhr.upload.addEventListener("error",function(){
				alert("Upload Failed");
				console.log("completed");
			},false);
			xhr.open('POST',uri);
			xhr.setRequestHeader('Cache-Control','no-cache');
			xhr.send(data);
		},false);
	},
	"cssfilter":function(filterid){
		$('input[type=range]#'+filterid).change(function(){
				$('#picture').css({'-webkit-filter':filterid +'('+$(this).val()+')'});
			});
		if(filterid === "blur")
		{
			$('input[type=range]#'+filterid).change(function(){
				$('#picture').css({'-webkit-filter':filterid +'('+$(this).val()+'px)'});
			});
		}
		if(filterid === "opacity")
		{
			$('input[type=range]#'+filterid).change(function(){
				$('#picture').css({'-webkit-filter':filterid +'('+($(this).val())+')'});
			});
		}
		if(filterid === "hue-rotate")
		{
			$('input[type=range]#'+filterid).change(function(){
				$('#picture').css({'-webkit-filter':filterid +'('+10*($(this).val())+'deg)'});
			});
		}
		if(filterid === "drop-shadow")
		{
			$('input[type=range]#'+filterid).change(function(){
				$('#picture').css({'-webkit-filter':filterid +'('+10*($(this).val())+'px '+10*($(this).val())+'px '+10*($(this).val()) +'px grey)'});
			});
		}
	},
	"ajaxgrid":{
		"topGrid":function(obj)
			{
				var heightArray = [];
				var setHeightArray = [];
				var topArray = [];
				$.fn.getHeight = function()
				{	
					$(this).each(function(){
						heightArray.push($(this).height());
					});
					return heightArray;
				}
				$.fn.setHeight = function(setOptions)
				{
					$(this).each(function(i){
						$(this).height(setOptions[i]);
					});
				}
				$.fn.getTop = function()
				{
					$(this).each(function(i){
						topArray.push($(this).position().top);
					});
					return topArray;
				}
				$.fn.setTop = function(setTopOptions)
				{
					$(this).each(function(i){
						$(this).css({'top':setTopOptions[i]+'px'});	
					});
				}
				$.fn.setColumn = function(noCol,colWidth)
				{
					$(this).filter(function(i){
						if((i % noCol)==0)
						{
							$(this).css('left',colWidth[0]+'%');
						}
						else if((i % noCol)!=0)
						{
							$(this).css('left',colWidth[1]+'%');
						}
					});
				}
				var setTopOptions = function(htmlObj)
				{
					var height = $(htmlObj).getHeight();
					var top = $(htmlObj).getTop();
					$(htmlObj).setColumn(2,[0,50]);
					var newTop = [];
					newTop.push(top[0]);
					newTop.push(top[1]);
					for(var i=2;i < 10; i++ )
					{
						if(((i%2)==0) && (i!=0))
						{
							top[i] += top[i-2]+height[i-2];
							newTop.push(top[i]);
						}
						else
						{
							top[i] += top[i-2]+height[i-2];
							newTop.push(top[i]);
						}
					}
					$(htmlObj).setTop(newTop);
					$(htmlObj).setHeight(height);
				};
				setTopOptions(obj);
			}
	},
	"audioplugin":function(url,text,audbutt,stopbutt,timerstart,timerStop){
		var context;
		var bufferSound = null;
		//button.addEventListener('click',initAudio,false);
		//stopbutt.addEventListener('click',stopSound,false);
		$(audbutt).on('click',initAudio);
		$(stopbutt).on('click',function()
			{
				if(!timerstart && timerStop)
				{
					source.stop(0);
					buffer = null;
					$(text).html("Stopped...");
				}else if(timerstart && !timerStop){
					$(text).html("Music is not yet started & Loaded .... Please wait");
				}
			});
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
				source = context.createBufferSource();
				source.buffer = buffer;
				source.connect(context.destination);
				console.log(source);
				source.start(0);
				timerstart = false;
				timerStop = true;
			}	
		}
		return (!timerstart && timerStop);
	},
	"ajaxcore":{ 
		"coreGetPost":function(url,method,elemId){
			var xhr;
			if(window.XMLHttpRequest)
			{
				xhr = new XMLHttpRequest();
			}
			else
			{
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			}
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4 && xhr.status == 200)
				{
					document.getElementById(elemId).innerHTML = JSON.parse(xhr.responseText)[1];
				}
			};
			xhr.open(method,url,true);
			xhr.send();
		}
	},
	"windowresize":{ 
		"overflowside":function()
		{
			width = $(window).innerWidth();
			height = $(window).innerHeight();
			$('body').width(( $(document).width() ) - ($(document).width() - (width)));
			$('body').height(( $(document).height() ) - ($(document).height() - (height)));
			
			$(document).width(( $(document).width() ) - ($(document).width() - (width)));
			$(document).height(( $(document).height() ) - ($(document).height() - (height)));
			
			window.addEventListener('resize',jKefex.windowresize.resize,false);
		},
		"resize":function()
		{
			width = $(window).innerWidth();
			height = $(window).innerHeight();
			$('body').width(( $(document).width() ) - ($(document).width() - (width)));
			$('body').height(( $(document).height() ) - ($(document).height() - (height)));
			
			$(document).width(( $(document).width() ) - ($(document).width() - (width)));
			$(document).height(( $(document).height() ) - ($(document).height() - (height)));
		}
	},
	"cssBoxLayout":function(){ 
		
	},
	"fileplugin":function($){
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
	},
	"responseSlideshow":function(next,prev,wrapper,innerWrapper,element,autoPlay){
		var wrapperWidth = ($(element).outerWidth())*($(element).length);
		function resized()
		{
			width = $(window).innerWidth();
			$(wrapper).outerWidth($(window).innerWidth() - 86);
			$(innerWrapper).outerWidth(wrapperWidth);
		}
		resized();	
		$(window).resize(function()
		{
			resized();
		});
		$(next).click(function(){
			$(wrapper).animate({scrollLeft:"+="+$(innerWrapper).outerWidth()/($(element).length)+"px"},'slow');
			if(autoPlay && $(wrapper).prop('scrollLeft')+$(element).outerWidth() == wrapperWidth)
			{
				$(wrapper).animate({scrollLeft:'0px'});
			}
		});
		$(prev).click(function(){
			$(wrapper).animate({scrollLeft:"-="+$(innerWrapper).outerWidth()/($(element).length)+"px"},'slow');
			if(autoplay && $(wrapper).prop('scrollLeft')+$(element).outerWidth() == ($(element).outerWidth()))
			{
				$(wrapper).animate({scrollLeft:'0px'});
			}
		});
	},
	"chatplugin":function(){

	},
	"dragAnDrop":function(elem){
		function handleDragStart(e)
		{
			dragElem = this;
			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData('text/html',this.innerHTML);
		}
		function handleDragEnter()
		{
			this.classList.add('over');
		}
		function handleDragOver(e)
		{
			if(e.preventDefault)
			{
				e.preventDefault();
			}
			//e.dataTransfer.dropEffect = "move";
		}
		function handleDragLeave()
		{
			this.classList.add('over');
		}
		function dragend()
		{
			this.classList.remove('over');
		}
		function handleDrop(e)
		{
			if(e.stopPropagation)
			{
				e.stopPropagation();
			}
			if(dragElem != this)
			{
				dragElem.innerHTML = this.innerHTML;
				this.innerHTML = e.dataTransfer.getData('text/html');
			}
			return false;
		}
		var cols = document.querySelectorAll(elem);
		[].forEach.call(cols,function(col){
			col.addEventListener('dragstart', handleDragStart, false);
			col.addEventListener('dragenter', handleDragEnter, false);
			col.addEventListener('dragover', handleDragOver, false);
			col.addEventListener('dragleave', handleDragLeave, false);
			col.addEventListener('drop', handleDrop, false);
			col.addEventListener('dragend', dragend, false);
		});
	},
	"workers":function(workerURL,elem){
		var worker = new Worker(workerURL);
		worker.postMessage('Hello');
		worker.addEventListener('message',function(e){
			$(elem).html(e.data);
		},false);
	},
	"jqueryUIslideupdown":function($) {
			'use strict';
			$.fn.slidy = function() {
				var set = false;
				$(this).click(function() {
					if (set) {
						$(this).find('.menu').slideUp();
						set = false;
					} else {
						$(this).find('.menu').slideDown();
						set = true;
					}
				});
			}
	},
	"validation": function(){
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
			},
	 "HistoryView":{ init:function(){
						var self = this;
						$('div>ul>li').on('click','a',function(e){
							e.preventDefault();
							self.templ(this);
							self.updateHistroy(this);
						});
					},
					templ:function(temp){
						var template = $('#template').html().replace(/{{title}}/g,temp.title).replace(/{{src}}/g,temp.href);
						$('#content').html(template);
					},
					updateHistroy:function(data){
						var datastore = { "tit": data.dataset.state ,"title": data.title ,"href": data.href};
						history.pushState(datastore, data.title, data.href);
					},
					handleState:function(){
						var self = this;
						$(window).bind('popstate',function(e){
							if(e.originalEvent.state)
							{
								self.templ(e.originalEvent.state);	
							}
						});
					}
				}
};

}
catch(e)
{
	console.log(e);
}