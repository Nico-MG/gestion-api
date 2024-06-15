import { adapterToFrontWithDetails } from "../../core/actions/adapter.js";
import { getPurchase, deletePurchase } from "../purchases.model.js";
import {
	iPurchase,
	iPurchaseDetails,
} from "../../core/database/tableStructures.js";

export const deletePurchaseService = async (req) => {
	try {
		const order = await getPurchase(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: {},
			};
		}
		const newOrder = await deletePurchase(req.params.id);
		const adaptedNewOrder = adapterToFrontWithDetails(
			iPurchase,
			iPurchaseDetails,
			newOrder,
		);
		return {
			status: 200,
			message: `orden eliminado, id: ${adaptedNewOrder.ido}`,
			data: adaptedNewOrder,
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
