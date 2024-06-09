import { createUser, getUser } from "../users.model.js";
import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import { iUser } from "../../core/database/tableStructures.js";

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
		const createdUser = await createUser(dbUserData);
		const newUser = adapterToFront(iUser, createdUser);

		return {
			status: 200,
			message: `Usuario creado, id: ${newUser.rutu}`,
			data: newUser,
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
