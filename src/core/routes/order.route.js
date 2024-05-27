import {
	getAllOrdersController,
	getOrderController,
	deleteOrderController,
	createOrderController,
	updateOrderController,
} from "../../order/order.controller.js";
import { Router } from "express";

const orderRoute = Router();

orderRoute.get("/", getAllOrdersController);
orderRoute.get("/:id", getOrderController);
orderRoute.post("/", createOrderController);
orderRoute.put("/:id", updateOrderController);
orderRoute.delete("/:id", deleteOrderController);

export { orderRoute };
