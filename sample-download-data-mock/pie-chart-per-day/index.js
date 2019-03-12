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
    for(let i = 0; i < data.downloadData.length; i++) {
        totalDownloadsAllRegions += data.downloadData[i].downloadsTotalNA 
        + data.downloadData[i].downloadsTotalEMEA 
        + data.downloadData[i].downloadsTotalLATAM 
        + data.downloadData[i].downloadsTotalAPAC;

        if(dayCounter === 0) {
            sunday += data.downloadData[i].downloadsTotalNA 
                            + data.downloadData[i].downloadsTotalEMEA 
                            + data.downloadData[i].downloadsTotalLATAM 
                            + data.downloadData[i].downloadsTotalAPAC 
        } else if(dayCounter === 1) {
            monday += data.downloadData[i].downloadsTotalNA 
                            + data.downloadData[i].downloadsTotalEMEA 
                            + data.downloadData[i].downloadsTotalLATAM 
                            + data.downloadData[i].downloadsTotalAPAC 
        } else if(dayCounter === 2) {
            tuesday += data.downloadData[i].downloadsTotalNA 
                            + data.downloadData[i].downloadsTotalEMEA 
                            + data.downloadData[i].downloadsTotalLATAM 
                            + data.downloadData[i].downloadsTotalAPAC 
        } else if(dayCounter === 3) {
            wednesday += data.downloadData[i].downloadsTotalNA 
                            + data.downloadData[i].downloadsTotalEMEA 
                            + data.downloadData[i].downloadsTotalLATAM 
                            + data.downloadData[i].downloadsTotalAPAC 
        } else if(dayCounter === 4) {
            thursday += data.downloadData[i].downloadsTotalNA 
                            + data.downloadData[i].downloadsTotalEMEA 
                            + data.downloadData[i].downloadsTotalLATAM 
                            + data.downloadData[i].downloadsTotalAPAC 
        } else if(dayCounter === 5) {
            friday += data.downloadData[i].downloadsTotalNA 
                            + data.downloadData[i].downloadsTotalEMEA 
                            + data.downloadData[i].downloadsTotalLATAM 
                            + data.downloadData[i].downloadsTotalAPAC 
        } else if(dayCounter === 6) {
            saturday += data.downloadData[i].downloadsTotalNA 
                            + data.downloadData[i].downloadsTotalEMEA 
                            + data.downloadData[i].downloadsTotalLATAM 
                            + data.downloadData[i].downloadsTotalAPAC 
        }
        dayCounter++;
        if(dayCounter === 7) {
            dayCounter = 0;
        }
    }

    console.log(monday)
    console.log(sunday)
    console.log(totalDownloadsAllRegions)

    dayData.push({
        "day" : "Sunday",
        "percentage" : (sunday / totalDownloadsAllRegions * 100).toFixed(2),
    });

    dayData.push({
        "day" : "Monday",
        "percentage" : (monday / totalDownloadsAllRegions * 100).toFixed(2),
    });

    dayData.push({
        "day" : "Tuesday",
        "percentage" : (tuesday / totalDownloadsAllRegions * 100).toFixed(2),
    });

    dayData.push({
        "day" : "Wednesday",
        "percentage" : (wednesday / totalDownloadsAllRegions * 100).toFixed(2),
    });

    dayData.push({
        "day" : "Thursday",
        "percentage" : (thursday / totalDownloadsAllRegions * 100).toFixed(2),
    });

    dayData.push({
        "day" : "Friday",
        "percentage" : (friday / totalDownloadsAllRegions * 100).toFixed(2),
    });

    dayData.push({
        "day" : "Saturday",
        "percentage" : (saturday / totalDownloadsAllRegions * 100).toFixed(2),
    });


    var svgWidth = 700, svgHeight = 1000, radius =  Math.min(svgWidth, svgHeight) / 2;
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