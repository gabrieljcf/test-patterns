export default class Invoice {
  private purchases: { amount: string; currency: string }[] = [];

  constructor() {}

  addPurchase(amount: string, currency: string) {
    this.purchases.push({ amount, currency });
  }

  calculate(invoiceCurrency: string, exchange: any) {
    let total = 0;
    for (const purchase of this.purchases) {
      let amount = parseFloat(purchase.amount);
      if (purchase.currency !== invoiceCurrency) {
        amount = amount * exchange[purchase.currency];
      }
      total += amount;
    }
    return Math.round(total * 100) / 100;
  }
}
