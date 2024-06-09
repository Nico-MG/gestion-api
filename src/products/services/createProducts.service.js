import { getProduct, createProduct } from "../products.model.js";
import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import { iProduct } from "../../core/database/tableStructures.js";

export const createProductService = async (req) => {
	try {
		const product = await getProduct(req.body.idp);
		if (product) {
			return {
				status: 400,
				message: "Producto ya existe",
				data: {},
			};
		}

		const dbProductData = adapterToDB(iProduct, req.body);
		const createdProduct = await createProduct(dbProductData);
		const newProduct = adapterToFront(iProduct, createdProduct);

		return {
			status: 200,
			message: `Producto creado, id: ${newProduct.idp}`,
			data: newProduct,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: {},
		};
	}
};
