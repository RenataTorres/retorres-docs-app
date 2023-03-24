import { emitAddDocument } from './socket-front-index.js';
import { deleteCookie, getCookie } from './utils/cookies.js';

const tokenJwt = getCookie('tokenJwt');
console.log(tokenJwt);
const documentsList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDocument = document.getElementById('input-documento');
const logoutButton = document.getElementById('botao-logout')

logoutButton.addEventListener('click', () => {
  deleteCookie('tokenJwt');
  alert('Usuário deslogado com sucesso!');
  window.location.href = '/login/index.html';
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  emitAddDocument(inputDocument.value);
  inputDocument.value = '';
});

function insertDocumentLink(documentName) {
  documentsList.innerHTML += `
    <a 
      href="/documento/index.html?nome=${documentName}" 
      class="list-group-item list-group-item-action"
      id="documento-${documentName}"
    >
      ${documentName}
    </a>
  `
}

function deleteDocumentLink(documentName) {
  const documentRemove = document.getElementById(`documento-${documentName}`);
  documentsList.removeChild(documentRemove)
}

export { insertDocumentLink, deleteDocumentLink };
