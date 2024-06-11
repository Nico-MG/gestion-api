import { updateProvider, getProvider } from "../providers.model.js";
import { adapterToDB , adapterToFront } from "../../core/actions/adapter.js";
import { iProvider } from "../../core/database/tableStructures.js";



export const updateProviderService = async (req) => {
	try {
		const provider = await getProvider(req.params.id);
		if (!provider) {
			return {
				status: 400,
				message: "No existe el proveedor",
				data: null,
			};
		}

	        const updatedProviderData = adapterToDB(iProvider, req.body);
		const updatedProvider = await updateProvider(
			req.params.id,
			updatedProviderData,
		);
		const newProvider = adapterToFront(iProvider, updatedProvider);

	    return {
			status: 200,
			message: `Se editó el proveedor ID: ${newProvider.rutp}`,
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
