var margin = {top: 20, right: 20, bottom: 100, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//get json object
d3.json("/igMediaCounts", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== d.username; }));

  /*data.users(function(d) {
    //var y0 = 0;
    d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
  });*/

  //data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.users.map(function(d) { return d.username; }));
  y.domain([0, d3.max(data.users, function(d) { return d.counts.follows; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	  .selectAll("text")  
	.style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) {
      return "rotate(-65)" 
    });
	  
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Following");

  svg.selectAll(".bar")
    .data(data.users)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.username); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.counts.follows); })
    .attr("height", function(d) { return height - y(d.counts.follows); }); 
	  
  /*
  var state = svg.selectAll(".state")
      .data(data.users)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.counts.follows) + ",0)"; });
*/
  svg.selectAll("rect")
      .data(data.users)
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.counts.followed_by); })
      .attr("height", function(d) { return y(d.counts.follows) - y(d.counts.followed_by); })
      .style("fill", function(d) { return color(d.username); });
/*
  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
*/
  /*legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });*/

});