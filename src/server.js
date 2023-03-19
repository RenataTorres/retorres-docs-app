import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const port = process.env.port || 3000;

//Pega todo o caminho do computador até esse arquivo
const currentPath = url.fileURLToPath(import.meta.url);
//Pega o caminho desse arquivo, sobe até a pasta src e depois até o diretório raiz e depois até o public
const publicDirectory = path.join(currentPath, '../../', 'public');
//Para o express utilize o diretório público de forma estática
app.use(express.static(publicDirectory));

const serverHttp = http.createServer(app);

serverHttp.listen(port, () => console.log(`Servidor escutando na porta ${port}`));

const io = new Server(serverHttp);

io.on('connection', () => {
  console.log('Um cliente se conectou');
})
