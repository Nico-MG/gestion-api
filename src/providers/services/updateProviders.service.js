import { updateProvider, getProvider } from "../providers.model.js";
import { iProvider } from "../../core/database/tableStructures.js";
import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";

export const updateProviderService = async (req) => {
	try {
		const provider = await getProvider();
		if (!provider) {
			return {
				status: 404,
				message: "No existe el proveedor",
				data: null,
			};
		}
		const data = adapterToDB(iProvider, req.body);
		const newProvider = await updateProvider(req.params.id, data);
		const adaptedProvider = adapterToFront(iProvider, newProvider);
		return {
			status: 200,
			message: `Se editó el proveedor ID: ${adaptedProvider.rutp}`,
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
