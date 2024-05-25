import "dotenv/config";
import cors from "cors";
import ws from "ws";
import express from "express";

import { productRoute } from "./core/routes/product.route.js";
import { userRoute } from "./core/routes/user.route.js";
import { providerRoute } from "./core/routes/provider.route.js";
import { orderRoute } from "./core/routes/order.route.js";

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use("/user", userRoute);
server.use("/product", productRoute);
server.use("/provider", providerRoute);
server.use("/order", orderRoute);

server.listen(port, () => {
	console.log(`Server ready to listen on port: ${port}`);
}).on('error', (err) => {
	if (err.code === 'EADDRINUSE') {
	  console.error(`Port ${port} is already in use. Please use a different port.`);
	} else {
	  console.error(`Server error: ${err}`);
	}
  });

export default server;
