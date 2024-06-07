import {
	getAllRefundsService,
	getRefundService,
	createRefundService,
	updateRefundService,
	deleteRefundService,
} from "./refunds.service.js";
import { Router } from "express";

const refundsRoute = Router();

refundsRoute.get("/:id", async (req, res) => {
	const result = await getRefundService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

refundsRoute.get("/", async (req, res) => {
	const result = await getAllRefundsService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

refundsRoute.post("/create", async (req, res) => {
	const result = await createRefundService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

refundsRoute.put("/:id/edit", async (req, res) => {
	const result = await updateRefundService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

refundsRoute.delete("/:id/delete", async (req, res) => {
	const result = await deleteRefundService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default refundsRoute;
