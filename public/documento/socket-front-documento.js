import { alertAndRedirect, updateEditorText } from "./documento.js";

const socket = io();

function selectDocument(name) {
  socket.emit('select_document', name, (text) => {
    updateEditorText(text);
  });
}

function emitEditorText(data) {
  socket.emit('editor_text', data);
}

socket.on('editor_text_clients', (text) => {
  updateEditorText(text);
});

function emitDeleteDocument(name) {
  socket.emit('delete_document', name);
}

socket.on('delete_document_success', (name) => {
  alertAndRedirect(name);
})

export { emitEditorText, selectDocument, emitDeleteDocument };
