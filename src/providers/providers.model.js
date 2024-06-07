import db from "../core/db/prisma.js";

const createProvider = async ({
	rut_proveedor,
	nombre,
	direccion,
	numero,
	tipo,
}) => {
	return await db.proveedor.create({
		data: {
			rut_proveedor,
			nombre,
			direccion,
			numero,
			tipo,
		},
	});
};

const updateProvider = async (
	id,
	{ rut_proveedor, nombre, direccion, numero, tipo },
) => {
	return await db.proveedor.update({
		where: {
			rut_proveedor: id,
		},
		data: {
			rut_proveedor,
			nombre,
			direccion,
			numero,
			tipo,
		},
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
