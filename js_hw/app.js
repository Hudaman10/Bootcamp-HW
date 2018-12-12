// from data.js
var tableData = data;

// YOUR CODE HERE!

var tbody = d3.select("tbody");

tableData.forEach((item) => {
    var row = tbody.append("tr");
    Object.entries(item).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });



var submit = d3.select("#filter-btn");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log(inputValue);

  var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);

  console.log(filteredData);

  tableData.forEach((item) => {
    var row = tbody.append("tr");
    Object.entries(item).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });

});
