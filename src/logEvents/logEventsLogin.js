import { findUser } from "../db/usersDb.js";
import authenticateUser from "../utils/authenticateUser.js";
import generateJwt from "../utils/generateJwt.js";

function logEventsLogin(socket, io){
    socket.on('authenticate_user', async ({ name, password}) => {
        const user = await findUser(name);

        if(!user) {
            socket.emit('user_not_found');
            return;
        }

        const authenticated = authenticateUser(password, user);

        if(!authenticated) {
            socket.emit('authenticate_error');
            return;
        }

        const tokenJwt = generateJwt({ userName:name });

        socket.emit('authenticate_success', tokenJwt);
    });
}
export default logEventsLogin;
