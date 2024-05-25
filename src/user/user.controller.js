import {
	getAllUserService,
	createUserService,
	getUserService,
	editUserService,
	deleteUserService,
} from "./user.service.js";

const getUserController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getUserService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllUserController = async (req, res) => {
	try {
		const result = await getAllUserService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createUserController = async (req, res) => {
	const { rut, correo, contrasena, nombre, apellido } = req.body;
	try {
		const result = await createUserService(
			rut,
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

const editUserController = async (req, res) => {
	const { id } = req.params;
	const { correo, contrasena, nombre, apellido } = req.body;
	try {
		const result = await editUserService(
			id,
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
	getAllUserController,
	createUserController,
	editUserController,
	deleteUserController,
};
