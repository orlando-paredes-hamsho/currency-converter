/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import currencies from "../test-data/currencies";
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
      expect([ ...app.currency_names ]).to.deep.equal(Object.keys(currencies.results));
    });
  });
});
