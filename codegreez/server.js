const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

io.on("cnnection", (socket) => {
  console.log("socket connected", socket.id);
});
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));