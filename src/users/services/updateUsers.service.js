import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import tables from "../../core/database/tableStructures.js";
import { getUser, updateUser } from "../users.model.js";

export const updateUserService = async (req) => {
	try {
		const user = await getUser(req.params.id);
		if (!user) {
			return {
				status: 400,
				message: "Usuario no existe",
				data: {},
			};
		}

		const updatedUserData = adapterToDB(tables.users, req.body);
		const updatedUser = await updateUser(req.params.id, updatedUserData);
		const adapterUser = adapterToFront(tables.users, updatedUser);

		return {
			status: 200,
			message: `Usuario actualizado, id: ${adapterUser.rutu}`,
			data: adapterUser,
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
