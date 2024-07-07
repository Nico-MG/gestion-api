import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";

export default async function priceAdjuster(nuevo) {
	const product = await getProductService({
		params: { id: nuevo.product_id },
	});
	const promedio =
		(product.cit * product.precio + nuevo.quantity * nuevo.price) /
		(product.cit + nuevo.quantity);
	product.precio = promedio;
	await updateProductService({
		params: { id: product.product_id },
		body: product,
	});
}
