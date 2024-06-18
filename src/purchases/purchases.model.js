import db from "../core/database/connection.js";

const createPurchase = async (body, details) => {
	return await db.purchases.create({
		include: { purchase_details: true },
		data: {
			...body,
			purchase_details: {
				create: details,
			},
		},
	});
};

const updatePurchase = async (id, body, details) => {
	return await db.purchases.update({
		where: {
			purchase_id: id,
		},
		include: { purchase_details: true },
		data: {
			...body,
			purchase_details: {
				upsert: details.map((detail) => ({
					where: { product_id: detail.product_id },
					update: detail,
					create: detail,
				})),
			},
		},
	});
};

const deletePurchase = async (id) => {
	return await db.purchases.delete({
		where: {
			purchase_id: id,
		},
	});
};

const getPurchase = async (id) => {
	return await db.purchases.findUnique({
		where: {
			purchase_id: id,
		},
		include: {
			purchase_details: true,
		},
	});
};

const getAllPurchases = async ({
	limit,
	offset,
	desde,
	hasta
}) => {
	return await db.purchases.findMany({
		where: {
			date: {
				gte: new Date(toString(desde)) || new Date("2000-01-01"),
				lte: new Date(toString(hasta)) || new Date()
			}
		},
		take: Number(limit) || 10,
		skip: Number(offset) || 0,
		include: {
			purchase_details: true,
		}
	});
};

export {
	createPurchase,
	updatePurchase,
	deletePurchase,
	getAllPurchases,
	getPurchase,
};
