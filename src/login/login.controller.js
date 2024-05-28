import getLoginUser from "./login.service.js";
import validateLog from "../core/middlewares/login.js";

const getLoginController = async (req, res) => {
    const id = req.body.id;
    const credentials = {"rut":req.body.id,"password":req.body.pass};

    try {
	const result = await getLoginUser(id);
	const token = validateLog(credentials,result);
	res.setHeader('Set-Cookie',token)
	return res.send(token);

    } catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export { getLoginController };
