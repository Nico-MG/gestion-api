import WebSocket from 'ws';
import server from '../../server.js';

const wss = new WebSocket({server: server })

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