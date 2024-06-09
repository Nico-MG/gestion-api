import {
	getAllOrdersService,
	getOrderService,
	createOrderService,
	updateOrderService,
	deleteOrderService,
} from "./services/index.js";
import { Router } from "express";

const ordersRoute = Router();

ordersRoute.get("/:id", async (req, res) => {
	const result = await getOrderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

ordersRoute.get("/", async (req, res) => {
	const result = await getAllOrdersService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

ordersRoute.post("/create", async (req, res) => {
	const result = await createOrderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

ordersRoute.put("/:id/edit", async (req, res) => {
	const result = await updateOrderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

ordersRoute.get("/:id/delete", async (req, res) => {
	const result = await deleteOrderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default ordersRoute;
