import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import {
	getAllPurchasesService,
	getPurchaseService,
	createPurchaseService,
	updatePurchaseService,
	deletePurchaseService,
} from "./purchases.service.js";
import { Router } from "express";

const purchasesRoute = Router();

purchasesRoute.get("/", async (req, res) => {
	try {
		const result = await getAllPurchasesService(req);
		return res.status(200).json({
			message: `Compras encontradas: ${result.length}`,
			data: result,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

purchasesRoute.get("/:id", async (req, res) => {
	try {
		const result = await getPurchaseService(req);
		return res.status(200).json({
			message: "Compra encontrada",
			data: result,
		});
	} catch (error) {
		console.error(error);
		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

purchasesRoute.post("/create", async (req, res) => {
	try {
		await createPurchaseService(req);
		return res.status(200).json({ message: "Compra creada exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

purchasesRoute.put("/:id/edit", async (req, res) => {
	try {
		await updatePurchaseService(req);
		return res.status(200).json({ message: "Compra editada exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

purchasesRoute.delete("/:id/delete", async (req, res) => {
	try {
		await deletePurchaseService(req);
		return res.status(200).json({ message: "Compra eliminada exitosamente" });
	} catch (error) {
		console.error(error);

		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}

		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

export default purchasesRoute;
