var urlperson = "json/",
	persons,
	links,
	linksData,
    connection = d3.select(".connection-popup"),   
	person_det = d3.select(".person-det-popup"),
    svgElement,
    width = 960,
    height = 500,
    personLevelCount = 0,
    tabList = document.querySelectorAll(".tab-button"),
    tabBodyDiv = document.querySelectorAll(".tab-body"),
    tabListLength = tabList.length,
    tabBodyDivLength = tabBodyDiv.length,
    baseTabList = document.querySelectorAll(".tab-button1"),
	baseTabBodyDiv = document.querySelectorAll(".tab-body1"),
	baseTabListLength = baseTabList.length,
	baseTabBodyDivLength = baseTabBodyDiv.length,
	tabList1 = document.querySelectorAll(".tab-button1"),
    tabBodyDiv1= document.querySelectorAll(".tab-body1"),
    tabListLength1 = tabList.length,
    tabBodyDivLength1 = tabBodyDiv.length;
	
var initialModule = {
	"jsonData":function(person){
		d3.json(urlperson+person,function (data) {
		       persons = data.PersonDataList;
		       persons.forEach(function(listdata){
		            links = listdata.relationlist;
		            linksData = listdata.relationDatalist;
		       });
		       initialModule.layoutUpdate();
		 });
	},
	"initialSetup":function(){
		function mouseover() {
		    d3.select(this).select("circle").transition()
		        .duration(750)
		        .attr("r", 16);
		}

		function mouseout() {
		    d3.select(this).select("circle").transition()
		        .duration(750)
		        .attr("r", 8);
		}
		d3.selectAll('.popup-cls').on('click',function(){
				d3.selectAll('.pop-close').attr({'style':'display:none'});
		});
	},
	"zoom" : function(){
		 $("#slider").slider({
	            range: "min",
	            value: 1,
	            min: 0,
	            max: 4,
	            step: 0.25,
	            slide: function(event, ui) {
	                	sliderValue = ui.value,
	                    translateX  = 5 * sliderValue,
	                    translateY  = 2 * sliderValue,
	                    scaleValue  = 0.8 * sliderValue;
	                initialModule.redraw([translateX,translateY],scaleValue);

	            }
	        });
	},
	"layoutUpdate":function(){
			// remove all elements inside visualization
		    var line = d3.selectAll("line").remove(), // remove all links on screen
		        g = d3.selectAll("g").remove(), // remove all nodes on screen
		        nodes = {}; // var for d3js

		    d3.select(".svg-holder").html("");
		    // hide popup's
		    connection.style("display", "none");
		    person_det.style("display", "none");

		    // Compute the distinct nodes from the links.
		    links.forEach(function(link) {
		        link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
		        link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
		        link.source["id"] = link.linkId;
		    });

		    var force = d3.layout.force()
		                    .nodes(d3.values(nodes))
		                    .links(links)
		                    .size([width, height])
		                    .linkDistance(200)
		                    .charge(-400);
		    	
		    svgElement = d3.select(".svg-holder").append("svg")
		                .attr("width", width)
		                .attr("height", height)
		                .attr("pointer-events", "all")
		                .append('svg:g');

		    var link = svgElement.selectAll(".link")
		                    .data(force.links())
		                    .enter().append("line")
		                    .attr("class", "link")
		                    .attr("style", function(d) {
		                        var index;
		                        for(var i = 0; i < linksData.length ; i++){
		                                if(linksData[i].linkid == d.source.id){
		                                index = i;
		                                break; 
		                                }
		                        }
		                        return "stroke: " + linksData[index].relationColor; //  change
		                    })
		                    .on("click", initialModule.connectionDetails);

		    var node = svgElement.selectAll(".node")
		                    .data(force.nodes())
		                    .enter().append("g")
		                    .attr("class", "node")
		    				.on("click", initialModule.personDetails)
		                    .call(force.drag);

		    node.append("image")
		        .attr("xlink:href", function(d) {
		        var index;
		            for(var i = 0; i < linksData.length ; ++i){
		                    if(linksData[i].linkid == d.id ){
		                        index = i;
		                    break; 
		                    }
		            }
		            if(index != undefined)
		            {
		                return linksData[index].imgPath;       
		            }
		        })
		        .attr("x", -8)
		        .attr("y", -8)
		        .attr("pointer-events", "all")
		        .attr("width", 32)
		        .attr("height", 32);		       
		    node.append("text")
		        .attr("x", -10)
		        .attr("y", 32)
		        .attr("dy", ".46em")
		        .text(function(d) { return d.name; });

		    node.append("rect")
		        .attr("x", -18)
		        .attr("y", -15)
		        .attr("width", 60)
		        .attr("height", 60)
		        .attr("style", function(d) {
		            return "fill: #fff; fill-opacity: 0.2; stroke: #ff0000;  stroke-width: 0;"; // stroke-width: 2;
		         });

		    // restart force functionality
		    force.on("tick", tick)
		         .start();

		    function tick() {
		      link
		          .attr("x1", function(d) { return d.source.x; })
		          .attr("y1", function(d) { return d.source.y; })
		          .attr("x2", function(d) { return d.target.x; })
		          .attr("y2", function(d) { return d.target.y; });

		      node
		          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		    }
	},
	"getPersonDetails":function(el) {
		    var id = el.dataset["personid"];
		    if(personLevelCount < 1) {
		        $.get(urlperson+(el.textContent)).done(function(data){
		            var person = data.PersonDataList;
		            person.forEach(function(listdata){
		                links = listdata.relationlist;
		                linksData = listdata.relationDatalist;
		            });
		                personLevelCount++;
		                initialModule.layoutUpdate();
		        });
		    }
	},
	"redraw":function(translateValue, scaleValue){
		if((translateValue != undefined) && scaleValue != 0)
		{
			svgElement.attr("transform", "translate(" + translateValue + ")scale(" + scaleValue + ")");
		}
	},
	"back" :function(){
			if(personLevelCount > 0)
		    {
		        initialModule.jsonData("Kevin.json");
		        personLevelCount--;
		    }
		    else{
		        alert('Presently you are in Root Node');
		    }
	},
	"connectionDetails": function(oData) {
		    var index;
		    for(var i = 0; i < linksData.length ; i++){
		            if(linksData[i].linkid == oData.linkId){
		            index = i;
		            break; 
		            }
		    }
		    var linkData = linksData[index]; 
		    connection.select(".popup-header").html(linkData["relationType"]);
		    connection.select(".popup-body .strength").html(linkData["strength"]);
		    // reset tab
		    initialModule.toggleTab(document.getElementById("tab1"));
		    // populate tab data
		    for(var j = 0; j < tabBodyDivLength; j++) {
		        tabBodyDiv[j].innerHTML = linkData["tabsData"][j].tabBodyText;	
		    }
		    connection.style("display", "block");
		    connection.style("top", oData.source.py + "px");
		    connection.style("left", oData.source.px + "px");
		},
	"toggleTab":function(el) {
			    var classList = el.classList;

			    if(!classList.contains("active")) {
			        // reset - remove active class from all tabs
			        for(var i = 0; i < tabListLength; i++) {
			            tabList[i].classList.remove("active");
			        }
			        // apply active class to the selected element
			        classList.add("active");

			        // reset - remove active class from all tabs
			        for(var j = 0; j < tabBodyDivLength; j++) {
			            tabBodyDiv[j].style.display = "none";
			        }
			        // apply active class to the selected element
			        document.getElementById("tabData_" + el.id).style.display = "block";
			    }
			},
	"toggleOverlay"	:function(el) {
		    var rectElements = document.querySelectorAll("rect"),
		        rectElementsLength = rectElements.length,
		        borderWidth = 0;

		    if(el.checked) {
		        borderWidth = 2;
		    } else {
		        borderWidth = 0;
		    }

		    for(var i = 0; i < rectElementsLength; i++) {
		        rectElements[i].style.strokeWidth =  borderWidth;
		    }
		},
	"personDetails" :function(oData) {
		    var index;
		    for(var i = 0; i < linksData.length ; i++){
		            if(linksData[i].linkid == oData.id){
		            index = i;
		            break; 
		            }
		    }
		    var linkData = linksData[index],
		        tabData = linksData[index].tabsData1; 
		   	person_det.select(".popup-header1").html(linkData.name);
			person_det.select(".popup-header1").attr("data-personid", oData.id);
			
		    initialModule.popup1toggleTab(document.getElementById("pop1tab1"));
			
			for(var j = 0; j < baseTabBodyDivLength; j++) {
		        baseTabBodyDiv[j].innerHTML = tabData[j].prime;	
		    }
			
		    person_det.style("display", "block");
		    person_det.style('top',function(){
		    							if(oData.y < 200){
		    								return oData.y + "px";
		    							}
		    							else
		    							{
		    								return (oData.y - 200) + "px";
		    							}
		    						});
		    person_det.style("left", function(){
		    							if(oData.x < 700){
		    								return oData.x + "px";
		    							}
		    							else
		    							{
		    								return (oData.x - 300) + "px";
		    							}
		    					});
		    									 
		},
	"popup1toggleTab":function(e2) {
	    var classList1 = e2.classList;

	    if(!classList1.contains("active")) {
	        // reset - remove active class from all tabs
	        for(var i = 0; i < baseTabBodyDivLength; i++) {
	            baseTabList[i].classList.remove("active");
	        }
	        // apply active class to the selected element
	        classList1.add("active");

	        // reset - remove active class from all tabs
	        for(var j = 0; j < baseTabBodyDivLength; j++) {
	            baseTabBodyDiv[j].style.display = "none";
	        }
	        // apply active class to the selected element
	        document.getElementById("tabData_" + e2.id).style.display = "block";
	    }
	},
	"toggleTab1":function(el) {
	    var classList = el.classList;

	    if(!classList.contains("active")) {
	        // reset - remove active class from all tabs
	        for(var i = 0; i < tabListLength; i++) {
	            tabList1[i].classList.remove("active");
	        }
	        // apply active class to the selected element
	        classList.add("active");

	        // reset - remove active class from all tabs
	        for(var j = 0; j < tabBodyDivLength; j++) {
	            tabBodyDiv1[j].style.display = "none";
	        }
	        // apply active class to the selected element
	        document.getElementById("tabData_" + el.id).style.display = "block";
	    }
	}
};

initialModule.jsonData("Kevin.json");
initialModule.initialSetup();
initialModule.zoom();