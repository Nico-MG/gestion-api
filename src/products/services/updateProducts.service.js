import {
	adapterDB,
	adapterFront,
	mapProducts,
} from "../../core/actions/adapter.js";
import { getProduct, updateProduct } from "../products.model.js";

export const updateProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				message: "Producto no existe",
				data: null,
			};
		}

		const updatedProductData = adapterDB(mapProducts, req.body);
		const updatedProduct = await updateProduct(
			req.params.id,
			updatedProductData,
		);

		return {
			status: 200,
			message: `Producto actualizado, id: ${updatedProduct.product_id}`,
			data: adapterFront(mapProducts, updatedProduct),
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};
