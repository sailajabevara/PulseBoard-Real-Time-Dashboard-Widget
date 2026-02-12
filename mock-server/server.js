const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket Server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Client Connected ");

  // metric every 3 seconds
  setInterval(() => {
    ws.send(
      JSON.stringify({
        type: "metric",
        value: Math.floor(Math.random() * 1000),
      })
    );
  }, 3000);

  // notification every 10 seconds
  setInterval(() => {
    ws.send(
      JSON.stringify({
        type: "notification",
        id: Date.now().toString(),
        title: "System Alert ",
        message: "Something important happened!",
      })
    );
  }, 10000);
});
