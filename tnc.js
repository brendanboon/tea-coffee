
var quantizecc = d3.scale.quantize()
    .domain([0, 1250000])
    .range(d3.range(9).map(function(i) { return "r" + i + "-9"; }));

var quantizetc = d3.scale.quantize()
    .domain([0, 1300000])
    .range(d3.range(9).map(function(i) { return "o" + i + "-9"; }));
    
var quantizecp = d3.scale.quantize()
        .domain([0, 72])
        .range(d3.range(9).map(function(i) { return "r" + i + "-9"; }));

var quantizetp = d3.scale.quantize()
        .domain([0, 20])
        .range(d3.range(9).map(function(i) { return "o" + i + "-9"; }));

var legendwidth = 20,
    legendheight = 20;

function cc(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("svg").transition().duration(300);
    
    // legend
    var color_domain = [100, 40000, 50000, 75000, 100000, 200000, 350000, 500000]
    var ext_color_domain = [0, 100, 40000, 50000, 75000, 100000, 200000, 350000, 500000]
    var legend_labels = [0, 100, 40000, 50000, 75000, 100000, 200000, 350000, 500000];    

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#fff7ec","#fee8c8","#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*legendheight) - 2*legendheight;})
          .attr("width", legendwidth)
          .attr("height", legendheight)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*legendheight) - legendheight - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 35)
         .attr("y", 300)
         .text("Tonnes Consumed");
    
    d3.json("https://github.com/brendanboon/tea-coffee/blob/master/realfinaljson.json", function(error, globe) {
        svg.selectAll("country")
        .data(topojson.feature(globe, globe.objects.countries).features)
        .enter().insert("path")
        .attr("class", "country")
        .attr("d", path)
		.attr("stroke-width", 1)
		.attr("stroke", "black")
		.style()
        .on("click", clicked)
        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(300)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.properties.country + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Coffee Consumed (Tonnes): " + "</div>" +  "<div style=\"float:right\">" + d.properties.cc
             )  
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(300)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) { 
            if (d.properties.cc == undefined || d.properties.cc == null) { return "grey" }
            return quantizecc(d.properties.cc*3); });
    })
}

function tc(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("svg").transition().duration(300);
    
    // legend for tea consumption   
    var color_domain = [50, 100, 200, 500, 1000, 5000, 10000, 50000]
    var ext_color_domain = [0, 2500, 7500, 15000, 37500, 75000, 125000, 300000, 1320000]
    var legend_labels = [0, 2500, 7500, 15000, 37500, 75000, 125000, 300000, 1320000];    

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#f7fcf5","#e5f5e0","#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*legendheight) - 2*legendheight;})
          .attr("width", legendwidth)
          .attr("height", legendheight)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*legendheight) - legendheight - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 35)
         .attr("y", 300)
         .text("Tonnes Consumed");
    
    d3.json("https://github.com/brendanboon/tea-coffee/blob/master/realfinaljson.json", function(error, globe) {
        svg.selectAll("country")
        .data(topojson.feature(globe, globe.objects.countries).features)
        .enter().insert("path")
        .attr("class", "country")
        .attr("d", path)
		.attr("stroke-width", 1)
		.attr("stroke", "black")
		.style()
        .on("click", clicked)
        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(300)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.properties.country + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Tea Consumed (Tonnes): " + "</div>" +  "<div style=\"float:right\">" + d.properties.tc
             )  
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(300)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) { 
            if (d.properties.tc == undefined || d.properties.tc == null) { return "grey" }
            return quantizetc(d.properties.tc*3.5); });
    })
}


function cp(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("body").transition();
    
    // legend
    var color_domain = [5, 10, 15, 20, 25, 30, 35, 40]
    var ext_color_domain = [0, 5, 10, 15, 20, 25, 30, 35, 40]
    var legend_labels = ["0", "5", "10", "15", "20", "25", "30", "35", "40"];    

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#fff7ec","#fee8c8","#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);

      var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*legendheight) - 2*legendheight;})
          .attr("width", legendwidth)
          .attr("height", legendheight)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*legendheight) - legendheight - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 35)
         .attr("y", 300)
         .text("Grams/Capita/Day");
    
    d3.json("https://github.com/brendanboon/tea-coffee/blob/master/realfinaljson.json", function(error, globe) {
        svg.selectAll("country")
        .data(topojson.feature(globe, globe.objects.countries).features)
        .enter().insert("path")
        .attr("class", "country")
        .attr("d", path)
		.attr("stroke-width", 1)
		.attr("stroke", "black")
		.style()
        .on("click", clicked)
        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(300)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.properties.country + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Coffee Consumed Per Person: " + "</div>" +  "<div style=\"float:right\">" + d.properties.cp
             )  
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(300)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) { 
            if (d.properties.cp == undefined || d.properties.cp == null) { return "grey" }
            return quantizecp(d.properties.cp*3); });
    })
}

function tp(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("body").transition();
    
    var color_domain = [5, 10, 15, 20, 25, 30, 35, 40]
    var ext_color_domain = [ 0, 5, 10, 15, 20, 25, 30, 35, 40]
    var legend_labels = ["0", "5", "10", "15", "20", "25", "30", "35", "40"];
    
     var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#f7fcf5","#e5f5e0","#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*legendheight) - 2*legendheight;})
          .attr("width", legendwidth)
          .attr("height", legendheight)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*legendheight) - legendheight - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 35)
         .attr("y", 300)
         .text("Grams/Capita/Day");
    
    d3.json("https://github.com/brendanboon/tea-coffee/blob/master/realfinaljson.json", function(error, globe) {
        svg.selectAll("country")
        .data(topojson.feature(globe, globe.objects.countries).features)
        .enter().insert("path")
        .attr("class", "country")
        .attr("d", path)
		.attr("stroke-width", 1)
		.attr("stroke", "black")
		.style()
        .on("click", clicked)
        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(300)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.properties.country + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Tea Consumed Per Person: " + "</div>" +  "<div style=\"float:right\">" + d.properties.tp
             )  
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(300)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) { 
            if (d.properties.tp == undefined || d.properties.tp == null) { return "grey" }
            return quantizetp(d.properties.tp*2.75 ); });
    })
}
