var downloadData = [];
var xDomainMax = [];
d3.json("sample-login-data.json", function(error, data) {
    var totalLogins = [];
    var uniqueLogins = [];
    for(let i = 0; i < data.loginData.length; i++) {
        totalLogins.push({
            date: new Date(data.loginData[i].date),
            value: +data.loginData[i].totalLogins,
            uniqueLogins: +data.loginData[i].uniqueLogins,
        })

        xDomainMax.push({
            value: +data.loginData[i].uniqueLogins
        })

        xDomainMax.push({
            value: +data.loginData[i].totalLogins
        })
    }
    downloadData = totalLogins
    drawChart(totalLogins);
});


function drawChart(data) {
    var svgWidth = 1500, svgHeight = 800;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);


    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(data) { return x(data.date)})
        .y(function(data) { return y(data.value)})
        x.domain(d3.extent(data, function(d) { return d.date }));
        y.domain(d3.extent(xDomainMax, function(d) { return d.value }));

    var line2 = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.uniqueLogins)})

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")


    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "black")
        .attr("color", "black")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Unique Vs. Total Logins");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#488B8B")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line)

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#E87878")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line2)

// g.append("path")
//     .datum(data2)
//     .attr("fill", "none")
//     .attr("stroke", "black")
//     .attr("stroke-linejoin", "round")
//     .attr("stroke-linecap", "round")
//     .attr("stroke-width", 1.5)
//     .attr("d", line)

}

