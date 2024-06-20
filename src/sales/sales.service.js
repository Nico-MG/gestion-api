import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";
import { iSales, iSalesDetails } from "../core/database/tableStructures.js";
import {
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
} from "./sales.model.js";

export const getAllSalesService = async (req) => {
	const query = {
		dato: iSales[req.query.dato] || "sale_id",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
	};

	const allSales = await getAllSales(query);

	const adaptedSales = allSales.map((sale) =>
		adapterToFrontWithDetails(iSales, iSalesDetails, sale),
	);

	const formattedSales = adaptedSales.map(sale => ({
		...sale,
		detalles: sale.detalles.map(({productos, ...detalle}) => ({
			...detalle,
			cod: productos?.code,
		})),
	}));
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
	await createSale(adaptedBody, adaptedDetails);
};

export const updateSaleService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const sale = await getSale(id);
	const saleCode = await getCodeSale(req.body.cod);
	if (!sale) {
		throw new NotFound("Venta");
	}
	if (saleCode.length > 1) {
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
	await updateSale(id, adaptedBody, adaptedDetails);
};

export const deleteSaleService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const sale = await getSale(id);
	if (!sale) {
		throw new NotFound("Venta");
	}

	await deleteSale(id);
};
