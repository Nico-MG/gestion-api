import getLoginUser from "./auth.service.js";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/login", async (req, res) => {
    const result = await getLoginUser(req, res);
    res.status(result.status).json({ message: result.message , token : result.credentials});
});

// authRoute.post("logout", async (req, res) => {
// 	// TODO: hacer el cerrar sesión
// 	// ?: necesitamos una nueva tabla
// });

export default authRoute;
