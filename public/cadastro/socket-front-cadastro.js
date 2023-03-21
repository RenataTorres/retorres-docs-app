const socket = io();

function emitUserRegistration(dados) {
  socket.emit('register_user', dados);
}

socket.on('register_success', () => alert('Cadastro realizado com sucesso'));
socket.on('register_error', () => alert('Erro no cadastro'));
socket.on('exist_user', () => alert('Usuário já cadastardo'))

export { emitUserRegistration };
