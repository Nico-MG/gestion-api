import tables from "../../core/database/tableStructures.js";
import { createUser, getUser } from "../users.model.js";
import { adapterDB, adapterFront } from "../../core/actions/adapter.js";

export const createUserService = async (req) => {
	try {
		const user = await getUser(req.body.rutu);
		if (user) {
			return {
				status: 400,
				message: "Usuario ya existe",
				data: user,
			};
		}

		// Convierte los datos del frontend al formato de la base de datos
		const dbUserData = adapterDB(tables.users, req.body);
		const createdUser = await createUser(dbUserData);

		// Convierte los datos del formato de la base de datos al formato del frontend
		const newUser = adapterFront(tables.users, createdUser);

		return {
			status: 200,
			message: `Usuario creado, id: ${newUser.rutu}`,
			data: newUser,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: {},
		};
	}
};