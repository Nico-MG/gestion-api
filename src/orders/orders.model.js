import db from "../core/db/connection.js";

const createOrder = async (id, rutp, rutu, fecha, compra, dOrder) => {
	return await db.pedido.create({
		data: {
			id_pedido: id,
			rut_proveedor: rutp,
			rut_usuario: rutu,
			fecha,
			compra_total: compra,
			detalle_pedido: {
				create: dOrder,
			},
		},
	});
};

const updateOrder = async (id, newId, rutp, rutu, fecha, compra, dOrder) => {
	await Promise.all(
		dOrder.map(async (detalle) => {
			await db.detalle_pedido.update({
				where: {
					id_pedido_id_producto: {
						id_pedido: id,
						id_producto: detalle.id_producto,
					},
				},
				data: {
					cantidad: detalle.cantidad,
					precio_unidad: detalle.precio_unidad,
					precio_total: detalle.precio_total,
				},
			});
		}),
	);

	return await db.pedido.update({
		where: {
			id_pedido: id,
		},
		data: {
			id_pedido: newId,
			rut_proveedor: rutp,
			rut_usuario: rutu,
			fecha,
			compra_total: compra,
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
			[dato || "id_pedido"]: {
				contains: texto || "",
			},
			fecha: {
				gt: desde || new Date("2000-01-01"),
				lt: hasta || new Date(),
			},
		},
		orderBy: {
			[dato  || "id_pedido"]: orden || "asc",
		},
		take: limit || 10,
		skip: offset || 0,
		include: {
			detalle_pedido: true,
		},
	});
};

export { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder };
