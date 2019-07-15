import parseStringFloat from './parse-string-float';
const convertCurrency = (exchange_rate, amount) => (
  ((typeof exchange_rate === 'number' ? exchange_rate : 0) * parseStringFloat(amount)).toFixed(2).toString()
);
export default convertCurrency;
