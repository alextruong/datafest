//Margins and other global variables
var margin = {top: 50, right: 300, bottom: 50, left: 75};
var barChartWidth = 1500 - margin.left - margin.right,
		barChartHeight = 1500 - margin.top - margin.bottom
		barHeight = 8;

// TO DO: Load the data with d3.csv
d3.csv("data/universities_ranked_2017_conferences.csv", function(data){
	// TO DO: Log the data to the console and see what it looks like
	console.log(data);

	// TO DO: finish formatting the data as integers
	data.forEach(function(d){
		d.percentage_nonneedbased_aid = +d.percentage_nonneedbased_aid;
		d.four_year_grad_rate = +d.four_year_grad_rate;
		d.admit_rate = +d.admit_rate;
		d.avg_grad_debt = +d.avg_grad_debt;
		d.avg_needbased_aid = +d.avg_needbased_aid;
		d.instate_tuition = +d.instate_tuition;
		d.rank = +d.rank;
		d.value_rank = +d.value_rank;
		d.grad_salary = +d.grad_salary;
		d.total_cost_per_year = +d.total_cost_per_year;
		d.tuition_and_fees = +d.tuition_and_fees;
		d.undergrad_enrollment = +d.undergrad_enrollment;
		d.avg_nonneedbased_aid = +d.avg_nonneedbased_aid;

	});

	// TO DO: sort the sortData and log it to the console to check it's right
	// You'll need to use a compare function on the grad_salary property
	// https://www.w3schools.com/js/js_array_sort.asp

	function sortData(unsortedData,sortOn){
		var sorted = unsortedData.sort(function(a, b){
			return b[sortOn]-a[sortOn];
		});
		return sorted;
	}
	var sortedData = sortData(data, "grad_salary");
	console.log(sorted_data);
	

})

	// Create the chart and store it in a variable
	var barChart = d3.select("#bar-chart")
		.append("svg")
		.attr("width", barChartWidth + margin.left + margin.right)
		.attr("height", barChartHeight + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// TO DO: finish the scales and axes

	var xscale = d3.scaleLinear()
		.domain([0, d3.max(sortedData, function(d) {
			// TO DO return the highest grad salary
			return d.grad_salary;
		})])
		.range([0, barChartWidth]);

	var xAxis = d3.axisBottom()
							// TO DO call the scale here
							.tickSizeOuter(0)
							.ticks(10)
							.scale(xscale);

	var xBarAxis = d3.axisTop()
							.scale(xscale)
							.tickSizeOuter(0);

	var xBarGroup = barChart.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0,-10)")
		//TO DO call the axis here
		.call(xBarAxis);

	var yscale = d3.scaleLinear()
		//TO DO add a domain from 0 to the length of the sorted data
		.domain([0, sortedData.length])
		.range([0, barChartHeight]);

	// Add the bars
	// TO DO:
	// Bind the data (done); enter the data (done)
	// append rects for each school
	// Give each bar a class attribute, a fixed height, and a dynamic width using the xscale and the
	// d.grad_salary property
	// x and y attributes already completed
	var schools = barChart.selectAll("rect")
		.data(sortedData)
		.enter()
			//Do work here
			.append("rect")
			.attr("class", "schoolBar")
			.attr("height", barHeight)
			.attr("width", function(d){
				return xscale(d.grad_salary);
			})
			.attr("y", function(d, i){
				return yscale(i);
			})
			.attr("x", function(d){
				return 0;
			});

	//Label the bars
	var barLabels = barChart.selectAll(".barLabels")
		.data(sortedData)
		.enter()
		.append("text")
			.attr("class", "barLabels")
			.text(function(d){
				//TO DO: give the bars dynamic labels
				return(`${d.name} | (${d.rank}) | $${d.grad_salary}`)
			})
			.attr("x", function(d){
				return xscale(d.grad_salary) + 3
			})
			//TO DO: give it a y value using the yscale and i. See the x value above as an example
			.attr("y", function(d,i){
				return yscale(i)+8
			});

});
