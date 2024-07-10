import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import MinimumQuantity from "../core/errors/minimumQuantity.js";
import {
	getAllRefundsService,
	getRefundService,
	createRefundService,
	updateRefundService,
	deleteRefundService,
	getRefundsCountService,
	getAllRefundsCodesService,
} from "./refunds.service.js";
import { Router } from "express";

const refundsRoute = Router();

refundsRoute.get("/", async (req, res) => {
	try {
		const result = await getAllRefundsService(req);
		return res.status(200).json({
			message: `Devoluciones encontradas: ${result.largo}`,
			data: result.content,
			largo: result.largo,
			codes: await getAllRefundsCodesService(),
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

refundsRoute.get("/:id", async (req, res) => {
	try {
		const result = await getRefundService(req);
		return res.status(200).json({
			message: "Devolucion encontrada",
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

refundsRoute.post("/create", async (req, res) => {
	try {
		await createRefundService(req);
		return res.status(200).json({ message: "Devolucion creada exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		if (error instanceof MinimumQuantity) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

refundsRoute.put("/:id/edit", async (req, res) => {
	try {
		await updateRefundService(req);
		return res.status(200).json({ message: "Devolucion editada exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		if (error instanceof MinimumQuantity) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

refundsRoute.delete("/:id/delete", async (req, res) => {
	try {
		await deleteRefundService(req);
		return res
			.status(200)
			.json({ message: "Devolucion eliminada exitosamente" });
	} catch (error) {
		console.error(error);

		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof MinimumQuantity) {
			return res.status(400).json({ message: error.message });
		}

		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

export default refundsRoute;
