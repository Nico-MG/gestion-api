import {
	getAllProviders,
	getProvider,
	deleteProvider,
	createProvider,
	updateProvider,
} from "./provider.model.js";

const getProviderService = async (req) => {
	try {
		const provider = await getProvider(req.params.id);
		if (!provider) {
			return {
				status: 400,
				message: "No hay proveedor",
				data: null,
			};
		}

		return {
			status: 200,
			message: `Se encontró al proveedor ID: ${provider.id_proveedor}`,
			data: provider,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const getAllProvidersService = async (req) => {
	try {
		const providerAll = await getAllProviders();
		if (providerAll.length === 0) {
			return {
				status: 400,
				message: "No hay proveedores",
				data: null,
			};
		}

		return {
			status: 200,
			message: `Se encontraron proveedores Cantidad: ${providerAll.length}`,
			data: providerAll,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const updateProviderService = async (req) => {
	try {
		const provider = await getProvider();
		if (!provider) {
			return {
				status: 400,
				message: "No existe el proveedor",
				data: null,
			};
		}
		const newProvider = await updateProvider(req.params.id, req.body);
		return {
			status: 200,
			message: `Se editó el proveedor ID: ${newProvider.id_proveedor}`,
			data: newProvider,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const deleteProviderService = async (req) => {
	try {
		const provider = await getProvider();
		if (!provider) {
			return {
				status: 400,
				message: "No existe el proveedor",
				data: null,
			};
		}
		const newProvider = await deleteProvider(req.params.id);
		return {
			status: 200,
			message: `Se elimino el proveedor ID: ${newProvider.id_proveedor}`,
			data: newProvider,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const createProviderService = async (req) => {
	try {
		const provider = await getProvider();
		if (provider) {
			return {
				status: 400,
				message: "Ya existe el proveedor",
				data: provider,
			};
		}
		const newProvider = await createProvider(req.body);
		return {
			status: 200,
			message: `Se creó el proveedor ID: ${newProvider.id_proveedor}`,
			data: newProvider,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

export {
	getAllProvidersService,
	getProviderService,
	createProviderService,
	updateProviderService,
	deleteProviderService,
};
