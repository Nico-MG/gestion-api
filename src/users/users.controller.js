import {
	getAllUsersService,
	getUserService,
	deleteUserService,
	updateUserService,
	createUserService,
} from "./services/index.js";
import { Router } from "express";

const usersRoute = Router();

usersRoute.get("/", async (req, res) => {
	try {
		const result = await getAllUsersService(req);
		return res.status(200).json({
			message: `Usuarios encontrados: ${result.length}`,
			data: result,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

usersRoute.post("/create", async (req, res) => {
	try {
		await createProductService(req);
		return res.status(200).json({ message: "Producto creado exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

usersRoute.put("/:id/edit", async (req, res) => {
	const result = await updateUserService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

usersRoute.delete("/:id/delete", async (req, res) => {
	const result = await deleteUserService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default usersRoute;
