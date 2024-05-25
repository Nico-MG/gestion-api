import {
	getAllUserController,
	getUserController,
	createUserController,
	editUserController,
	deleteUserController,
} from "../../user/user.controller.js";
import { Router } from "express";

const userRoute = Router();

userRoute.get("/", getAllUserController);
userRoute.get("/:id", getUserController);
userRoute.post("/", createUserController);
userRoute.put("/:id", editUserController);
userRoute.delete("/:id", deleteUserController);

export { userRoute };
