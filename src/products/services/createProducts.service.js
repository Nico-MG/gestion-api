import { getProduct, createProduct } from "../products.model.js";
import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import { iProduct } from "../../core/database/tableStructures.js";

export const createProductService = async (req) => {
	

	const dbProductData = adapterToDB(iProduct, req.body);
	await createProduct(dbProductData);

	return {
		status: 201,
		message: `Producto creado, id: ${req.body.idp}`,
		data: {},
	};
};
