import {
	getAllProvidersService,
	createProviderService,
	getProviderService,
	updateProviderService,
	deleteProviderService,
} from "./providers.service.js";
import { Router } from "express";

const providersRoute = Router();

providersRoute.get("/:id", async (req, res) => {
	const result = await getProviderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

providersRoute.get("/", async (req, res) => {
	const result = await getAllProvidersService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

providersRoute.post("/create", async (req, res) => {
	const result = await createProviderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

providersRoute.delete("/:id/delete", async (req, res) => {
	const result = await deleteProviderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

providersRoute.put("/:id/edit", async (req, res) => {
	const result = await updateProviderService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default providersRoute;
