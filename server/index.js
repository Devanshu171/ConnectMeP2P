const express = require("express");
const bodyParser = require("body-parser");
const { Server, Socket } = require("socket.io");
//  making socket server
const io = new Server();
const app = express();
const emailToSocketMapping = new Map();

app.use(bodyParser.json());
io.on("connection", (Socket) => {
  console.log("New Connection");
  Socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("User", emailId, "Joined room", roomId);
    emailToSocketMapping.set(emailId, Socket.id);
    Socket.join(roomId);
    Socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});

app.listen(8000, () => {
  console.log("running on PORT 8000");
});
io.listen(8001);
