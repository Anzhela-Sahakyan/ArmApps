const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer();
const io = new Server(server);

io.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

io.on("connection", (socket: any) => {
  console.log("A user connected");

  socket.on("updateContent", (content: any) => {
    io.emit("contentUpdated", content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
