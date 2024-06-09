import { adapterToFront } from "../../core/actions/adapter.js";
import { filtersProducts } from "../products.model.js";
import { iProduct } from "../../core/database/tableStructures.js";

export const filtersProductsService = async (req) => {
	req.params.desde ??= new Date("2000-01-01");
	req.params.hasta ??= new Date();
	req.params.dato ??= "product_id";
	req.params.orden ??= "asc";

	const allProducts = await filtersProducts(req);
	if (allProducts.length === 0) {
		return {
			status: 200,
			message: "No se encontraron productos",
			data: [],
		};
	}

	const adaptedProducts = allProducts.map((product) =>
		adapterToFront(iProduct, product),
	);

	return {
		status: 200,
		message: "Productos encontrados",
		data: adaptedProducts,
	};
};
