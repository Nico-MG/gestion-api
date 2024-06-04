import {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
} from "./products.model.js";

const createProductService = async (req) => {
	try {
		const product = await getProduct(req.body.id_producto);
		if (product) {
			return {
				status: 400,
				message: "Producto existe",
				data: product,
			};
		}
		const newProduct = await createProduct(req.body);
		return {
			status: 200,
			message: `Producto creado, id: ${newProduct.id_producto}`,
			data: newProduct,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const deleteProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const newProduct = await deleteProduct(req.params.id);
		return {
			status: 200,
			message: `producto actualizado, id: ${newProduct.id_producto}`,
			data: newProduct,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const updateProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const newProduct = await updateProduct(req.params.id, req.body);
		return {
			status: 200,
			message: `producto actualizado, id: ${newProduct.id_producto}`,
			data: newProduct,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const getProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				message: "No se encontro el producto",
				data: null,
			};
		}
		return {
			status: 200,
			message: "Se encontro el producto",
			data: product,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const getAllProductsService = async (req) => {
	try {
		const allProduct = await getAllProducts();
		if (allProduct.length === 0) {
			return {
				status: 400,
				message: "No se encontraron productos",
				data: null,
			};
		}
		return {
			status: 200,
			message: "Se encontraron productos",
			data: allProduct,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

export {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
};
