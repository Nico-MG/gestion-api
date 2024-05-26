import {
	getAllSales,
	getSale,
	deleteSale,
	createSale,
	updateSale,
} from "./sale.model.js";

const getSaleService = async (id) => {
	return await getSale(id);
};

const getAllSalesService = async () => {
	return await getAllSales();
};

const updateSaleService = async (id, newId, rutc, rutu, fecha, venta, dSale) => {
	const dSaleData = dSale.map((e) => {
		return {
			id_producto: e.id_producto,
			cantidad: e.cantidad,
			precio_unidad: e.precio_unidad,
			precio_total: e.precio_total,
		};
	});
	return await updateSale(id, newId, rutc, rutu, fecha, venta, dSaleData);
};

const deleteSaleService = async (id) => {
	return await deleteSale(id);
};

const createSaleService = async (id, rutc, rutu, fecha, venta, dSale) => {
	const dSaleData = dSale.map((e) => {
		return {
      id_producto: e.id_producto,
      cantidad: e.cantidad,
      precio_unidad: e.precio_unidad,
      precio_total: e.precio_total
		};
	});
	return await createSale(id, rutc, rutu, fecha, venta, dSaleData);
};

export {
	getAllSalesService,
	getSaleService,
	createSaleService,
	updateSaleService,
	deleteSaleService,
};
