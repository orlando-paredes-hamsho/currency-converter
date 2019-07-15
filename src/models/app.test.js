/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import currencies from "../test-data/currencies";
import formatted_currencies from "../test-data/formatted_currencies";
import parseFloatString from "../utils/parse-float-string";
import convertCurrency from "../utils/convert-currency";
import AppModel, { initial_currency_value } from "./app";

let app;
const currency_rate = 1.00;
const mock_service = { transformCurrency: jest.fn().mockResolvedValue({
  status: 200,
  data: { usd_usd: currency_rate }
})};

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
    it('has no service object', () => {
      expect(app.service).not.to.exist;
    });
    it('cannot update currencies', () => {
      expect(app.can_update_currencies).to.be.false;
    });
  });
  describe("Initialized with service", () => {
    beforeAll(() => {
      app = new AppModel(mock_service);
    });
    it('has the service object', () => {
      expect({ ...app.service }).to.deep.equal(mock_service);
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
  describe("can_update_currencies", () => {
    beforeEach(() => {
      app = new AppModel();
    });
    it('cant update currencies with just to currency', () => {
      app.setToCurrency(formatted_currencies[0]);
      expect(app.can_update_currencies).to.be.false;
    });
    it('cant update currencies with just from currency', () => {
      app.setFromCurrency(formatted_currencies[0]);
      expect(app.can_update_currencies).to.be.false;
    });
    it('can update currencies with both currencies', () => {
      app.setToCurrency(formatted_currencies[0]);
      app.setFromCurrency(formatted_currencies[0]);
      expect(app.can_update_currencies).to.be.true;
    });
  });
  describe("updateToCurrency", () => {
    beforeEach(() => {
      app = new AppModel(mock_service);
      mock_service.transformCurrency.mockClear();
    });
    it('cant call transformCurrency with just to currency', () => {
      app.setToCurrency(formatted_currencies[0]);
      app.updateToCurrency();
      expect(mock_service.transformCurrency.mock.calls.length).to.equal(0);
    });
    it('cant call transformCurrency with just from currency', () => {
      app.setFromCurrency(formatted_currencies[0]);
      app.updateToCurrency();
      expect(mock_service.transformCurrency.mock.calls.length).to.equal(0);
    });
    it('can call transformCurrency with both currencies', () => {
      app.setToCurrency(formatted_currencies[0]);
      app.setFromCurrency(formatted_currencies[0]);
      app.updateToCurrency();
      expect(mock_service.transformCurrency.mock.calls.length).to.equal(1);
    });
    it('calls setTo', async () => {
      app.setToCurrency(formatted_currencies[0]);
      app.setFromCurrency(formatted_currencies[0]);
      app.setFrom('1');
      app.setTo = jest.fn();
      await app.updateToCurrency();
      expect(app.setTo.mock.calls.length).to.equal(1);
    });
    it('Sets the value of To', async () => {
      app.setToCurrency(formatted_currencies[0]);
      app.setFromCurrency(formatted_currencies[0]);
      app.setFrom('1');
      await app.updateToCurrency();
      expect(app.to).to.equal(convertCurrency(currency_rate, app.from));
    });
  });
  describe("updateFromCurrency", () => {
    beforeEach(() => {
      app = new AppModel(mock_service);
      mock_service.transformCurrency.mockClear();
    });
    it('cant call transformCurrency with just to currency', () => {
      app.setToCurrency(formatted_currencies[0]);
      app.updateFromCurrency();
      expect(mock_service.transformCurrency.mock.calls.length).to.equal(0);
    });
    it('cant call transformCurrency with just from currency', () => {
      app.setFromCurrency(formatted_currencies[0]);
      app.updateFromCurrency();
      expect(mock_service.transformCurrency.mock.calls.length).to.equal(0);
    });
    it('can call transformCurrency with both currencies', () => {
      app.setToCurrency(formatted_currencies[0]);
      app.setFromCurrency(formatted_currencies[0]);
      app.updateFromCurrency();
      expect(mock_service.transformCurrency.mock.calls.length).to.equal(1);
    });
    it('calls setFrom', async () => {
      app.setToCurrency(formatted_currencies[0]);
      app.setFromCurrency(formatted_currencies[0]);
      app.setTo('1');
      app.setFrom = jest.fn();
      await app.updateFromCurrency();
      expect(app.setFrom.mock.calls.length).to.equal(1);
    });
    it('Sets the value of From', async () => {
      app.setToCurrency(formatted_currencies[0]);
      app.setFromCurrency(formatted_currencies[0]);
      app.setTo('1');
      await app.updateFromCurrency();
      expect(app.from).to.equal(convertCurrency(currency_rate, app.to));
    });
  });
});
