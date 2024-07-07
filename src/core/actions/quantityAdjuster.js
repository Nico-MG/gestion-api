import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";

export default async function quantityAdjuster(tipo, action, nuevo) {
	const product = await getProductService({
		req: { params: { id: nuevo.product_id } },
	});
	if (action === "UPD" && tipo === "SUM") {
	}
	if (action === "UPD" && tipo === "RES") {
	}
	if (action === "ADD" && tipo === "SUM") {
	}
	if (action === "ADD" && tipo === "RES") {
	}
	if (action === "DEL" && tipo === "SUM") {
	}
	if (action === "DEL" && tipo === "RES") {
	}
	await updateProductService({
		req: { params: { id: product.product_id }, body: product },
	});
}
