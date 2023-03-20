import io from "./server.js";

const documents = [
  {
    name: 'JavaScript',
    text: 'texto de javascript...'
  },
  {
    name: 'Node',
    text: 'texto de Node...'
  },
  {
    name: 'Socket.io',
    text: 'texto de Socket.io...'
  },
]

io.on('connection', (socket) => {
  console.log('Um cliente se conectou ID ', socket.id);

  socket.on('select_document', (documentName, returnText) => {
    socket.join(documentName);

    const document = findDocuments(documentName);

    if(document) {
      returnText(document.text)
    }
  })

  socket.on('editor_text', ({ text, documentName }) => {
    const document = findDocuments(documentName)
    if(document) {
      document.text = text;
      socket.to(documentName).emit('editor_text_clients', text);
    }
  })
});

function findDocuments(name) {
  return documents.find(document => document.name === name);
}
