export default function filterHelper(
	iMap,
	data,
	{ desde, hasta, dato, numero, texto, limit, offset, orden },
) {
	// Validación de parámetros
	dato = iMap[dato] || iMap[0];
	orden ??= "asc";
	limit = Number.parseInt(limit) || 10;
	offset = Number.parseInt(offset) || 0;
	desde ??= "2000-01-01";
	hasta ??= "2099-12-31";
	numero = Number.parseInt(numero) || 0;
	texto ??= "";

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
	if (numero !== 0) {
		result = result.filter((item) => item[dato] === numero);
	}
	// Filtro de texto
	if (texto !== "") {
		result = result.filter((item) =>
			item[dato].toLowerCase().includes(texto.toLowerCase()),
		);
	}
	// Paginación
	result = result.slice(offset, offset + limit);
	return result;
}
