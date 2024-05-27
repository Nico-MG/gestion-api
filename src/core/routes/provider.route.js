import {
	getAllProvidersController,
	getProviderController,
	deleteProviderController,
	createProviderController,
	updateProviderController,
} from "../../provider/provider.controller.js";
import { Router } from "express";

const providerRoute = Router();

providerRoute.get("/", getAllProvidersController);
providerRoute.get("/:id", getProviderController);
providerRoute.post("/", createProviderController);
providerRoute.put("/:id", updateProviderController);
providerRoute.delete("/:id", deleteProviderController);

export { providerRoute };
