import {
	getAllProductsService,
	getProductService,
	createProductService,
	updateProductService,
	deleteProductService,
	filtersProductsService,
} from "./services/index.js";
import { Router } from "express";

const productsRoute = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Productos encontrados"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Products'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 *                 data:
 *                   type: object
 *                   example: {}
 */
productsRoute.get("/", async (_, res) => {
	try {
	  const result = await getAllProductsService();
	  res.status(result.status).json({ message: result.message, data: result.data });
	} catch (error) {
	  res.status(500).json({ message: "Error interno del servidor" });
	}
  });

productsRoute.get("/:id", async (req, res) => {
	const result = await getProductService(req);
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
	const result = await updateProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productsRoute.delete("/:id/delete", async (req, res) => {
	const result = await deleteProductService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

productsRoute.get("/filter", async (req, res) => {
	const result = await filtersProductsService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default productsRoute;
