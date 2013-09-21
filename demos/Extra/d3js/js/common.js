// $(function () {
//     // urlperson = "json/";

//      $.get(urlperson+"Adam.json").done(function (data) {
//            persons = data.PersonDataList;
//            // links = data.links;
//            // linksData = data.linksData;
//            persons.forEach(function(listdata){
//                 links = listdata.relationlist;
//                 linksData = listdata.relationDatalist;
//            });
//            update();
//      });
//       /*
//       $.get('json/person.json').done(function (data) {
//             peopleJson = data.PersonDataList;
//             peopleJson.forEach(function(e){
//                 console.log(e.PersonName);
//             });
//             //console.log(peopleJson);
//      });
//      */
// });

 urlperson = "json/";

 d3.json(urlperson+"Adam.json",function (data) {
       persons = data.PersonDataList;
       persons.forEach(function(listdata){
            links = listdata.relationlist;
            linksData = listdata.relationDatalist;
       });
       update();
 });


var coordinates = [0,0], // to store x and y coordinates of mouse
    popup = d3.select(".popup"),
    popupCloseBtn = d3.select(".popup-close"),    
	popup1 = d3.select(".popup1"),
	popupCloseBtn1 = d3.select(".popup-close1"),
    svgElement,
    width = 960,
    height = 500;

/* Update x and y coordinates of mouse */
d3.select('html')
  .on('mousemove', function() {
    // Gets the mouse coordinates
    coordinates = d3.mouse(this);
});

