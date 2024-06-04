import {
	getAllClients,
	getClient,
	deleteClient,
	createClient,
	updateClient,
} from "./clients.model.js";

const getClientService = async (rut) => {
	return await getClient(rut);
};

const getAllClientsService = async () => {
	return await getAllClients();
};

const updateClientService = async (rut, newRut, nombre, apellido) => {
	return await updateClient(rut, newRut, nombre, apellido);
};

const deleteClientService = async (rut) => {
	return await deleteClient(rut);
};

const createClientService = async (rut, nombre, apellido) => {
	return await createClient(rut, nombre, apellido);
};

export {
	getAllClientsService,
	getClientService,
	createClientService,
	updateClientService,
	deleteClientService,
};
