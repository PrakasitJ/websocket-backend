import { Server, Socket } from 'socket.io';
import { state } from '../socket/state';
import { getUsername } from '../utils/params';
import { Message, FastMessage } from '../types';
export const chatHandler = (io: Server, socket: Socket) => {
    const username = getUsername(socket);

    socket.on("join_room", ({ room_id }: { room_id: string }) => {
        if (!state.rooms.has(room_id)) {
            state.rooms.set(room_id, { users: new Map() });
        }
        state.rooms.get(room_id)?.users.set(username, { socket, username });
    });

    socket.on("leave_room", ({ room_id }: { room_id: string }) => {
        if (state.rooms.has(room_id)) {
            state.rooms.get(room_id)?.users.delete(username);
        }
    });

    socket.on("send_message", ({ room_id, message }: { room_id: string; message: string }) => {
        if (state.rooms.has(room_id)) {
            state.rooms.get(room_id)?.users.forEach((user) => {
                user.socket.emit("message", { content: message, sender: username, timestamp: new Date().toISOString() } as Message);
            });
        }
    });

    socket.on("fast_message", ( payload : FastMessage) => {
        state.users.forEach((user) => {
            user.socket.emit("message", {
                content: payload.message,
                sender: username,
                timestamp: new Date().toISOString()
            } as Message);
        });
    });
};