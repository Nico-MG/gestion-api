import db from "../core/db/connection.js";

const createOrder = async ({
	id_pedido,
	rut_proveedor,
	rut_usuario,
	fecha,
	compra_total,
	orderDetails,
}) => {
	return await db.pedido.create({
		data: {
			id_pedido,
			rut_proveedor,
			rut_usuario,
			fecha,
			compra_total,
			detalle_pedido: {
				create: orderDetails,
			},
		},
	});
};

const updateOrder = async (
	id,
	{ id_pedido, rut_proveedor, rut_usuario, fecha, compra_total, orderDetails },
) => {
	return await db.pedido.update({
		where: {
			id_pedido: id,
		},
		data: {
			id_pedido,
			rut_proveedor,
			rut_usuario,
			fecha,
			compra_total,
			detalle_pedido: {
				updateMany: orderDetails,
			},
		},
	});
};

const deleteOrder = async (id) => {
	return await db.pedido.delete({
		where: {
			id_pedido: id,
		},
	});
};

const getOrder = async (id) => {
	return await db.pedido.findUnique({
		where: {
			id_pedido: id,
		},
		include: {
			detalle_pedido: true,
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
	return await db.pedido.findMany({
		where: {
			OR: [
				{
					[dato || "id_pedido"]: {
						contains: texto || "",
					},
				},
				{
					[dato === "compra_total" ? dato : "id_pedido"]: numero
						? { equals: numero }
						: undefined,
				},
			],
			fecha: {
				gt: desde || new Date("2000-01-01"),
				lt: hasta || new Date(),
			},
		},
		orderBy: {
			[dato || "id_pedido"]: orden || "asc",
		},
		take: limit || 10,
		skip: offset || 0,
		include: {
			detalle_pedido: true,
		},
	});
};

export { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder };
