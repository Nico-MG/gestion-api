import db from "../core/db/prisma.js";

const createClient = async ({ rut_cliente, nombre, apellido }) => {
	return await db.cliente.create({
		data: {
			rut_cliente,
			nombre,
			apellido,
		},
	});
};

const updateClient = async (id, { rut_cliente, nombre, apellido }) => {
	return await db.cliente.update({
		where: {
			rut_cliente: id,
		},
		data: {
			rut_cliente,
			nombre,
			apellido,
		},
	});
};

const deleteClient = async (id) => {
	return await db.cliente.delete({
		where: {
			rut_cliente: id,
		},
	});
};

const getClient = async (id) => {
	return await db.cliente.findUnique({
		where: {
			rut_cliente: id,
		},
	});
};

const getAllClients = async () => {
	return await db.cliente.findMany();
};

export { createClient, updateClient, deleteClient, getAllClients, getClient };
