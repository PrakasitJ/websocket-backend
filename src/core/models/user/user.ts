import { IUser } from "../../interfaces/index";
import { Socket } from "socket.io";

export class User implements IUser {
    username: string;
    socket: Socket;

    constructor(username: string, socket: Socket) {
        this.username = username;
        this.socket = socket;
    }
}
