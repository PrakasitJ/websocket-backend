import { CurrencyUnit, PaymentStatus, IPaymentConfig } from "../../interfaces/index";

export class Payment {
  private id: string;
  private amount: number;
  private currency: CurrencyUnit;
  private description: string;
  private status: PaymentStatus;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    amount: number,
    currency: CurrencyUnit,
    description: string
  ) {
    this.id = id;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
    this.status = PaymentStatus.PENDING;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public async setPayment(payment: IPaymentConfig) {
    this.id = payment.id;
    this.amount = payment.amount;
    this.currency = payment.currency;
    this.description = payment.description;
    this.status = payment.status ?? PaymentStatus.PENDING;
    this.createdAt = payment.createdAt ?? new Date();
    this.updatedAt = payment.updatedAt ?? new Date();
  }

  public async pay() {
    this.status = PaymentStatus.SUCCESS;
    return this;
  }

  public async refund() {
    this.status = PaymentStatus.REFUNDED;
    return this;
  }

  public async fail() {
    this.status = PaymentStatus.FAILED;
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
