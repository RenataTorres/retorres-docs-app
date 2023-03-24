import { getCookie } from "../utils/cookies.js";
import { alertAndRedirect, treatAuthorizationSuccess, updateEditorText, updateUsersInterface } from "./documento.js";

const socket = io('/users',{
  auth: {
      token: getCookie('tokenJwt')
  }
});

socket.on('authorization_success', treatAuthorizationSuccess);

socket.on('connect_error', (error) => {
  alert(error);
  window.location.href = '/login//index.html';
})

function selectDocument(inputData) {
  socket.emit('select_document', inputData, (text) => {
    updateEditorText(text);
  });
}

socket.on('users_in_document', updateUsersInterface)

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
