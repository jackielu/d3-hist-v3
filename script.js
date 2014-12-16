var histogramData;

//CALL THE DATA
d3.json("landcoversumm.geojson", function(data) {
    drawChartCan(data);
})

//CREATE VARIABLES
var hist;
var margin, padding;
var width, height;
var svg, bar;
var makeRoundP, formatCount;
var xScale, xAxis, xAxis2, yScale, yAxis, yAxis2;


//CREATE THE VARIABLES NEEDED TO DRAW THE CHART
//select the div for the histogram and define it as a variable
hist = d3.select("#hist");

//this is where you define the margin of the SVG rectangle that is attached to #hist
margin = {top: 0, right: 0, bottom: 0, left: 10};

//dimension of the SVG rectangle
width = 960 - margin.left - margin.right;
height = 300 - margin.top - margin.bottom;

//create the SVG rectangle
svg = hist.append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//padding value to push the elements in away from the edges of the SVG
padding = 50;

//a function for formatting numbers
makeRoundP = d3.format(".3p") 

//a formatter for counts
formatCount = d3.format(",.0f");


//define the xScale
xScale = d3.scale.linear()
  .domain([0,100])
  .range([padding, width - padding]);

xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickFormat(function(d) { return d + "%"; });

xAxis2 = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

xAxis2.append("text")
  .attr("x", width / 2)
  .attr("y", 30)
  .attr("text-anchor", "middle")
  .attr("class", "xLabel")

yScale = d3.scale.linear()    
  .range([height - padding, padding]);

yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")

yAxis2 = svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);


//FUNCTION TO DRAW THE CHART
function drawChartCan(data){

  //grab the values you need and bin them
  histogramData = d3.layout.histogram()
    .bins(xScale.ticks(10))
    (data.features.map(function (d) {
        return d.properties.Can_P}));

  window.histogramData = histogramData;

  yScale.domain([0, d3.max(histogramData, function(d) { return d.y; })])
    .nice();
  yAxis.scale(yScale);
  yAxis2.call(yAxis);


  xAxis2.select(".xLabel")
    .text("Canopy Percentage")

  //bind the data once
  bar = svg.selectAll(".bar")
      .data(histogramData)

  //handle new elements
  bar.enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });

  bar.append("rect")
      .attr("x", 0)
      .attr("y", function (d) { (height - padding) - yScale(d.y);})
      .attr("width", xScale(histogramData[0].dx)/2)
      .attr("height", function (d) { return (height - padding) - yScale(d.y); })
      //color the bars using the color function for the layer
      .style("fill", "#41ab5d")

    // handle updated elements
  bar.transition()
    .duration(3000)
    .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; })

    // handle removed elements
  bar.exit()
    .remove();
}


//FUNCTION TO UPDATE THE CHART ON CLICK
function drawChartImperv(data) {

  //grab the values you need and bin them
  histogramData = d3.layout.histogram()
    .bins(xScale.ticks(10))
    (data.features.map(function (d) {
        return d.properties.Imperv_P}));

  window.histogramData = histogramData;

  yScale.domain([0, d3.max(histogramData, function(d) { return d.y; })])
    .nice();
  yAxis.scale(yScale);
  yAxis2.call(yAxis);

  xAxis2.select(".xLabel")
    .text("Impervious Percentage")

  //bind the data once
  bar = svg.selectAll(".bar")
      .data(histogramData)

  //handle new elements
  bar.enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });

  bar.append("rect")
      .attr("x", 0)
      .attr("y", function (d) { (height - padding) - yScale(d.y);})
      .attr("width", xScale(histogramData[0].dx)/2)
      .attr("height", function (d) { return (height - padding) - yScale(d.y); })
      //color the bars using the color function for the layer
      .style("fill", "#309195")

    // handle updated elements
  bar.transition()
    .duration(3000)
    .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });

    // handle removed elements
  bar.exit()
    .remove();
}
//END CODE FOR UPDATE HISTOGRAM FUNCTION


//RUN HISTOGRAM UPDATE FUNCTION ON CLICK
d3.select("#Imperv_P.layer")
  .on("click", function (d) {
    //console.log(this);
    d3.json("landcoversumm.geojson", function(data) {
    drawChartImperv(data);
})});



//RUN HISTOGRAM UPDATE FUNCTION ON CLICK
d3.select("#Can_P.layer")
  .on("click", function (d) {
    //console.log(this);
    d3.json("landcoversumm.geojson", function(data) {
    drawChartCan(data);
})});