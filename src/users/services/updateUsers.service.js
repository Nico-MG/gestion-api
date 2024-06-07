import { adapterDB, adapterFront } from "../../core/actions/adapter.js";
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

		const updatedUserData = adapterDB(tables.users, req.body);
		const updatedUser = await updateUser(
			req.params.id,
			updatedUserData,
		);
		const adapterUser = adapterFront(tables.users, updatedUser);

		return {
			status: 200,
			message: `Usuario actualizado, id: ${adapterUser.rutu}`,
			data: adapterUser,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: {},
		};
	}
};
