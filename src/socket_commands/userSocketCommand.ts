import { Server, Socket } from "socket.io";
import { state } from "../socket/state";
import { getUsername } from "../utils/params";
import { UserListenerEvent } from "../socket/event";

export function ValidateUser({ socket }: { socket: Socket }) {
    if (!socket.handshake.query.username) {
        socket.emit("error", "Username is required");
        socket.disconnect();
    }
    const username = getUsername(socket);
    state.users.set(username, { socket, username });
}

export function ListenOnDisconnected({ io, socket }: { io: Server, socket: Socket }) {
    socket.on(UserListenerEvent.USER_DISCONNECTED, () => {
        responseDisconnected({ io, socket });
    });
}

export function responseConnected({ io, socket }: { io: Server, socket: Socket }) {
    const username = getUsername(socket);
    io.emit("connected", { username });
    console.log(`${username} connected`);
}

export function responseDisconnected({ io, socket }: { io: Server, socket: Socket }) {
    const username = getUsername(socket);
    state.users.delete(username);
    io.emit("disconnected", { username });
    console.log(`${username} disconnected`);
}

