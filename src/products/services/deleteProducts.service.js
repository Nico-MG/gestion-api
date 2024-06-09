import { adapterToFront } from "../../core/actions/adapter.js";
import { deleteProduct, getProduct } from "../products.model.js";
import { iProduct } from "../../core/database/tableStructures.js";

export const deleteProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				message: "Producto no existe",
				data: {},
			};
		}

		const deletedProduct = await deleteProduct(req.params.id);
		const adapterProduct = adapterToFront(iProduct, deletedProduct);

		return {
			status: 200,
			message: `Producto eliminado, id: ${adapterProduct.idp}`,
			data: adapterProduct,
		};
	} catch (error) {
		console.error(error.message);
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
