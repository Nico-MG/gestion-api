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
			data: product
		};
	}
	const newProduct = await createProduct(req.body);

	return {
		status: 200,
		message: `producto creado, id: ${newProduct.id_producto}`,
		data: newProduct
	};
};

const deleteProductService = async (req) => {
	const product = await getProduct(req.params.id);
	if (!product) {
		return {
			status: 400,
			mesage: "producto no existe",
			data: product,
		};
	}
	const newProduct = await deleteProduct(req.params.id);
	return {
		status: 200,
		message: `producto actualizado, id: ${newProduct.id_producto}`,
		data: newProduct,
	};
};

const updateProductService = async (req) => {
	const product = await getProduct(req.params.id);
	if (!product) {
		return {
			status: 400,
			mesage: "producto no existe",
			data: product
		};
	}
	const newProduct = await updateProduct(req.params.id, req.body);
	return {
		status: 200,
		message: `producto actualizado, id: ${newProduct.id_producto}`,
		data: newProduct,
	};
};

const getProductService = async (req) => {
	const product = await getProduct(req.params.id);
	if (!product) {
		return {
			status: 400,
			message: "No se encontro el producto",
			data: product,
		};
	}
	return {
		status: 200,
		message: "No se encontro el producto",
		data: product,
	};
};

const getAllProductsService = async () => {
	const allProduct = await getAllProducts();
	if (allProduct.length === 0) {
		return {
			status: 400,
			message: "No se encontraron productos",
			data: allProduct,
		};
	}
	return {
		status: 200,
		message: "No se encontraron productos",
		data: allProduct,
	};
};

export {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
};
