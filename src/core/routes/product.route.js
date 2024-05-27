import {
	getAllProductsController,
	getProductController,
	deleteProductController,
	createProductController,
	updateProductController,
} from "../../product/product.controller.js";
import { Router } from "express";

const productRoute = Router();

productRoute.get("/", getAllProductsController);
productRoute.get("/:id", getProductController);
productRoute.post("/", createProductController);
productRoute.put("/:id", updateProductController);
productRoute.delete("/:id", deleteProductController);

export { productRoute };
