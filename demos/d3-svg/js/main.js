var jKefex = function(){
	this.width = 1200;
	this.height = 650;
	this.waterHeight = 100;
    this.waveX = d3.random.normal(1200,1200);
    this.waveY = d3.random.normal(70,20);
};

jKefex.prototype.canvas = function (){
	this.canvas = d3.select('#wrapper')
		.append('svg')
		.attr({'width':this.width,'height':this.height});
};

jKefex.prototype.data = function(){
	var x = this.waveX;
	var y = this.waveY;
	this.datawave = d3.range(100).map(function(i){
		return {'x':x(i),'y':y(i)};
	});
	this.datawave.sort(function(o,n){
		return d3.ascending(o['x'],n['x']);
	});
};

jKefex.prototype.water = function(){
	this.wave = d3.svg.area()
						.interpolate('basis')
						.x(function(d){ return d.x; })
					    .y0(this.waterHeight)
					    .y1(function(d){ return d.y; });

	// this.wave = d3.svg.area()
	// 					.interpolate('basis')
	// 					.x(function(d){ return d.x; })
	// 				    .y0(this.waterHeight)
	// 				    .y1(function(d){ return d.y; });

	// this.area = this.canvas.append('g')
	// 					.attr('transform','translate(0,'+(this.height-this.waterHeight)+')')
	// 					.append('path')
	// 					.data([this.datawave])
	// 					.attr('d',this.wave)
	// 					.style('fill','hsla(201, 100%, 72%, 0.9)');

	this.area = this.canvas.append('g')
						.attr('transform','translate(0,'+(this.height-this.waterHeight)+')')
						.selectAll('path')
						.data([this.datawave])
						.enter()
						.append('path')
						.attr('d',this.wave)
						.style('fill','hsla(201, 100%, 72%, 0.9)');
};

var $kefex = new jKefex();
$kefex.canvas();
$kefex.data();
$kefex.water();