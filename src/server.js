import "dotenv/config";
import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";
import db from "./core/database/connection.js";

// middlewares
import verifyToken from "./core/middlewares/verifyToken.js";
import validatorData from "./core/middlewares/validatorData.js";
import setupSwagger from "./swagger.js";

// routes
import productsRoute from "./products/products.controller.js";
import usersRoute from "./users/users.controller.js";
import purchasesRoute from "./purchases/purchases.controller.js";
import providersRoute from "./providers/providers.controller.js";
import authRoute from "./auth/auth.controller.js";

const server = express();
setupSwagger(server);
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());
server.disable("x-powered-by");

server.use("/products", validatorData, productsRoute);
server.use("/users", validatorData, usersRoute);
server.use("/purchases", purchasesRoute);
server.use("/providers", providersRoute);
server.use("/auth", authRoute);

server.use("/test", verifyToken, (req, res) => {
	//ruta de prueba protegida
	res.sendStatus(200);
});

const httpServer = server
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

// Configura el servidor WebSocket
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
	console.log('New client connected');

	ws.on('message', (message) => {
		console.log(`Received message => ${message}`);
		// Aquí puedes manejar los mensajes recibidos y enviar respuestas
		ws.send(`Echo: ${message}`);
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

export default server;
