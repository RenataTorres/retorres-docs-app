import { deleteDocument, updateDocuments } from "../db/documentsDb.js";

function logEventsInit(socket, io) {
  socket.on('editor_text', async ({ text, documentName }) => {
    const updatedDocument = await updateDocuments(documentName, text);

    if(updatedDocument.modifiedCount) {
      socket.to(documentName).emit('editor_text_clients', text);
    }
  });

  socket.on('delete_document', async (documentName) => {
    const result = await deleteDocument(documentName);
    
    if(result.deletedCount){
      io.emit('delete_document_success', documentName);
    }
  })
}

export default logEventsInit;
