import {
	getAllProvidersService,
	createProviderService,
	getProviderService,
	updateProviderService,
	deleteProviderService,
} from "./provider.service.js";
import { Router } from "express";

const providerRoute = Router();

providerRoute.get("/:id", async (req, res) => {
	const result = await getProviderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

providerRoute.get("/", async (_, res) => {
	const result = await getAllProvidersService();
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

providerRoute.post("/", async (req, res) => {
	const result = await createProviderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

providerRoute.delete("/:id", async (req, res) => {
	const result = await deleteProviderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

providerRoute.put("/:id", async (req, res) => {
	const result = await updateProviderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default providerRoute