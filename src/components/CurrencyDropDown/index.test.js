import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CurrencyDropDown from './index';

const mock_currencies = [
  { label: 'usd', value: 'usd' },
  { label: 'mxn', value: 'mxn' },
  { label: 'eur', value: 'eur' }
];

describe('CurrencyDropDown', () => {
  describe('Without Props', () => {
    it('Renders', () => {
        const wrapper = shallow(<CurrencyDropDown />);
        expect(wrapper.getElements()).to.deep.equal([null]);
    });
  });
  describe('With Props', () => {
    it('Renders with Currencies', () => {
        const wrapper = shallow(<CurrencyDropDown currencies={mock_currencies} />);
        expect(wrapper.getElements()).not.to.deep.equal([null]);
    });
  });
});
