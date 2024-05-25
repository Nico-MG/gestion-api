import {
	getAllOrderController,
	getOrderController,
	deleteOrderController,
	createOrderController,
	editOrderController,
} from "../../order/order.controller.js";
import { Router } from "express";

const orderRoute = Router();

orderRoute.get("/", getAllOrderController);
orderRoute.get("/:id", getOrderController);
orderRoute.post("/", createOrderController);
orderRoute.put("/:id", editOrderController);
orderRoute.delete("/:id", deleteOrderController);

export { orderRoute };
