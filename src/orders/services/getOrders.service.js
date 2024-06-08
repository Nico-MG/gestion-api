import { adapterDB, adapterFront } from "../../core/actions/adapter";
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

		order.order_details = adapterFront(
			tables.orders_details,
			order.order_details,
		);
		const newOrder = adapterFront(tables.orders, req.body);

		return {
			status: 200,
			message: `orden encontado, id: ${newOrder.ido}`,
			data: order,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
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
		return {
			status: 200,
			message: `Se encontraron ordenes, Cantidad: ${orders.length}`,
			data: orders,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};
