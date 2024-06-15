import {
	adapterToDBWithDetails,
	adapterToFrontWithDetails,
} from "../../core/actions/adapter.js";
import { getPurchase, updatePurchase } from "../purchases.model.js";
import {
	iPurchase,
	iPurchaseDetails,
} from "../../core/database/tableStructures.js";

export const updatePurchaseService = async (req) => {
	try {
		const purchase = await getPurchase(req.params.id);
		if (!purchase) {
			return {
				status: 400,
				mesage: "Compra no existe",
				data: null,
			};
		}
	    
		const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
			iPurchase,
			iPurchaseDetails,
			purchase,
		);
		// const newOrder = await updatePurchase(
		// 	req.params.id,
		// 	adaptedBody,
		// 	adaptedDetails,
		// );
		// const adaptedNewOrder = adapterToFrontWithDetails(
		// 	iPurchase,
		// 	iPurchaseDetails,
		// 	newOrder,
		// );
		return {
			status: 200,
			//message: `Compra actualizada, id: ${newOrder.purchase_id}`,
		    message: "Hola mundo",
		    data: {adaptedBody,adaptedDetails},
		};
	} catch (error) {
		console.error(error.message);
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
