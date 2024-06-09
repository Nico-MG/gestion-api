import { getProduct, createProduct } from "../products.model.js";
import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import { iProduct } from "../../core/database/tableStructures.js";

export const createProductService = async (req) => {
	const product = await getProduct(req.body.idp);
	if (product) {
		return {
			status: 404,
			message: "Producto ya existe",
			data: {},
		};
	}

	const dbProductData = adapterToDB(iProduct, req.body);
	const createdProduct = await createProduct(dbProductData);
	const newProduct = adapterToFront(iProduct, createdProduct);

	return {
		status: 201,
		message: `Producto creado, id: ${newProduct.idp}`,
		data: newProduct,
	};
};
