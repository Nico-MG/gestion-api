import db from "../core/database/connection.js";

export const getUser = async (id) => {
	return await db.users.findUnique({
		where: {
			user_rut: id,
		},
	});
};
