import "dotenv/config";
import cors from "cors";
import express from "express";

import { productRoute } from "./core/routes/product.route.js";
import { userRoute } from "./core/routes/user.route.js";
import { providerRoute } from "./core/routes/provider.route.js";
import { orderRoute } from "./core/routes/order.route.js";
import { loginRoute } from "./core/routes/login.route.js";
import verifyToken from "./core/middlewares/verifyToken.js";
import validatorData from "./core/middlewares/validatorData.js";

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use("/login", loginRoute);
server.use("/user", userRoute);
server.use("/product", validatorData,productRoute);
server.use("/provider", providerRoute);
server.use("/order", orderRoute);

server.use("/test", verifyToken, (req,res) => { //ruta de prueba protegida
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
