import { action, observable, computed, decorate } from "mobx";
import isObject from '../utils/is-object';
import parseFloatString from '../utils/parse-float-string';

class AppModel {
  currencies = {};
  to = ''; // Naming is tough, yo
  from = '';  // Very tough
  setCurrencies = (currencies) => {
    if (!isObject(currencies)) return;
    this.currencies = { ...currencies };
  };
  setFrom = (from) => {
    this.from = parseFloatString(from);
  }
  setTo = (to) => {
    this.to = parseFloatString(to);
  }
  get currency_names() {
    const keys = [];
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
  setCurrencies: action,
  setTo: action,
  setFrom: action,
  currency_names: computed
});

export default AppModel;
