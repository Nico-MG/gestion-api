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
        getAllProductCodes,
        getTrueProducts,
} from "./products.model.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllProductsService = async (req) => {
	let content = await getAllProducts();
	const {result, largo} = filterHelper(iProduct, content, req.query);
	content = result.map((product) => adapterToFront(iProduct, product));
	return {content, largo};
};

export const getProductsCountService = async () => {
	return await getProductsCount();
};

export const getAllTypesService = async () => {
	const types = await getAllTypes();
	const typesValues = types.map((type) => type.type);
	return typesValues;
};

export const getAllProductCodesService = async () => {
	const codes = await getAllProductCodes();
	const codesValues = codes.map((code) => code.code);
	return codesValues;
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
	if (productCode.length > 0 && productCode[0].product_id !== id) {
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


export const getAll = async (req) => {
    let content = await getTrueProducts();
    content = content.map((product) => adapterToFront(iProduct, product));
    return {status : 200 , message : content};

};
