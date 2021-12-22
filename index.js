const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const messages = [];

io.on("connection", (socket) => {
  messages.forEach((m) => io.emit("message", m));

  socket.on("message", (message) => {
    messages.push(`${socket.id} said ${message}`);
    io.emit("message", `${socket.id} said ${message}`);
  });
});

http.listen(8080);
