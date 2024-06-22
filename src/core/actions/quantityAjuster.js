import {
	getAllProductsService,
	updateProductService,
} from "../../products/products.service.js";

export default async function quantityAdjuster(
	tabla,
	accion,
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

		if (accion === "UPD") {
			const catDiferencia = detalles[idx].quantity - catOriginal;
			productoValido.cit += catDiferencia;
		}

		if (
			(tabla !== "SAL" && accion === "ADD") ||
			(tabla === "SAL" && accion === "DEL")
		) {
			productoValido.cit += detalles[idx].quantity;
		}
		if (
			(tabla !== "SAL" && accion === "DEL") ||
			(tabla === "SAL" && accion === "ADD")
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
