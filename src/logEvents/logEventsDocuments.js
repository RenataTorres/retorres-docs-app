import { findDocuments, deleteDocument, updateDocuments } from "../db/documentsDb.js";
import { addConnection, findConnection, getUsersDocument, removeConnection } from "../utils/connectionsDocuments.js";

function logEventsDocuments(socket, io) {
  socket.on('select_document', async ({documentName, userName}, returnText) => {
    const document = await findDocuments(documentName);
    
    if(document) {
      const connectionFound = findConnection(documentName, userName);

      if(connectionFound){
        socket.emit('user_already_in_document')
      }
      //joga o cliente em uma sala
      socket.join(documentName);

      addConnection({ documentName, userName });

      socket.data = {
        userEntered: true,
      }

      const usersInDocument = getUsersDocument(documentName);

      io.to(documentName).emit('users_in_document', usersInDocument);

      returnText(document.text)
    }

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
    });

    socket.on('disconnect', () => {
      if(socket.data.userEntered){
        removeConnection(documentName, userName);
  
        const usersInDocument = getUsersDocument(documentName);
  
        io.to(documentName).emit('users_in_document', usersInDocument);
      }
    });
  });
}

export default logEventsDocuments;
