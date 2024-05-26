import {
	getAllClientsService,
	createClientService,
	getClientService,
	updateClientService,
	deleteClientService,
} from "./client.service.js";

const getClientController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getClientService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllClientsController = async (req, res) => {
	try {
		const result = await getAllClientsService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createClientController = async (req, res) => {
	const { rut_cliente, nombre, apellido } = req.body;
	try {
		const result = await createClientService(
      rut_cliente,
      nombre,
      apellido,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteClientController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteClientService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateClientController = async (req, res) => {
	const { id } = req.params;
	const { rut_cliente, nombre, apellido } = req.body;
	try {
		const result = await updateClientService(
      rut_cliente,
      nombre,
      apellido,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getClientController,
	getAllClientsController,
	createClientController,
	updateClientController,
	deleteClientController,
};
