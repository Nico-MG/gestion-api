export default function filterHelper(
	iMap,
	data,
	{ desde, hasta, dato, valor, limit, offset, orden, mayor, menor },
) {
	// Validación de parámetros
	dato = dato ? iMap[dato] : Object.values(iMap)[0];
	orden ??= "asc";
	limit = Number.parseInt(limit) || 10;
	offset = Number.parseInt(offset) || 0;
	desde ??= "2000-01-01";
	hasta ??= "2099-12-31";
	valor =
		Number.isNaN(valor) || !valor || valor[0] === "0"
			? valor || ""
			: Number.parseInt(valor);
	mayor = mayor ? Number.parseInt(mayor) : 0;
	menor =  menor ? Number.parseInt(menor) : 1000000;

	// Filtro de fecha
	let result = data.date
		? data.filter((item) => item.date >= desde && item.date <= hasta)
		: data.filter((item) => item.createdAt >= new Date(desde) && item.createdAt <= new Date(hasta));

	// Ordenación
	result =
		orden === "desc"
			? result.sort((a, b) => b[dato] - a[dato])
			: result.sort((a, b) => a[dato] - b[dato]);
	// Filtro de numero
	if (!Number.isNaN(valor) && valor) {
		result = result.filter((item) => item[dato] === valor);
	} else if (valor) {
		result = result.filter((item) =>
			item[dato].toLowerCase().includes(valor.toLowerCase()),
		);
	}
	// Filtro de rango de valores
	result = result.filter((item) => item[dato] >= mayor);
	result = result.filter((item) => item[dato] <= menor);
	// Paginación
	result = result.slice(offset, offset + limit);
	return result;
}
