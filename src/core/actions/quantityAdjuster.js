import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";
import { wss } from "../../server.js";
import { createNotificationService } from "../../notifications/notifications.service.js";


export default async function quantityAdjuster(tipo, action, nuevo, anterior) {
	const product = await getProductService({
		params: { id: nuevo.product_id },
	});

	if (action === "UPD" && tipo === "SUM") {
		product.cit += nuevo.quantity - anterior.quantity;
	}
	if (
		action === "UPD" &&
		tipo === "RES" &&
		product.cit - (nuevo.quantity - anterior.quantity) >= 0
	) {
		product.cit -= nuevo.quantity - anterior.quantity;
	}
	if (action === "ADD" && tipo === "SUM") {
		product.cit += nuevo.quantity;
	}
	if (action === "ADD" && tipo === "RES" && product.cit - nuevo.quantity >= 0) {
		product.cit -= nuevo.quantity;
	}
	if (action === "DEL" && tipo === "SUM") {
		product.cit -= nuevo.quantity;
	}
	if (action === "DEL" && tipo === "RES") {
		product.cit += nuevo.quantity;
	}
	const idp = product.idp;
	product.idp = undefined;
	product.undefined = undefined;
	if (product.cit <= product.mCit) {
		// biome-ignore lint/complexity/noForEach: <explanation>
		wss.clients.forEach((client) => {
			client.send(`El producto ${product.nombre} superó el mínimo establecido`);
		});

		await createNotificationService({
			product_id: idp,
			title: "Aviso de inventario",
			description: `El producto ${product.cod} de nombre ${product.nombre} superó el mínimo establecido`,
		});
	}
	await updateProductService({
		params: { id: idp },
		body: product,
	});
}
