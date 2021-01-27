export default function addCoordinates(garageLocatieData) {
	// from Stan Brankras  https://github.com/StanBankras/functional-programming/blob/56585a9b63601b68de3bcc3b26050b85ca05cf5e/utils.js#L36-L54
	function replaceOccurences(string, replace, replaceBy) {
	    return string.split(replace).join(replaceBy);
	}

	function replaceMultipleOccurences(string, replaceArray, replaceBy) {
	    let replaceString = string;
	    replaceArray.forEach((r) => replaceString = replaceOccurences(replaceString, r, replaceBy));
	    return replaceString;
	}

	function getCenterCoord(coordinates) {

	    const type = coordinates.split(' ')[0];
	    let longLat = replaceMultipleOccurences(coordinates, [type + ' (', '(', ')', ','], '').split(' ');
	    if (type === 'POINT') {
	        longLat = [Number(longLat[0]), Number(longLat[1])];
	    } else {
	        let latTotal = 0;
	        let longTotal = 0;

	        longLat.forEach((x, index) => {
	            if (index === 0 || index % 2 === 0) return longTotal += Number(x);
	            return latTotal += Number(x);
	        });

	        longLat = [longTotal / (longLat.length / 2), latTotal / (longLat.length / 2)];
	    }

	    return longLat;


	}

	let coordinatesArray = [];
	garageLocatieData.forEach((garage) => {
		let coordinateObj;
		if (garage.areageometryastext !== "" && garage.areageometryastext !== undefined) {
			if (!Number.isNaN(getCenterCoord(garage.areageometryastext)[0]) || !Number.isNaN(getCenterCoord(garage.areageometryastext)[1])) {
			coordinateObj = {
				areaId: garage.areaid,
				long: getCenterCoord(garage.areageometryastext)[0],
				lat: getCenterCoord(garage.areageometryastext)[1]
			}
			coordinatesArray.push(coordinateObj)
		}
		}
	})

	return coordinatesArray;
}