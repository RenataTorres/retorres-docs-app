import { addDocument, getDocuments} from "../db/documentsDb.js";

function logEventsInit(socket, io) {

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
}

export default logEventsInit;
