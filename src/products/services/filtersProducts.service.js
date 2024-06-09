import { adapterToFront } from "../../core/actions/adapter.js";
import tables from "../../core/database/tableStructures.js";
import { filtersProducts } from "../products.model.js";

export const filtersProductsService = async (req) => {
	try {

        req.params.desde ??= new Date("2000-01-01")
        req.params.hasta ??= new Date()
        req.params.dato ??= "product_id"
        req.params.orden ??= "asc"

		const allProducts = await filtersProducts(req);
		if (allProducts.length === 0) {
			return {
				status: 200,
				message: "No se encontraron productos",
				data: [],
			};
		}

		const adaptedProducts = allProducts.map((product) =>
			adapterToFront(tables.products, product),
		);

		return {
			status: 200,
			message: "Productos encontrados",
			data: adaptedProducts,
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