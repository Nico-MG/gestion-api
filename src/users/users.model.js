import db from "../core/database/connection.js";

const getAllUsers = async () => {
	return await db.users.findMany({
		select: {
			password: false,
		},
	});
};

const getUser = async (id) => {
	return await db.users.findUnique({
		select: {
			password: false,
		},
		where: {
			user_rut: id,
		},
	});
};

const createUser = async (body) => {
	return await db.users.create({
		data: body,
	});
};

const updateUser = async (id, body) => {
	return await db.users.update({
		where: {
			user_rut: id,
		},
		data: body,
	});
};

const deleteUser = async (id) => {
	return await db.users.delete({
		where: {
			user_rut: id,
		},
	});
};

export { createUser, updateUser, deleteUser, getAllUsers, getUser };
