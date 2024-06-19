import NotFound from "../core/errors/notFound.js";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";
import { iUser } from "../core/database/tableStructures.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import {
	getUser,
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
} from "./users.model.js";

export const getAllUsersService = async (req) => {
	const query = {
		dato: iUser[req.query.dato] || "user_rut",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
	};

	const allUsers = await getAllUsers(query);

	const adaptedUsers = allUsers.map((user) => adapterToFront(iUser, user));

	return adaptedUsers;
};

export const createUserService = async (req) => {
	if (!moduleRut(req.body.rutu)) {
		throw new InvalidRut(req.body.rutu);
	}

	const createdUsertData = adapterToDB(iUser, req.body);
	await createUser(createdUsertData);
};

export const updateUserService = async (req) => {
	const product = await getUser(req.params.id);
	if (!product) {
		throw new NotFound("Usuario");
	}
	if (!moduleRut(req.params.id)) {
		throw new InvalidRut(req.params.id);
	}

	const updatedUserData = adapterToDB(iUser, req.body);
	await updateUser(req.params.id, updatedUserData);
};

export const deleteUserService = async (req) => {
	const product = await getUser(req.params.id);
	if (!product) {
		throw new NotFound("Usuario");
	}

	await deleteUser(req.params.id);
};