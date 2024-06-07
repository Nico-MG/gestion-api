import db from "../core/db/connection.js";

const createRefund = async ({ id, idv, fecha, desc, dRefund }) => {
	return await db.devolucion.create({
		data: {
			id_devolucion: id,
			id_venta: idv,
			fecha,
			descripcion: desc,
			detalle_devolucion: {
				create: dRefund,
			},
		},
	});
};

const updateRefund = async (id, { newId, idv, fecha, desc, dRefund }) => {
	return await db.devolucion.update({
		where: {
			id_devolucion: id,
		},
		data: {
			id_devolucion: newId,
			id_venta: idv,
			fecha,
			descripcion: desc,
			detalle_devolucion: {
				updateMany: dRefund,
			},
		},
	});
};

const deleteRefund = async (id) => {
	return await db.devolucion.delete({
		where: {
			id_devolucion: id,
		},
	});
};

const getRefund = async (id) => {
	return await db.devolucion.findUnique({
		where: {
			id_devolucion: id,
		},
		include: {
			detalle_devolucion: true,
		},
	});
};

const getAllRefunds = async () => {
	return await db.devolucion.findMany({
		include: {
			detalle_devolucion: true,
		},
	});
};

export { createRefund, updateRefund, deleteRefund, getAllRefunds, getRefund };
