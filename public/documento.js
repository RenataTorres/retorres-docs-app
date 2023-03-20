import { emitEditorText, selectDocument } from "./socket-front-documento.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get('nome');

const editorText = document.getElementById('editor-texto');
const documentTitle = document.getElementById('titulo-documento');

documentTitle.textContent = documentName || 'Documento sem título';

selectDocument(documentName);

editorText.addEventListener('keyup', () => {
    emitEditorText({
        text:editorText.value, 
        documentName,
    })
});

function updateEditorText(text){
    editorText.value = text;
}

export { updateEditorText };
