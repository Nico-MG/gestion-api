import {
	adapterToDBWithDetails,
	adapterToFrontWithDetails,
} from "../../core/actions/adapter.js";
import { getOrder, updateOrder } from "../orders.model.js";
import { iOrder, iOrderDetails } from "../../core/database/tableStructures.js";

export const updateOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
			iOrder,
			iOrderDetails,
			order,
		);
		const newOrder = await updateOrder(
			req.params.id,
			adaptedBody,
			adaptedDetails,
		);
		const adaptedNewOrder = adapterToFrontWithDetails(
			iOrder,
			iOrderDetails,
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
