import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";

export default async function quantityAdjuster(tipo, action, nuevo, anterior) {
	const product = await getProductService({
		 params: { id: nuevo.product_id } ,
	});
	if (action === "UPD" && tipo === "SUM") {
		product.cit = product.cit + nuevo.cit - anterior.quantity;
	}
	if (action === "UPD" && tipo === "RES") {
		product.cit = product.cit - nuevo.cit + anterior.quantity;
	}
	if (action === "ADD" && tipo === "SUM") {
		product.cit = product.cit + nuevo.cit;
	}
	if (action === "ADD" && tipo === "RES") {
		product.cit = product.cit + nuevo.cit;
	}
	if (action === "DEL" && tipo === "SUM") {
		product.cit = product.cit - nuevo.cit;
	}
	if (action === "DEL" && tipo === "RES") {
		product.cit = product.cit - nuevo.cit;
	}
	await updateProductService({
		 params: { id: product.id }, body: product 
	});
}
