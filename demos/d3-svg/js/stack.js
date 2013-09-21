var jKefex = function(){
	this.width = 1240;
	this.height = 550;
};

jKefex.prototype.canvas = function (){
	this.canvas = d3.select('.d3-wrapper')
		.append('svg')
		.attr({'width':this.width,'height':this.height});
};

jKefex.prototype.buildings = function(){
	this.building = this.canvas.append('image')
							.attr('id','building')
							.attr('xlink:href','assets/johnny_automatic_Cincinnati_Skyline.png')
							.attr({'x':0,'y':300,'width':this.width,'height':300});
};

jKefex.prototype.data = function(){
	this.waterHeight = 100;
    this.wavexOne = d3.random.normal(1200,1200);
    this.wavexTwo = d3.random.normal(1100,1100);
    this.wavexThree = d3.random.normal(1000,1000);
    this.waveyOne = d3.random.normal(40,20);
    this.waveyTwo = d3.random.normal(70,20);
	var x1 = this.wavexOne;
	var x2 = this.wavexTwo;
	var x3 = this.wavexThree;
	var y1 = this.waveyOne;
	var y2 = this.waveyTwo;
	this.datawave = d3.range(60).map(function(i){
		return {'x':x1(i),'y':y1(i)};
	});
	this.datawaves = d3.range(60).map(function(i){
		return {'x':x2(i),'y':y2(i)};
	});
	this.datawaves3 = d3.range(60).map(function(i){
		return {'x':x3(i),'y':y1(i)};
	});
	this.datawave.sort(function(o,n){
		return d3.ascending(o['x'],n['x']);
	});
	this.datawaves.sort(function(o,n){
		return d3.ascending(o['x'],n['x']);
	});
	this.datawaves3.sort(function(o,n){
		return d3.ascending(o['x'],n['x']);
	});
};

jKefex.prototype.water = function(){
	var stack = d3.layout.stack()
						  .offset('silhouette')
						  .values(function(d){ return d.values; });

	var layers = [{"values": this.datawave},{"values": this.datawaves},{"values": this.datawaves3}];
	var wave = d3.svg.area()
						.interpolate('basis')
						.x(function(d){ return d.x; })
						.y0(this.waterHeight)
						.y1(function(d){ return d.y; });

	this.area = this.canvas.append('g')
						.attr('transform','translate(0,'+(this.height-this.waterHeight)+')')
						.attr('id','water')
						.selectAll('path')
						.data(stack(layers))
						.enter()
						.append('path')
						.style('fill','hsla(195, 86%, 44%, 1)')
						.style('stroke','hsla(0, 0%, 4%, 0.40)')
						.style('stroke-width','1px')
						.attr('d',function(d){ return wave(d.values); });
};

jKefex.prototype.sun = function(){
	this.sunset = this.canvas.append('circle')
							.attr({'cx':200,'cy':100,'r':50})
							.style('fill','hsla(43, 100%, 51%, 1)')
							.style('stroke','hsla(195, 72%, 0%, 0.52)')
							.style('stroke-width','1.5px');
}

jKefex.prototype.clouds = function(){
	var cloudData = d3.range(15).map(function(r){
		return {'cx':r*100,'cy':Math.random()*50,'rx':r+200,'ry':r+50};
	});
	this.cloud = this.canvas.append('g')
						.attr('id','cloudset')
						.selectAll('ellipse')
						.data(cloudData)
						.enter()
						.append('ellipse')
						.attr('cx',function(d){
							return d.cx;
						})
						.attr({'cy':function(d){
							return d.cy;
						},'rx':function(d){
							return d.rx;
						},'ry':function(d){
							return d.ry;
						}})
						.style('fill','hsla(51, 44%, 100%, 0.94)');
};

jKefex.prototype.imgPath = function(){
	this.image = this.canvas.append('image')
							.attr('id','obama')
							.attr('xlink:href','assets/1298128593.png')
							.attr({'x':1300,'y':250,'width':150,'height':300});

	this.transImage = d3.select('#obama')
							.transition()
							.duration(50000)
							.attr('x',100);
};

jKefex.prototype.boat = function(){
	var boatData = [{'x':100,'y':130},{'x':50,'y':0},{'x':600,'y':0},{'x':550,'y':130}];
	var colorScale = d3.scale.linear()
							.domain([0,boatData.length])
							.range(['hsla(43, 100%, 20%, 1)','hsla(43, 100%, 16%, 1)']);
	var line = d3.svg.line()
					.interpolate('cardinal-closed')
					.tension(0.95)
					.x(function(d){ return d.x; })
					.y(function(d){ return d.y; });
	this.boat = this.canvas.append('g')
					.attr('transform','translate(1000,'+(this.height - 100)+')')
					.attr('id','boat')
					.append('path')
					.data([boatData])
					.attr('d',line)
					.style({'stroke':'#000','stroke-width':'2px','fill':function(d,i){ return colorScale(i); }});

	this.transboat = d3.select('#boat')
						.transition()
						.duration(50000)
						.attr('transform','translate(-200,'+(this.height - 100)+')');
};

jKefex.prototype.transit = function(){
	var cxCloud = d3.range(15).map(function(r){
		return {'cx':(r*Math.random()*150)};
	});
	this.trans = this.cloud.data(cxCloud)
							.transition()
							.duration(8000)
							.attrTween('cx',function tween(d, i, a) {
								  return d3.interpolate(a,d.cx);
								});
};

jKefex.prototype.birds = function(){
	this.bird = this.canvas.append('image')
							.attr('id','bird')
							.attr('xlink:href','assets/Mockingbird_silhouette.png')
							.attr({'x':this.width-100,'y':0,'width':100,'height':100});
};

jKefex.prototype.blueFish = function(){
	this.fish = this.canvas.append('image')
							.attr('id','fish')
							.attr('xlink:href','assets/blue-fish.png')
							.attr({'x':1100,'y':550,'width':100,'height':100})
							.attr('transform','rotate(0,1100,550)');

};

jKefex.prototype.audio = function(){
	$('audio')[0].volume = 0.3;
	$('audio')[0].play();
	$('audio')[1].volume = 1.0;
	$('audio')[1].play();
};

var $kefex = new jKefex();
$kefex.canvas();
$kefex.buildings();
$kefex.clouds();
$kefex.sun();
$kefex.birds();
$kefex.imgPath();
$kefex.boat();
$kefex.audio();

(function renderWater(){
	d3.select('#water').remove();
	$kefex.data();
	$kefex.water();
	setTimeout(renderWater,10000/22);
})();

(function renderClouds(){
	$kefex.transit();
	setTimeout(renderClouds,8000);
})();



