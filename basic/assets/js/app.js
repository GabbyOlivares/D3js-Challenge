// Data Journalism - D3

/** *********************************************************
1. Create a scatter plot between two of the data variables 
such as Healthcare vs. Poverty or Smokers vs. Age.
********************************************************** */
// set svg variables and margins
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

// set svg container attribues
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


/** *********************************************************
2.Using the D3 techniques we taught you in class, 
create a scatter plot that represents each state with circle elements.
You'll code this graphic in the app.js file of your homework 
directory—make sure you pull in the data from data.csv by using the d3.csv function. Your scatter plot should ultimately appear like the image at the top of this section.
********************************************************** */
// create svg and d3 function
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// group charts. g group Container
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function(myData) {

    // number conversion. data parsing change string to numeric value
    myData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;

    });

    // x function
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(myData, d => d.poverty)*0.9,
            d3.max(myData, d => d.poverty)*1.1])
        .range([0, width]);

    // y function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(myData, d => d.healthcare)*1.1])
        .range([height, 0]);


/** *********************************************************
4.Create and situate your axes and labels to the left 
and bottom of the chart.
********************************************************** */        

    // set bottom/left axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // x axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "16px")
        .call(bottomAxis);

    // y axis
    chartGroup.append("g")
        .style("font-size", "16px")
        .call(leftAxis);


/** *********************************************************
3.Include state abbreviations in the circles.
********************************************************** */        
    // function for circles
    chartGroup.selectAll("circle")
        .data(myData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 12)
        .attr("fill", "blue")
        .attr("opacity", ".6");


    // add State abbrev to circles
    chartGroup.selectAll("text.text-circles")
        .data(myData)
        .enter()
        .append("text")
        .classed("text-circles",true)
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy",5)
        .attr("text-anchor","middle")
        .attr("font-size","12px")
        .attr("fill", "white");

    // y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Lacks Healthcare (%)");

    // x axis
    chartGroup.append("text")
        .attr("y", height + margin.bottom/2 - 10)
        .attr("x", width / 2)
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Poverty Rate (%)");


});


/** *********************************************************
5.Note: You'll need to use python -m http.server to run the visualization.
This will host the page at localhost:8000 in your web browser.
********************************************************** */




















