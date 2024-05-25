import {
	getAllProductService,
	getProductService,
	createProductService,
	editProductService,
	deleteProductService,
} from "./product.service.js";

const getProductController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getProductService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllProductController = async (req, res) => {
	try {
		const result = await getAllProductService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createProductController = async (req, res) => {
	const { id, nombre, categoria, cantidad, minCantidad, precio } = req.body;
	try {
		const result = await createProductService(
			id,
			nombre,
			categoria,
			cantidad,
			minCantidad,
			precio,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteProductController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteProductService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const editProductController = async (req, res) => {
	const { id } = req.params;
	const { nombre, categoria, cantidad, minCantidad, precio } = req.body;
	try {
		const result = await editProductService(
			id,
			nombre,
			categoria,
			cantidad,
			minCantidad,
			precio,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getProductController,
	getAllProductController,
	createProductController,
	editProductController,
	deleteProductController,
};
