import {
	getAllUsersService,
	getUserService,
	deleteUserService,
	updateUserService,
	createUserService,
} from "./services/index.js";
import { Router } from "express";

const usersRoute = Router();

usersRoute.get("/", async (_, res) => {
	const result = await getAllUsersService();
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

usersRoute.get("/:id", async (req, res) => {
	const result = await getUserService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

usersRoute.post("/create", async (req, res) => {
	const result = await createUserService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

usersRoute.put("/:id/edit", async (req, res) => {
	const result = await updateUserService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

usersRoute.delete("/:id/delete", async (req, res) => {
	const result = await deleteUserService(req);
	res
		.status(result.status)
		.json({ message: result.message, data: result.data });
});

export default usersRoute;
