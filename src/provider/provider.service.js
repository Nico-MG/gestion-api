import {
	getAllProviders,
	getProvider,
	deleteProvider,
	createProvider,
	updateProvider,
} from "./provider.model.js";

const getProviderService = async (rut) => {
	return await getProvider(rut);
};

const getAllProvidersService = async () => {
	return await getAllProviders();
};

const updateProviderService = async (rut, newRut, nombre, direccion, numero, tipo) => {
	return await updateProvider(rut, newRut, nombre, direccion, numero, tipo);
};

const deleteProviderService = async (rut) => {
	return await deleteProvider(rut);
};

const createProviderService = async (rut, nombre, direccion, numero, tipo) => {
	return await createProvider(rut, nombre, direccion, numero, tipo);
};

export {
	getAllProvidersService,
	getProviderService,
	createProviderService,
	updateProviderService,
	deleteProviderService,
};
