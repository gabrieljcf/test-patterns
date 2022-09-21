import axios from "axios";
import sinon from "sinon";
import Connection from "../src/Connection";
import { calculate } from "../src/InvoiceService";

test("Should be able to calculate a invoice (stub)", async () => {
  const getMonthStub = sinon.stub(Date.prototype, "getMonth").returns(5);
  const getFullYearStub = sinon
    .stub(Date.prototype, "getFullYear")
    .returns(2022);
  const axiosStub = sinon.stub(axios, "get").returns(
    Promise.resolve({
      data: {
        USDBRL: {
          high: 3,
        },
      },
    })
  );
  const connectionStub = sinon.stub(Connection.prototype, "query").returns(
    Promise.resolve([
      { amount: 100, currency: "BRL" },
      { amount: 200, currency: "USD" },
    ])
  );
  const total = await calculate("1111 1111 1111 1111", "BRL");
  expect(total).toBe(700);
  getMonthStub.restore();
  getFullYearStub.restore();
  axiosStub.restore();
  connectionStub.restore();
});

test("Should be able to calculate a invoice (Spy)", async () => {
  const clock = sinon.useFakeTimers({ now: new Date("2022-06-01T10:00:00") });
  const axiosSpy = sinon.spy(axios, "get");
  const total = await calculate("1111 1111 1111 1111", "BRL");
  expect(total).toBe(1167.42);
  expect(
    axiosSpy.calledWith("https://economia.awesomeapi.com.br/last/USD-BRL")
  ).toBe(true);
  clock.restore();
  axiosSpy.restore();
});

test.skip("Should be able to calculate a invoice (Mock)", async () => {
  const clock = sinon.useFakeTimers({ now: new Date("2022-06-01T10:00:00") });
  const axiosMock = sinon.mock(axios);
  axiosMock
    .expects("get")
    .withArgs("https://economia.awesomeapi.com.br/last/USD-BRL")
    .returns(
      Promise.resolve({
        data: {
          USDBRL: {
            high: 3,
          },
        },
      })
    );
  const total = await calculate("1111 1111 1111 1111", "BRL");
  expect(total).toBe(970);
  axiosMock.verify();
  clock.restore();
  axiosMock.restore();
});
