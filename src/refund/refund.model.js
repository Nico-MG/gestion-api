import db from "../core/db/prisma.js";
//lol esta m
const createRefund = async (idd, idv, fecha, desc, dRefund) => {
	return await db.pedido.create({
		data: {
			id_devolucion: idd,
			id_venta: idv,
			descripcion: desc,
			fecha: fecha,
			detalle_devolucion: {
				create: dRefund,
			},
		},
	});
};

const editRefund = async (idd, idv, fecha, desc, dOrder) => {
	return await db.pedido.update({
		where: {
			id_pedido: idd,
		},
		data: {
			rut_proveedor: rutp,
			rut_usuario: rutu,
			fecha,
			compra_total: compra,
			detalle_pedido: {
				update: dOrder.map((detalle) => ({
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
				})),
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

const getAllOrder = async () => {
	return await db.pedido.findMany({
		include: {
			detalle_pedido: true,
		},
	});
};

export { createOrder, editOrder, deleteOrder, getAllOrder, getOrder };
