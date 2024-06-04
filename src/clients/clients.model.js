import db from "../core/db/prisma.js";

const createClient = async (rut, nombre, apellido) => {
	return await db.cliente.create({
		data: {
			rut_cliente: rut,
			nombre,
			apellido,
		},
	});
};

const updateClient = async (rut, newRut, nombre, apellido) => {
	return await db.cliente.update({
		where: {
			rut_cliente: rut,
		},
		data: {
			rut_cliente: newRut,
			nombre,
			apellido,
		},
	});
};

const deleteClient = async (rut) => {
	return await db.cliente.delete({
		where: {
			rut_cliente: rut,
		},
	});
};

const getClient = async (rut) => {
	return await db.cliente.findUnique({
		where: {
			rut_cliente: rut,
		},
	});
};

const getAllClients = async () => {
	return await db.cliente.findMany();
};

export { createClient, updateClient, deleteClient, getAllClients, getClient };
