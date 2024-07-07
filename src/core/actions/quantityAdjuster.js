import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";

export default async function quantityAdjuster(tipo, action, nuevo, anterior) {
	const product = await getProductService({
		params: { id: nuevo.product_id },
	});
	console.log(product.cit);
	console.log(nuevo, anterior);
	if (action === "UPD" && tipo === "SUM") {
		product.cit += nuevo.quantity - anterior.quantity;
	}
	if (action === "UPD" && tipo === "RES") {
		product.cit -= nuevo.quantity + anterior.quantity;
	}
	if (action === "ADD" && tipo === "SUM") {
		product.cit += nuevo.quantity;
	}
	if (action === "ADD" && tipo === "RES") {
		product.cit += nuevo.quantity;
	}
	if (action === "DEL" && tipo === "SUM") {
		product.cit -= nuevo.quantity;
	}
	if (action === "DEL" && tipo === "RES") {
		product.cit -= nuevo.quantity;
	}
	const idp = product.idp;
	product.idp = undefined;
	product.undefined = undefined;
	console.log(product.cit);
	await updateProductService({
		params: { id: idp },
		body: product,
	});
	if (product.cit <= product.mCit) {
		console.log(`Poco Stock de ${product.nombre}`);
	}
}
