import { Server, Socket } from "socket.io";
import { Payment } from "../types";
import { PaymentEmitterEvent, PaymentListenerEvent } from "../socket/event";

export function ListenOnPayment({ io, socket }: { io: Server, socket: Socket }) {
    socket.on(PaymentListenerEvent.PAYMENT_REQUEST, async (payment: Payment) => {
        console.log(payment);
        responsePayment({ payment, io, socket });
    });
}

export function responsePayment({ payment, io, socket }: { payment: Payment, io: Server, socket: Socket }) {
    io.to(socket.id).emit(PaymentEmitterEvent.PAYMENT_RESPONSE, payment);
}

export function BroadcastPayment({ payment, io }: { payment: Payment, io: Server }) {
    io.emit(PaymentEmitterEvent.PAYMENT_RESPONSE, payment);
}