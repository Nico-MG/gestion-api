import { adapterToFront } from "../../core/actions/adapter.js";
import { deleteUser, getUser } from "../users.model.js";
import { iUser } from "../../core/database/tableStructures.js";

export const deleteUserService = async (req) => {
	try {
		const user = await getUser(req.params.id);
		if (!user) {
			return {
				status: 400,
				message: "Usuario no existe",
				data: {},
			};
		}

		const deletedUser = await deleteUser(req.params.id);
		const adapterUser = adapterToFront(iUser, deletedUser);

		return {
			status: 200,
			message: `Usuario eliminado, id: ${adapterUser.rutu}`,
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