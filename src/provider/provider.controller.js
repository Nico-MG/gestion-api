import {
	getAllProviderService,
	createProviderService,
	getProviderService,
	editProviderService,
	deleteProviderService,
} from "./provider.service.js";

const getProviderController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getProviderService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllProviderController = async (req, res) => {
	try {
		const result = await getAllProviderService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createProviderController = async (req, res) => {
	const { rut, nombre, direccion, numero, tipo } = req.body;
	try {
		const result = await createProviderService(
			rut,
			nombre,
			direccion,
			numero,
			tipo,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteProviderController = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteProviderService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const editProviderController = async (req, res) => {
	const { id } = req.params;
	const { nombre, direccion, numero, tipo } = req.body;
	try {
		const result = await editProviderService(
			id,
			nombre,
			direccion,
			numero,
			tipo,
		);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export {
	getProviderController,
	getAllProviderController,
	createProviderController,
	editProviderController,
	deleteProviderController,
};
