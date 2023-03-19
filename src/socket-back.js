import io from "./server.js";

io.on('connection', (socket) => {
  console.log('Um cliente se conectou ID ', socket.id);
});
