import db from "../core/database/connection.js";

export const getAllUsers = async () => {
	return await db.users.findMany({
		omit: {
			password: true,
			createdAt: true,
			updatedAt: true,
			status: true,
		},
	});
};

export const getUserByRut = async (rut) => {
	return await db.users.findUnique({
		where: {
			user_rut: rut,
		},
		select: {
			user_rut: true,
		},
	});
};

export const getUsersCount = async () => {
	return await db.users.count();
};

export const createUser = async (body) => {
	await db.users.create({
		data: body,
	});
};

export const updateUser = async (rut, body) => {
	await db.users.update({
		where: {
			user_rut: rut,
		},
		data: body,
	});
};

export const deleteUser = async (rut) => {
	await db.users.delete({
		where: {
			user_rut: rut,
		},
	});
};
