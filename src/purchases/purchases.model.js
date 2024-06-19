import db from "../core/database/connection.js";

export const getAllPurchases = async ({ limit, offset, dato, orden }) => {
	return await db.purchases.findMany({
		orderBy: {
			[dato]: orden,
		},
		take: limit,
		skip: offset,
		include: {
			purchase_details: true,
		},
	});
};

export const getPurchase = async (id) => {
	return await db.purchases.findUnique({
		where: {
			purchase_id: id,
		},
		include: {
			purchase_details: true,
		},
	});
};

export const getCodePurchase = async (code) => {
	return await db.purchases.findMany({
		where: {
			code: code
		}
	})
}

export const createPurchase = async (body, details) => {
	await db.purchases.create({
		data: {
			...body,
			purchase_details: {
				create: details,
			},
		},
	});
};

export const updatePurchase = async (id, body, details) => {
	await db.purchaseDetails.deleteMany({
		where: {
			purchase_id: id,
			product_id: {
				notIn: details.map((detail) => detail.product_id),
			},
		},
	});
	await db.purchases.update({
		where: {
			purchase_id: id,
		},
		include: { purchase_details: true },
		data: {
			...body,
			purchase_details: {
				upsert: details.map((detail) => ({
					where: {
						purchase_id_product_id: {
							purchase_id: id,
							product_id: detail.product_id,
						},
					},
					update: detail,
					create: detail,
				})),
			},
		},
	});
};

export const deletePurchase = async (id) => {
	await db.purchases.delete({
		where: {
			purchase_id: id,
		},
	});
};