var downloadData = [];
var xDomainMax = [];
var regionData = [];
var dayData = [];
var totalDownloadsAllRegions = 0;
var totalDownloadsNA = 0;
var totalDownloadsEMEA = 0;
var totalDownloadsLATAM = 0;
var totalDownloadsAPAC = 0;

var sunday = 0;
var monday = 0;
var tuesday = 0;
var wednesday = 0;
var thursday = 0;
var friday = 0;
var saturday = 0;

var dayCounter = 0;

d3.json("sample-download-data.json", function(error, data) {
    console.log(data.downloadData);

    function getDayName(dateStr) {
        var date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { weekday: 'long' });        
    }

    for(let i = 0; i < data.downloadData.length; i++) {

        var total = data.downloadData[i].downloadsTotalNA 
        + data.downloadData[i].downloadsTotalEMEA 
        + data.downloadData[i].downloadsTotalLATAM 
        + data.downloadData[i].downloadsTotalAPAC;
        
        totalDownloadsAllRegions += total;

        var currentDay = getDayName(data.downloadData[i].date);
        
        if(currentDay === 'Sunday') {
            sunday += total;
        } else if(currentDay === 'Monday') {
            monday += total;
        } else if(currentDay === 'Tuesday') {
            tuesday += total;
        } else if(currentDay === 'Wednesday') {
            wednesday += total;
        } else if(currentDay === 'Thursday') {
            thursday += total;
        } else if(currentDay === 'Friday') {
            friday += total;
        } else if(currentDay === 'Saturday') {
            saturday += total;
        }
    }

    var findPercentage = (day) => {
        return (day / totalDownloadsAllRegions * 100).toFixed(2);
    }

    dayData.push({
        "day" : "Sunday",
        "percentage" : findPercentage(sunday),
    });

    dayData.push({
        "day" : "Monday",
        "percentage" : findPercentage(monday),
    });

    dayData.push({
        "day" : "Tuesday",
        "percentage" : findPercentage(tuesday),
    });

    dayData.push({
        "day" : "Wednesday",
        "percentage" : findPercentage(wednesday),
    });

    dayData.push({
        "day" : "Thursday",
        "percentage" : findPercentage(thursday),
    });

    dayData.push({
        "day" : "Friday",
        "percentage" : findPercentage(friday),
    });

    dayData.push({
        "day" : "Saturday",
        "percentage" : findPercentage(saturday),
    });


    var svgWidth = 800, svgHeight = 1000, radius =  Math.min(svgWidth, svgHeight) / 2;
    var svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    //Create group element to hold pie chart    
    var g = svg.append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")") ;

    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var pie = d3.pie().value(function(d) { 
        return d.percentage; 
    });

    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);
    
    var arc = g.selectAll("arc")
        .data(pie(dayData))
        .enter()
        .append("g");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.percentage); });
            
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);
                
    arc.append("text")
        .attr("transform", function(d) { 
            return "translate(" + label.centroid(d) + ")"; 
        })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.day+":"+d.data.percentage+"%"; });
});