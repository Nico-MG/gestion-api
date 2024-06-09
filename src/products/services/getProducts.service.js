import { adapterToFront } from "../../core/actions/adapter.js";
import { getAllProducts, getProduct } from "../products.model.js";
import { iProduct } from "../../core/database/tableStructures.js";

export const getProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				message: "No se encontró el producto",
				data: {},
			};
		}

		const adaptedProduct = adapterToFront(iProduct, product);

		return {
			status: 200,
			message: "Producto encontrado",
			data: adaptedProduct,
		};
	} catch (error) {
		console.error(error.message);
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};

export const getAllProductsService = async () => {
	try {
		const allProducts = await getAllProducts();
		if (allProducts.length === 0) {
			return {
				status: 200,
				message: "No se encontraron productos",
				data: [],
			};
		}

		const adaptedProducts = allProducts.map((product) =>
			adapterToFront(iProduct, product),
		);

		return {
			status: 200,
			message: "Productos encontrados",
			data: adaptedProducts,
		};
	} catch (error) {
		console.error(error.message);
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
