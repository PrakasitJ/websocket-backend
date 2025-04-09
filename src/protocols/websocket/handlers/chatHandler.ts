import { Server, Socket } from 'socket.io';
import { ListenOnJoinRoom, ListenOnLeaveRoom, ListenOnSendMessage, ListenOnFastMessage } from '../commands/commands';

export const chatHandler = (io: Server, socket: Socket) => {
    ListenOnJoinRoom({ socket });
    ListenOnLeaveRoom({ socket });
    ListenOnSendMessage({ socket });
    ListenOnFastMessage({ io, socket });
};