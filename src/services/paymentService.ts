import { Payment, PaymentConstructor, PaymentConfig } from "../types";
import { Server } from "socket.io";

class PaymentService {
    private payment: Payment;
    private io: Server;
    constructor(config: PaymentConstructor) {
        this.payment = new Payment(config.id, config.amount, config.currency, config.description);
        this.io = config.io;
    }

    public async setPayment(payment: PaymentConfig) {
        await this.payment.setPayment(payment);
    }

    public async pay() {
        const payment = await this.payment.pay();
        try {
            this.io.emit("payment_response", payment);
        } catch (error) {
            console.error(error);
        }
        return payment;
    }

    public async refund() {
        const payment = await this.payment.refund();
        try {
            this.io.emit("payment_response", payment);
        } catch (error) {
            console.error(error);
        }
        return payment;
    }

    public async fail() {
        const payment = await this.payment.fail();
        try {
            this.io.emit("payment_response", payment);
        } catch (error) {
            console.error(error);
        }
        return payment;
    }

    public async getStatus() {
        const status = await this.payment.getStatus();
        return status;
    }

    public async getAmount() {
        const amount = await this.payment.getAmount();
        return amount;
    }

    public async getCurrency() {
        const currency = await this.payment.getCurrency();
        return currency;
    }

    public async getDescription() {
        const description = await this.payment.getDescription();
        return description;
    }

    public async getCreatedAt() {
        const createdAt = await this.payment.getCreatedAt();
        return createdAt;
    }

    public async getUpdatedAt() {
        const updatedAt = await this.payment.getUpdatedAt();
        return updatedAt;
    }

    public async getPaymentId() {
        const paymentId = await this.payment.getPaymentId();
        return paymentId;
    }
}

export { PaymentService };
