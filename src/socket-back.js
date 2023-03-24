import 'dotenv/config';
import io from "./server.js";
import logEventsInit from "./logEvents/logEventsInit.js";
import logEventsDocuments from "./logEvents/logEventsDocuments.js";
import logEventsRegister from "./logEvents/logEventsRegister.js";
import logEventsLogin from "./logEvents/logEventsLogin.js";
import authorizeUser from './midllewares/authorizeUser.js';

const nspUsers = io.of('users');

nspUsers.use(authorizeUser);

nspUsers.on('connection', (socket) => {
  logEventsInit(socket, nspUsers);
  logEventsDocuments(socket, nspUsers);
});

io.of('/').on('connection', (socket) => {
  logEventsRegister(socket, io);
  logEventsLogin(socket, io);
});
