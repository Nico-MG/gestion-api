import {
	getAllNotificationsService,
	createNotificationService,
	getNotificationService,
	updateNotificationService,
	deleteNotificationService,
} from "./notification.service.js";

const getNotificationController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getNotificationService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllNotificationsController = async (req, res) => {
	try {
		const result = await getAllNotificationsService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createNotificationController = async (req, res) => {
	const { id_notificacion, fecha, id_producto, titulo, descripcion } = req.body;
	try {
		const result = await createNotificationService(
			id_notificacion,
			fecha,
			id_producto,
			titulo,
			descripcion,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteNotificationController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteNotificationService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateNotificationController = async (req, res) => {
	const { id } = req.params;
	const { id_notificacion, fecha, id_producto, titulo, descripcion } = req.body;
	try {
		const result = await updateNotificationService(
			id,
			id_notificacion,
			fecha,
			id_producto,
			titulo,
			descripcion,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getNotificationController,
	getAllNotificationsController,
	createNotificationController,
	updateNotificationController,
	deleteNotificationController,
};
