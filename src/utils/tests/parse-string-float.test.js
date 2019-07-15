/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import parseFloatString from "../parse-string-float";

const test_data = [
  { value: true , expected: 0},
  { value: {} , expected: 0},
  { value: [] , expected: 0},
  { value: () => {} , expected: 0},
  { value: 'test' , expected: 0},
  { value: '1' , expected: 1},
  { value: '1.0' , expected: 1.0},
  { value: '1.0.0' , expected: 1},
  { value: '1.f32.0' , expected: 1},
];

describe("parseFloatString", () => {
  test_data.forEach(data => {
    test(`${data.value} returns ${data.expected}`, () => {
      expect(parseFloatString(data.value)).to.equal(data.expected);
    });
  });
});
