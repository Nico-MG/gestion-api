import { adapterToFrontWithDetails } from "../../core/actions/adapter.js";
import { getAllOrders, getOrder } from "../orders.model.js";
import { iOrder, iOrderDetails } from "../../core/database/tableStructures.js";

export const getOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: {},
			};
		}

		const adaptedOrder = adapterToFrontWithDetails(
			iOrder,
			iOrderDetails,
			order,
		);

		return {
			status: 200,
			message: `orden encontado, id: ${adaptedOrder.ido}`,
			data: order,
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

export const getAllOrdersService = async (req) => {
	try {
		const orders = await getAllOrders(req.query);
		if (orders.length === 0) {
			return {
				status: 400,
				mesage: "productos no existen",
				data: {},
			};
		}

		const adaptedOrders = orders.map((order) =>
			adapterToFrontWithDetails(iOrder, iOrderDetails, order),
		);

		return {
			status: 200,
			message: `Se encontraron ordenes, Cantidad: ${adaptedOrders.length}`,
			data: adaptedOrders,
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
