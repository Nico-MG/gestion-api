import {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
} from "./products.service.js";
import { Router } from "express";

const productsRoute = Router();

productsRoute.get("/:id", async (req, res) => {
	const result = await getProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productsRoute.get("/", async (req, res) => {
	const result = await getAllProductsService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productsRoute.post("/create", async (req, res) => {
	const result = await createProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productsRoute.put("/:id/edit", async (req, res) => {
	const result = await deleteProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productsRoute.delete("/:id/delete", async (req, res) => {
	const result = await updateProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default productsRoute;
