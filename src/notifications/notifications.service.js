import NotFound from "../core/errors/notFound.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import {
	getAllNotifications,
	createNotification,
	deleteNotification,
} from "./notifications.model.js";

export const getAllNotificationsService = async () => {
	const data = await getAllNotifications();
	return data;
};

export const createNotificationService = async (data) => {
	const dbData = adapterToDB(data);
	const newNotification = await createNotification(dbData);
	return adapterToFront(newNotification);
};

export const deleteNotificationService = async (id) => {
	await deleteNotification(id);
	return { status: 200, message: "Notificación eliminada correctamente" };
};
