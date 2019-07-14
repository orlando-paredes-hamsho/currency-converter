import { create } from "apisauce";
const base = 'https://free.currconv.com/api/v7';
const key = '4130593d45943f6e8113';

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
}

export default CurrencyService;
