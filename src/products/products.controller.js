import CodeRepeat from "../core/errors/codeRepeat.js";
import NotFound from "../core/errors/notFound.js";
import {
	getAllProductsService,
	createProductService,
	updateProductService,
	deleteProductService,
	getProductsCountService,
	getAllTypesService,
        getAllProductCodesService,
        getAll,
} from "./products.service.js";
import { Router } from "express";

const productsRoute = Router();



productsRoute.get("/getAll", async (req, res) => {
	try {
            const result = await getAll(req);
	    return res.status(200).json({message : result.message});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});


productsRoute.get("/", async (req, res) => {
	try {
		const result = await getAllProductsService(req);
		return res.status(200).json({
			message: `Productos encontrados: ${result.largo}`,
			data: result.content,
			largo: result.largo,
			categorias: await getAllTypesService(),
			codes: await getAllProductCodesService(),
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

productsRoute.post("/create", async (req, res) => {
	try {
		await createProductService(req);
		return res.status(200).json({ message: "Producto creado exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

productsRoute.put("/:id/edit", async (req, res) => {
	try {
		await updateProductService(req);
		return res.status(200).json({ message: "Producto editado exitosamente" });
	} catch (error) {
		console.error(error);
		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof CodeRepeat) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

productsRoute.delete("/:id/delete", async (req, res) => {
	try {
		await deleteProductService(req);
		return res.status(200).json({ message: "Producto eliminado exitosamente" });
	} catch (error) {
		console.error(error);

		if (error instanceof NotFound) {
			return res.status(404).json({ message: error.message });
		}

		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

export default productsRoute;
