import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";

export default async function priceAdjuster(tipo, nuevo, anterior) {
	const product = await getProductService({
		params: { id: nuevo.product_id },
	});
	console.log(product, nuevo);
	if (tipo === "ADD" && nuevo.quantity + product.cit > 0) {
		const promedio =
			(product.cit * product.precio + nuevo.quantity * nuevo.unit_price) /
			(product.cit + nuevo.quantity);
		product.precio = Number.parseInt(promedio);
	}
	if (
		tipo === "UPD" &&
		product.cit + (nuevo.quantity - anterior.quantity) > 0
	) {
		const promedio =
			(product.cit * product.precio +
				(nuevo.quantity - anterior.quantity) *
					(nuevo.unit_price - anterior.unit_price)) /
			(product.cit + (nuevo.quantity - anterior.quantity));
		product.precio = Number.parseInt(promedio);
	}
	const idp = product.idp;
	product.idp = undefined;
	product.undefined = undefined;
	await updateProductService({
		params: { id: idp },
		body: product,
	});
}
