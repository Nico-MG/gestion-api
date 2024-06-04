import {
	getAllClients,
	getClient,
	deleteClient,
	createClient,
	updateClient,
} from "./clients.model.js";

const createClientService = async (req) => {
	try {
		const client = await getClient(req.body.id_producto);
		if (client) {
			return {
				status: 400,
				message: "cliente existe",
				data: client,
			};
		}
		const newClient = await createClient(req.body);
		return {
			status: 200,
			message: `cliente creado, id: ${newClient.id_producto}`,
			data: newClient,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const deleteClientService = async (req) => {
	try {
		const client = await getClient(req.params.id);
		if (!client) {
			return {
				status: 400,
				mesage: "cliente no existe",
				data: null,
			};
		}
		const newClient = await deleteClient(req.params.id);
		return {
			status: 200,
			message: `cliente eliminado, id: ${newClient.id_producto}`,
			data: newProduct,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const updateClientService = async (req) => {
	try {
		const client = await getClient(req.params.id);
		if (!client) {
			return {
				status: 400,
				mesage: "cliente no existe",
				data: null,
			};
		}
		const newClient = await updateClient(req.params.id, req.body);
		return {
			status: 200,
			message: `producto actualizado, id: ${newClient.id_producto}`,
			data: newClient,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const getClientService = async (req) => {
	try {
		const client = await getClient(req.params.id);
		if (!client) {
			return {
				status: 400,
				message: "No se encontro el cliente",
				data: null,
			};
		}
		return {
			status: 200,
			message: "Se encontro el cliente",
			data: client,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const getAllClientsService = async (req) => {
	try {
		const allClients = await getAllClients();
		if (allClients.length === 0) {
			return {
				status: 400,
				message: "No se encontraron clientes",
				data: null,
			};
		}
		return {
			status: 200,
			message: "Se encontraron clientes",
			data: allClients,
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
	getAllClientsService,
	getClientService,
	createClientService,
	updateClientService,
	deleteClientService,
};
