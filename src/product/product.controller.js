import {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
} from "./product.service.js";
import { Router } from "express";

const productRoute = Router();

productRoute.get("/:id", async (req, res) => {
	const result = await getProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productRoute.get("/", async (_, res) => {
	const result = await getAllProductsService();
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productRoute.post("/", async (req, res) => {
	const result = await createProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productRoute.put("/:id", async (req, res) => {
	const result = await deleteProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productRoute.delete("/:id", async (req, res) => {
	const result = await updateProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default productRoute;
