import tables from "../../core/database/tableStructures.js";
import { createUser, getUser } from "../users.model.js";
import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";

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

		// Convierte los datos del frontend al formato de la base de datos
		const dbUserData = adapterToDB(tables.users, req.body);
		const createdUser = await createUser(dbUserData);

		// Convierte los datos del formato de la base de datos al formato del frontend
		const newUser = adapterToFront(tables.users, createdUser);

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
