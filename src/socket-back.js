import io from "./server.js";
import logEventsInit from "./logEvents/logEventsInit.js";
import logEventsDocuments from "./logEvents/logEventsDocuments.js";
import logEventsRegister from "./logEvents/logEventsRegister.js";

io.on('connection', (socket) => {

  logEventsInit(socket, io);
  logEventsDocuments(socket, io);
  logEventsRegister(socket, io);
  
});

