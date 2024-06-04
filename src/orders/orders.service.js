import {
	getAllOrders,
	getOrder,
	deleteOrder,
	createOrder,
	updateOrder,
} from "./orders.model.js";

const getOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		return {
			status: 200,
			message: `orden encontado, id: ${newOrder.id_producto}`,
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

const getAllOrdersService = async (req) => {
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

const updateOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const newOrder = await updateOrder(req.params.id, req.body);
		return {
			status: 200,
			message: `orden actualizado, id: ${newOrder.id_producto}`,
			data: newOrder,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const deleteOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const newOrder = await deleteOrder(req.params.id);
		return {
			status: 200,
			message: `orden eliminado, id: ${newOrder.id_producto}`,
			data: newOrder,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const createOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (order) {
			return {
				status: 400,
				mesage: "producto ya existe",
				data: order,
			};
		}
		const newOrder = await createOrder(req.body);
		return {
			status: 200,
			message: `orden creado, id: ${newOrder.id_producto}`,
			data: newOrder,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

export {
	getAllOrdersService,
	getOrderService,
	createOrderService,
	updateOrderService,
	deleteOrderService,
};
