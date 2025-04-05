import { PaymentService } from "../services/paymentService";
import { CurrencyUnit, PaymentConfig } from "../types";
import { WebSocketServer } from "../core/WebSocketServer";

class PaymentController {
    private static instance: PaymentController;
    private paymentService: PaymentService;
    constructor(paymentService: PaymentService) {
        this.paymentService = paymentService;
    }

    public static getInstance() {
        if (!PaymentController.instance) {
            PaymentController.instance = new PaymentController(new PaymentService({
                id: "1",
                amount: 100,
                currency: CurrencyUnit.USD,
                description: "Payment for a product",
                io: WebSocketServer.getInstance().getIO()
            }));
        }
        return PaymentController.instance;
    }


    public async setPayment(payment: PaymentConfig) {
        await this.paymentService?.setPayment(payment);
    }

    public async pay() {
        const payment = await this.paymentService.pay();
        return payment;
    }

    public async refund() {
        const payment = await this.paymentService.refund();
        return payment;
    }

    public async fail() {
        const payment = await this.paymentService.fail();
        return payment;
    }

    public async getStatus() {
        const status = await this.paymentService.getStatus();
        return status;
    }

    public async getAmount() {
        const amount = await this.paymentService.getAmount();
        return amount;
    }

    public async getCurrency() {
        const currency = await this.paymentService.getCurrency();
        return currency;
    }

    public async getDescription() {
        const description = await this.paymentService.getDescription();
        return description;
    }

    public async getCreatedAt() {
        const createdAt = await this.paymentService.getCreatedAt();
        return createdAt;
    }

    public async getUpdatedAt() {
        const updatedAt = await this.paymentService.getUpdatedAt();
        return updatedAt;
    }

    public async getPaymentId() {
        const paymentId = await this.paymentService.getPaymentId();
        return paymentId;
    }
}

export { PaymentController };