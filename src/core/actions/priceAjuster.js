import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";

export default async function priceAjuster(detalles) {
	for (let idx = 0; idx < detalles.length; idx++) {
		const detalle = detalles[idx];
		const producto = await getProductService({
			params: { id: detalle.product_id },
		});
		const catDetalle = detalle.quantity;
		const catProducto = producto.cit;
		const priceDetalle = detalle.price;
		const priceProducto = producto.precio;
		const promedio =
			(priceProducto * catProducto + priceDetalle * catDetalle) /
			(catProducto + catDetalle);
		producto.precio = promedio;
		await updateProductService({
			params: { id: producto.idp },
			body: producto,
		});
	}
}
