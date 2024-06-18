const updateSaleService = async (
	id,
	newId,
	rutc,
	rutu,
	fecha,
	venta,
	dSale,
) => {
	const dSaleData = dSale.map((e) => {
		return {
			id_producto: e.id_producto,
			cantidad: e.cantidad,
			precio_unidad: e.precio_unidad,
			precio_total: e.precio_total,
		};
	});
	return await updateSale(id, newId, rutc, rutu, fecha, venta, dSaleData);
};
