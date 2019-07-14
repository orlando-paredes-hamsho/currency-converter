import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Select from 'react-dropdown-select';
import CurrencyField from './index';

const mock_currencies = [
  { label: 'usd', value: 'usd' },
  { label: 'mxn', value: 'mxn' },
  { label: 'eur', value: 'eur' }
];
const id = 'test'

describe('CurrencyField', () => {
  describe('Without Props', () => {
    it('Renders', () => {
        const wrapper = shallow(<CurrencyField />);
        expect(wrapper.getElements()).not.to.deep.equal([null]);
    });
    it('Does not contain a CurrencyDropDown', () => {
        const wrapper = mount(<CurrencyField />);
        expect(wrapper.exists(Select)).to.equal(false);
    });
  });
  describe('With Props', () => {
    it('Renders with props', () => {
        const wrapper = shallow(<CurrencyField id={id} currencies={mock_currencies}/>);
        expect(wrapper.getElements()).not.to.deep.equal([null]);
    });
    it('Contains an input with the provided id', () => {
        const wrapper = shallow(<CurrencyField id={id} currencies={mock_currencies} />);
        expect(wrapper.find(`input#${id}`)).to.exist;
    });
    it('Contains a label with the provided id as htmlFor', () => {
        const wrapper = shallow(<CurrencyField id={id} currencies={mock_currencies} />);
        expect(wrapper.find(`label[for="${id}"]`)).to.exist;
    });
    it('Contains a CurrencyDropDown', () => {
        const wrapper = mount(<CurrencyField id={id} currencies={mock_currencies} />);
        expect(wrapper.exists(Select)).to.equal(true);
    });
  });
});
