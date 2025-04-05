import { Elysia } from "elysia";
import { PaymentController } from "../controllers/paymentController";
import { CurrencyUnit, PaymentStatus } from "../types/payment";

const payment = new Elysia();

payment.get("/payment", () => {
    const paymentController = PaymentController.getInstance();
    paymentController.setPayment({
        id: "1",
        amount: 100,
        currency: CurrencyUnit.THB,
        description: "Payment for a product",
        status: PaymentStatus.PENDING
    });
    paymentController.pay();
    return {
        message: "Payment successful"
    }
});

export { payment };
