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
 */
productsRoute.get("/", async (_, res) => {
	try {
		const result = await getAllProductsService();
		res
			.status(result.status)
			.json({ message: result.message, data: result.data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error interno del servidor" });
	}
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto encontrado"
 *                 data:
 *                   $ref: '#/components/schemas/Products'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto no encontrado"
 *                 data:
 *                   type: object
 *                   example: {}
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
 */
productsRoute.get("/:id", async (req, res) => {
	try {
		const result = await getProductService(req);
		res
			.status(result.status)
			.json({ message: result.message, data: result.data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error interno del servidor" });
	}
});


/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idp:
 *                 type: string
 *                 description: The unique identifier for a product
 *                 example: "12345-ABCDE"
 *               nombre:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Product Name"
 *               cat:
 *                 type: string
 *                 description: The type of the product
 *                 example: "Electronics"
 *               cit:
 *                 type: integer
 *                 description: The quantity of the product in stock
 *                 example: 100
 *               mCit:
 *                 type: integer
 *                 description: The minimum quantity required for the product
 *                 example: 10
 *               precio:
 *                 type: integer
 *                 description: The price of the product
 *                 example: 299
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto creado con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Products'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Solicitud incorrecta"
 *                 data:
 *                   type: object
 *                   example: {}
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
 */
productsRoute.post("/create", async (req, res) => {
	try {
		const result = await createProductService(req);
		res
			.status(result.status)
			.json({ message: result.message, data: result.data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error interno del servidor" });
	}
});

/**
 * @swagger
 * /products/{id}/edit:
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *       - in: body
 *         name: product
 *         description: The product data to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idp:
 *               type: string
 *               description: The unique identifier for a product
 *               example: "12345-ABCDE"
 *             nombre:
 *               type: string
 *               description: The name of the product
 *               example: "Updated Product Name"
 *             cat:
 *               type: string
 *               description: The type of the product
 *               example: "Electronics"
 *             cit:
 *               type: integer
 *               description: The quantity of the product in stock
 *               example: 100
 *             mCit:
 *               type: integer
 *               description: The minimum quantity required for the product
 *               example: 10
 *             precio:
 *               type: integer
 *               description: The price of the product
 *               example: 299
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto actualizado con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Products'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto no encontrado"
 *                 data:
 *                   type: object
 *                   example: {}
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
 */

productsRoute.put("/:id/edit", async (req, res) => {
	try {
		const result = await updateProductService(req);
		res
			.status(result.status)
			.json({ message: result.message, data: result.data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error interno del servidor" });
	}
});

/**
 * @swagger
 * /products/{id}/delete:
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto eliminado con éxito"
 *                 data:
 *                   type: object
 *                   example: {}
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto no encontrado"
 *                 data:
 *                   type: object
 *                   example: {}
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
 */

productsRoute.delete("/:id/delete", async (req, res) => {
	try {
		const result = await deleteProductService(req);
		res
			.status(result.status)
			.json({ message: result.message, data: result.data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error interno del servidor" });
	}
});

productsRoute.get("/filter", async (req, res) => {
	try {
		const result = await filtersProductsService(req);
		res
			.status(result.status)
			.json({ message: result.message, data: result.data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error interno del servidor" });
	}
});

export default productsRoute;
