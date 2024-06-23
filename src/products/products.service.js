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
	getProductsCount,
	getAllTypes,
} from "./products.model.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllProductsService = async (req) => {
	const query = {
		dato: iProduct[req.query.dato] || "product_id",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
		desde: req.query.desde || "2000-01-01",
		hasta: req.query.hasta || "2099-12-31",
		numero: Number.parseInt(req.query.numero) || 0,
		texto: req.query.texto || "",
	};

	const allProducts = await getAllProducts(query);

	const adaptedProducts = allProducts.map((product) =>
		adapterToFront(iProduct, product),
	);

	return filterHelper(iProduct, adaptedProducts, query);
};

export const getProductsCountService = async () => {
	return await getProductsCount();
};

export const getAllTypesService = async () => {
	const types = await getAllTypes();
	const typesValues = types.map((type) => type.type);
	return typesValues;
};

export const getProductService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const product = await getProduct(id);
	if (!product) {
		throw new NotFound("Producto");
	}

	const adaptedProduct = adapterToFront(iProduct, product);
	return adaptedProduct;
};

export const createProductService = async (req) => {
	const product = await getCodeProduct(req.body.cod);
	if (product.length > 0) {
		throw new CodeRepeat("producto", product[0].code);
	}

	const createdProductData = adapterToDB(iProduct, req.body);
	await createProduct(createdProductData);
};

export const updateProductService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const product = await getProduct(id);
	const productCode = await getCodeProduct(req.body.cod);
	if (!product) {
		throw new NotFound("Producto");
	}
	if (productCode.length > 0 && productCode[0].product_id !== req.params.id) {
		throw new CodeRepeat("producto", req.body.cod);
	}

	const updatedProductData = adapterToDB(iProduct, req.body);
	await updateProduct(id, updatedProductData);
};

export const deleteProductService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const product = await getProduct(id);
	if (!product) {
		throw new NotFound("Producto");
	}

	await deleteProduct(id);
};
