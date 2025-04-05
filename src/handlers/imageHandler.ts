import { Server, Socket } from "socket.io";
import { ListenOnGetImageRequest, ListenOnUploadImage } from "../socket_commands/commands";

export const imageHandler = (io: Server, socket: Socket) => {
    ListenOnGetImageRequest({ socket });
    ListenOnUploadImage({ socket });
};
