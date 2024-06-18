import { adapterToFrontWithDetails } from "../../core/actions/adapter.js";
import { getPurchase, deletePurchase } from "../purchases.model.js";
import {
	iPurchase,
	iPurchaseDetails,
} from "../../core/database/tableStructures.js";

export const deletePurchaseService = async (req) => {
	try {
		const purchase = await getPurchase(req.params.id);
		if (!purchase) {
			return {
				status: 400,
				message: "Compra no existe",
				data: {},
			};
		}

		await deletePurchase(req.params.id);

		return {
			status: 200,
			message: `Compra eliminada, id: ${req.params.id}`,
			data: {},
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
