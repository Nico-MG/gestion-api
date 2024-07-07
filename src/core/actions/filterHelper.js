export default function filterHelper(
	iMap,
	data,
	{ desde, hasta, dato, valor, limit, offset, orden, mayor, menor },
) {
	// Validación de parámetros
	dato = iMap[dato] || iMap[0];
	orden ??= "asc";
	limit = Number.parseInt(limit) || 10;
	offset = Number.parseInt(offset) || 0;
	desde ??= "2000-01-01";
	hasta ??= "2099-12-31";
	valor =
		Number.isNaN(valor) || valor === "" ? valor || "" : Number.parseInt(valor);

	// Filtro de fecha
	let result = data.date
		? data.filter((item) => item.date >= desde && item.date <= hasta)
		: data;
	// Ordenación
	result =
		orden === "desc"
			? result.sort((a, b) => b[dato] - a[dato])
			: result.sort((a, b) => a[dato] - b[dato]);
	// Filtro de numero
	if (!Number.isNaN(valor)) {
		result = result.filter((item) => item[dato] === valor);
	} else if (valor) {
		result = result.filter((item) =>
			item[dato].toLowerCase().includes(valor.toLowerCase()),
		);
	}
	// Filtro de rango de valores
	result = mayor
		? result.filter((item) => item[dato] >= Number.parseInt(mayor))
		: result;
	result = menor
		? result.filter((item) => item[dato] <= Number.parseInt(menor))
		: result;
	// Paginación
	result = result.slice(offset, offset + limit);
	return result;
}
