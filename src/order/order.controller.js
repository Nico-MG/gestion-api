import {
	getAllOrderService,
	getOrderService,
	createOrderService,
	editOrderService,
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

const getAllOrderController = async (req, res) => {
	try {
		const result = await getAllOrderService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createOrderController = async (req, res) => {
	const { id, rutp, rutu, fecha, compra, dOrder } = req.body;
	try {
		const result = await createOrderService(
			id,
			rutp,
			rutu,
			fecha,
			compra,
			dOrder,
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

const editOrderController = async (req, res) => {
	const { id } = req.params;
	const { rutp, rutu, fecha, compra, dOrder } = req.body;
	try {
		const result = await editOrderService(
			id,
			rutp,
			rutu,
			fecha,
			compra,
			dOrder,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getOrderController,
	getAllOrderController,
	createOrderController,
	editOrderController,
	deleteOrderController,
};
