import {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
} from "./product.service.js";

const getProductController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getProductService(id);
	    return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllProductsController = async (req, res) => {
	try {
		const result = await getAllProductsService();
	    return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createProductController = async (req, res) => {
	const {
		id_producto,
		nombre,
		categoria,
		cantidad,
		min_cantidad,
		precio_venta,
	} = req.body;
	try {
		const result = await createProductService(
			id_producto,
			nombre,
			categoria,
			cantidad,
			min_cantidad,
			precio_venta,
		);
	    return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteProductController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteProductService(id);
	    return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateProductController = async (req, res) => {
	const { id } = req.params;
	const {
		id_producto,
		nombre,
		categoria,
		cantidad,
		min_cantidad,
		precio_venta,
	} = req.body;
	try {
		const result = await updateProductService(
			id,
			id_producto,
			nombre,
			categoria,
			cantidad,
			min_cantidad,
			precio_venta,
		);
	    return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getProductController,
	getAllProductsController,
	createProductController,
	updateProductController,
	deleteProductController,
};
