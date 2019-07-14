import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import currencies from './test-data/currencies';
import AppModel from './models/app';
import App from './App';

let model = new AppModel();
const service = {
  getCurrencies: jest.fn()
};
service.getCurrencies.mockReturnValue({
  status: 200,
  data: currencies
});

describe('CurrencyField', () => {
  describe('Without Props', () => {
    afterEach(() => {
      service.getCurrencies.mockClear();
    });
    it('Renders', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.getElements()).to.deep.equal([null]);
    });
    it('Does not call getCurrencies', () => {
        const wrapper = shallow(<App />);
        expect(service.getCurrencies.mock.calls.length).to.equal(0);
    });
    it('Does not alter currencies', () => {
        const wrapper = shallow(<App />);
        expect(model.currencies).to.deep.equal({});
    });
  });
  describe('With only model', () => {
    afterEach(() => {
      service.getCurrencies.mockClear();
    });
    it('Renders', () => {
        const wrapper = shallow(<App model={model}/>);
        expect(wrapper.getElements()).to.deep.equal([null]);
    });
    it('Does not call getCurrencies', () => {
        const wrapper = shallow(<App />);
        expect(service.getCurrencies.mock.calls.length).to.equal(0);
    });
    it('Does not alter currencies', () => {
        const wrapper = shallow(<App />);
        expect(model.currencies).to.deep.equal({});
    });
  });
  describe('With only service', () => {
    afterEach(() => {
      service.getCurrencies.mockClear();
    });
    it('Renders', () => {
        const wrapper = shallow(<App service={service}/>);
        expect(wrapper.getElements()).to.deep.equal([null]);
    });
    it('Does not call getCurrencies', () => {
        const wrapper = shallow(<App />);
        expect(service.getCurrencies.mock.calls.length).to.equal(0);
    });
    it('Does not alter currencies', () => {
        const wrapper = shallow(<App />);
        expect(model.currencies).to.deep.equal({});
    });
  });
  describe('With both model and service', () => {
    afterEach(() => {
      service.getCurrencies.mockClear();
    });
    it('Renders', () => {
        const wrapper = shallow(<App service={service} model={model} />);
        expect(wrapper.getElements()).not.to.deep.equal([null]);
    });
    it('Does not call getCurrencies', () => {
        const wrapper = shallow(<App service={service} model={model} />);
        expect(service.getCurrencies.mock.calls.length).to.equal(1);
    });
    it('Does not alter currencies', () => {
        const wrapper = shallow(<App service={service} model={model} />);
        expect({ ...model.currencies }).to.deep.equal(currencies.results);
    });
  });
});
