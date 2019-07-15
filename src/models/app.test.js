/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import currencies from "../test-data/currencies";
import formatted_currencies from "../test-data/formatted_currencies";
import parseFloatString from "../utils/parse-float-string";
import AppModel, { initial_currency_value } from "./app";

let app;

describe("App Model", () => {
  describe("Initial State", () => {
    beforeAll(() => {
      app = new AppModel();
    });
    it('has empty currencies object', () => {
      expect(app.currencies).to.deep.equal({});
    });
    it('has empty currency_names array', () => {
      expect(app.currency_names).to.deep.equal([]);
    });
    it('has empty to string', () => {
      expect(app.to).to.deep.equal('');
    });
    it('has empty from string', () => {
      expect(app.from).to.deep.equal('');
    });
    it('has a to_currency object with base values', () => {
      expect({ ...app.to_currency }).to.deep.equal(initial_currency_value);
    });
    it('has a from_currency object with base values', () => {
      expect({ ...app.from_currency }).to.deep.equal(initial_currency_value);
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
  describe("setToCurrency", () => {
    beforeAll(() => {
      app = new AppModel();
    });
    it('does not change without a proper currency object', () => {
      app.setToCurrency(true);
      expect({ ...app.to_currency }).to.deep.equal(initial_currency_value);
    });
    it('has the added currencies', () => {
      app.setToCurrency(formatted_currencies[0]);
      expect({ ...app.to_currency }).to.deep.equal(formatted_currencies[0]);
    });
  });
  describe("setFromCurrency", () => {
    beforeAll(() => {
      app = new AppModel();
    });
    it('does not change without a proper currency object', () => {
      app.setFromCurrency(true);
      expect({ ...app.from_currency }).to.deep.equal(initial_currency_value);
    });
    it('has the added currencies', () => {
      app.setFromCurrency(formatted_currencies[0]);
      expect({ ...app.from_currency }).to.deep.equal(formatted_currencies[0]);
    });
  });
});
