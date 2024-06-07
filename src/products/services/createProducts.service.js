import { getProduct, createProduct } from "../products.model.js";
import {
	adapterDB,
	adapterFront,
	mapProducts,
} from "../../core/actions/adapter.js";

export const createProductService = async (req) => {
	try {
		const product = await getProduct(req.body.idp);
		if (product) {
			return {
				status: 400,
				message: "Producto ya existe",
				data: product,
			};
		}

		// Convierte los datos del frontend al formato de la base de datos
		const dbProductData = adapterDB(mapProducts, req.body);
		const createdProduct = await createProduct(dbProductData);

		// Convierte los datos del formato de la base de datos al formato del frontend
		const newProduct = adapterFront(mapProducts, createdProduct);

		return {
			status: 200,
			message: `Producto creado, id: ${newProduct.idp}`,
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
