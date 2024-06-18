import { WebSocketServer } from "ws";
import server from "./server.js";

// Configura el servidor WebSocket
const wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
	console.log("New client connected");

	ws.on("message", (message) => {
		console.log(`Received message => ${message}`);
		// Aquí puedes manejar los mensajes recibidos y enviar respuestas
		ws.send(`Echo: ${message}`);
	});

	ws.on("close", () => {
		console.log("Client disconnected");
	});
});
