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
	desde,
	hasta,
	limit,
	offset,
	dato,
	orden,
	texto,
	numero,
}) => {
	return await db.purchases.findMany({
		where: {
			OR: [
				texto
					? {
							[dato || "purchase_id"]: {
								contains: texto,
							},
						}
					: undefined,
				numero
					? {
							[dato === "total_price" ? dato : "purchase_id"]: numero
								? { equals: numero }
								: undefined,
						}
					: undefined,
			].filter(Boolean), // Filtra los valores undefined
			date: {
				gt: desde || new Date("2000-01-01"),
				lt: hasta || new Date(),
			},
		},
		orderBy: {
			[dato || "purchase_id"]: orden || "asc",
		},
		take: limit || 10,
		skip: offset || 0,
		include: {
			purchase_details: true,
		},
	});
};

export {
	createPurchase,
	updatePurchase,
	deletePurchase,
	getAllPurchases,
	getPurchase,
};
