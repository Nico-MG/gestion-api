import { adapterToDB, adapterToFront } from "../../core/actions/adapter.js";
import { getUser, updateUser } from "../users.model.js";
import { iUser } from "../../core/database/tableStructures.js";

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

		if (req.params.id !== req.body.rutu) {
			const userAlreadyExists = await getUser(req.body.rutu);
			if (userAlreadyExists) {
				return {
					status: 400,
					message: "Usuario ya existe",
					data: null,
				};
			}
		}

		const updatedUserData = adapterToDB(iUser, req.body);
		const updatedUser = await updateUser(req.params.id, updatedUserData);
		const adapterUser = adapterToFront(iUser, updatedUser);

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
