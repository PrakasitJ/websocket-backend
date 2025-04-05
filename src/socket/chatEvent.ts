export enum ChatListenerEvent {
    JOIN_ROOM = "join_room",
    LEAVE_ROOM = "leave_room",
    SEND_MESSAGE = "send_message",
    FAST_MESSAGE = "fast_message",
}

export enum ChatEmitterEvent {
    MESSAGE = "message",
}