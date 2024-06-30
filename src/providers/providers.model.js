import db from "../core/database/connection.js";

export const getAllProviders = async ({ limit, offset, dato, orden }) => {
	return await db.providers.findMany({
		orderBy: {
			[dato]: orden,
		},
		take: limit,
		skip: offset,
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
	return await db.providers.count();
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
	return await db.providers.delete({
		where: {
			provider_rut: id,
		},
	});
};
