import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import { iProduct } from "../core/database/tableStructures.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import {
	getProductById,
	getAllProductCodes,
	getAllProductTypes,
	getAllProducts,
	getProductByCode,
	getProductsCount,
	deleteProduct,
	createProduct,
	updateProduct,
} from "./products.model.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllProductsService = async (req) => {
	let content = await getAllProducts();
	content = filterHelper(iProduct, content, req.query);
	content = content.map((product) => adapterToFront(iProduct, product));

	return content;
};

export const getProductsCountService = async () => {
	return await getProductsCount();
};

export const getAllProductTypesService = async () => {
	return (await getAllProductTypes()).map((type) => type.type);
};

export const getAllProductCodesService = async () => {
	return (await getAllProductCodes()).map((code) => code.code);
};

export const createProductService = async (req) => {
	const productCode = await getProductByCode(req.body.cod);
	if (productCode.length > 0) {
		throw new CodeRepeat("producto", productCode[0].code);
	}

	const data = adapterToDB(iProduct, req.body);
	await createProduct(data);
};

export const updateProductService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const productId = await getProductById(id);
	const productCode = await getProductByCode(req.body.cod);
	if (!productId) {
		throw new NotFound("Producto");
	}
	if (productCode.length > 0 && productCode[0].product_id !== id) {
		throw new CodeRepeat("producto", req.body.cod);
	}

	const data = adapterToDB(iProduct, req.body);
	await updateProduct(id, data);
};

export const deleteProductService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const productId = await getProductById(id);
	if (!productId) {
		throw new NotFound("Producto");
	}

	await deleteProduct(id);
};
