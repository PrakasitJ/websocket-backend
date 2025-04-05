import { Server, Socket } from "socket.io";
import { ListenOnPayment } from "../socket_commands/commands";

export const paymentHandler = (io: Server, socket: Socket) => {
    ListenOnPayment({ io, socket });
};
