import db from "../core/db/prisma.js";

const createProvider = async (rut, nombre, direccion, numero, tipo) => {
	return await db.proveedor.create({
		data: {
			rut_proveedor: rut,
			nombre,
			direccion,
			numero,
			tipo,
		},
	});
};

const updateProvider = async (rut, newRut, nombre, direccion, numero, tipo) => {
	return await db.proveedor.update({
		where: {
			rut_proveedor: rut,
		},
		data: {
			rut_proveedor: newRut,
			nombre,
			direccion,
			numero,
			tipo,
		},
	});
};

const deleteProvider = async (rut) => {
	return await db.proveedor.delete({
		where: {
			rut_proveedor: rut,
		},
	});
};

const getProvider = async (rut) => {
	return await db.proveedor.findUnique({
		where: {
			rut_proveedor: rut,
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
