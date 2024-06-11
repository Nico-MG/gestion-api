import "dotenv/config";
import cors from "cors";
import express from "express";

// middlewares
import verifyToken from "./core/middlewares/verifyToken.js";
import validatorData from "./core/middlewares/validatorData.js";
import setupSwagger from "./swagger.js";

// routes
import productsRoute from "./products/products.controller.js";
import usersRoute from "./users/users.controller.js";
import ordersRoute from "./orders/orders.controller.js";
import providersRoute from "./providers/providers.controller.js";

const server = express();
setupSwagger(server);
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());
server.disable("x-powered-by");

server.use("/products", validatorData, productsRoute);
server.use("/users", validatorData, usersRoute);
server.use("/orders", ordersRoute);
server.use("/providers", providersRoute);


server.use("/test", verifyToken, (req, res) => {
	//ruta de prueba protegida
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
