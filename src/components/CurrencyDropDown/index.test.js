import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import CurrencyDropDown from './index';
import mock_currencies from '../../test-data/formatted_currencies';

describe('CurrencyDropDown', () => {
  describe('Without Props', () => {
    it('Renders', () => {
        const wrapper = shallow(<CurrencyDropDown />);
        expect(wrapper.getElements()).to.deep.equal([null]);
    });
  });
  describe('With Props', () => {
    it('Renders with Currencies', () => {
        const wrapper = shallow(<CurrencyDropDown currencies={mock_currencies} currency={mock_currencies[0]} />);
        expect(wrapper.getElements()).not.to.deep.equal([null]);
    });
  });
  describe('handleChange', () => {
    it('Calls the callback on mount', () => {
        const callback = jest.fn();
        const wrapper = mount(
          <CurrencyDropDown
            currencies={mock_currencies}
            currency={mock_currencies[0]}
            callback={callback}
          />
        );
        expect(callback.mock.calls.length).to.equal(1);
    });
    it('Calls the callback on change', () => {
        const callback = jest.fn();
        const wrapper = mount(
          <CurrencyDropDown
            currencies={mock_currencies}
            currency={mock_currencies[0]}
            callback={callback}
          />
        );
        wrapper.instance().handleChange([]);
        expect(callback.mock.calls.length).to.equal(2);
    });
  });
});
