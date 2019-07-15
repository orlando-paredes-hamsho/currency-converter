import { create } from "apisauce";
const base = 'https://free.currconv.com/api/v7';
const key = process.env.REACT_APP_CURRENCY_KEY;

class CurrencyService {
  constructor(baseURL = base) {
    this.api = create({
      baseURL,
      headers: {
        Accept: "application/json"
      }
    });
  }
  getCurrencies = () =>
    this.api.get(`/currencies?apiKey=${key}`);
  transformCurrency = (query) =>
    this.api.get(`/convert?q=${query}&compact=ultra&apiKey=${key}`);
}

export default CurrencyService;
