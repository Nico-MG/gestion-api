import {WebSocketServer} from 'ws';
import server from './server.js';
import http from 'node:http'

const app = http.createServer(server)
const wss = new WebSocketServer({server: app})

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  console.log("hola mundo")

  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws);
  });

  ws.on('message', (message) => {
    console.log('Received:', message);
  });
});

export const broadcastUpdate = (data) => {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }
};