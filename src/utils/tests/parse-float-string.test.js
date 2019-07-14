/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import parseFloatString from "../parse-float-string";

const test_data = [
  { value: true , expected: ''},
  { value: {} , expected: ''},
  { value: [] , expected: ''},
  { value: () => {} , expected: ''},
  { value: 'test' , expected: ''},
  { value: '1' , expected: '1'},
  { value: '1.0' , expected: '1.0'},
  { value: '1.0.0' , expected: '1.00'},
  { value: '1.e32.0' , expected: '1.320'},
];

describe("parseFloatString", () => {
  let dataType;
  test_data.forEach(data => {
    test(`${data.value} returns ${data.expected}`, () => {
      expect(parseFloatString(data.value)).to.equal(data.expected);
    });
  });
});
