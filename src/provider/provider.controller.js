import {
	getAllProvidersService,
	createProviderService,
	getProviderService,
	updateProviderService,
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

const getAllProvidersController = async (req, res) => {
	try {
		const result = await getAllProvidersService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const createProviderController = async (req, res) => {
	const { rut_proveedor, nombre, direccion, numero, tipo } = req.body;
	try {
		const result = await createProviderService(
			rut_proveedor,
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

const updateProviderController = async (req, res) => {
	const { id } = req.params;
	const { rut_proveedor, nombre, direccion, numero, tipo } = req.body;
	try {
		const result = await updateProviderService(
			id,
			rut_proveedor,
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
	getAllProvidersController,
	createProviderController,
	updateProviderController,
	deleteProviderController,
};
