import { createUser, getUser } from "../users.model.js";
import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import { iUser } from "../../core/database/tableStructures.js";
import bcrypt from "bcrypt";

export const createUserService = async (req) => {
	try {
		const user = await getUser(req.body.rutu);
		if (user) {
			return {
				status: 400,
				message: "Usuario ya existe",
				data: {},
			};
		}

		const dbUserData = adapterToDB(iUser, req.body);

		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(dbUserData.password, salt);
		dbUserData.password = hash;

		const createdUser = await createUser(dbUserData);

		return {
			status: 200,
			message: "Usuario creado",
			data: {},
		};
	} catch (error) {
		console.error(error.message);
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
