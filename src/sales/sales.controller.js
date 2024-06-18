import {
	getAllSalesService,
	getSaleService,
	createSaleService,
	updateSaleService,
	deleteSaleService,
} from "./services/index.js";
import { Router } from "express";

const salesRoute = Router();

salesRoute.get("/:id", async (req, res) => {
	const result = await getSaleService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

salesRoute.get("/", async (req, res) => {
	const result = await getAllSalesService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

salesRoute.post("/create", async (req, res) => {
	const result = await createSaleService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

salesRoute.put("/:id/edit", async (req, res) => {
	const result = await updateSaleService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

salesRoute.delete("/:id/delete", async (req, res) => {
	const result = await deleteSaleService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default salesRoute;
