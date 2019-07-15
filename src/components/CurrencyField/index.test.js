import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import CurrencyField from './index';
import mock_currencies from '../../test-data/formatted_currencies';
const id = 'test'

jest.useFakeTimers();

describe('CurrencyField', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });
  describe('Without Props', () => {
    it('Renders', () => {
        const wrapper = shallow(<CurrencyField />);
        expect(wrapper.getElements()).not.to.deep.equal([null]);
    });
  });
  describe('With Props', () => {
    it('Renders with props', () => {
        const wrapper = shallow(<CurrencyField id={id} />);
        expect(wrapper.getElements()).not.to.deep.equal([null]);
    });
    it('Contains an input with the provided id', () => {
        const wrapper = shallow(<CurrencyField id={id} />);
        expect(wrapper.find(`input#${id}`)).to.exist;
    });
  });
  describe('delayUpdateCurrencies', () => {
    it('Calls clearTimeout', () => {
        const update_currencies = jest.fn();
        const wrapper = mount(
          <CurrencyField
            update_currencies={update_currencies}
          />
        );
        wrapper.instance().delayUpdateCurrencies();
        expect(clearTimeout.mock.calls.length).to.equal(1);
    });
    it('Calls generateUpdateTimeout', () => {
        const update_currencies = jest.fn();
        const wrapper = mount(
          <CurrencyField
            update_currencies={update_currencies}
          />
        );
        wrapper.instance().generateUpdateTimeout = jest.fn()
        wrapper.instance().delayUpdateCurrencies();
        expect(wrapper.instance().generateUpdateTimeout.mock.calls.length).to.equal(1);
    });
  });
  describe('handleChange', () => {
    it('Calls the callback on change', () => {
        const callback = jest.fn();
        const wrapper = mount(
          <CurrencyField
            callback={callback}
          />
        );
        wrapper.instance().handleChange({ currentTarget: { value: 1 } });
        expect(callback.mock.calls.length).to.equal(1);
    });
    it('Calls delayUpdateCurrencies on change', () => {
        const update_currencies = jest.fn();
        const wrapper = mount(
          <CurrencyField
            update_currencies={update_currencies}
          />
        );
        wrapper.instance().delayUpdateCurrencies = jest.fn()
        wrapper.instance().handleChange({ currentTarget: { value: 1 } });
        expect(wrapper.instance().delayUpdateCurrencies.mock.calls.length).to.equal(1);
    });
    it('Does not call delayUpdateCurrencies on change without update_currencies', () => {
        const update_currencies = jest.fn();
        const wrapper = mount(
          <CurrencyField />
        );
        wrapper.instance().delayUpdateCurrencies = jest.fn()
        wrapper.instance().handleChange({ currentTarget: { value: 1 } });
        expect(wrapper.instance().delayUpdateCurrencies.mock.calls.length).to.equal(0);
    });
    it('Calls update_currencies on change after the timer ends', () => {
        const update_currencies = jest.fn();
        const wrapper = mount(
          <CurrencyField
            update_currencies={update_currencies}
          />
        );
        wrapper.instance().handleChange({ currentTarget: { value: 1 } });
        jest.runAllTimers();
        expect(update_currencies.mock.calls.length).to.equal(1);
    });
  });
});
