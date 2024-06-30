import db from "../core/database/connection.js";

export const getAllNotifications = async () => {
	return await db.notifications.findMany();
};

export const createNotification = async (data) => {
	return await db.notifications.create({
		data,
	});
};

export const deleteNotification = async (id) => {
	return await db.notifications.delete({
		where: {
			id: id,
		},
	});
};
