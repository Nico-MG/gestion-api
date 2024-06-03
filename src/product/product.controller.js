import {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
} from "./product.service.js";

const getProductController = async (req, res) => {
	const result = await getProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
};

const getAllProductsController = async (_, res) => {
	const result = await getAllProductsService();
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
};

const createProductController = async (req, res) => {
	const result = await createProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
};

const deleteProductController = async (req, res) => {
	const result = await deleteProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
};

const updateProductController = async (req, res) => {
	const result = await updateProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
};

export {
	getProductController,
	getAllProductsController,
	createProductController,
	updateProductController,
	deleteProductController,
};
