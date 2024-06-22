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
} from "./users.model.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllUsersService = async (req) => {
	const query = {
		dato: iUser[req.query.dato] || "user_rut",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
		desde: req.query.desde || "2000-01-01",
		hasta: req.query.hasta || "2099-12-31",
		numero: Number.parseInt(req.query.numero) || 0,
		texto: req.query.texto || "",
	};

	const allUsers = await getAllUsers(query);

	const adaptedUsers = allUsers.map((user) => adapterToFront(iUser, user));

	return {users: filterHelper(iUser, adaptedUsers, query), largo: allUsers.length};
};

export const createUserService = async (req) => {
	if (!moduleRut(req.body.rutu)) {
		throw new InvalidRut(req.body.rutu);
	}

	const createdUsertData = adapterToDB(iUser, req.body);

	const salt = bcrypt.genSaltSync(12);
	const hash = bcrypt.hashSync(createdUsertData.password, salt);
	createdUsertData.password = hash;

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
