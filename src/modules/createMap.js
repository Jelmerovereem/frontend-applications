const topojson = require("topojson-client");
const d3 = require('d3');

export default function createMap(mapData) {
	const stadData = topojson.feature(mapData, mapData.objects.gemeente_2020);
	const svg = d3.select("svg");
	const group = svg.append("g").attr("class", "overallGroup");
	const width = +svg.attr("width");
	const height = +svg.attr("height");

	svg.call(d3.zoom().on("zoom", ({transform}) => {
		group.attr("transform", transform);
		if (transform.k <= 2) {
			group.selectAll("circle")
			.transition()
				.duration(500)
				.attr("r", 4)
		} else if (transform.k >2 && transform.k <= 4) {
			group.selectAll("circle")
			.transition()
				.duration(500)
				.attr("r", 2)
		} else if (transform.k > 4 && transform.k <= 10) {
			group.selectAll("circle")
			.transition()
				.duration(500)
				.attr("r", 0.5)	
		} else if (transform.k > 10 && transform.k <= 30) {
			group.selectAll("circle")
			.transition()
				.duration(500)
				.attr("r", 0.3)
		} else if (transform.k > 30 ) {
			group.selectAll("circle")
			.transition()
				.duration(500)
				.attr("r", 0.1)
		}
	}))

	const projection = d3.geoMercator()
		.center([5.116667, 52.17]) // https://github.com/mbergevoet/frontend-data/blob/master/frontend-data/index.js#L61
		.scale(6000)
		.translate([width/2, height/2]); // center the map based on the width and height from the svg element;
	const pathGenerator = d3.geoPath().projection(projection);

	group.selectAll("path")
		.data(stadData.features)
		.enter()
		.append("path")
		.attr("d", pathGenerator)


	group.selectAll("text")
		.data(stadData.features)
		.enter()
		.append("svg:text")
			.text(obj => obj.properties.statnaam)
			.attr("fill", "white")
			.attr("x", d => pathGenerator.centroid(d)[0])
			.attr("y", d => pathGenerator.centroid(d)[1])
			.attr("text-anchor", "middle")
			.attr("font-size", "1pt")

	/* Add title tooltip */
	group.selectAll("path")
	.append("title")
		.text(obj => obj.properties.statnaam)
}