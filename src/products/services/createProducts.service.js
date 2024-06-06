import { getProduct, createProduct } from "../products.model.js";
import { adapterDB, adapterFront, mapProducts } from "../../core/actions/adapter.js";

export const createProductService = async (req) => {
	try {
		const product = await getProduct(req.body.idp);
		if (product) {
			return {
				status: 400,
				message: "Producto existe",
				data: product,
			};
		}
		const newProduct = await createProduct(adapterDB(mapProducts, req.body));
		return {
			status: 200,
			message: `Producto creado, id: ${newProduct.id_producto}`,
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
