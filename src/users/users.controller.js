import InvalidRut from "../core/errors/invalidRut.js";
import NotFound from "../core/errors/notFound.js";
import {
	getAllUsersService,
	deleteUserService,
	updateUserService,
	createUserService,
} from "./users.service.js";
import { Router } from "express";

const usersRoute = Router();

usersRoute.get("/", async (req, res) => {
	try {
		const result = await getAllUsersService(req);
		return res.status(200).json({
			message: `Usuarios encontrados: ${result.largo}`,
			data: result,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

usersRoute.post("/create", async (req, res) => {
	try {
		await createUserService(req);
		return res.status(200).json({ message: "Usuario creado exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof InvalidRut) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

usersRoute.put("/:id/edit", async (req, res) => {
	try {
		await updateUserService(req);
		return res.status(200).json({ message: "Usuario editado exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof InvalidRut) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

usersRoute.delete("/:id/delete", async (req, res) => {
	try {
		await deleteUserService(req);
		return res.status(200).json({ message: "Usuario eliminado exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

export default usersRoute;
