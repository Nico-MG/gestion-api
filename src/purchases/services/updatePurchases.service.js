import {
	adapterToDBWithDetails,
	adapterToFrontWithDetails,
} from "../../core/actions/adapter.js";
import { getPurchase, updatePurchase } from "../purchases.model.js";
import { iPurchase, iPurchaseDetails } from "../../core/database/tableStructures.js";

export const updatePurchaseService = async (req) => {
	try {
		const order = await getPurchase(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
			iPurchase,
			iPurchaseDetails,
			order,
		);
		const newOrder = await updatePurchase(
			req.params.id,
			adaptedBody,
			adaptedDetails,
		);
		const adaptedNewOrder = adapterToFrontWithDetails(
			iPurchase,
			iPurchaseDetails,
			newOrder,
		);
		return {
			status: 200,
			message: `orden actualizado, id: ${adaptedNewOrder.ido}`,
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
