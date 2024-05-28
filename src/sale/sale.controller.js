import {
	getAllSalesService,
	getSaleService,
	createSaleService,
	updateSaleService,
	deleteSaleService,
} from "./sale.service.js";

const getSaleController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getSaleService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllSalesController = async (req, res) => {
	try {
		const result = await getAllSalesService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createSaleController = async (req, res) => {
	const { id_venta, rut_cliente, rut_usuario, fecha, venta_total } = req.body;
	try {
		const result = await createSaleService(
			id_venta,
			rut_cliente,
			rut_usuario,
			fecha,
			venta_total,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteSaleController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteSaleService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateSaleController = async (req, res) => {
	const { id } = req.params;
	const { id_venta, rut_cliente, rut_usuario, fecha, venta_total } = req.body;
	try {
		const result = await updateSaleService(
			id,
			id_venta,
			rut_cliente,
			rut_usuario,
			fecha,
			venta_total,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getSaleController,
	getAllSalesController,
	createSaleController,
	updateSaleController,
	deleteSaleController,
};
