import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CurrencyField from './index';

describe('CurrencyField', () => {
  describe('Without Props', () => {
    it('Renders', () => {
        const wrapper = shallow(<CurrencyField />);
        expect(wrapper).to.exist;
    });
  });
  describe('With Props', () => {
    it('Renders', () => {
        const wrapper = shallow(<CurrencyField id="test"/>);
        expect(wrapper).to.exist;
    });
    it('Contains an input with the provided id', () => {
        const id = 'test'
        const wrapper = shallow(<CurrencyField id={id}/>);
        expect(wrapper.find(`input#${id}`)).to.exist;
    });
    it('Contains an input with the provided id', () => {
        const id = 'test'
        const wrapper = shallow(<CurrencyField id={id}/>);
        expect(wrapper.find(`label[for="${id}"]`)).to.exist;
    });
  });
});
