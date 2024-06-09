import {
	adapterToDBWithDetails,
	adapterToFrontWithDetails,
} from "../../core/actions/adapter.js";
import { getOrder, createOrder } from "../orders.model.js";
import { iOrder, iOrderDetails } from "../../core/database/tableStructures.js";

export const createOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (order) {
			return {
				status: 400,
				mesage: "producto ya existe",
				data: {},
			};
		}

		const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
			iOrder,
			iOrderDetails,
			req.body,
		);

		const newOrder = await createOrder(adaptedBody, adaptedDetails);
		const adaptedNewOrder = adapterToFrontWithDetails(
			iOrder,
			iOrderDetails,
			newOrder,
		);
		return {
			status: 200,
			message: `orden creado, id: ${adaptedNewOrder.ido}`,
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
