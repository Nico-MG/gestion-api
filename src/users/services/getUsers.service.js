import { adapterToFront } from "../../core/actions/adapter.js";
import tables from "../../core/database/tableStructures.js";
import { getAllUsers, getUser } from "../users.model.js";

export const getUserService = async (req) => {
	try {
		const user = await getUser(req.params.id);
		if (!user) {
			return {
				status: 400,
				message: "No se encontró el usuario",
				data: {},
			};
		}

		const adaptedUser = adapterToFront(tables.users, user);

		return {
			status: 200,
			message: "Usuario encontrado",
			data: adaptedUser,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: {},
		};
	}
};

export const getAllUsersService = async () => {
	try {
		const allUsers = await getAllUsers();
		if (allUsers.length === 0) {
			return {
				status: 400,
				message: "No se encontraron usuarios",
				data: [],
			};
		}

		const adaptedUsers = allUsers.map((user) =>
			adapterToFront(tables.users, user),
		);

		return {
			status: 200,
			message: "Usuarios encontrados",
			data: adaptedUsers,
		};
	} catch (error) {
		console.error(error.message)
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
