import {
	getAllUser,
	getUser,
	deleteUser,
	createUser,
	editUser,
} from "./user.model.js";

const getUserService = async (rut) => {
	return await getUser(rut);
};

const getAllUserService = async () => {
	return await getAllUser();
};

const editUserService = async (rut, correo, contrasena, nombre, apellido) => {
	return await editUser(rut, correo, contrasena, nombre, apellido);
};

const deleteUserService = async (rut) => {
	return await deleteUser(rut);
};

const createUserService = async (rut, correo, contrasena, nombre, apellido) => {
	return await createUser(rut, correo, contrasena, nombre, apellido);
};

export {
	getAllUserService,
	getUserService,
	createUserService,
	editUserService,
	deleteUserService,
};
