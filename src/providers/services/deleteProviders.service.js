import { getProvider, deleteProvider } from "../providers.model.js";

export const deleteProviderService = async (req) => {
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
