import { addDocument, findDocuments, getDocuments } from "../db/documentsDb.js";

function logEventsDocuments(socket, io) {
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
    //joga o cliente em uma sala
    socket.join(documentName);

    const document = await findDocuments(documentName);

    if(document) {
      returnText(document.text)
    }
  });
}

export default logEventsDocuments;
