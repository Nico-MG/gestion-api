import { getLoginController } from "../../login/login.controller.js";

import { Router } from "express";

const loginRoute = Router();

loginRoute.post("/", getLoginController);

export { loginRoute };
