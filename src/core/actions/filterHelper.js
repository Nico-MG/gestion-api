const isNumberValor = (field) => {
	return (
		field === "price" ||
		field === "quantity" ||
		field === "min_quantity" ||
		field === "price" ||
		field === "line_total" ||
		field === "unit_price" ||
		field === "total_price"
	);
};

export default function filterHelper(
	iMap,
	data,
	{ desde, hasta, dato, valor, limit, offset, orden, mayor, menor, reciente },
) {
	// Validación de parámetros
	dato = dato ? iMap[dato] : Object.values(iMap)[0];
	orden ??= "";
	limit = Number.parseInt(limit) || 10;
	offset = Number.parseInt(offset) || 0;
	desde ??= "2000-01-01";
	hasta ??= "2099-12-31";
	valor = isNumberValor(dato) || !valor ? valor || "" : Number.parseInt(valor);
	mayor = mayor ? Number.parseInt(mayor) : 0;
	menor = menor ? Number.parseInt(menor) : 1000000;
	reciente ??= "";

	// Filtro de fecha
	let result = data.date
		? data.filter((item) => item.date >= desde && item.date <= hasta)
		: data.filter(
				(item) =>
					item.createdAt >= new Date(desde) &&
					item.createdAt <= new Date(hasta),
			);

	// Ordenar por fecha
	result =
		orden === "desc"
			? result.sort((a, b) => b.createdAt - a.createdAt)
			: result;
	result =
		orden === "asc" ? result.sort((a, b) => a.createdAt - b.createdAt) : result;

	// Ordenación
	result = orden === "desc" ? result.sort((a, b) => b[dato] - a[dato]) : result;
	result = orden === "asc" ? result.sort((a, b) => a[dato] - b[dato]) : result;

	// Filtro de numero
	if (!Number.isNaN(valor) && valor) {
		result = result.filter((item) => item[dato] === valor);
	} else if (valor) {
		result = result.filter((item) =>
			item[dato].toLowerCase().includes(valor.toLowerCase()),
		);
	}

	// Filtro de rango de valores
	result = valor ? result.filter((item) => item[dato] >= mayor) : result;
	result = valor ? result.filter((item) => item[dato] <= menor) : result;

	// Paginación
	result = result.slice(offset, offset + limit);
	return result;
}
