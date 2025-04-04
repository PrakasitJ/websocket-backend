import { Server, Socket } from 'socket.io';
import { state } from '../socket/state';
import { getUsername } from '../utils/params';

export const userHandler = (io: Server, socket: Socket) => {
    if (!socket.handshake.query.username) {
        socket.emit("error", "Username is required");
        socket.disconnect();
        return;
    }
    const username = getUsername(socket);
    state.users.set(username, { socket, username });
    io.emit("connected", { username });
    console.log(`${username} connected`);

    socket.on("disconnect", () => {
        state.users.delete(username);
        io.emit("disconnected", { username });
    });
};