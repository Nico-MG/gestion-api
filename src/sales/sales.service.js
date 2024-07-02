import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";
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
import formattedDetails from "../core/actions/formattedDetails.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllSalesService = async (req) => {
  const query = {
    dato: iSales[req.query.dato] || "sale_id",
    orden: req.query.orden || "asc",
    limit: Number.parseInt(req.query.limit) || 10,
    offset: Number.parseInt(req.query.offset) || 0,
    desde: req.query.desde || "2000-01-01",
    hasta: req.query.hasta || "2099-12-31",
    numero: Number.parseInt(req.query.numero) || 0,
    texto: req.query.texto || "",
  };

  const allSales = await getAllSales(query);

  const adaptedSales = allSales.map((sale) =>
    adapterToFrontWithDetails(iSales, iSalesDetails, sale)
  );

  const formattedSales = adaptedSales.map((sale) => formattedDetails(sale));
  return filterHelper(iSales, formattedSales, query);
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
    adapterToFront(iProduct, product)
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
    req.body
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
    req.body
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
