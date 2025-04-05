import { Socket } from "socket.io";
import { ChatEmitterEvent, ChatListenerEvent } from "../socket/event";
import { getUsername } from "../utils/params";
import { state } from "../socket/state";
import { FastMessage, Message } from "../types";

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
            state.rooms.get(room_id)?.users.forEach((user) => {
                responseMessage({ socket: user.socket, message: {
                    content: message,
                    sender: username,
                    timestamp: new Date().toISOString()
                } as Message });
            });
        }
    });
}

export function ListenOnFastMessage({ socket }: { socket: Socket }) {
    socket.on(ChatListenerEvent.FAST_MESSAGE, (payload: FastMessage) => {
        state.users.forEach((user) => {
            responseMessage({ socket: user.socket, message: {
                content: payload.message,
                sender: getUsername(socket),
                timestamp: new Date().toISOString()
            } as Message });
        });
    });
}

export function responseMessage({ socket, message }: { socket: Socket, message: Message }) {
    socket.emit(ChatEmitterEvent.MESSAGE, message);
}



