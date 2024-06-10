import db from "../core/database/connection.js"

const createProvider = async (body) => {
	return await db.proveedor.create({
		data: body,
	});
};

const updateProvider = async (id, body) => {
	return await db.proveedor.update({
		where: {
			rut_proveedor: id,
		},
		data: body,
	});
};

const deleteProvider = async (id) => {
	return await db.proveedor.delete({
		where: {
			rut_proveedor: id,
		},
	});
};

const getProvider = async (id) => {
	return await db.proveedor.findUnique({
		where: {
			rut_proveedor: id,
		},
	});
};

const getAllProviders = async () => {
	return await db.proveedor.findMany();
};

export {
	createProvider,
	updateProvider,
	deleteProvider,
	getAllProviders,
	getProvider,
};
