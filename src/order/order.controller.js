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
		const {desde, hasta, limit, offset, dato, orden} = req.query
		
		const orderLimit = limit || 10
		const orderOffset = offset || 0
		const orderDato = dato || 'id'
		const orderOrden = orden || 'asc'
		const orderDesde = desde || new Date('2000-01-01')
		const orderHasta = hasta || new Date()
		
		const result = await getAllOrdersService(orderDesde, orderHasta, orderLimit, orderOffset, orderDato, orderOrden);
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
