import { findUser, registerUser } from "../db/usersDb.js";

function logEventsRegister(socket, io) {
  socket.on('register_user', async (dados) => {
    const user = await findUser(dados.name);

    if(user) {
      socket.emit('exist_user');
      return;
    }

    const result = await registerUser(dados);
    
    if(result.acknowledged) {
      socket.emit('register_success');
      return;
    }

    socket.emit('register_error');
    
  });
}

export default logEventsRegister;
