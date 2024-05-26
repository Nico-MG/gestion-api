import {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
} from "./product.model.js";

const createProductService = async (
	id,
	nombre,
	categoria,
	cantidad,
	minCantidad,
	precio,
) => {
	return await createProduct(
		id,
		nombre,
		categoria,
		cantidad,
		minCantidad,
		precio,
	);
};

const deleteProductService = async (id) => {
	return await deleteProduct(id);
};

const updateProductService = async (
	id,
	newId,
	nombre,
	categoria,
	cantidad,
	minCantidad,
	precio,
) => {
	return await updateProduct(
		id,
		newId,
		nombre,
		categoria,
		cantidad,
		minCantidad,
		precio,
	);
};

const getProductService = async (id) => {
	return await getProduct(id);
};

const getAllProductsService = async () => {
	return await getAllProducts();
};

export {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
};
