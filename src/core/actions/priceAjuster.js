import {
	getAllProductsService,
	updateProductService,
} from "../../products/products.service.js";

export default async function priceAjuster(detalles) {
	if (detalles.length === 0) {
		return;
	}

	const productos = await getAllProductsService();
	const largoProductos = productos.length;
	const largoDetalles = detalles.length;

	const sumaProductos = productos.reduce(
		(acc, producto) => acc + producto.precio,
		0,
	);
	const sumaDetalles = detalles.reduce(
		(acc, detalle) => acc + detalle.precio,
		0,
	);

	const promedio =
		(sumaDetalles * largoDetalles + sumaProductos * largoProductos) /
		(largoDetalles + largoProductos);

	for (let idx = 0; idx < largoProductos; idx++) {
		const producto = productos[idx];
		producto.precio = promedio;
		await updateProductService({
			params: {
				id: producto.idp,
			},
			body: producto,
		});
	}
}
