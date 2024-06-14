import {
	getAllPurchasesService,
	getPurchaseService,
	createPurchaseService,
	updatePurchaseService,
	deletePurchaseService,
} from "./services/index.js";
import { Router } from "express";

const purchasesRoute = Router();

purchasesRoute.get("/:id", async (req, res) => {
	const result = await getPurchaseService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

purchasesRoute.get("/", async (req, res) => {
	const result = await getAllPurchasesService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

purchasesRoute.post("/create", async (req, res) => {
	const result = await createPurchaseService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

purchasesRoute.put("/:id/edit", async (req, res) => {
	const result = await updatePurchaseService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

purchasesRoute.get("/:id/delete", async (req, res) => {
	const result = await deletePurchaseService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default purchasesRoute;
