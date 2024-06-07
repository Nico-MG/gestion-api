import { adapterFront, mapProducts } from "../../core/actions/adapter.js";
import { deleteProduct, getProduct } from "../products.model.js";

export const deleteProductService = async (req) => {
	try {
		const product = await getProduct(req.params.id);
		if (!product) {
			return {
				status: 400,
				message: "Producto no existe",
				data: null,
			};
		}

		const deletedProduct = await deleteProduct(req.params.id);
        const adapterProduct = adapterFront(mapProducts, deletedProduct);

		return {
			status: 200,
			message: `Producto eliminado, id: ${adapterProduct.idp}`,
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
