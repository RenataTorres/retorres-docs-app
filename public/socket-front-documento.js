import { updateEditorText } from "./documento.js";

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

export { emitEditorText, selectDocument };
