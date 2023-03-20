import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://retorres-docs-app:123@retorrescluster.isl2kwo.mongodb.net/?retryWrites=true&w=majority');

let collectionDocuments;
try {

  await client.connect()
  const db = client.db('retorres-websocket-documents');
  collectionDocuments = db.collection('documents');

  console.log('Comectado ao banco de dados com sucesso!');
}catch(error) {
  console.log(error);
}

export { collectionDocuments };
