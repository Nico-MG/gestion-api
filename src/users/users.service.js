import {
	getAllUsers,
	getUser,
	deleteUser,
	createUser,
	updateUser,
} from "./users.model.js";

const getUserService = async (rut) => {
	return await getUser(rut);
};

const getAllUsersService = async () => {
	return await getAllUsers();
};

const updateUserService = async (
	rut,
	newRut,
	correo,
	contrasena,
	nombre,
	apellido,
) => {
	return await updateUser(rut, newRut, correo, contrasena, nombre, apellido);
};

const deleteUserService = async (rut) => {
	return await deleteUser(rut);
};

const createUserService = async (rut, correo, contrasena, nombre, apellido) => {
	return await createUser(rut, correo, contrasena, nombre, apellido);
};

export {
	getAllUsersService,
	getUserService,
	createUserService,
	updateUserService,
	deleteUserService,
};
