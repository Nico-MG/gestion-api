import {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
} from "./services/index.js";
import { Router } from "express";

const productsRoute = Router();

productsRoute.get("/", async (req, res) => {
	const result = await getAllProductsService();
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productsRoute.get("/:id", async (req, res) => {
	const result = await getProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

// [POST] .../products/create

productsRoute.post("/create", async (req, res) => {
	const result = await createProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

// [PUT] .../produts/:id/edit

productsRoute.put("/:id/edit", async (req, res) => {
	const result = await updateProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

// [DELETE] .../produts/:id/delete

productsRoute.delete("/:id/delete", async (req, res) => {
	const result = await deleteProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default productsRoute;
