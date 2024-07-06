import db from "../core/database/connection.js";

export const getAllProviders = async () => {
	return await db.providers.findMany({
		where: {
			status: true,
		},
		omit: {
			createdAt: true,
			updatedAt: true,
			status: true,
		},
	});
};

export const getProvider = async (id) => {
	return await db.providers.findUnique({
		where: {
			provider_rut: id,
		},
	});
};

export const getProvidersCount = async () => {
	return await db.providers.count({
		where: {
			status: true,
		}
	});
};

export const createProvider = async (body) => {
	return await db.providers.create({
		data: body,
	});
};

export const updateProvider = async (id, body) => {
	return await db.providers.update({
		where: { provider_rut: id },
		data: body,
	});
};

export const deleteProvider = async (id) => {
	return await db.providers.update({
		where: {
			provider_rut: id,
		},
		data: {
			status: false,
		}
	});
};
