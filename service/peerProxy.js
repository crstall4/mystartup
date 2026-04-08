const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });
  const connections = new Map();

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    socket.on('message', function message(data) {
      const msg = JSON.parse(data);

      // Store the socket under the user's username
      if (msg.type === 'username') {
        connections.set(msg.username, socket);
        console.log(`User connected: ${msg.username}`);
        return;
      }

      // Forward all other messages to everyone except the sender
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };
