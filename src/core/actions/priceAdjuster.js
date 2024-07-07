import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";

export default async function priceAdjuster(tipo, nuevo, anterior) {
	const product = await getProductService({
		params: { id: nuevo.product_id },
	});
	console.log(product, nuevo);
	if (tipo === "ADD") {
		const promedio =
			(product.cit * product.precio + nuevo.quantity * nuevo.unit_price) /
			(product.cit + nuevo.quantity);
		product.precio = Number.parseInt(promedio);
	}
	if (tipo === "UPD") {
		const promedio =
			(product.cit * product.precio +
				(nuevo.quantity - anterior.quantity) *
					(nuevo.unit_price - anterior.unit_price)) /
			(product.cit + (nuevo.quantity - anterior.quantity));
		product.precio = Number.parseInt(promedio);
	}
	console.log(product.precio);
	const idp = product.idp;
	product.idp = undefined;
	product.undefined = undefined;
	await updateProductService({
		params: { id: idp },
		body: product,
	});
}
