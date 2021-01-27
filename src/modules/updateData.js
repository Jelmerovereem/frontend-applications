import {garageData, capacityData, garageLocatieData} from "../App.js";
import combineData from "../modules/combineData.js";
import renderCircles from "../modules/renderCircles.js";

export default function updateData(event) {
	const variable = event.target.value;
	if (variable === "capacity") {
		document.querySelector(".first").innerText = "0";
		document.querySelector(".last").innerText = "1700";
		let combinedData = combineData(garageData, garageLocatieData, capacityData);
		renderCircles(combinedData)
	} else if (variable === "paid/free") {
		document.querySelector(".first").innerText = "Betalen";
		document.querySelector(".last").innerText = "Gratis";
		fetch('https://opendata.rdw.nl/resource/adw6-9hsg.json?$limit=8352&$$app_token=zI34snM8XBhNRzxL50vrTeOLA')
		.then(response => response.json())
		.then((paidData) => {
			let combinedData = combineData(garageData, garageLocatieData, paidData);
			renderCircles(combinedData)
		})
	}
}