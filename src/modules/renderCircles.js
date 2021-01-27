import { projection } from "../modules/projection.js";
const d3 = require('d3');

export default function renderCircles(coordinates) {
	const svg = d3.select("svg");
	const group = d3.select(".overallGroup");
	const dropdown = document.querySelector(".variable-dropdown");
	let cirlce = group.selectAll("circle");

	cirlce
		.data(coordinates, d => d.areaId)
		.join(
			enter => enter.append("circle")
				.attr("r", 4)
				.attr("transform", (obj) => {
					return `translate(${projection([obj.long, obj.lat])})`
				})
				.attr("fill", (obj) => {
					if (dropdown.value === "paid/free") {
						if (/VERGUNNING|VERGUNP|VERGUN-ALG|VERGUN-MV/.test(obj.paid)) {
							return "red"
						} else if (/BETAALDP|GARAGEP/.test(obj.paid)) {
							return "orange"
						} else if (/onbekend/.test(obj.paid)) {
							return "grey"
						} else {
							return "green"
						}
					} else if (dropdown.value === "capacity") {
						if (obj.capacity <= 600) {
							return "red"
						} else if (obj.capacity > 600 && obj.capacity <= 1000) {
							return "orange"
						} else if (obj.capacity > 1000) {
							return "green"
						} else {
							return "grey"
						}
					}
				})
				.attr("opacity", (d) => {
					if (dropdown.value === "paid/free") {
						if (/onbekend/.test(d.paid)) {
							return .1
						} else {
							return 1
						}
					} else if (dropdown.value === "capacity") {
						if (d.capacity === "onbekend") {
							return .1
						} else {
							return 1
						}
					}
				}),
				exit => exit
					.attr("fill", "white")
					.call(exit => exit.transition().duration(500)
						.attr("opacity", 0)
						.remove())			
			)

		const tooltip = document.querySelector(".tooltip");

		group.selectAll("circle").on("mouseover", (event, obj) => {
			tooltip.innerHTML = obj.areaDesc + "<br>";
			if (obj.paid === undefined) {
				tooltip.innerHTML += "capacity: " + obj.capacity;	
			} else {
				tooltip.innerHTML += "Paid/free: " + obj.paid;	
			}
			tooltip.style.left = (event.pageX) + "px";
			tooltip.style.top = (event.pageY + 10) + "px";
			tooltip.classList.add("focus");
			tooltip.style.opacity = "1";		
		})
		.on("mouseout", () => {
			tooltip.style.opacity = "0";
		});
}