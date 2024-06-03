import {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
} from "./product.model.js";

const createProductService = async (req) => {
	const product = await getProduct(req.body.id_producto);
	if (product) {
		return {
			status: 400,
			message: "producto existe",
		};
	}
	const newProduct = await createProduct(req.body);

	return {
		status: 200,
		message: "producto creado, id: " + newProduct.id_producto,
	};
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
