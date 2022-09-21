import axios from "axios";

export default class ExchangeGateway {
  constructor() {}

  async getExchangeRate(to: string, from: string) {
    const response = await axios.get(
      `https://economia.awesomeapi.com.br/last/${to}-${from}`
    );
    const exchangeDetails = response.data;
    const parseObjectItem = `${to}${from}`.toUpperCase()
    return exchangeDetails[parseObjectItem].high
  }
}
