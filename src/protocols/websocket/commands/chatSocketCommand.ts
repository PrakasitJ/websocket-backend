import { Server, Socket } from "socket.io";
import { ChatEmitterEvent, ChatListenerEvent } from "../sockets/event";
import { getUsername } from "../utils/params";
import { state } from "../sockets/state";
import { FastMessage, Message } from "../../../core/models";
import { IFastMessage } from "../../../core/interfaces/chatInterface";

export function ListenOnJoinRoom({ socket }: { socket: Socket }) {
    socket.on(ChatListenerEvent.JOIN_ROOM, ({ room_id }: { room_id: string }) => {
        if (!state.rooms.has(room_id)) {
            state.rooms.set(room_id, { users: new Map() });
        }
        const username = getUsername(socket);
        state.rooms.get(room_id)?.users.set(username, { socket, username });
    });
}

export function ListenOnLeaveRoom({ socket }: { socket: Socket }) {
    socket.on(ChatListenerEvent.LEAVE_ROOM, ({ room_id }: { room_id: string }) => {
        const username = getUsername(socket);
        if (state.rooms.has(room_id)) {
            state.rooms.get(room_id)?.users.delete(username);
        }
    });
}

export function ListenOnSendMessage({ socket }: { socket: Socket }) {
    socket.on(ChatListenerEvent.SEND_MESSAGE, ({ room_id, message }: { room_id: string, message: string }) => {
        const username = getUsername(socket);
        if (state.rooms.has(room_id)) {
            state.rooms.get(room_id)?.users.forEach((user) => user.socket.emit(ChatEmitterEvent.MESSAGE, new Message(message, username).toJSON()));
        }
    });
}

export function ListenOnFastMessage({ io, socket }: { io: Server, socket: Socket }) {
    socket.on(ChatListenerEvent.FAST_MESSAGE, (payload: IFastMessage) => {
        io.emit(ChatEmitterEvent.MESSAGE, new FastMessage(payload.message).setSenderToAnnonymous().useHelloMapper().useWorldMapper().useGhostMapper().toJSON());
    });
}

export function responseMessage({ socket, message }: { socket: Socket, message: Message }) {
    socket.emit(ChatEmitterEvent.MESSAGE, message);
}



