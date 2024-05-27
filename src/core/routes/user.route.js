import {
	getAllUsersController,
	getUserController,
	createUserController,
	updateUserController,
	deleteUserController,
} from "../../user/user.controller.js";
import { Router } from "express";

const userRoute = Router();

userRoute.get("/", getAllUsersController);
userRoute.get("/:id", getUserController);
userRoute.post("/", createUserController);
userRoute.put("/:id", updateUserController);
userRoute.delete("/:id", deleteUserController);

export { userRoute };
