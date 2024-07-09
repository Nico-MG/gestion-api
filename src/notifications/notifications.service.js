import NotFound from "../core/errors/notFound.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import {
	getAllNotifications,
	createNotifications,
        deleteNotifications,
        getNotification,
} from "./notifications.model.js";
import { iNotifications } from "../core/database/tableStructures.js";

export const getAllNotificationsService = async () => {
        const data = await getAllNotifications();
        const adaptedToFront = data.map(notification => adapterToFront(iNotifications,notification))
        return adaptedToFront;
};


export const createNotificationService = async (data) => {
	const newNotification = await createNotifications(data);
	return true;
};

export const deleteNotificationService = async (id) => {
    const notification_id = Number.parseInt(id);
    const notification = await getNotification(notification_id);

    if(!notification){
	throw new NotFound("Notificacion");
    }


    if(notification.products.quantity < notification.products.min_quantity){
	return { status : 403 , message : 'El aviso de inventario no ha sido atendido'}
    }
            
    await deleteNotifications(notification_id);
    return { status: 200, message: "Notificación eliminada correctamente" };
};
