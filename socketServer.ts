const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("updateContent", (content) => {
    io.emit("updateClientContent", content);
    console.log("content::::", content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  // socket.on("updateContent", (content: any) => {
  //   socket.broadcast.emit("updateContent", content);
  // });
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
