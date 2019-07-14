/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import isObject from "../is-object";

const nonObjectList = [[], "string", 1000, null, undefined, () => {}];

describe("isObject", () => {
  let dataType;
  nonObjectList.forEach(nonObject => {
    dataType = !nonObject ? `${nonObject}` : nonObject.constructor.name;
    test(`${dataType} is not an Object so the method will return false`, () => {
      expect(isObject(nonObject)).to.be.false;
    });
  });
  test("Object data passed into the method should return a value of true", () => {
    const anObject = {};
    expect(isObject(anObject)).to.be.true;
  });
});
