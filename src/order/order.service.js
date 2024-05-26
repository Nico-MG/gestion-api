import {
	getAllOrders,
	getOrder,
	deleteOrder,
	createOrder,
	editOrder,
} from "./order.model.js";

const getOrderService = async (id) => {
	return await getOrder(id);
};

const getAllOrdersService = async () => {
	return await getAllOrders();
};

const updateOrderService = async (id, newId, rutp, rutu, fecha, compra, dOrder) => {
	const dOrderData = dOrder.map((e) => {
		return {
			id_producto: e.id_producto,
			cantidad: e.cantidad,
			precio_unidad: e.precio_unidad,
			precio_total: e.precio_total,
		};
	});
	return await editOrder(id, newId, rutp, rutu, fecha, compra, dOrderData);
};

const deleteOrderService = async (id) => {
	return await deleteOrder(id);
};

const createOrderService = async (id, rutp, rutu, fecha, compra, dOrder) => {
	const dOrderData = dOrder.map((e) => {
		return {
			id_producto: e.id_producto,
			cantidad: e.cantidad,
			precio_unidad: e.precio_unidad,
			precio_total: e.precio_total,
		};
	});
	return await createOrder(id, rutp, rutu, fecha, compra, dOrderData);
};

export {
	getAllOrdersService,
	getOrderService,
	createOrderService,
	updateOrderService,
	deleteOrderService,
};
