import {
	getAllProductsService,
	updateProductService,
} from "../../products/products.service.js";

export default async function quantityAdjuster(
	tabla,
	action,
	detalles,
	detallesOriginal,
) {
	const productos = await getAllProductsService();

	for (let idx = 0; idx < detalles.length; idx++) {
		const productoValido = productos.find(
			(producto) => producto.idp === detalles[idx].product_id,
		);
		const catOriginal = detallesOriginal.find(
			(detalle) => detalle.product_id === detalles[idx].product_id,
		).quantity;

		if (!productoValido) continue;

		if (action === "UPD") {
			const catDiferencia = detalles[idx].quantity - catOriginal;
			productoValido.cit += catDiferencia;
		}

		if (
			(tabla !== "SAL" && action === "ADD") ||
			(tabla === "SAL" && action === "DEL")
		) {
			productoValido.cit += detalles[idx].quantity;
		}
		if (
			(tabla !== "SAL" && action === "DEL") ||
			(tabla === "SAL" && action === "ADD")
		) {
			productoValido.cit -= detalles[idx].quantity;
		}

		await updateProductService({
			params: {
				id: productoValido.idp,
			},
			body: productoValido,
		});
	}
}
