import {
	getAllUsersService,
	createUserService,
	getUserService,
	updateUserService,
	deleteUserService,
} from "./users.service.js";

const getUserController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getUserService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllUsersController = async (req, res) => {
	try {
		const result = await getAllUsersService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createUserController = async (req, res) => {
	const { rut_usuario, correo, contrasena, nombre, apellido } = req.body;
	try {
		const result = await createUserService(
			rut_usuario,
			correo,
			contrasena,
			nombre,
			apellido,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteUserController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteUserService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateUserController = async (req, res) => {
	const { id } = req.params;
	const { rut_usuario, correo, contrasena, nombre, apellido } = req.body;
	try {
		const result = await updateUserService(
			id,
			rut_usuario,
			correo,
			contrasena,
			nombre,
			apellido,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getUserController,
	getAllUsersController,
	createUserController,
	updateUserController,
	deleteUserController,
};
