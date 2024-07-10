import {
	getProductService,
	updateProductService,
} from "../../products/products.service.js";
import { wss } from "../../server.js";
import { createNotificationService } from "../../notifications/notifications.service.js";
import MinimumQuantity from "../errors/minimumQuantity.js";

export default async function quantityAdjuster(tipo, action, nuevo, anterior) {
	const product = await getProductService({
		params: { id: nuevo.product_id },
	});

	if (action === "UPD" && tipo === "SUM") {
		product.cit += nuevo.quantity - anterior.quantity;
	}
	if (action === "UPD" && tipo === "RES") {
		product.cit -= nuevo.quantity - anterior.quantity;
	}
	if (action === "ADD" && tipo === "SUM") {
		product.cit += nuevo.quantity;
	}
	if (action === "ADD" && tipo === "RES") {
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
	await updateProductService({
		params: { id: idp },
		body: product,
	});
	if (product.cit <= product.mCit) {
    	    wss.clients.forEach((client) => {
		client.send(`El producto ${product.nombre} superó el mínimo establecido`);
	    });


	    await createNotificationService({ product_id: idp, title: 'Aviso de inventario', description:`El producto ${idp} de nombre ${product.nombre} superó el mínimo establecido` })
	    
	}
}
