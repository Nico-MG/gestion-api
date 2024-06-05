import getLoginUser from "./auth.service.js";
import validateLog from "../core/middlewares/login.js";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/login", async (req, res) => {
	// TODO: hacer el login
});
authRoute.post("/registrer", async (req, res) => {
	// ?: hacemos un registrar usuario?
});
authRoute.post("logout", async (req, res) => {
	// TODO: hacer el cerrar sesion
	// ?: necesitamos una nueva tabla
});

const getLoginController = async (req, res) => {
	const id = req.body.id;
	const credentials = { rut: req.body.id, password: req.body.pass };

	try {
		const result = await getLoginUser(id);
		const token = validateLog(credentials, result);
		res.setHeader("Set-Cookie", token);
		return res.send(token);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export { getLoginController };
