import { adapterDB, adapterFront } from "../../core/actions/adapter.js";
import tables from "../../core/database/tableStructures.js";
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

		const updatedProductData = adapterDB(tables.products, req.body);
		const updatedProduct = await updateProduct(
			req.params.id,
			updatedProductData,
		);
		const adapterProduct = adapterFront(tables.products, updatedProduct);

		return {
			status: 200,
			message: `Producto actualizado, id: ${adapterProduct.idp}`,
			data: adapterProduct,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};
