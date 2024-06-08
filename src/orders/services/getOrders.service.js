import { adapterToFront, adapterToFrontWithDetails } from "../../core/actions/adapter";
import tables from "../../core/database/tableStructures";

export const getOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}

		const adaptedOrder = adapterToFrontWithDetails(tables.orders, tables.orders_details, order)

		return {
			status: 200,
			message: `orden encontado, id: ${newOrder.ido}`,
			data: order,
		};
	} catch (error) {
		console.error(error.message)
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
				data: null,
			};
		}

		const adaptedOrders = orders.map(order => adapterToFrontWithDetails(tables.orders, tables.orders_details, order))

		return {
			status: 200,
			message: `Se encontraron ordenes, Cantidad: ${adaptedOrders.length}`,
			data: adaptedOrders,
		};
	} catch (error) {
		console.error(error.message)
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
