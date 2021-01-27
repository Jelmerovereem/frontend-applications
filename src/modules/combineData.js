export default function combineData(garageData, garageLocatieData, variableData) {
	let outcomeData = [];
	// add garage names to objects
		garageLocatieData.forEach((garage) => {
			var result = garageData.find(obj => {
				return obj.areaid === garage.areaId;
			});
			if (result === undefined ) {
				var garageObj = {
					areaId: garage.areaId,
					long: garage.long,
					lat: garage.lat,
					areaDesc: "onbekend"
				}
			} else {
				var garageObj = {
					areaId: garage.areaId,
					long: garage.long,
					lat: garage.lat,
					areaDesc: result.areadesc
				}
			}
			outcomeData.push(garageObj);
		});

		const checkOption = (variableData, garagesData) => {
			if (variableData.length > 2000) {
			//paid/free dropdown chosen
			garagesData.forEach((garage) => {
				var paidObj = variableData.find(obj => {
					return obj.areaid === garage.areaId;
				})
				if (paidObj === undefined || paidObj.usageid === undefined) {
					garage.paid = "onbekend";
				} else {
					garage.paid = paidObj.usageid;
				}
			})
		} else {
			//capacity dropdown chosen
			garagesData.forEach((garage) => {
				var capacityObj = variableData.find(obj => {
					return obj.areaid === garage.areaId
				})
				if (capacityObj === undefined || capacityObj.capacity === undefined) {
					garage.capacity = "onbekend";	
				} else {
					garage.capacity = capacityObj.capacity;
				}			
			})
		}
		return garagesData;
		}

		outcomeData = checkOption(variableData, outcomeData);
		return outcomeData;
}