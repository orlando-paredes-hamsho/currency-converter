import { action, observable, computed, decorate } from "mobx";
import isObject from '../utils/is-object';
import parseFloatString from '../utils/parse-float-string';

export const initial_currency_value = { value: '1', label: 'Choose a type of Currency...'};

class AppModel {
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
  currency_names: computed
});

export default AppModel;
