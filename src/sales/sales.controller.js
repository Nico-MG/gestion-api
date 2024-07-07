import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import InvalidRut from "../core/errors/invalidRut.js";
import {
	getAllSalesService,
	getSaleService,
	createSaleService,
	updateSaleService,
	deleteSaleService,
	getSalesCountService,
	getAllSalesCodesService,
	getProductsService,
} from "./sales.service.js";
import { Router } from "express";

const salesRoute = Router();

salesRoute.get("/", async (req, res) => {
	try {
		const result = await getAllSalesService(req);
		return res.status(200).json({
			message: `Ventas encontradas: ${await getSalesCountService()}`,
			data: result,
			products: await getProductsService(),
			codes: await getAllSalesCodesService(),
			largo: await getSalesCountService(),
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

salesRoute.get("/:id", async (req, res) => {
	try {
		const result = await getSaleService(req);
		return res.status(200).json({
			message: "Venta encontrada",
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

salesRoute.post("/create", async (req, res) => {
	try {
		await createSaleService(req);
		return res.status(200).json({ message: "Venta creada exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		if (error instanceof InvalidRut) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

salesRoute.put("/:id/edit", async (req, res) => {
	try {
		await updateSaleService(req);
		return res.status(200).json({ message: "Venta editada exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		if (error instanceof InvalidRut) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

salesRoute.delete("/:id/delete", async (req, res) => {
	try {
		await deleteSaleService(req);
		return res.status(200).json({ message: "Venta eliminada exitosamente" });
	} catch (error) {
		console.error(error);

		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}

		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

export default salesRoute;
