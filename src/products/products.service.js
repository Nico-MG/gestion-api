import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import { iProduct } from "../core/database/tableStructures.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import {
	getProduct,
	getAllProducts,
	createProduct,
	deleteProduct,
	updateProduct,
	getCodeProduct,
} from "./products.model.js";

export const getAllProductsService = async (req) => {
	const query = {
		dato: iProduct[req.query.dato] || "product_id",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
	};

	const allProducts = await getAllProducts(query);

	const adaptedProducts = allProducts.map((product) =>
		adapterToFront(iProduct, product),
	);

	return adaptedProducts;
};

export const createProductService = async (req) => {
	const product = await getCodeProduct(req.body.cod);
	if (product.length === 1) {
		throw new CodeRepeat("producto", product[0].code);
	}

	const createdProductData = adapterToDB(iProduct, req.body);
	await createProduct(createdProductData);
};

export const deleteProductService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const product = await getProduct(id);
	if (!product) {
		throw new NotFound("Producto");
	}

	await deleteProduct(id);
};

export const updateProductService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const product = await getProduct(id);
	const productCode = await getCodeProduct(req.body.cod);
	if (!product) {
		throw new NotFound("Producto");
	}
	if (productCode.length > 1 && productCode[0].code === req.body.cod) {
		throw new CodeRepeat("producto", req.body.cod);
	}

	const updatedProductData = adapterToDB(iProduct, req.body);
	await updateProduct(id, updatedProductData);
};
