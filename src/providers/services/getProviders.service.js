import { getProvider, getAllProviders } from "../providers.model.js";
import { adapterToFront } from "../../core/actions/adapter.js";
import { iProvider } from "../../core/database/tableStructures.js";

export const getProviderService = async (req) => {
	try {
		const provider = await getProvider(req.params.id);
		if (!provider) {
			return {
				status: 404,
				message: "No hay proveedor",
				data: null,
			};
		}

		const adaptedProvider = adapterToFront(iProvider, provider);

		return {
			status: 200,
			message: `Se encontró al proveedor ID: ${adaptedProvider.rutp}`,
			data: adaptedProvider,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

export const getAllProvidersService = async () => {
	try {
		const providerAll = await getAllProviders();

		const adaptedAllProvider = providerAll.map((provider) =>
			adapterToFront(iProvider, provider),
		);

		return {
			status: 200,
			message: `Se encontraron proveedores Cantidad: ${adaptedAllProvider.length}`,
			data: adaptedAllProvider,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};
