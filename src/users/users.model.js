import db from "../core/database/connection.js";

export const getAllUsers = async () => {
	return await db.users.findMany({
		where: {
			status: true,
		},
		omit: {
			password: true,
			updatedAt: true,
			status: true,
		},
	});
};

export const getUser = async (id) => {
	return await db.users.findUnique({
		where: {
			user_rut: id,
		},
	});
};

export const getUsersCount = async () => {
	return await db.users.count({
		where: {
			status: true,
		},
	});
};

export const getAllUsersRoles = async () => {
	return await db.users.findMany({
		select: {
			role: true,
		},
		distinct: ["role"],
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
	await db.users.update({
		where: {
			user_rut: id,
		},
		data: {
			status: false,
		},
	});
};
