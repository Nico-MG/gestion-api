import { getUser } from "../users/user.model.js";

const getLoginUser = async (rut) => {
	return await getUser(rut);
};

export default getLoginUser;
