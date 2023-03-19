const socket = io();

const editorText = document.getElementById('editor-texto');

editorText.addEventListener('keyup', () => {
    socket.emit('editor_text', editorText.value);
})