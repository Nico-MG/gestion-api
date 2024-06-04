import db from "../core/db/prisma.js";

const createNotification = async (id, fecha, idp, titulo, desc) => {
	return await db.notificacion.create({
		data: {
			id_notificacion: id,
			fecha,
			id_producto: idp,
			titulo: titulo,
			descripcion: desc,
		},
	});
};

const updateNotification = async (id, newId, fecha, idp, titulo, desc) => {
	return await db.notificacion.update({
		where: {
			id_notificacion: id,
		},
		data: {
			id_notificacion: newId,
			fecha,
			id_producto: idp,
			titulo: titulo,
			descripcion: desc,
		},
	});
};

const deleteNotification = async (id) => {
	return await db.notificacion.delete({
		where: {
			id_notificacion: id,
		},
	});
};

const getNotification = async (id) => {
	return await db.notificacion.findUnique({
		where: {
			id_notificacion: id,
		},
	});
};

const getAllNotifications = async () => {
	return await db.notificacion.findMany();
};

export {
	createNotification,
	updateNotification,
	deleteNotification,
	getAllNotifications,
	getNotification,
};
