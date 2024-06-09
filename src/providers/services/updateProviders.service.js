import { updateProvider, getProvider } from "../providers.model.js";

export const updateProviderService = async (req) => {
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
