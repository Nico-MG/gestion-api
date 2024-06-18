import db from "../core/db/connection.js";

const createSale = async (body, details) => {
	return await db.venta.create({
		data: {
			...body,
			detalle_venta: {
				create: details,
			},
		},
	});
};

const updatePurchase = async (id, body, details) => {
	// TODO: hacer el update segun el update de purchases
};

const deleteSale = async (id) => {
	return await db.venta.delete({
		where: {
			id_venta: id,
		},
	});
};

const getSale = async (id) => {
	return await db.venta.findUnique({
		where: {
			id_venta: id,
		},
		include: {
			detalle_venta: true,
		},
	});
};

const getAllSales = async () => {
	return await db.venta.findMany({
		include: {
			detalle_venta: true,
		},
	});
};

export { createSale, updateSale, deleteSale, getAllSales, getSale };
