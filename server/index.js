const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const router = require("./router");
const { addUser, removeUser, getUser, getUserInRoom } = require("./users");

app.use(cors());

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "http://localhost:5173" } });

io.on("connection", (socket) => {
  console.log("we have new connection");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    //message when user will join
    socket.emit("message", {
      user: "admin",
      text: `${user.name},welcome to the room ${user.room}`,
    });
    
    // message to all other people in the room that person has joined
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnectt", () => {
    console.log("user has left");
  });
});

app.use(router);
server.listen(PORT, () => {
  console.log("server connected");
});
