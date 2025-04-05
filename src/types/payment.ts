import { Server } from "socket.io";

export interface PaymentConfig {
    id: string;
    amount: number;
    currency: string;
    description: string;
    status?: PaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PaymentConstructor extends PaymentConfig {
    io: Server;
}

export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

export class Payment {
    private id: string;
    private amount: number;
    private currency: string;
    private description: string;
    private status: PaymentStatus;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(
        id: string,
        amount: number,
        currency: string,
        description: string
    ) {
        this.id = id;
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.status = "pending";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public async setPayment(payment: PaymentConfig) {
        this.id = payment.id;
        this.amount = payment.amount;
        this.currency = payment.currency;
        this.description = payment.description;
        this.status = payment.status ?? "pending";
        this.createdAt = payment.createdAt ?? new Date();
        this.updatedAt = payment.updatedAt ?? new Date();
    }

    public async pay() {
        this.status = "success";
        return this;
    }

    public async refund() {
        this.status = "refunded";
        return this;
    }

    public async fail() {
        this.status = "failed";
        return this;
    }

    public async getStatus() {
        return this.status;
    }

    public async getAmount() {
        return this.amount;
    }

    public async getCurrency() {
        return this.currency;
    }

    public async getDescription() {
        return this.description;
    }

    public async getCreatedAt() {
        return this.createdAt;
    }

    public async getUpdatedAt() {
        return this.updatedAt;
    }

    public async getPaymentId() {
        return this.id;
    }
}