function update() {
    // remove all elements inside visualization
    var line = d3.selectAll("line").remove(), // remove all links on screen
        g = d3.selectAll("g").remove(), // remove all nodes on screen
        nodes = {}; // var for d3js

    d3.select(".svg-holder").html("");
    // hide popup's
    popup.style("display", "none");
    popup1.style("display", "none");

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
                    .charge(-600);
    	
    svgElement = d3.select(".svg-holder").append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("pointer-events", "all")
                .append('svg:g');
                /*.call(d3.behavior.zoom().on("zoom", redraw))
                .append('svg:g');*/

    var link = svgElement.selectAll(".link")
                    .data(force.links())
                    .enter().append("line")
                    .attr("class", "link")
                    .attr("style", function(d) {
                       
                       // changed by VISHAL
                        var index;
                        for(var i = 0; i < linksData.length ; i++){
                                if(linksData[i].linkid == d.source.id){
                                index = i;
                                break; 
                                }
                        }
                       
                            
                        return "stroke: " + linksData[index].relationColor; //  change
                    })
                    .on("click", showDetails);

    var node = svgElement.selectAll(".node")
                    .data(force.nodes())
                    .enter().append("g")
                    .attr("class", "node")
    			
    				.on("click", showDetails1)
                    /* .on("mouseover", mouseover)
                    .on("mouseout", mouseout) */
                    .call(force.drag);

    node.append("image")
        .attr("xlink:href", function(d) {

        // changed by VISHAL
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
        
    /*popup-header1.on("click", function() {
        popup1.style("display", "none");
    })*/

    node.append("rect")
        .attr("x", -18)
        .attr("y", -15)
        .attr("width", 60)
        .attr("height", 60)
        .attr("style", function(d) {
            return "fill: #fff; fill-opacity: 0.1; stroke: #ff0000;  stroke-width: 0;"; // stroke-width: 2;
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
}

// initialize d3 with updated data
/*document.querySelector(".popup-header1").on("click",function(){
    alert("clicked");
    //do something more
})*/
var personLevelCount = 0; /* Temporary fix */
 //Dynamic change of person details
function getPersonDetails(el) {
    var id = el.dataset["personid"];
    if(personLevelCount < 1) {
        
        // changed by VISHAL

        //links = peopleJson[linksData[id -1].name].links; 
        //linksData = peopleJson[linksData[id -1].name].linksData; 

        /*
        peopleJson.forEach(function(person){
            if(person.PersonName == linksData[id -1].name){
                links = person.relationlist;
                linksData = person.relationDatalist;
            }
        });
        */
        $.get(urlperson+(el.textContent)).done(function(data){
            var person = data.PersonDataList;
            person.forEach(function(listdata){
                links = listdata.relationlist;
                linksData = listdata.relationDatalist;
            });
                personLevelCount++;
                update();
        });
    }
}

/* functionality for back button - temporary fix */
function goBack() {
    if(personLevelCount > 0)
    {
        $.get(urlperson+"Adam.json").done(function(data){
            var person = data.PersonDataList;
            person.forEach(function(listdata){
                links = listdata.relationlist;
                linksData = listdata.relationDatalist;
            });
                personLevelCount--;
                update();
        });
    }
    else{
        alert('Presently you are in Root Node');
    }

}

/* function to redraw on mouse wheel(Zoom feature) */
function redraw(translateValue, scaleValue) {
    // console.log(d3.event.translate + " - " + d3.event.scale);
    svgElement.attr("transform", "translate(" + translateValue + ")" + " scale(" + scaleValue + ")");
    // svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}

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

popupCloseBtn.on("click", function() {
    popup.style("display", "none");
});

function showDetails(oData) {
    
    // changed by VISHAL
    var index;
    for(var i = 0; i < linksData.length ; i++){
            if(linksData[i].linkid == oData.linkId){
            index = i;
            break; 
            }
    }
    
    var linkData = linksData[index]; // change
       

    popup.select(".popup-header").html(linkData["relationType"]);
    popup.select(".popup-body .strength").html(linkData["strength"]);
    // reset tab
    toggleTab(document.getElementById("tab1"));
    // populate tab data
    for(var j = 0; j < tabBodyDivLength; j++) {
        tabBodyDiv[j].innerHTML = linkData["tabsData"][j].tabBodyText;	
    }
    popup.style("display", "block");
    popup.style("top", (coordinates[0] - 230) + "px");
    popup.style("left", (coordinates[1] + 170) + "px");
}

/* Popup tab container functionality */
var tabList = document.querySelectorAll(".tab-button"),
    tabBodyDiv = document.querySelectorAll(".tab-body"),
    tabListLength = tabList.length,
    tabBodyDivLength = tabBodyDiv.length;

var baseTabList = document.querySelectorAll(".tab-button1"),
	baseTabBodyDiv = document.querySelectorAll(".tab-body1"),
	baseTabListLength = baseTabList.length,
	baseTabBodyDivLength = baseTabBodyDiv.length;

/* function to handle tab click */
function toggleTab(el) {
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
}

/* function to toggle the overlay around the images and text */
function toggleOverlay(el) {
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
}

popupCloseBtn1.on("click", function() {
    popup1.style("display", "none");
});

function showDetails1(oData) {

     // changed by VISHAL
    var index;
    for(var i = 0; i < linksData.length ; i++){
            if(linksData[i].linkid == oData.id){
            index = i;
            break; 
            }
    }
    var linkData = linksData[index],
        tabData = linksData[index].tabsData1; // change
   
	popup1.select(".popup-header1").html(linkData.name);
	popup1.select(".popup-header1").attr("data-personid", oData.id);
	
    //popup1.select(".popup-header1").html(tabData[0].person);
    //popup.select(".popup-body .strength").html(linkData["strength"]);
    // reset tab
    //toggleTab(document.getElementById("tab1"));
    // populate tab data
	
    popup1toggleTab(document.getElementById("pop1tab1"));
	
	for(var j = 0; j < baseTabBodyDivLength; j++) {
        baseTabBodyDiv[j].innerHTML = tabData[j].prime;	
    }
	
    popup1.style("display", "block");
    popup1.style("top", (coordinates[0] - 230) + "px");
    popup1.style("left", (coordinates[1] + 170) + "px");
}

function popup1toggleTab(e2) {
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
}

var tabList1 = document.querySelectorAll(".tab-button1"),
    tabBodyDiv1= document.querySelectorAll(".tab-body1"),
    tabListLength1 = tabList.length,
    tabBodyDivLength1 = tabBodyDiv.length;

/* function to handle tab click */
function toggleTab1(el) {
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