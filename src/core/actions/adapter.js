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
	const { detalles, ...body } = reqBody;
	const adaptedDetails = detalles.map((detalle) =>
		adapterToDB(mapDetails, detalle),
	);
	const adaptedBody = adapterToDB(mapBody, body);
	return { adaptedBody, adaptedDetails };
};

export const adapterToFrontWithDetails = (mapBody, mapDetails, reqBody) => {
	const claveDetalle = Object.keys(reqBody).find((key) =>
		Array.isArray(reqBody[key]),
	);
	const { [claveDetalle]: detalles, ...body } = reqBody;
	const adaptedDetails = detalles.map((detalle) =>
		adapterToFront(mapDetails, detalle),
	);
	const adaptedBody = adapterToFront(mapBody, body);
	return { ...adaptedBody, detalles: adaptedDetails };
};
