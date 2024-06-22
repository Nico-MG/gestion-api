import InvalidRut from "../core/errors/invalidRut.js";
import NotFound from "../core/errors/notFound.js";
import {
	createProviderService,
	deleteProviderService,
	updateProviderService,
	getAllProvidersService,
} from "./providers.service.js";
import { Router } from "express";

const providersRoute = Router();

providersRoute.get("/", async (req, res) => {
	try {
		const result = await getAllProvidersService(req);
		return res.status(200).json({
			message: `Proveedores encontrados: ${result.length}`,
			data: result,
			largo: result.length,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

providersRoute.post("/create", async (req, res) => {
	try {
		await createProviderService(req);
		return res.status(200).json({ message: "Proveedor creado exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof InvalidRut) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

providersRoute.put("/:id/edit", async (req, res) => {
	try {
		await updateProviderService(req);
		return res.status(200).json({ message: "Proveedor editado exitosamente" });
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

providersRoute.delete("/:id/delete", async (req, res) => {
	try {
		await deleteProviderService(req);
		return res
			.status(200)
			.json({ message: "Proveedor eliminado exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

export default providersRoute;
