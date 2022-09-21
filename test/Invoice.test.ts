import Invoice from "../src/Invoice";

test("Should be able to calculate the invoice", () => {
  const invoice = new Invoice();
  invoice.addPurchase("100", "BRL");
  invoice.addPurchase("200", "USD");
  const total = invoice.calculate("BRL", { USD: 3 });
  expect(total).toBe(700)
});
