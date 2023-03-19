import io from "./server.js";

io.on('connection', (socket) => {
  console.log('Um cliente se conectou ID ', socket.id);

  socket.on('editor_text', (text) => {
    console.log(text);
  })
});
