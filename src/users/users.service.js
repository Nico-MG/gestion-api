import NotFound from "../core/errors/notFound.js";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";
import { iUser } from "../core/database/tableStructures.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import bcrypt from "bcrypt";
import {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	getUsersCount,
	getUserByRut,
} from "./users.model.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllUsersService = async (req) => {
	let content = await getAllUsers();
	content = filterHelper(iUser, content, req.query);
	content = content.map((user) => adapterToFront(iUser, user));

	return content;
};

export const getUsersCountService = async () => {
	return await getUsersCount();
};

export const createUserService = async (req) => {
	if (!moduleRut(req.body.rutu)) {
		throw new InvalidRut(req.body.rutu);
	}

	const data = adapterToDB(iUser, req.body);

	const salt = bcrypt.genSaltSync(12);
	const hash = bcrypt.hashSync(data.password, salt);
	data.password = hash;

	await createUser(data);
};

export const updateUserService = async (req) => {
	if (!moduleRut(req.params.rut)) {
		throw new InvalidRut(req.params.rut);
	}
	if (!moduleRut(req.body.rutu)) {
		throw new InvalidRut(req.body.rutu);
	}
	const userRut = await getUserByRut(req.params.rut);
	if (!userRut) {
		throw new NotFound("Usuario");
	}

	const updatedUserData = adapterToDB(iUser, req.body);
	await updateUser(req.params.id, updatedUserData);
};

export const deleteUserService = async (req) => {
	if (!moduleRut(req.params.rut)) {
		throw new InvalidRut(req.params.rut);
	}
	const userRut = await getUserByRut(req.params.rut);
	if (!userRut) {
		throw new NotFound("Usuario");
	}

	await deleteUser(req.params.rut);
};
