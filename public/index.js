import { emitAddDocument } from './socket-front-index.js';

const documentsList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDocument = document.getElementById('input-documento');

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
