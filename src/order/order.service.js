import {
	getAllOrder,
	getOrder,
	deleteOrder,
	createOrder,
	editOrder,
} from "./order.model.js";

const getOrderService = async (id) => {
	return await getOrder(id);
};

const getAllOrderService = async () => {
	return await getAllOrder();
};

const editOrderService = async (id, newid, rutp, rutu, fecha, compra, dOrder) => {
	const dOrderData = dOrder.map((e) => {
		return {
			id_producto: e.idp,
			cantidad: e.cantidad,
			precio_unidad: e.precio,
			precio_total: e.total,
		};
	});
	return await editOrder(id, newid, rutp, rutu, fecha, compra, dOrderData);
};

const deleteOrderService = async (id) => {
	return await deleteOrder(id);
};

const createOrderService = async (id, rutp, rutu, fecha, compra, dOrder) => {
	const dOrderData = dOrder.map((e) => {
		return {
			id_producto: e.idp,
			cantidad: e.cantidad,
			precio_unidad: e.precio,
			precio_total: e.total,
		};
	});
	return await createOrder(id, rutp, rutu, fecha, compra, dOrderData);
};

export {
	getAllOrderService,
	getOrderService,
	createOrderService,
	editOrderService,
	deleteOrderService,
};
