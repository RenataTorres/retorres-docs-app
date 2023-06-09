import { setCookies } from "../utils/cookies.js";

const socket = io();

function emitUserAuthenticate(dados) {
  socket.emit('authenticate_user', dados);
}

socket.on('authenticate_success', (tokenJwt) => {
  setCookies('tokenJwt', tokenJwt);

  alert('Usuário logado com sucesso!');
  window.location.href = '/';
});

socket.on('authenticate_error', () => alert('Erro ao logar!'));
socket.on('user_not_found', () => alert('Usuário ainda não realizou cadastro!'));

export { emitUserAuthenticate };
