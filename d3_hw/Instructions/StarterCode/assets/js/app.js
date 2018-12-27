// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("/data/data.csv").then(function(Data) {

  console.log(Data);

   // Cast the poverty and healthcare values to a number for each piece of Data
  Data.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
  });

// Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xLinearScale = d3.scaleLinear()
    .domain([25, d3.max(Data, d => d.age)])
    .range([0, chartWidth]);
    

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d.smokes)])
    .range([chartHeight, 0]);

  // var xValue = function(d) { return d.poverty}; // data -> value
  // var xMap = function(d) { return xBandScale(xValue(d));}; // data -> display

  // var yValue = function(d) { return d.healthcare};
  // var yMap = function(d) { return yScale(yValue(d))};, // data -> display

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(11);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".dot")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", 20)
    .attr("class", "stateCircle")
    // .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.smokes))
    .text("text", d => d.state);

  chartGroup.append("text")
    // Position the text
    // Center the text:
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 20})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Age");

   // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Smokers");

   // chartGroup
   // .append("text")
   // .style("text-anchor", "middle")
   // .style("font-size", "12px")
   // .selectAll("statetxt")
   // //.data(Data)
   // .enter()
   // .append("statetxt")
   // .attr("x", d => xLinearScale(d.smokes))
   // .attr("y", d => yLinearScale(d.age))
   // .text(data.abbr);


});
