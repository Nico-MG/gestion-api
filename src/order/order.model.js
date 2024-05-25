import db from "../core/db/prisma.js";

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

const editOrder = async (id, rutp, rutu, fecha, compra, dOrder) => {
	return await db.pedido.update({
		where: {
			id_pedido: id,
		},
		data: {
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

const deleteOrder = async (id) => {
	return await db.pedido.delete({
		where: {
			id_pedido: id,
		},
	});
};

const getOrder = async (id) => {
	return await db.pedido
		.findUnique({
			where: {
				id_pedido: id,
			},
			inlcude: {
				detalle_pedido: true,
			}
		})
};

const getAllOrder = async () => {
	return await db.pedido.findMany({
		include: {
			detalle_pedido: true,
		}
	});
};

export { createOrder, editOrder, deleteOrder, getAllOrder, getOrder };
