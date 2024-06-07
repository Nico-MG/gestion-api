export const adapterDB = (mapping, reqBody) =>
	Object.entries(reqBody).reduce((mapData, [frontKey, value]) => {
		const dbEntry = mapping[frontKey];
		if (dbEntry) {
			const [dbKey] = dbEntry;
			mapData[dbKey] = value;
		}
		return mapData;
	}, {});

const invertMapping = (mapping) =>
	Object.entries(mapping).reduce((inv, [key, value]) => {
		const [dbKey] = value;
		inv[dbKey] = [key];
		return inv;
	}, {});

export const adapterFront = (mapping, reqBody) => {
	const invMap = invertMapping(mapping);
	return Object.entries(reqBody).reduce((mapData, [dbKey, value]) => {
		const frontEntry = invMap[dbKey];
		if (frontEntry) {
			const [frontKey] = frontEntry;
			mapData[frontKey] = value;
		}
		return mapData;
	}, {});
};
