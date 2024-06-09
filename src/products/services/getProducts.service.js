import { adapterToFront } from "../../core/actions/adapter.js";
import { getAllProducts, getProduct } from "../products.model.js";
import { iProduct } from "../../core/database/tableStructures.js";

export const getProductService = async (req) => {
	const product = await getProduct(req.params.id);
	if (!product) {
		return {
			status: 404,
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
};

export const getAllProductsService = async () => {
	const allProducts = await getAllProducts();
	
	const adaptedProducts = allProducts.map((product) =>
		adapterToFront(iProduct, product),
	);

	return {
		status: 200,
		message: "Productos encontrados",
		data: adaptedProducts,
	};
};
