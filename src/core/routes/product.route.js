import {
	getAllProductController,
	getProductController,
	deleteProductController,
	createProductController,
	editProductController,
} from "../../product/product.controller.js";
import { Router } from "express";

const productRoute = Router();

productRoute.get("/", getAllProductController);
productRoute.get("/:id", getProductController);
productRoute.post("/", createProductController);
productRoute.put("/:id", editProductController);
productRoute.delete("/:id", deleteProductController);

export { productRoute };
