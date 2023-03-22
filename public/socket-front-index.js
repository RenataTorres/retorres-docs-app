import { deleteDocumentLink, insertDocumentLink } from "./index.js";
import { getCookie } from "./utils/cookies.js";

const socket = io({
    auth: {
        token: getCookie('tokenJwt')
    }
});

socket.on('connect_error', (error) => {
    alert(error);
    window.location.href = '/login//index.html';
})

socket.emit('get_documents', (documents) => {
    documents.forEach(document => {
        insertDocumentLink(document.name)
    });
});

function emitAddDocument(name) {
    socket.emit('add_document', name);
}

socket.on('add_document_interface', (name) => {
    insertDocumentLink(name);
});

socket.on('exist_document', (name) => {
    alert(`O documento ${name} já existe`);
});

socket.on('delete_document_success', (name) => {
    deleteDocumentLink(name);
})

export { emitAddDocument };
