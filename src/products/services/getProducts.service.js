import { adapterFront, mapProducts } from "../../core/actions/adapter.js";
import { getAllProducts, getProduct } from "../products.model.js";

export const getProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				message: "No se encontró el producto",
				data: null,
			};
		}

		const adaptedProduct = adapterFront(mapProducts, product);

		return {
			status: 200,
			message: "Producto encontrado",
			data: adaptedProduct,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

export const getAllProductsService = async () => {
	try {
		const allProducts = await getAllProducts();
		if (allProducts.length === 0) {
			return {
				status: 400,
				message: "No se encontraron productos",
				data: null,
			};
		}

		const adaptedProducts = allProducts.map((product) =>
			adapterFront(mapProducts, product),
		);

		return {
			status: 200,
			message: "Productos encontrados",
			data: adaptedProducts,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};
