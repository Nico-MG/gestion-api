import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import { getProduct, updateProduct } from "../products.model.js";
import { iProduct } from "../../core/database/tableStructures.js";

export const updateProductService = async (req) => {
	const product = await getProduct(req.params.id);
	if (!product) {
		return {
			status: 404,
			message: "Producto no existe",
			data: {},
		};
	}

	const updatedProductData = adapterToDB(iProduct, req.body);
	const updatedProduct = await updateProduct(req.params.id, updatedProductData);
	const adapterProduct = adapterToFront(iProduct, updatedProduct);

	return {
		status: 200,
		message: `Producto actualizado, id: ${adapterProduct.idp}`,
		data: adapterProduct,
	};
};
