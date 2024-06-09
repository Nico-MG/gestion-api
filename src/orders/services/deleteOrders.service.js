import { adapterToFrontWithDetails } from "../../core/actions/adapter.js";
import { getOrder, deleteOrder } from "../orders.model.js";
import { iOrder, iOrderDetails } from "../../core/database/tableStructures.js";

export const deleteOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: {},
			};
		}
		const newOrder = await deleteOrder(req.params.id);
		const adaptedNewOrder = adapterToFrontWithDetails(
			iOrder,
			iOrderDetails,
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
