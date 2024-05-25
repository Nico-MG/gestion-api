import {
	getAllProviderController,
	getProviderController,
	deleteProviderController,
	createProviderController,
	editProviderController,
} from "../../provider/provider.controller.js";
import { Router } from "express";

const providerRoute = Router();

providerRoute.get("/", getAllProviderController);
providerRoute.get("/:id", getProviderController);
providerRoute.post("/", createProviderController);
providerRoute.put("/:id", editProviderController);
providerRoute.delete("/:id", deleteProviderController);

export { providerRoute };
