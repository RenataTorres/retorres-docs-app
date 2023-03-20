import io from "./server.js";
import { findDocuments, updateDocuments } from "./documentsDb.js";

io.on('connection', (socket) => {
  socket.on('select_document', async (documentName, returnText) => {
    socket.join(documentName);

    const document = await findDocuments(documentName);

    if(document) {
      returnText(document.text)
    }
  })

  socket.on('editor_text', async ({ text, documentName }) => {
    const updatedDocument = await updateDocuments(documentName, text);
    
    if(updatedDocument.modifiedCount) {
      socket.to(documentName).emit('editor_text_clients', text);
    }
  })
});

