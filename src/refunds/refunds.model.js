import db from "../core/database/connection.js";

export const getAllRefunds = async () => {
	return await db.refunds.findMany({
		include: {
			refund_details: {
				include: {
					products: {
						select: {
							code: true,
						},
					},
				},
			},
			sales: {
				include: {
					sale_details: {
						select: { quantity: true, product_id: true, products: {
							select: { code: true },
						} },
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

export const getRefund = async (id) => {
	return await db.refunds.findUnique({
		where: {
			refund_id: id,
		},
		include: {
			refund_details: true,
		},
	});
};

export const getRefundSalesProductCit = async (ids, idp) => {
	return await db.saleDetails.findUnique({
		where: {
			sale_id_product_id: {
				sale_id: ids,
				product_id: idp,
			},
		},
		select: {
			quantity: true,
		},
	});
};

export const getRefundsCount = async () => {
	return await db.refunds.count();
};

export const getCodeRefund = async (code) => {
	return await db.refunds.findMany({
		where: {
			code: code,
		},
	});
};

export const createRefund = async (body, details) => {
	await db.refunds.create({
		data: {
			...body,
			refund_details: {
				create: details,
			},
		},
	});
};

export const updateRefund = async (id, body, details) => {
	await db.refundDetails.deleteMany({
		where: {
			refund_id: id,
			product_id: {
				notIn: details.map((detail) => detail.product_id),
			},
		},
	});
	await db.refunds.update({
		where: {
			refund_id: id,
		},
		include: { refund_details: true },
		data: {
			...body,
			refund_details: {
				upsert: details.map((detail) => ({
					where: {
						refund_id_product_id: {
							refund_id: id,
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

export const deleteRefund = async (id) => {
	return await db.refunds.delete({
		where: {
			refund_id: id,
		},
	});
};
