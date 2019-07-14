/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import currencies from "../test-data/currencies";
import parseFloatString from "../utils/parse-float-string";
import AppModel from "./app";

let app;

describe("App Model", () => {
  describe("Initial State", () => {
    beforeAll(() => {
      app = new AppModel();
    });

    it('', () => {
      expect(app).to.exist;
    });
  });
  describe("setCurrencies", () => {
    beforeAll(() => {
      app = new AppModel();
    });
    it('does not change without a proper currencies object', () => {
      app.setCurrencies(true);
      expect(app.currencies).to.deep.equal({});
    });
    it('has the added currencies', () => {
      app.setCurrencies(currencies.results);
      expect({ ...app.currencies }).to.deep.equal(currencies.results);
    });
    it('has the added currency ids as currency_names', () => {
      app.setCurrencies(currencies.results);
      expect([ ...app.currency_names ]).to.deep.equal(Object.keys(currencies.results).map((currency) => ({
        'label': currencies.results[currency].currencyName,
        'value': currencies.results[currency].id
      })));
    });
  });
  describe("setTo", () => {
    beforeAll(() => {
      app = new AppModel();
    });
    it('does not change without a proper value', () => {
      app.setTo(true);
      expect(app.to).to.equal('');
    });
    it('has the proper value', () => {
      app.setTo('1.32');
      expect(app.to).to.equal('1.32');
    });
    it('has a value that equals what is returned by parseFloatString', () => {
      const test_value = '1.3e2.0';
      app.setTo('1.3e2.0');
      expect(app.to).to.equal(parseFloatString(test_value));
    });
  });
  describe("setFrom", () => {
    beforeAll(() => {
      app = new AppModel();
    });
    it('does not change without a proper value', () => {
      app.setFrom(true);
      expect(app.from).to.equal('');
    });
    it('has the proper value', () => {
      app.setFrom('1.32');
      expect(app.from).to.equal('1.32');
    });
    it('has a value that equals what is returned by parseFloatString', () => {
      const test_value = '1.3e2.0';
      app.setFrom('1.3e2.0');
      expect(app.from).to.equal(parseFloatString(test_value));
    });
  });
});
