import { getProvider, getAllProviders } from "../providers.model.js";

export const getProviderService = async (req) => {
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
			message: `Se encontró al proveedor ID: ${provider.provider_rut}`,
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

export const getAllProvidersService = async (req) => {
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
