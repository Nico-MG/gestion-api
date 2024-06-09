import db from "../core/database/connection.js";

const createOrder = async (body, details) => {
	return await db.orders.create({
		include: { order_details: true },
		data: {
			...body,
			order_details: {
				create: details,
			},
		},
	});
};

const updateOrder = async (id, body, details) => {
	return await db.orders.update({
		where: {
			order_id: id,
		},
		include: { order_details: true },
		data: {
			...body,
			order_details: {
				upsert: details.map((detail) => ({
					where: { product_id: detail.product_id },
					update: detail,
					create: detail,
				})),
			},
		},
	});
};

const deleteOrder = async (id) => {
	return await db.orders.delete({
		where: {
			order_id: id,
		},
	});
};

const getOrder = async (id) => {
	return await db.orders.findUnique({
		where: {
			order_id: id,
		},
		include: {
			order_details: true,
		},
	});
};

const getAllOrders = async ({
	desde,
	hasta,
	limit,
	offset,
	dato,
	orden,
	texto,
	numero,
}) => {
	return await db.orders.findMany({
		where: {
			OR: [
				texto
					? {
							[dato || "order_id"]: {
								contains: texto,
							},
						}
					: undefined,
				numero
					? {
							[dato === "compra_total" ? dato : "order_id"]: numero
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
			[dato || "order_id"]: orden || "asc",
		},
		take: limit || 10,
		skip: offset || 0,
		include: {
			order_details: true,
		},
	});
};

export { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder };
