export enum CurrencyUnit {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    THB = 'THB'
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
}

export interface IPaymentConfig {
    id: string;
    amount: number;
    currency: CurrencyUnit;
    description: string;
    status?: PaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
} 