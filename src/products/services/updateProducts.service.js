import { adapterFront, mapProducts } from "../../core/actions/adapter.js";
import { getProduct, updateProduct } from "../products.model.js";

export const updateProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const newProduct = await updateProduct(
			req.params.id,
			adapterDB(mapProducts, req.body),
		);
		return {
			status: 200,
			message: `producto actualizado, id: ${newProduct.id_producto}`,
			data: adapterFront(mapProducts, newProduct),
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};
