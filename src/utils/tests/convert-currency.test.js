/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import convertCurrency from "../convert-currency";

const test_data = [
  { value: true, exchange_rate: 1, expected: '0.00'},
  { value: {}, exchange_rate: 1, expected: '0.00'},
  { value: [], exchange_rate: 1, expected: '0.00'},
  { value: () => {}, exchange_rate: 1, expected: '0.00'},
  { value: 'test', exchange_rate: 1, expected: '0.00'},
  { value: '1', exchange_rate: 1, expected: '1.00'},
  { value: '1.0', exchange_rate: 1, expected: '1.00'},
  { value: '1.0.0', exchange_rate: 1, expected: '1.00'},
  { value: '1.f32.0', exchange_rate: 1, expected: '1.00'},
  { value: '1', exchange_rate: true, expected: '0.00'},
  { value: '1.0', exchange_rate: {}, expected: '0.00'},
  { value: '1.0.0', exchange_rate: [], expected: '0.00'},
  { value: '1.f32.0', exchange_rate: () => {}, expected: '0.00'},
  { value: '1.f32.0', exchange_rate: () => 'test', expected: '0.00'},
];

describe("parseFloatString", () => {
  test_data.forEach(data => {
    test(`${data.value} returns ${data.expected}`, () => {
      expect(convertCurrency(data.exchange_rate, data.value)).to.equal(data.expected);
    });
  });
});
