import db from "../core/db/prisma.js";

const createUser = async (rut, correo, contrasena, nombre, apellido) => {
	return await db.usuario.create({
		data: {
			rut_usuario: rut,
			correo,
			contrasena,
			nombre,
			apellido,
		},
	});
};

const editUser = async (rut, correo, contrasena, nombre, apellido) => {
	return await db.usuario.update({
		where: {
			rut_usuario: rut,
		},
		data: {
			correo,
			contrasena,
			nombre,
			apellido,
		},
	});
};

const deleteUser = async (rut) => {
	return await db.usuario.delete({
		where: {
			rut_usuario: rut,
		},
	});
};

const getUser = async (rut) => {
	return await db.usuario.findUnique({
		where: {
			rut_usuario: rut,
		},
	});
};

const getAllUser = async () => {
	return await db.usuario.findMany();
};

export { createUser, editUser, deleteUser, getAllUser, getUser };
