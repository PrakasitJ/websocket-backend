import { Socket } from "socket.io";

export const getUsername = (socket: Socket) => {
    return socket.handshake.query.username as string;
};
