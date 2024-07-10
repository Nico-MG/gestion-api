import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";
import MinimumQuantity from "../core/errors/minimumQuantity.js";
import {
	iSales,
	iSalesDetails,
	iProduct,
} from "../core/database/tableStructures.js";
import {
	adapterToFront,
	adapterToDBWithDetails,
	adapterToFrontWithDetails,
} from "../core/actions/adapter.js";
import {
	getAllSales,
	getSale,
	createSale,
	updateSale,
	deleteSale,
	getCodeSale,
	getSalesCount,
	getAllSalesCodes,
	getProducts,
} from "./sales.model.js";
import { getProductService } from "../products/products.service.js";
import formattedDetails from "../core/actions/formattedSaleDetails.js";
import filterHelper from "../core/actions/filterHelper.js";
import quantityAdjuster from "../core/actions/quantityAdjuster.js";

export const getAllSalesService = async (req) => {
	let content = await getAllSales();
	const { result, largo } = filterHelper(iSales, content, req.query);
	content = result.map((sale) =>
		adapterToFrontWithDetails(iSales, iSalesDetails, sale),
	);
	content = content.map((sale) => formattedDetails(sale));
	return { content, largo };
};

export const getSaleService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const sale = await getSale(id);
	if (!sale) {
		throw new NotFound("Venta");
	}

	const adaptedSale = adapterToFrontWithDetails(iSales, iSalesDetails, sale);
	return adaptedSale;
};

export const getSalesCountService = async () => {
	return await getSalesCount();
};

export const getProductsService = async () => {
	const data = await getProducts();
	const products = data.products.map((product) =>
		adapterToFront(iProduct, product),
	);
	return products;
};

export const getAllSalesCodesService = async () => {
	const codes = await getAllSalesCodes();
	return codes.map((code) => code.code);
};

export const createSaleService = async (req) => {
	const sale = await getCodeSale(req.body.cod);
	if (sale === 1) {
		throw new CodeRepeat("venta", req.body.cod);
	}
	if (!moduleRut(req.body.rutc)) {
		throw new InvalidRut(req.body.rutc);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iSales,
		iSalesDetails,
		req.body,
	);

	for (const detail of adaptedDetails) {
		const product = await getProductService({
			params: { id: detail.product_id },
		});
		if (product.cit - detail.quantity < 0) {
			throw new MinimumQuantity(product.cod, product.nombre);
		}
	}

	await createSale(adaptedBody, adaptedDetails);
	adaptedDetails.map(async (detail) => {
		await quantityAdjuster("RES", "ADD", detail, {});
	});
};

export const updateSaleService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const sale = await getSale(id);
	const saleCode = await getCodeSale(req.body.cod);
	if (!sale) {
		throw new NotFound("Venta");
	}
	if (saleCode.length > 0 && saleCode[0].sale_id !== id) {
		throw new CodeRepeat("venta", req.body.cod);
	}
	if (!moduleRut(req.body.rutc)) {
		throw new InvalidRut(req.body.rutc);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iSales,
		iSalesDetails,
		req.body,
	);

	for (const detail of adaptedDetails) {
		const product = await getProductService({
			params: { id: detail.product_id },
		});
		if (
			product.cit -
				(detail.quantity +
					sale.sale_details.filter(
						(elm) => elm.product_id === detail.product_id,
					)[0].quantity) <
			0
		) {
			throw new MinimumQuantity(product.cod, product.nombre);
		}
	}
	await updateSale(id, adaptedBody, adaptedDetails);
	adaptedDetails.map(async (detail) => {
		await quantityAdjuster(
			"RES",
			"UPD",
			detail,
			sale.sale_details.filter(
				(elm) => elm.product_id === detail.product_id,
			)[0],
		);
	});
};

export const deleteSaleService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const sale = await getSale(id);
	if (!sale) {
		throw new NotFound("Venta");
	}

	for (const detail of sale.details) {
		const product = await getProductService({
			params: { id: detail.product_id },
		});
		if (product.cit - detail.quantity < 0) {
			throw new MinimumQuantity(product.cod, product.nombre);
		}
	}

	await deleteSale(id);
	sale.details.map(async (detail) => {
		await quantityAdjuster("RES", "DEL", detail, {});
	});
};
