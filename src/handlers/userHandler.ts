import { Server, Socket } from 'socket.io';
import { ValidateUser, responseConnected, ListenOnDisconnected } from '../socket_commands/commands';

export const userHandler = (io: Server, socket: Socket) => {
    ValidateUser({ socket });
    responseConnected({ io, socket });
    ListenOnDisconnected({ io, socket });
};