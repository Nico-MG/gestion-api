import "dotenv/config";
import cors from "cors";
import express from "express";

// middlewares
import verifyToken from "./core/middlewares/verifyToken.js";
import validatorData from "./core/middlewares/validatorData.js";
import validatorRole from "./core/middlewares/validatorRole.js";

// routes
import purchasesRoute from "./purchases/purchases.controller.js";
import providersRoute from "./providers/providers.controller.js";
import productsRoute from "./products/products.controller.js";
import refundsRoute from "./refunds/refunds.controller.js";
import salesRoute from "./sales/sales.controller.js";
import usersRoute from "./users/users.controller.js";
import authRoute from "./auth/auth.controller.js";
import analyticsRoute from "./analytics/analytics.controller.js";

const server = express();
const port = process.env.PORT || 3000;

server.use(
	cors({
	    origin : '*',
	    //		origin: "http://localhost:1420",
		credentials: true,
	}),
);
server.use(express.json());
server.disable("x-powered-by");

server.use("/products", validatorData, verifyToken, productsRoute);
server.use("/users", validatorData, verifyToken,usersRoute);
server.use("/providers", validatorData,verifyToken, providersRoute);
server.use("/purchases", validatorData, purchasesRoute);
server.use("/sales", salesRoute);
server.use("/refund", refundsRoute);
server.use("/auth", authRoute);
server.use("/analytics", analyticsRoute);

server.use("/test", validatorData, verifyToken, validatorRole, (req, res) => {
	//ruta de prueba protegida ADMIN log necesario
	res.sendStatus(200);
});

server
	.listen(port, () => {
		console.log(`Server ready to listen on port: ${port}`);
	})
	.on("error", (err) => {
		if (err.code === "EADDRINUSE") {
			console.error(
				`Port ${port} is already in use. Please use a different port.`,
			);
		} else {
			console.error(`Server error: ${err}`);
		}
	});

export default server;
