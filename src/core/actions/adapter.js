/**
 * Invierte los formatos del front y de la db para adaptar los datos de la db al front
 * @param {Object} mapping -  Tiene el formato del Json que envia el frontend y el formato de las tablas de la Base de Datos
 * @returns {Object} - Retorna un objeto pero con los formatos del front y la db al reves
 */
const invertMapping = (mapping) => {
	return Object.entries(mapping).reduce((inv, [key, value]) => {
		const [dbKey] = value;
		inv[dbKey] = [key];
		return inv;
	}, {});
};

/**
 * Remueve los detalles de un pedido, venta o devolucion
 * @param {Object} obj - Objeto donde se le removera los detalles
 * @param {String} propToRemove - nombre de la llave a remover (son los detalles)
 * @returns {Object} - retorna el objeto sin los detalles
 */
const removeDetails = (obj, propToRemove) => {
	const { [propToRemove]: _, ...newObj } = obj;
	return newObj;
};

/**
 * Se obtienen la lista de detalles de pedido | venta | devolucion
 * @param {Object} obj - objeto que contiene sus detalles
 * @returns {Array} - retorna una lista con los detalles
 */
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
	return { ...adaptedBody, details: adaptedDetails };
};
