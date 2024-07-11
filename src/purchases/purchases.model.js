import db from "../core/database/connection.js";

export const getAllPurchases = async () => {
	return await db.purchases.findMany({
		include: {
			purchase_details: {
				include: {
					products: {
						select: {
							code: true,
						},
					},
				},
				omit: {
					purchase_id: true,
					createdAt: true,
					updatedAt: true,
				},
			},
		},
		omit: {
			updatedAt: true,
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
			code: code,
		},
	});
};

export const getAllPurchasesCodes = async () => {
	return await db.purchases.findMany({
		select: {
			code: true,
		},
		distinct: ["code"],
	});
};

export const getPurchasesCount = async () => {
	return await db.purchases.count();
};

export const getProductsAndProviders = async () => {
	return {
		products: await db.products.findMany({
			where: {
				status: true,
			},
			select: {
				product_id: true,
				code: true,
				name: true,
			},
		}),
		providers: await db.providers.findMany({
			where: {
				status: true,
			},
			select: {
				provider_rut: true,
				name: true,
			},
		}),
	};
};

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
