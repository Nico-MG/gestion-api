import { getUser } from "../user/user.model.js";

const getLoginUser = async (rut) => {
	return await getUser(rut);
};

export default getLoginUser;
