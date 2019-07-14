import { action, observable, computed, decorate } from "mobx";
import isObject from '../utils/is-object';

class AppModel {
  currencies = {};
  setCurrencies = (currencies) => {
    if (!isObject(currencies)) return;
    this.currencies = { ...currencies };
  };
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
  setCurrencies: action,
  currency_names: computed
});

export default AppModel;
