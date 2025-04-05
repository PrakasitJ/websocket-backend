import { Elysia } from "elysia";
import { PaymentController } from "../controllers/paymentController";

const payment = new Elysia();

payment.get("/payment", () => {
    const paymentController = PaymentController.getInstance();
    paymentController.setPayment({
        id: "1",
        amount: 100,
        currency: "USD",
        description: "Payment for a product",
        status: "pending"
    });
    paymentController.pay();
    return {
        message: "Payment successful"
    }
});

export { payment };
