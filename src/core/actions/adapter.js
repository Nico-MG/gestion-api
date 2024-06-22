/**
 * Adapta un objeto de la API a un objeto de la base de datos.
 * @param {Object} mapping - El mapeo de la API a la base de datos.
 * @param {Object} reqBody - El objeto de la API.
 * @returns {Object} El objeto adaptado.
 */
export const invertMapping = (mapping) => {
	const inv = {};
	for (const key in mapping) {
		if (mapping[key]) {
			const value = mapping[key];
			inv[value] = key;
		}
	}
	return inv;
};

/**
 * Adapta un objeto de la API a un objeto de la base de datos.
 * @param {Object} mapping - El mapeo de la API a la base de datos.
 * @param {Object} reqBody - El objeto de la API.
 * @returns {Object} El objeto adaptado.
 */
export const adapterToDB = (mapping, reqBody) => {
	const mapData = {};
	for (const key in reqBody) {
		const entryKey = mapping[key];
		mapData[entryKey] = reqBody[key];
	}
	return mapData;
};

/**
 * Adapta un objeto de la base de datos a un objeto de la API.
 * @param {Object} mapping - El mapeo de la API a la API.
 * @param {Object} reqBody - El objeto de la base de datos.
 * @returns {Object} El objeto adaptado.
 */
export const adapterToFront = (mapping, reqBody) => {
	const invMap = invertMapping(mapping);
	const mapData = {};
	for (const key in reqBody) {
		const entryKey = invMap[key];
		mapData[entryKey] = reqBody[key];
	}
	return mapData;
};

/**
 * Adapta un objeto de la API a un objeto de la base de datos.
 * @param {Object} mapBody - El mapeo de la API a la base de datos.
 * @param {Object} mapDetails - El mapeo de la API a la base de datos.
 * @param {Object} reqBody - El objeto de la API.
 * @returns {Object} El objeto adaptado.
 */
export const adapterToDBWithDetails = (mapBody, mapDetails, reqBody) => {
	const { detalles, ...body } = reqBody;
	const adaptedDetails = detalles.map((detalle) =>
		adapterToDB(mapDetails, detalle),
	);
	const adaptedBody = adapterToDB(mapBody, body);
	return { adaptedBody, adaptedDetails };
};

/**
 * Adapta un objeto de la base de datos a un objeto de la API.
 * @param {Object} mapBody - El mapeo de la base de datos a la API.
 * @param {Object} mapDetails - El mapeo de la base de datos a la API.
 * @param {Object} reqBody - El objeto de la base de datos.
 * @returns {Object} El objeto adaptado.
 */
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
