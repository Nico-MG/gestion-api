import {
	getAllNotifications,
	getNotification,
	deleteNotification,
	createNotification,
	updateNotification,
} from "./notification.model.js";

const getNotificationService = async (id) => {
	return await getNotification(id);
};

const getAllNotificationsService = async () => {
	return await getAllNotifications();
};

const updateNotificationService = async (id, newId, fecha, idp, titulo, desc) => {
	return await updateNotification(id, newId, fecha, idp, titulo, desc);
};

const deleteNotificationService = async (id) => {
	return await deleteNotification(id);
};

const createNotificationService = async (id, fecha, idp, titulo, desc) => {
	return await createNotification(id, fecha, idp, titulo, desc);
};

export {
	getAllNotificationsService,
	getNotificationService,
	createNotificationService,
	updateNotificationService,
	deleteNotificationService,
};
