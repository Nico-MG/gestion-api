import db from "../core/database/connection.js";

const createProvider = async (body) => {
	return await db.providers.create({
		data: body,
	});
};

const updateProvider = async (id, body) => {
	return await db.providers.update({
		where: { provider_rut: id },
		data: body,
	});
};

const deleteProvider = async (id) => {
	return await db.providers.delete({
		where: {
			provider_rut: id,
		},
	});
};

const getProvider = async (id) => {
	return await db.providers.findUnique({
		where: {
			provider_rut: id,
		},
	});
};

const getAllProviders = async () => {
	return await db.providers.findMany();
};

export {
	createProvider,
	updateProvider,
	deleteProvider,
	getAllProviders,
	getProvider,
};
