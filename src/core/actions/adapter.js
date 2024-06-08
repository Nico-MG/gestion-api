const invertMapping = (mapping) => {
	return Object.entries(mapping).reduce((inv, [key, value]) => {
		const [dbKey] = value;
		inv[dbKey] = [key];
		return inv;
	}, {});
};

const removeDetails = (obj, propToRemove) => {
	const { [propToRemove]: _, ...newObj } = obj;
	return newObj;
};

const getDetails = (obj) => {
	const keys = Object.keys(obj);
	const lastKey = keys[keys.length - 1];
	return obj[lastKey];
};

const logicReduce = (mapping, data, [key, value]) => {
	const entry = mapping[key];
	if (entry) {
		const [entryKey] = entry;
		data[entryKey] = value;
	}
};

export const adapterToDB = (mapping, reqBody) =>
	Object.entries(reqBody).reduce((mapData, entry) => {
		logicReduce(mapping, mapData, entry);
		return mapData;
	}, {});

export const adapterToFront = (mapping, reqBody) => {
	const invMap = invertMapping(mapping);
	return Object.entries(reqBody).reduce((mapData, entry) => {
		logicReduce(invMap, mapData, entry);
		return mapData;
	}, {});
};

export const adapterToDBWithDetails = (mapBody, mapDetails, reqBody) => {
	const details = getDetails(reqBody);
	const body = removeDetails(reqBody);
	const adaptedDetails = details.map((detail) =>
		adapterToDB(mapDetails, detail),
	);
	const adaptedBody = adapterToDB(mapBody, body);
	return { adaptedBody, adaptedDetails };
};

export const adapterToFrontWithDetails = (mapBody, mapDetails, reqBody) => {
	const details = getDetails(reqBody);
	const body = removeDetails(reqBody);
	const adaptedDetails = details.map((detail) =>
		adaptedDetails(mapDetails, detail),
	);
	const adaptedBody = adapterToFront(mapBody, body);
	return { adaptedBody, adaptedDetails };
};
