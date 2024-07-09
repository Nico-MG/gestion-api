import NotFound from "../core/errors/notFound.js";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";
import { iUser } from "../core/database/tableStructures.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import bcrypt from "bcrypt";
import {
	getUser,
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	getUsersCount,
	getAllUsersRoles,
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

export const getAllUsersRolesService = async () => {
	const roles = await getAllUsersRoles();
	const rolesValues = roles.map((role) => role.role);
	return rolesValues;
};

export const createUserService = async (req) => {
	if (!moduleRut(req.body.rutu)) {
		throw new InvalidRut(req.body.rutu);
	}

	const createdUserData = adapterToDB(iUser, req.body);

	const salt = bcrypt.genSaltSync(12);
	const hash = bcrypt.hashSync(createdUserData.password, salt);
	createdUserData.password = hash;

	await createUser(createdUserData);
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
	const salt = bcrypt.genSaltSync(12);
	const hash = bcrypt.hashSync(updatedUserData.password, salt);
	updatedUserData.password = hash;

	await updateUser(req.params.id, updatedUserData);
};

export const deleteUserService = async (req) => {
	const product = await getUser(req.params.id);
	if (!product) {
		throw new NotFound("Usuario");
	}

	await deleteUser(req.params.id);
};
