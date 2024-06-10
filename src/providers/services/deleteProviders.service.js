import { getProvider, deleteProvider } from "../providers.model.js";
import { adapterToFront } from "../../core/actions/adapter.js";
import { iProvider } from "../../core/database/tableStructures.js";

export const deleteProviderService = async (req) => {
	try {
		const provider = await getProvider();
		if (!provider) {
			return {
				status: 404,
				message: "No existe el proveedor",
				data: null,
			};
		}
		const newProvider = await deleteProvider(req.params.id);
		const adaptedProvider = adapterToFront(iProvider, newProvider);
		return {
			status: 200,
			message: `Se elimino el proveedor ID: ${adaptedProvider.rutp}`,
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
