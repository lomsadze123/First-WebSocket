const io = require("socket.io")(3001, {
  cors: ["http://localhost:5173"],
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("join", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  });

  socket.on("leave", (room) => {
    socket.leave(room);
    console.log(`${socket.id} left room ${room}`);
  });

  socket.on("chat message", (message, room) => {
    const messageWithSender = { text: message, sender: socket.id };
    socket.to(room).emit("message", messageWithSender);
    socket.emit("message", messageWithSender);
    // io.to(room).emit("message", message); // Broadcast message to all connected clients
  });
});
