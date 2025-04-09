import { Server, Socket } from "socket.io";
import { ListenOnPayment } from "../commands/commands";

export const paymentHandler = (io: Server, socket: Socket) => {
    ListenOnPayment({ io, socket });
};
