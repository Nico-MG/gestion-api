import {
	getAllRefundsService,
	getRefundService,
	createRefundService,
	updateRefundService,
	deleteRefundService,
} from "./refunds.service.js";

const getRefundController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getRefundService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllRefundsController = async (req, res) => {
	try {
		const result = await getAllRefundsService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createRefundController = async (req, res) => {
	const { id_devolucion, id_venta, fecha, descripcion } = req.body;
	try {
		const result = await createRefundService(
			id_devolucion,
			id_venta,
			fecha,
			descripcion,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteRefundController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteRefundService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateRefundController = async (req, res) => {
	const { id } = req.params;
	const { id_devolucion, id_venta, fecha, descripcion } = req.body;
	try {
		const result = await updateRefundService(
			id,
			id_devolucion,
			id_venta,
			fecha,
			descripcion,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getRefundController,
	getAllRefundsController,
	createRefundController,
	updateRefundController,
	deleteRefundController,
};
