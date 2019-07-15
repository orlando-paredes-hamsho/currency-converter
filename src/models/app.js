import { action, observable, computed, decorate } from "mobx";
import isObject from '../utils/is-object';
import parseFloatString from '../utils/parse-float-string';
import convertCurrency from '../utils/convert-currency';

export const initial_currency_value = { value: '1', label: 'Choose a type of Currency...'};

class AppModel {
  constructor (service) {
    this.service = service;
  }
  currencies = {};
  to = ''; // Naming is tough, yo
  from = '';  // Very tough
  to_currency = initial_currency_value; // Yeah
  from_currency = initial_currency_value; // Not my strength
  setCurrencies = (currencies) => {
    if (!isObject(currencies)) return;
    this.currencies = { ...currencies };
  };
  setTo = (to) => {
    this.to = parseFloatString(to);
  }
  setFrom = (from) => {
    this.from = parseFloatString(from);
  }
  setToCurrency = (currency) => {
    if (!isObject(currency)) return;
    this.to_currency = { ...currency };
  };
  setFromCurrency = (currency) => {
    if (!isObject(currency)) return;
    this.from_currency = { ...currency };
  };
  updateFromCurrency = async () => {
    if (!this.can_update_currencies) return;
    const query = `${this.to_currency.value}_${this.from_currency.value}`;
    const response = await this.service.transformCurrency(query);
    switch (response.status) {
      case 200:
        this.setFrom(convertCurrency(response.data[query], this.to));
        break;
      default:
        console.log(response);
        break;
    }
  }
  updateToCurrency = async () => {
    if (!this.can_update_currencies) return;
    const query = `${this.from_currency.value}_${this.to_currency.value}`;
    const response = await this.service.transformCurrency(query);
    switch (response.status) {
      case 200:
        this.setTo(convertCurrency(response.data[query], this.from));
        break;
      default:
        console.log(response);
        break;
    }
  }
  get can_update_currencies() {
    return (
      this.to_currency.value &&
      this.to_currency.value !== '1' &&
      this.from_currency.value &&
      this.from_currency.value !== '1'
    );
  }
  get currency_names() {
    const keys = [];
    if (Object.keys(this.currencies).length === 0) return keys;
    for(var k in this.currencies){
      keys.push({
        'label': this.currencies[k].currencyName,
        'value': this.currencies[k].id
      });
    }
    return keys;
  }
}

decorate(AppModel, {
  currencies: observable,
  to: observable,
  from: observable,
  to_currency: observable,
  from_currency: observable,
  setCurrencies: action,
  setTo: action,
  setFrom: action,
  setToCurrency: action,
  setFromCurrency: action,
  updateFromCurrency: action,
  updateToCurrency: action,
  can_update_currencies: computed,
  currency_names: computed
});

export default AppModel;
