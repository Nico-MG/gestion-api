import {
	getAllProduct,
	getProduct,
	deleteProduct,
	createProduct,
	editProduct,
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

const editProductService = async (
	id,
	nombre,
	categoria,
	cantidad,
	minCantidad,
	precio,
) => {
	return await editProduct(
		id,
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

const getAllProductService = async () => {
	return await getAllProduct();
};

export {
	getAllProductService,
	getProductService,
	createProductService,
	editProductService,
	deleteProductService,
};
