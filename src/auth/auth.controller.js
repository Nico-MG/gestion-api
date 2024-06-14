import getLoginUser from "./auth.service.js";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/login", async (req, res) => {
    const result = await getLoginUser(req,res); 
    res.sendStatus(result.status);
    
});

// authRoute.post("logout", async (req, res) => {
// 	// TODO: hacer el cerrar sesion
// 	// ?: necesitamos una nueva tabla
// });

export default authRoute;

