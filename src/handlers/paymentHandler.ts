import { Server, Socket } from "socket.io";
import { getUsername } from "../utils/params";
import { state } from "../socket/state";

export const paymentHandler = (io: Server, socket: Socket) => {
    const username = getUsername(socket);

    socket.on("payment_request", async ({ amount }: { amount: number }) => {
        console.log(amount);

        io.to(state.users.get(username)!.socket.id).emit("payment_response", {
            amount: amount,
            status: "success",
            timestamp: new Date().toISOString()
        });
    });
};
