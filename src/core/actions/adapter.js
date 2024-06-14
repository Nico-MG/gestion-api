const invertMapping = (mapping) => {
	const inv = {};
	for (const key in mapping) {
		if (mapping[key]) {
			const value = mapping[key];
			inv[value] = key;
		}
	}
	return inv;
};

export const adapterToDB = (mapping, reqBody) => {
	const mapData = {};
	for (const key in reqBody) {
		if (reqBody[key]) {
			const entryKey = mapping[key];
			mapData[entryKey] = reqBody[key];
		}
	}
	return mapData;
};

export const adapterToFront = (mapping, reqBody) => {
	const invMap = invertMapping(mapping);
	const mapData = {};
	for (const key in reqBody) {
		if (reqBody[key]) {
			const entryKey = invMap[key];
			mapData[entryKey] = reqBody[key];
		}
	}
	return mapData;
};

export const adapterToDBWithDetails = (mapBody, mapDetails, reqBody) => {
	const { details, ...body } = reqBody;
	const adaptedDetails = details.map((detail) =>
		adapterToDB(mapDetails, detail),
	);
	const adaptedBody = adapterToDB(mapBody, body);
	return { adaptedBody, adaptedDetails };
};

export const adapterToFrontWithDetails = (mapBody, mapDetails, reqBody) => {
	const { purchase_details, ...body } = reqBody;
	const adaptedDetails = purchase_details.map((purchase_details) =>
		adaptedDetails(mapDetails, purchase_details),
	);
	const adaptedBody = adapterToFront(mapBody, body);
	return { ...adaptedBody, details: adaptedDetails };
};
