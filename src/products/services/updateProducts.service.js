import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import tables from "../../core/database/tableStructures.js";
import { getProduct, updateProduct } from "../products.model.js";

export const updateProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				message: "Producto no existe",
				data: {},
			};
		}

		const updatedProductData = adapterToDB(tables.products, req.body);
		const updatedProduct = await updateProduct(
			req.params.id,
			updatedProductData,
		);
		const adapterProduct = adapterToFront(tables.products, updatedProduct);

		return {
			status: 200,
			message: `Producto actualizado, id: ${adapterProduct.idp}`,
			data: adapterProduct,
		};
	} catch (error) {
		console.error(error.message)
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
