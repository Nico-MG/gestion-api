import {
	getAllClientsService,
	createClientService,
	getClientService,
	updateClientService,
	deleteClientService,
} from "./clients.service.js";
import { Router } from "express";

const clientsRoute = Router();

clientsRoute.get("/:id", async (req, res) => {
	const result = await getClientService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

clientsRoute.get("/", async (req, res) => {
	const result = await getAllClientsService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

clientsRoute.post("/create", async (req, res) => {
	const result = await createClientService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

clientsRoute.delete("/:id/delete", async (req, res) => {
	const result = await deleteClientService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

clientsRoute.put("/:id/edit", async (req, res) => {
	const result = await updateClientService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default clientsRoute;
