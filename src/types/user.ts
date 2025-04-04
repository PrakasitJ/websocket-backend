import { Socket } from "socket.io";

export interface User {
    username: string;
    socket: Socket;
}
