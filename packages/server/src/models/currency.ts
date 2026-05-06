export interface Currency {
  amount: number;
  currency: CurrencyCode;
}

export type CurrencyCode = "USD" | "EUR" | "CAD";
