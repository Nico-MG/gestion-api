export default function filterHelper(
	iMap,
	data,
	{ desde, hasta, dato, valor, limit, offset, orden },
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
	if (Number.isNaN(valor) === false) {
		result = result.filter((item) => item[dato] === valor);
	} else {
		result = result.filter((item) =>
			item[dato].toLowerCase().includes(valor.toLowerCase()),
		);
	}
	// Paginación
	result = result.slice(offset, offset + limit);
	return result;
}
