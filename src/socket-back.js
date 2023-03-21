import io from "./server.js";
import { addDocument, deleteDocument, findDocuments, getDocuments, updateDocuments } from "./db/documentsDb.js";
import logEventsInit from "./logEvents/logEventsInit.js";
import logEventsDocuments from "./logEvents/logEventsDocuments.js";

io.on('connection', (socket) => {

  logEventsInit(socket, io);
  logEventsDocuments(socket, io);
  
});

