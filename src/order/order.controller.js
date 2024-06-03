import {
	getAllOrdersService,
	getOrderService,
	createOrderService,
	updateOrderService,
	deleteOrderService,
} from "./order.service.js";

const getOrderController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getOrderService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllOrdersController = async (req, res) => {
	try {
		req.query.limit ??= 10;
		req.query.offset ??= 0;
		req.query.dato ??= "id_pedido";
		req.query.orden ??= "asc";
		req.query.desde ??= new Date("2000-01-01");
		req.query.hasta ??= new Date();

		const result = await getAllOrdersService(req);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createOrderController = async (req, res) => {
	const {
		id_pedido,
		rut_proveedor,
		rut_usuario,
		fecha,
		compra_total,
		detalle_pedido,
	} = req.body;
	try {
		const result = await createOrderService(
			id_pedido,
			rut_proveedor,
			rut_usuario,
			fecha,
			compra_total,
			detalle_pedido,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteOrderController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteOrderService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateOrderController = async (req, res) => {
	const { id } = req.params;
	const {
		id_pedido,
		rut_proveedor,
		rut_usuario,
		fecha,
		compra_total,
		detalle_pedido,
	} = req.body;
	try {
		const result = await updateOrderService(
			id,
			id_pedido,
			rut_proveedor,
			rut_usuario,
			fecha,
			compra_total,
			detalle_pedido,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getOrderController,
	getAllOrdersController,
	createOrderController,
	updateOrderController,
	deleteOrderController,
};
