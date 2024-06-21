import {
	getAllProductsService,
	updateProductService,
} from "../../products/products.service.js";

export default async function priceAjuster(detalles) {
	const productos = await getAllProductsService();
	for (let idx = 0; idx < detalles.length; idx++) {
		const detalle = detalles[idx];
		const producto = productos.find((p) => p.idp === detalle.product_id);
		const catDetalle = detalle.quantity;
		const catProducto = producto.cit;
		const priceDetalle = detalle.price;
		const priceProducto = producto.precio;
		const promedio =
			(priceProducto * catProducto + priceDetalle * catDetalle) /
			(catProducto + catDetalle);
		producto.precio = promedio;
		await updateProductService(producto.idp, producto);
	}
}
