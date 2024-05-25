import {
	getAllProvider,
	getProvider,
	deleteProvider,
	createProvider,
	editProvider,
} from "./provider.model.js";

const getProviderService = async (rut) => {
	return await getProvider(rut);
};

const getAllProviderService = async () => {
	return await getAllProvider();
};

const editProviderService = async (rut, nombre, direccion, numero, tipo) => {
	return await editProvider(rut, nombre, direccion, numero, tipo);
};

const deleteProviderService = async (rut) => {
	return await deleteProvider(rut);
};

const createProviderService = async (rut, nombre, direccion, numero, tipo) => {
	return await createProvider(rut, nombre, direccion, numero, tipo);
};

export {
	getAllProviderService,
	getProviderService,
	createProviderService,
	editProviderService,
	deleteProviderService,
};
