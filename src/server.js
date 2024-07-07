import "dotenv/config";
import cors from "cors";
import express from "express";
import { WebSocketServer, WebSocket } from 'ws';


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
export const wss = new WebSocketServer({ server });

server.use(
  cors({
    origin: "http://localhost:1420",
    credentials: true,
  })
);
server.use(express.json());
server.disable("x-powered-by");

<<<<<<< HEAD
server.use("/products", validatorData, productsRoute);
server.use("/users", validatorData, verifyToken, usersRoute);
=======
server.use("/products", validatorData, verifyToken, productsRoute);
server.use("/users", validatorData, verifyToken, validatorRole,usersRoute);
>>>>>>> ad9166553847a3666ec06b01564e2fa143066535
server.use("/providers", validatorData, verifyToken, providersRoute);
server.use("/purchases", validatorData, purchasesRoute);
server.use("/sales", validatorData, verifyToken, salesRoute);
server.use("/refund", refundsRoute);
server.use("/auth", authRoute);
server.use("/analytics", analyticsRoute);

server.use("/test", validatorData,verifyToken, validatorRole,(req, res) => {

    wss.clients.forEach((client) => {
	var date = new Date()
	client.send(`Testeado`);
    })
    
    res.status(200).json({message : 'Hello world!'});
});

server
  .listen(port, () => {
    console.log(`Server ready to listen on port: ${port}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Please use a different port.`
      );
    } else {
      console.error(`Server error: ${err}`);
    }
  })
 .on("upgrade", (req,socket,head) => {
     wss.handleUpgrade(req,socket,head, (ws) => {
	 wss.emit('connection',ws,req);
     })

 });

wss.on('connection', (ws,req) => {
    ws.on('open', () => {
	console.log('User connected');

    })

    
});


export default server;
