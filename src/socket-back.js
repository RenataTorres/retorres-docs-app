import io from "./server.js";
import { addDocument, deleteDocument, findDocuments, getDocuments, updateDocuments } from "./documentsDb.js";

io.on('connection', (socket) => {

  socket.on('get_documents', async (returnedDocuments) => {
    const documents = await getDocuments();

    returnedDocuments(documents)
  });

  socket.on('add_document', async ( documentName ) => {
    const existDocument = (await findDocuments(documentName)) !== null;

    if(existDocument) {
      socket.emit('exist_document', documentName);
    }else {

      const result = await addDocument(documentName);
  
      if(result.acknowledged) {
        io.emit('add_document_interface', documentName);
      }
    }
  });

  socket.on('select_document', async (documentName, returnText) => {
    socket.join(documentName);

    const document = await findDocuments(documentName);

    if(document) {
      returnText(document.text)
    }
  });

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
});

