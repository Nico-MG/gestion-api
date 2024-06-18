import db from "../core/database/connection.js";

export const getAllUsers = async () => {
	return await db.users.findMany();
};

export const getUser = async (id) => {
	return await db.users.findUnique({
		where: {
			user_rut: id,
		},
	});
};

export const createUser = async (body) => {
	await db.users.create({
		data: body,
	});
};

export const updateUser = async (id, body) => {
	await db.users.update({
		where: {
			user_rut: id,
		},
		data: body,
	});
};

export const deleteUser = async (id) => {
	await db.users.delete({
		where: {
			user_rut: id,
		},
	});
};
