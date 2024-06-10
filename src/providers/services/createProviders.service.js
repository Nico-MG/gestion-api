import { getProvider, createProvider } from "../providers.model.js";
import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import { iProvider } from "../../core/database/tableStructures";

export const createProviderService = async (req) => {
	try {
		const provider = await getProvider();
		if (provider) {
			return {
				status: 404,
				message: "Ya existe el proveedor",
				data: provider,
			};
		}
		const data = adapterToDB(iProvider, req.body);
		const newProvider = await createProvider(data);
		const adaptedProvider = adapterToFront(iProvider, newProvider);
		return {
			status: 201,
			message: `Se creó el proveedor ID: ${adaptedProvider.rutp}`,
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
