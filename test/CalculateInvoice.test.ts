import CalculateInvoice from "../src/CalculateInvoice";
import ExchangeGateway from "../src/ExchangeGateway";
import InvoiceRepository from "../src/InvoiceRepository";

test("Should be able to calculate the invoice", async () => {
  //   const exchangeGateway = new ExchangeGateway();
  const exchangeGatewayStub = {
    getExchangeRate: async () => 3,
  };
  const invoiceRepositoryStub = {
    getPurchases: async () => [
      { amount: 100, currency: "BRL" },
      { amount: 200, currency: "USD" },
    ],
  };
//   const invoiceRepository = new InvoiceRepository();
  const calculateInvoice = new CalculateInvoice(
    exchangeGatewayStub,
    invoiceRepositoryStub
  );

  const total = await calculateInvoice.calculate(
    "1111 1111 1111 1111",
    "BRL",
    new Date("2022-06-01T10:00:00")
  );
  expect(total).toBe(700);
});
