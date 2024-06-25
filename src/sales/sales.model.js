import db from "../core/database/connection.js";

export const getAllSales = async ({ dato, orden, limit, offset }) => {
	return await db.sales.findMany({
		orderBy: {
			[dato]: orden,
		},
		take: limit,
		skip: offset,
		include: {
			sale_details: {
				include: {
					products: {
						select: {
							code: true,
						},
					},
				},
			},
		},
		omit: {
			createdAt: true,
			updatedAt: true,
		},
	});
};

export const getSale = async (id) => {
	return await db.sales.findUnique({
		where: {
			sale_id: id,
		},
		include: {
			sale_details: true,
		},
	});
};

export const getCodeSale = async (code) => {
	return await db.sales.findMany({
		where: {
			code: code,
		},
	});
};

export const getSalesCount = async () => {
	return await db.sales.count();
};

export const createSale = async (body, details) => {
	await db.sales.create({
		data: { ...body, sale_details: { create: details } },
	});
};

export const updateSale = async (id, body, details) => {
	await db.saleDetails.deleteMany({
		where: {
			sale_id: id,
			product_id: {
				notIn: details.map((detail) => detail.product_id),
			},
		},
	});
	await db.sales.update({
		where: {
			sale_id: id,
		},
		include: { sale_details: true },
		data: {
			...body,
			sale_details: {
				upsert: details.map((detail) => ({
					where: {
						sale_id_product_id: {
							sale_id: id,
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

export const deleteSale = async (id) => {
	await db.sales.delete({
		where: {
			sale_id: id,
		},
	});
};
