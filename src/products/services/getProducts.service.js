import { adapterFront, mapProducts } from "../../core/actions/adapter.js";
import { getAllProducts, getProduct } from "../products.model.js";

export const getProductService = async (req) => {
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
			data: adapterFront(mapProducts, product),
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

export const getAllProductsService = async (req) => {
	try {
		const allProduct = await getAllProducts();
		if (allProduct.length === 0) {
			return {
				status: 400,
				message: "No se encontraron productos",
				data: null,
			};
		}

		const newAllProducts = [];
		for (const product of allProduct) {
			newAllProducts.push(adapterFront(mapProducts, product));
		}

		return {
			status: 200,
			message: "Se encontraron productos",
			data: newAllProducts,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};
