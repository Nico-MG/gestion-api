import { adapterFront, mapProducts } from "../../core/actions/adapter.js";
import { deleteProduct, getProduct } from "../products.model.js";

export const deleteProductService = async (req) => {
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
			message: `producto eliminado, id: ${newProduct.id_producto}`,
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
