const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    socket.to(room).emit("notification", `${username} joined the room`);
  });

  socket.on("chatMessage", ({ message, username, room }) => {
    io.to(room).emit("chatMessage", { message, username });
  });
});

const PORT = process.env.PORT || 10000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
